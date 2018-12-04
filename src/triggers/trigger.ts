
export type Observer = (data?: any) => void;

export default class Trigger<SubscriptionDataType> {
  private privateSubscriptions: Observer[];

  constructor() {
    this.privateSubscriptions = [];
  }

  public get subscriptions(): Observer[] {
    return this.privateSubscriptions;
  }

  public subscribe(callback: Observer): boolean {
    const subscribed = this.privateSubscriptions.includes(callback);
    if (!subscribed) {
      this.privateSubscriptions.push(callback);
    }
    return !subscribed;
  }

  public unsubscribe(callback: Observer) {
    this.privateSubscriptions = this.privateSubscriptions.filter(fn => fn !== callback);
  }

  public clearSubscriptions() {
    this.privateSubscriptions = [];
  }

  protected fireSubscriptions(data: SubscriptionDataType) {
    this.privateSubscriptions.forEach(listener => listener.call(null, data));
  }
}
