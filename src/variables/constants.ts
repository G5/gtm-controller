import IStringMap from "src/interfaces/iStringMap";

declare global {
  // @ts-ignore
  interface Window {
    dataLayer: IStringMap[]|undefined;
    gtmControllerDebug: boolean;
  }
}

export default class Constants {
  public static get dataLayer() {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  }

  public static get debugging() {
    return window.gtmControllerDebug;
  }
}
