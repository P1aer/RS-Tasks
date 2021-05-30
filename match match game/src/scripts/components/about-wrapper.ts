import BaseComponent from "./base-component";
import AboutSection from "./about-section";

class AboutWrapper extends BaseComponent {
  private readonly sections: AboutSection[];

  constructor() {
    super("div", ["about-wrapper"]);
    this.sections = [
      new AboutSection("Create your challenger profile"),
      new AboutSection("Set your own settings or play with default one"),
      new AboutSection(
        'Click "Start Gambling" button to start new game.<br>Remember card positions and match it before times up.'
      ),
      new AboutSection("Enjoy your stay <img src='images/xqcL.png'>"),
    ];
    this.element.innerHTML = `<h3 class="about-h3">How to play a game</h3>`;
    this.sections.forEach((section) => this.element.append(section.element));
  }
}

export default AboutWrapper;
