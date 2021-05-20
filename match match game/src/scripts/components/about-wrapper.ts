import { BaseComponent } from "./base-component";
import { AboutSection } from "./about-section";
import { Button } from "./button";

export class AboutWrapper extends BaseComponent {
  private readonly sections: AboutSection[];

  readonly playbtn: Button;

  constructor() {
    super("div", ["about-wrapper"]);
    this.sections = [
      new AboutSection("some Text"),
      new AboutSection("some Text"),
      new AboutSection("some Text"),
    ];
    this.playbtn = new Button(["play-btn"], "Start Gambling", "play");
    this.element.innerHTML = `<h3 class="about-h3">How to play a game</h3>`;
    this.sections.forEach((section) =>
      this.element.appendChild(section.element)
    );
  }

  deployBtn(place: HTMLElement) {
    place.appendChild(this.playbtn.element);
    console.log(this.playbtn);
  }
}
