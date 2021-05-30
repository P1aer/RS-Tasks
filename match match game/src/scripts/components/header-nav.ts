import BaseComponent from "./base-component";
import HeaderNavList from "./header-nav-list";

class HeaderNav extends BaseComponent {
  readonly list: HeaderNavList;

  constructor() {
    super("nav", ["header-nav"]);
    this.list = new HeaderNavList();
    this.element.appendChild(this.list.element);
  }
}

export default HeaderNav;
