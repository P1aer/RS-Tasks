import BaseComponent from "../base-component";
import "./winners.scss";
import WinnersTable from "../winners-table/winners-table";
import { getWinners } from "../../api";
import PageFooter from "../page-footer/page-footer";
import { winnersTable, winnersTableClear } from "../../shared/table-data";

class WinnersPage extends BaseComponent {
  private readonly table: WinnersTable;

  private currentPage = 1;

  private sortType = "";

  private footer: PageFooter;

  constructor() {
    super("div", ["winners-section"]);
    this.table = new WinnersTable();
    this.footer = new PageFooter("winners");
    this.element.innerHTML = `
     <h3 >Total winners: <span id="winners-count"></h3>`;
    this.element.append(this.table.element);
    this.element.append(this.footer.element);
    this.footer.element
      .querySelector(".winners-footer-prev-btn")
      .addEventListener("click", () => this.handlePrevBtn());
    this.footer.element
      .querySelector(".winners-footer-next-btn")
      .addEventListener("click", () => this.handleNextBtn());
    this.getWinnersPage();
    this.table.element
      .querySelector(".table-wins")
      .addEventListener("click", () => this.handleWinsSort());
    this.table.element
      .querySelector(".table-time")
      .addEventListener("click", () => this.handleTimeSort());
  }

  handleTimeSort() {
    if (this.sortType === "TDESC" || !this.sortType) {
      this.sortType = "TASC";
      console.log("sort:", this.sortType)
      this.getWinnersPage("time", "ASC");
    } else {
      this.sortType = "TDESC";
      console.log("sort:", this.sortType);
      this.getWinnersPage("time", "DESC");
    }
  }

  handleWinsSort() {
    if (this.sortType === "WDESC" || !this.sortType) {
      this.sortType = "WASC";
      console.log("sort:", this.sortType)
      this.getWinnersPage("wins", "ASC");
    } else {
      this.sortType = "WDESC";
      console.log("sort:", this.sortType)
      this.getWinnersPage("wins", "DESC");
    }
  }

  handlePrevBtn() {
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
// переход на страницу не сбрасывает сотировку?
  getWinnersPage(sort = "", order = "") {
    const count = this.element.querySelector("#winners-count");
    winnersTableClear();
    const result = getWinners(this.currentPage, 10, sort, order);
    result.then((res) => {
      count.innerHTML = `${res.count}`;
      res.items.forEach(
        (item: {
          time: number;
          wins: number;
          car: { id: number; name: string; color: string };
        }) => this.table.addTablePlace(item)
      );
    });
  }

  updateCounter() {
    this.element.querySelector(
      "#winners-count"
    ).innerHTML = `${winnersTable.length}`;
  }
}

export default WinnersPage;
