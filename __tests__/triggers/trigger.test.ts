import Trigger from '../../src/triggers/trigger';

class ExtendsTrigger extends Trigger {
  public somethingImportant(data: any) {
    this.fireSubscriptions(data);
  }
}

describe('Extends Trigger with Multiple Subscriptions', () => {
  let triggerable: ExtendsTrigger;
  let func1: jest.Mock;
  let func2: jest.Mock;
  const data = {
    information: 'Something important has happened'
  };
  beforeEach(() => {
    func1 = jest.fn();
    func2 = jest.fn();
    triggerable = new ExtendsTrigger();
    triggerable.subscribe(func1);
    triggerable.subscribe(func2);
  });
  test('.subscriptions returns collection of subscriptions', () => {
    expect(triggerable.subscriptions).toEqual([
      func1,
      func2
    ]);
  });
  test('Called when fired', () => {
    triggerable.somethingImportant(data);
    expect(func1).lastCalledWith(data);
  });
  test('Can unsubscribe and does not get called', () => {
    triggerable.unsubscribe(func1);
    triggerable.somethingImportant(data);
    expect(func1).not.toBeCalled();
  });
  test('Cannot subscribe more than once with same observer', () => {
    expect(triggerable.subscribe(func1)).toEqual(false);
    expect(triggerable.subscriptions).toHaveLength(2);
  });
});
