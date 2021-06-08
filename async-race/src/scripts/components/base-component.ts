class BaseComponent {
  element: HTMLElement;

  constructor(tag = "div", styles: string[] = []) {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
  }
}
export default BaseComponent;
