import BaseComponent from "../base-component";
import "./page-footer.scss";

class PageFooter extends BaseComponent {
  constructor(place: string) {
    super("div", ["page-footer"]);
    this.element.innerHTML = `
    <button class="${place}-footer-prev-btn">prev</button>
    <h3 class="footer-page">1</h3>
     <button class="${place}-footer-next-btn">next</button>
    `;
  }

  updatePage(page: number) {
    this.element.querySelector(".footer-page").innerHTML = `${page}`;
  }
}

export default PageFooter;
