import BaseComponent from "../base-component";
import "./header-nav.scss";
import HeaderNavItem from "../header-nav-item/header-nav-item";

class HeaderNav extends BaseComponent {
  private readonly items: HeaderNavItem[];

  get Garage() {
    return this.items[0];
  }

  get Winners() {
    return this.items[1];
  }

  constructor() {
    super("nav", ["header-nav"]);
    this.items = [
      new HeaderNavItem("Garage", "../images/icon.png"),
      new HeaderNavItem("Winners", "../images/pepe-glasses.png"),
    ];
    this.items[0].element.classList.add("active");
    this.items.forEach((item) => this.element.append(item.element));
  }

  goToPage(name: string) {
    this.items.forEach((path) =>
      path.Name === name ? path.becomeActive() : path.becomeNonActive()
    );
  }
}

export default HeaderNav;
