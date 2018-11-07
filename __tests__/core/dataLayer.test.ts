import DataLayer from '../../src/core/dataLayer';

describe('DataLayer', () => {
  beforeEach(() => {
    window.dataLayer = undefined;
    delete window.gtmControllerDebug;
  });
  test('Returns an empty array when not initialized', () => {
    expect(DataLayer.all).toEqual([]);
  });
  describe('Has data stored', () => {
    let item1: string;
    let item2: string;
    beforeEach(() => {
      item1 = 'Hello';
      item2 = 'World';
      DataLayer.push(item1);
      DataLayer.push(' ');
      DataLayer.push(item2);
    });
    test('Returns all items', () => {
      expect(DataLayer.all).toEqual([item1, ' ', item2]);
    });
    test('Returns specific item', () => {
      expect(DataLayer.get(1)).toEqual(' ');
    });
    test('Returns first pushed data', () => {
      expect(DataLayer.first).toEqual(item1);
    });
    test('Returns last pushed data', () => {
      expect(DataLayer.last).toEqual(item2);
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
