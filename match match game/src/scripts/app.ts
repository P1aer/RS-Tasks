import { Game } from "./components/game";
import { ImageCategory } from "./models/image-category-model";
import globalState from "../shared/services/globalState";
import { Header } from "./components/header";
import { MainContainer } from "./components/main-container";
import { AboutWrapper } from "./components/about-wrapper";
import { Settings } from "./components/settings";
import { ScoreBoard } from "./components/score-board";

export class App {
  private readonly game: Game;

  private readonly header: Header;

  private readonly main: MainContainer;

  private readonly about: AboutWrapper;

  private readonly settings: Settings;

  private readonly score: ScoreBoard;

  constructor(private readonly rootElement: HTMLElement) {
    this.score = new ScoreBoard();
    this.settings = new Settings();
    this.about = new AboutWrapper();
    this.main = new MainContainer();
    this.game = new Game();
    this.header = new Header();
    this.rootElement.appendChild(this.header.element);
    this.header.createHeader();
    this.rootElement.appendChild(this.main.element);
  }

  buildFirstPage() {
    this.buildAboutPage();
    this.settings.initInputs();
    this.header.Form.element.addEventListener("submit", () =>
      this.about.deployBtn(this.about.element)
    );
    this.about.deployBtn(this.about.element);
    this.about.playbtn.element.addEventListener("click", () => this.start());
    this.header.Container.nav.list.About.element.addEventListener("click", () =>
      this.buildAboutPage()
    );
    this.header.Container.nav.list.Settings.element.addEventListener(
      "click",
      () => this.buildSettingsPage()
    );
    this.header.Container.nav.list.Best.element.addEventListener("click", () =>
      this.buildScorePage()
    );
    this.game.ResultForm.container.Btns[0].element.addEventListener(
      "click",
      () => this.handleEndGame()
    );
  }

  buildScorePage() {
    this.cleanMain();
    this.main.element.appendChild(this.score.element);
    this.header.Container.nav.list.goToPage("best");
  }

  buildSettingsPage() {
    this.cleanMain();
    this.main.element.appendChild(this.settings.element);
    this.header.Container.nav.list.goToPage("settings");
  }

  buildAboutPage() {
    this.cleanMain();
    this.main.element.appendChild(this.about.element);
    this.header.Container.nav.list.goToPage("about");
  }

  cleanMain() {
    this.main.element.innerHTML = "";
  }

  handleEndGame() {
    this.buildScorePage();
    this.game.ResultForm.element.remove();
  }

  async start() {
    this.cleanMain();
    const res = await fetch("../images/images.json");
    const categories: ImageCategory[] = await res.json();
    const cat = categories[globalState.settings.type];
    const images = [];
    for (let i = 0; i < globalState.settings.number; i += 1)
      images.push(`${cat.type}/${cat.images[i]}`);
    this.main.element.appendChild(this.game.element);
    this.game.InitGame(images);
  }
}
