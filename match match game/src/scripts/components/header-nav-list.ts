import { BaseComponent } from "./base-component";
import { HeaderNavItem } from "./header-nav-item";

export class HeaderNavList extends BaseComponent {
  private paths: HeaderNavItem[];

  constructor() {
    super("ul", ["header-nav-list"]);
    this.paths = [
      new HeaderNavItem("about", "about-logo.jpg", "About Game"),
      new HeaderNavItem("best", "best-icon.jpg", "Best Score"),
      new HeaderNavItem("settings", "settings-icon.jpg", "Game Settings"),
    ];
    this.paths.forEach((path) => this.element.appendChild(path.element));
  }

  goToPage(path: string) {
    this.paths.forEach((pth) =>
      pth.Name === path ? pth.becomeActive() : pth.becomeNonActive()
    );
  }
}
