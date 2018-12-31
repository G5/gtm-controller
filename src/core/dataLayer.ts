import IStringMap from "../interfaces/iStringMap";
import Constants from "../variables/constants";

const { dataLayer: DL } = Constants;

class DataLayer {
  public static push(...args: IStringMap[]): number {
    DL.push(...args);
    if (Constants.debugging) {
      console.log(...args);
    }
    return DL.length - 1;
  }

  public static get all(): IStringMap[] {
    return DL;
  }

  public static get values(): IStringMap {
    return this.all.reduce((flat, current) => Object.assign(flat, current), {});
  }

  /**
   * @description Returns the data layer frame by index or the latest value of a key
   * @static
   * @param {(number|string)} index
   * @returns {(IStringMap[]|IStringMap)}
   */
  public static get(index: number|string): IStringMap[]|IStringMap {
    return (typeof index === 'number') ? this.all[index] : this.values[index];
  }

  public static get first(): any {
    return this.get(0);
  }

  public static get last(): any {
    return this.get(this.all.length - 1);
  }
}

export default DataLayer;
