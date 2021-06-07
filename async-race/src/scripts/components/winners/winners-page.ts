import BaseComponent from "../base-component";
import "./winners.scss";
import WinnersTable from "../winners-table/winners-table";
import { getWinners } from "../../api";
import PageFooter from "../page-footer/page-footer";

class WinnersPage extends BaseComponent {
  private readonly table: WinnersTable;

  private currentPage = 1;

  private footer: PageFooter;

  constructor() {
    super("div", ["winners-section"]);
    this.table = new WinnersTable();
    this.footer = new PageFooter("winners");
    this.element.innerHTML = `
     <h3 id="winners-count">Total winners: </h3>`;
    this.element.append(this.table.element);
    this.element.append(this.footer.element);
    this.footer.element
      .querySelector(".winners-footer-prev-btn")
      .addEventListener("click", () => this.handlePrevBtn());
    this.footer.element
      .querySelector(".winners-footer-next-btn")
      .addEventListener("click", () => this.handleNextBtn());
    this.getWinnersPage();
  }

  handlePrevBtn(){
    if (this.currentPage === 1) {
      return;
    }
    this.currentPage -= 1;
    this.getWinnersPage();
    this.footer.updatePage(this.currentPage);
  }

  handleNextBtn() {
    this.currentPage += 1;
    this.getWinnersPage();
    this.footer.updatePage(this.currentPage);
  }

  getWinnersPage(sort = "", order = "") {
    const count = this.element.querySelector("#winners-count");
    this.table.cleanTablePlaces();
    const result = getWinners(this.currentPage, 10, sort, order);
    result.then((res) => {
      count.innerHTML = `Total winners: ${res.count}`;
      res.items.forEach(
        (item: {
          time: number;
          wins: number;
          car: { id: number; name: string; color: string };
        }) => this.table.addTablePlace(item)
      );
    });
  }
}

export default WinnersPage;
