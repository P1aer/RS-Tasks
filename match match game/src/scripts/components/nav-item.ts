import BaseComponent from "./base-component";

class NavItem extends BaseComponent {
  constructor(page: string, img: string, text: string) {
    super("div", ["nav-item"]);
    this.element.innerHTML = `
       <img class="logo-mini" id="${page}-page" src="../images/${img}" alt="about logo">
       <h3> ${text}</h3>
    `;
  }
}

export default NavItem;
