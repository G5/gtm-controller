import WhitelistParser from '../helpers/whitelistParser';
import Constants from '../variables/constants';
import Trigger from './trigger';

interface IIframeWhitelistConfig {
  whitelist: { iframe?: string[] };
}

class IframeFocusTrigger extends Trigger {

  private iframeClickedLast: boolean;
  private whitelist: WhitelistParser;

  constructor({ whitelist: { iframe: iframeWhitelistRules = [] } }: IIframeWhitelistConfig) {
    super();
    this.iframeClickedLast = false;
    this.whitelist = new WhitelistParser(iframeWhitelistRules);
    window.addEventListener('focus', this.windowFocussed.bind(this), true);
    window.addEventListener('blur', this.windowBlurred.bind(this), true);
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

        if (Constants.debugging) {
          console.log('Clicked iframe src:', src, 'Element:', activeElement);
        }

        this.fireSubscriptions(data);
      }
    }, 100);
  }

  private windowFocussed() {
    this.iframeClickedLast = !this.iframeClickedLast;
  }

}

export default IframeFocusTrigger;
