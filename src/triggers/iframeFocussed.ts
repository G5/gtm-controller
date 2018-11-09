import WhitelistParser from '../helpers/whitelistParser';
import Constants from '../variables/constants';
import Trigger from './trigger';

interface IIframeWhitelistConfig {
  whitelist: { iframe?: string[] };
}

class IframeFocusTrigger extends Trigger {

  private whitelist: WhitelistParser;

  constructor({ whitelist: { iframe: iframeWhitelistRules = [] } }: IIframeWhitelistConfig) {
    super();
    let iframeClickedLast = false;
    this.whitelist = new WhitelistParser(iframeWhitelistRules);

    const windowBlurred = () => {
      setTimeout(() => {
        const { activeElement } = document;

        if (activeElement instanceof HTMLIFrameElement) {
          iframeClickedLast = true;
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
    };

    const windowFocussed = () => {
      iframeClickedLast = iframeClickedLast ? false : true;
    };

    window.addEventListener('focus', windowFocussed, true);
    window.addEventListener('blur', windowBlurred, true);
  }
}

export default IframeFocusTrigger;
