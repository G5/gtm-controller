import helloWorld from '../src/index';

describe('Hello World', () => {
  test('Console logs hello world', () => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    helloWorld();
    expect(console.log).lastCalledWith('Hello World');
  });
});
