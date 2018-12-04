import { DI } from "jack-of-all-decorators";
import IGlobalConfig from '../core/IGlobalConfig';
import WhitelistParser from '../helpers/whitelistParser';
import Constants from '../variables/constants';
import Trigger from './trigger';

export interface IFrameFocusData {
  event: string;
  whitelisted: boolean;
  lastClickedIframeSrc: string;
  lastClickedIframeIdOrClass: string;
}

@DI.Injectable()
class IframeFocusTrigger extends Trigger<IFrameFocusData> implements DI.IInjectable {
  private iframeClickedLast: boolean;
  private whitelist: WhitelistParser;
  private windowFocussedEvent: () => void;
  private windowBlurredEvent: () => void;

  constructor(config: IGlobalConfig) {
    super();
    this.iframeClickedLast = false;
    const iframeWhitelistRules = config.whitelist ? config.whitelist.iframe || [] : [];
    this.whitelist = new WhitelistParser(iframeWhitelistRules);
    this.windowFocussedEvent = this.windowFocussed.bind(this);
    this.windowBlurredEvent = this.windowBlurred.bind(this);
    window.addEventListener('focus', this.windowFocussedEvent, true);
    window.addEventListener('blur', this.windowBlurredEvent, true);
  }

  public destruct(): void {
    window.removeEventListener('focus', this.windowFocussedEvent, true);
    window.removeEventListener('blur', this.windowBlurredEvent, true);
  }

  private windowBlurred() {
    setTimeout(() => {
      const { activeElement } = document;

      if (activeElement instanceof HTMLIFrameElement) {
        this.iframeClickedLast = true;
        const src = activeElement.src || 'no src available';
        const data = {
          event: 'custom.event.iframeClicked',
          whitelisted: this.whitelist.matches(src),
          lastClickedIframeSrc: src,
          lastClickedIframeIdOrClass: activeElement.id
            ? 'id: ' + activeElement.id
            : activeElement.className
              ? 'class: ' + activeElement.className
              : 'no id or class name available'
        };

        this.fireSubscriptions(data);

        if (Constants.debugging) {
          console.log('Clicked iframe src:', src, 'Element:', activeElement);
        }
      }
    }, 100);
  }

  private windowFocussed() {
    this.iframeClickedLast = !this.iframeClickedLast;
  }

}

export default IframeFocusTrigger;
