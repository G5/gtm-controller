import Trigger from '../../src/triggers/trigger';

class ExtendsTrigger extends Trigger {
  public somethingImportant(data: any) {
    this.fireListeners(data);
  }
}

describe('Extends Trigger', () => {
  const triggerable = new ExtendsTrigger();
  test('Can subscribe and be called', () => {
    const func = jest.fn();
    const data = {
      information: 'Something important has happened'
    };
    triggerable.subscribe(func);
    triggerable.somethingImportant(data);
    expect(func).lastCalledWith(data);
  });
});
