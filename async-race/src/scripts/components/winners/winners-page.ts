import BaseComponent from "../base-component";
import "./winners.scss";
import WinnersTable from "../winners-table/winners-table";
import { getWinners } from "../../api";
import PageFooter from "../page-footer/page-footer";
import globalState from "../../shared/table-data";

class WinnersPage extends BaseComponent {
  private readonly table: WinnersTable;

  private footer: PageFooter;

  get Table() {
    return this.table;
  }

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
    if (globalState.sortType === "TDESC" || !globalState.sortType) {
      globalState.sortType = "TASC";
    } else {
      globalState.sortType = "TDESC";
    }
    this.getWinnersPage();
  }

  handleWinsSort() {
    if (globalState.sortType === "WDESC" || !globalState.sortType) {
      globalState.sortType = "WASC";
    } else {
      globalState.sortType = "WDESC";
    }
    this.getWinnersPage();
  }

  handlePrevBtn() {
    if (globalState.winnersPage === 1) {
      return;
    }
    globalState.winnersPage -= 1;
    this.getWinnersPage();
    this.footer.updatePage(globalState.winnersPage);
  }

  handleNextBtn() {
    globalState.winnersPage += 1;
    this.getWinnersPage();
    this.footer.updatePage(globalState.winnersPage);
  }

  async getWinnersPage() {
    const counter = this.element.querySelector("#winners-count");
    const sort = globalState.sortType[0] === "W" ? "wins" : "time";
    const order = globalState.sortType[1] === "A" ? "ASC" : "DESC";
    const { items, count } = await getWinners(
      globalState.winnersPage,
      10,
      sort,
      order
    );
    counter.innerHTML = `${count}`;
    globalState.winnersCount = Number(count);
    globalState.winners = items;
    this.table.getFullPage();
  }

  updateCounter() {
    this.element.querySelector(
      "#winners-count"
    ).innerHTML = `${globalState.winnersCount}`;
  }
}

export default WinnersPage;
