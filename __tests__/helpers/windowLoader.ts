export default class WindowLoader {
  public static loadElements(...elements) {
    for (const elem of elements) {
      this.addElement(elem);
    }
  }
  public static loadElement(element) {
    const newElement = this._initElement(element);
    document.body.innerHTML = newElement.outerHTML;
  }
  public static addElement(element) {
    const newElement = this._initElement(element);
    document.body.innerHTML += newElement.outerHTML;
  }
  public static clearElements() {
    document.body.innerHTML = '';
  }
  private static _initElement(element) {
    const newElement = document.createElement(element.type);
    newElement.innerHTML = element.innerHtml;
    return newElement;
  }
}
