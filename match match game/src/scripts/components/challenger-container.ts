import { BaseComponent } from "./base-component";
import { Button } from "./button";

export class ChallengerContainer extends BaseComponent {
  private readonly btn: Button;

  constructor() {
    super("div", ["challenger-container"]);
    this.btn = new Button(
      ["header-btn"],
      "Register new challenger",
      "register"
    );
    this.element.appendChild(this.btn.element);
  }

  changeToImg(src = "../images/profile-default.png") {
    this.btn.element.remove();
    this.element.innerHTML = `
    <img src="${src}" alt="header profile" class="header-profile">
    `;
  }
}
