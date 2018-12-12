
export type Observer<DataType> = (data?: DataType) => void;

export default class Trigger<DataType> {
  private privateSubscriptions: Array<Observer<DataType>>;

  constructor() {
    this.privateSubscriptions = [];
  }

  public get subscriptions(): Array<Observer<DataType>> {
    return this.privateSubscriptions;
  }

  public subscribe(callback: Observer<DataType> ): boolean {
    const subscribed = this.privateSubscriptions.includes(callback);
    if (!subscribed) {
      this.privateSubscriptions.push(callback);
    }
    return !subscribed;
  }

  public unsubscribe(callback: Observer<DataType> ) {
    this.privateSubscriptions = this.privateSubscriptions.filter(fn => fn !== callback);
  }

  public clearSubscriptions() {
    this.privateSubscriptions = [];
  }

  protected fireSubscriptions(data: DataType) {
    this.privateSubscriptions.forEach(listener => listener.call(null, data));
  }
}
