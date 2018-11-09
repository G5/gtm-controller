export default class WindowLoader {
  public static loadElements(...elements: IPartial[]) {
    for (const elem of elements) {
      this.addElement(elem);
    }
  }
  public static loadElement(element: IPartial) {
    const newElement = this._initElement(element);
    document.body.innerHTML = newElement.outerHTML;
  }
  public static addElement(element: IPartial) {
    const newElement = this._initElement(element);
    document.body.innerHTML += newElement.outerHTML;
  }
  public static clearElements() {
    document.body.innerHTML = '';
  }
  private static _initElement(element: IPartial) {
    const newElement = document.createElement(element.type);
    newElement.innerHTML = element.innerHtml;
    return newElement;
  }
}
