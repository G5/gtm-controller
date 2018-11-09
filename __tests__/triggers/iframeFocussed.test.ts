import IframeFocusTrigger from '../../src/triggers/iframeFocussed';
import WindowLoader from '../helpers/windowLoader';
import formTemplate from "../templates/partials/form";
import iframeTemplate from '../templates/partials/iframe';

let iframe: HTMLIFrameElement;
beforeEach(() => {
  WindowLoader.clearElements();
  WindowLoader.loadElements(iframeTemplate);
  iframe = document.getElementsByTagName("iframe")[0];
});

describe("iframe event tracking", () => {
  const config = {
    whitelist: {
      iframe: [
        'www.w3schools.com'
      ]
    }
  };
  const IET = new IframeFocusTrigger(config);
  beforeEach(() => {
    IET.clearSubscriptions();
  });

  test("focusing on the iframe gets tracked", done => {

    IET.subscribe(event => {
      expect(event.lastClickedIframeSrc).toBe("https://www.w3schools.com/");
      expect(event.lastClickedIframeIdOrClass).toBe("id: iframe-1");
      expect(event.event).toBe("custom.event.iframeClicked");
      expect(event.whitelisted).toBe(true);
      done();
    });

    expect(iframe instanceof HTMLIFrameElement).toEqual(true);

    iframe.focus();

    expect(document.activeElement instanceof HTMLIFrameElement).toEqual(true);

    window.dispatchEvent(new Event('blur'));
  });

  test('iframe not whitelisted', done => {
    const emptyConfig = { whitelist: { } };
    const IET2 = new IframeFocusTrigger(emptyConfig);

    IET2.subscribe(event => {
      expect(event.whitelisted).toBe(false);
      done();
    });

    iframe.focus();
    window.dispatchEvent(new Event('blur'));
  });

  test('iframe without an id events with the class', done => {
    iframe.removeAttribute('id');

    IET.subscribe(event => {
      expect(event.lastClickedIframeIdOrClass).toBe('class: some-iframe class');
      done();
    });

    iframe.focus();
    window.dispatchEvent(new Event("blur"));
  });

  test('iframe without an id or class events with default message', done => {
    iframe.removeAttribute('id');
    iframe.removeAttribute('class');

    IET.subscribe(event => {
      expect(event.lastClickedIframeIdOrClass).toBe('no id or class name available');
      done();
    });

    iframe.focus();
    window.dispatchEvent(new Event('blur'));
  });

  test('iframe without src attribute events with default message', done => {
    iframe.removeAttribute('src');

    IET.subscribe(event => {
      expect(event.lastClickedIframeSrc).toBe('no src available');
      done();
    });

    iframe.focus();
    window.dispatchEvent(new Event('blur'));
  });

  test('blur event not on an iframe does not fire iframe event', () => {
    // The blur event has a 100ms timer for a FireFox bug
    //  Let Jest mock them and speed them up ;)
    jest.useFakeTimers();
    const called = jest.fn();

    IET.subscribe(called);
    WindowLoader.loadElement(formTemplate);
    const input = document.querySelector('input[type=text]') as HTMLInputElement;

    input.focus();
    window.dispatchEvent(new Event('focus'));
    expect(document.activeElement).toEqual(input);

    document.body.focus();
    window.dispatchEvent(new Event('blur'));

    // Stop waiting for timers and then restore them
    jest.runAllTimers();
    jest.useRealTimers();

    expect(called).not.toBeCalled();
  });

  test("g5Debug logs event with args", done => {
    const mockedConsole = jest.spyOn(console, 'log');
    mockedConsole.mockImplementation(() => false);
    window.gtmControllerDebug = true;
    IET.subscribe(() => {
      expect(console.log).lastCalledWith(
        'Clicked iframe src:',
        'https://www.w3schools.com/',
        'Element:',
        iframe
      );
      mockedConsole.mockRestore();
      delete window.gtmControllerDebug; // not sure why this isn't working in the global beforeEach
      done();
    });
    iframe.focus();
    window.dispatchEvent(new Event('blur'));
  });
});
