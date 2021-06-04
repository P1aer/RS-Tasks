import BaseComponent from "../base-component";
import "./header-container.scss";
import HeaderNav from "../header-nav/header-nav";

class HeaderContainer extends BaseComponent {
  private readonly nav: HeaderNav;

  get Nav() {
    return this.nav;
  }

  constructor() {
    super("div", ["header-container"]);
    this.nav = new HeaderNav();
    this.element.innerHTML = `
        <div class="header-logo">
             <img src="../images/pepega.png" alt="Icon" class="header-logo-img">
             <h3 class="header-logo-text">PEPEGA RACES</h3>
        </div>
    `;
    this.element.append(this.nav.element);
  }
}
export default HeaderContainer;
