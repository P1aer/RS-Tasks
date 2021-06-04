import BaseComponent from "../base-component";
import "./header-nav-item.scss";

class HeaderNavItem extends BaseComponent {
  private readonly name: string;

  get Name() {
    return this.name;
  }

  constructor(name: string, icon: string) {
    super("div", ["header-nav-item"]);
    this.element.innerHTML = `
        <img src=${icon} alt="${name} Icon" class="nav-icon">
        <h3 class="nav-item-h3">${name}</h3>
    `;
    this.name = name.toLowerCase();
  }

  becomeActive() {
    if (!this.element.classList.contains("active"))
      this.element.classList.add("active");
  }

  becomeNonActive() {
    if (this.element.classList.contains("active"))
      this.element.classList.remove("active");
  }
}

export default HeaderNavItem;
