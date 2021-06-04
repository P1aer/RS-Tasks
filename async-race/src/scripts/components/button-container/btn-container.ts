import BaseComponent from "../base-component";
import "./btn-container.scss";

class BtnContainer extends BaseComponent {
  constructor(button: string, id: string) {
    super("div", ["btn-container"]);
    this.element.innerHTML = `
          <button class="menu-${id}-btn" id="${id}-btn">${button}</button>   
          <input id="${id}-input" type="text">
     `;
  }
}

export default BtnContainer;
