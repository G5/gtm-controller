import { Constants } from "../variables/constants";

const { dataLayer: DL } = Constants;

class DataLayer {
  public static push(...args: any): number {
    DL.push(...args);
    if (Constants.gtmControllerDebug) {
      console.log(...args);
    }
    return DL.length - 1;
  }

  public static get all(): any[] {
    return DL;
  }

  public static get(index: number): any {
    return DL[index];
  }

  public static get first(): any {
    return this.get(0);
  }

  public static get last(): any {
    return this.get(this.all.length - 1);
  }
}

export default DataLayer;
