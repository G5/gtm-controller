
export type Subscriber<DataType> = (data: DataType) => void;

export default class Trigger<DataType> {
  private privateSubscriptions: Array<Subscriber<DataType>>;

  constructor() {
    this.privateSubscriptions = [];
  }

  public get subscriptions(): Array<Subscriber<DataType>> {
    return this.privateSubscriptions;
  }

  public subscribe(callback: Subscriber<DataType> ): boolean {
    const subscribed = this.privateSubscriptions.includes(callback);
    if (!subscribed) {
      this.privateSubscriptions.push(callback);
    }
    return !subscribed;
  }

  public unsubscribe(callback: Subscriber<DataType> ) {
    this.privateSubscriptions = this.privateSubscriptions.filter(fn => fn !== callback);
  }

  public clearSubscriptions() {
    this.privateSubscriptions = [];
  }

  protected fireSubscriptions(data: DataType) {
    this.privateSubscriptions.forEach(listener => listener.call(null, data));
  }
}
