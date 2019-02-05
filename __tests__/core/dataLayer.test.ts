import DataLayer from '../../src/core/dataLayer';
import IStringMap from '../../src/interfaces/iStringMap';

describe('DataLayer', () => {
  beforeEach(() => {
    window.dataLayer = undefined;
    delete window.gtmControllerDebug;
  });
  test('Returns an empty array when not initialized', () => {
    expect(DataLayer.all).toEqual([]);
  });
  describe('Has data stored', () => {
    let item1: IStringMap;
    let item2: IStringMap;
    beforeEach(() => {
      item1 = { Hello: 'world'};
      item2 = { Foo: 'bar' };
      DataLayer.push(item1);
      DataLayer.push(item2);
    });
    test('Returns all items', () => {
      expect(DataLayer.all).toEqual([item1, item2]);
    });
    test('Returns specific item', () => {
      expect(DataLayer.get(1)).toEqual(item2);
      expect(DataLayer.get('Hello')).toEqual(item1.Hello);
    });
    test('Returns first pushed data', () => {
      expect(DataLayer.first).toEqual(item1);
    });
    test('Returns last pushed data', () => {
      expect(DataLayer.last).toEqual(item2);
    });
    test('Returns latest values', () => {
      DataLayer.push({ Hello: 'Dingus' });
      expect(DataLayer.values).toEqual({ Hello: 'Dingus', Foo: 'bar'});
      expect(DataLayer.values.Hello).toEqual('Dingus');
      expect(DataLayer.get('Hello')).toEqual('Dingus');
    });
  });
  test('Logs pushed data when debug is enabled', () => {
    const mockedConsole = jest.spyOn(console, 'log');
    mockedConsole.mockImplementation(() => false);
    window.gtmControllerDebug = true;

    const data = { Hello: 'World' };
    DataLayer.push(data);
    expect(console.log).lastCalledWith(data);

    mockedConsole.mockRestore();
  });
});
