import BaseComponent from "../base-component";
import "./garage-footer.scss";

class GarageFooter extends BaseComponent {

  constructor() {
    super("div", ["garage-footer"]);
    this.element.innerHTML = `
    <button class="footer-prev-btn">prev</button>
    <h3 class="footer-page">1</h3>
     <button class="footer-next-btn">next</button>
    `;
  }

  updatePage(page: number) {

    this.element.querySelector(
      ".footer-page"
    ).innerHTML = `${page}`;
  }
}

export default GarageFooter;
