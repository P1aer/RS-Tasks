import BaseComponent from "../base-component";
import "./header.scss";
import HeaderContainer from "../header-container/header-container";

class Header extends BaseComponent {
  private readonly container: HeaderContainer;

  get Container(){
    return this.container;
  }
  constructor() {
    super("header", ["header"]);
    this.container = new HeaderContainer();
    this.element.append(this.container.element);
  }
}

export default Header;
