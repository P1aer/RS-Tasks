import BaseComponent from "./base-component";

class AboutSection extends BaseComponent {
  constructor(text: string) {
    super("div", ["about-section"]);
    this.element.innerHTML = `
    <p>${text}</p> 
    `;
  }
}

export default AboutSection;
