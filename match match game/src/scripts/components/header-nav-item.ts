import { BaseComponent } from "./base-component";
import { NavItem } from "./nav-item";

export class HeaderNavItem extends BaseComponent {
  private readonly item: NavItem;

  private readonly name: string;

  constructor(page: string, img: string, text: string) {
    super("li", ["header-nav-item"]);
    this.name = page;
    this.item = new NavItem(page, img, text);
    this.element.appendChild(this.item.element);
  }

  becomeActive() {
    if (!this.element.classList.contains("active"))
      this.element.classList.add("active");
  }

  becomeNonActive() {
    if (this.element.classList.contains("active"))
      this.element.classList.remove("active");
  }

  get Name() {
    return this.name;
  }
}
