declare global {
  // @ts-ignore
  interface Window {
    dataLayer: any[]|undefined;
    gtmControllerDebug: boolean;
  }
}

export class Constants {
  public static get dataLayer() {
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  }

  public static get gtmControllerDebug() {
    return window.gtmControllerDebug;
  }
}
