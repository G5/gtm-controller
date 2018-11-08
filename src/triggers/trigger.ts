
type AnyFunction = () => void;

export default class Trigger {
  protected listeners: AnyFunction[];

  constructor() {
    this.listeners = [];
  }

  public subscribe(callback: AnyFunction) {
    this.listeners.push(callback);
  }

  protected fireListeners(data: any) {
    this.listeners.forEach(listener => listener.call(null, data));
  }
}
