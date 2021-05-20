import { Game } from "./components/game";
import { ImageCategory } from "./models/image-category-model";
import globalState from "../shared/services/globalState";
import { Header } from "./components/header";
import { MainContainer } from "./components/main-container";
import { AboutWrapper } from "./components/about-wrapper";

export class App {
  private readonly game: Game;

  private readonly header: Header;

  private readonly main: MainContainer;

  private readonly about: AboutWrapper;

  constructor(private readonly rootElement: HTMLElement) {
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
    this.header.Form.element.addEventListener("submit", () =>
      this.about.deployBtn(this.about.element)
    );
    this.about.playbtn.element.addEventListener("click", () =>
      this.cleanMain()
    );
  }

  buildAboutPage() {
    this.main.element.appendChild(this.about.element);
  }

  cleanMain() {
    this.main.element.innerHTML = "";
    this.start();
  }

  async start() {
    const res = await fetch("../images/images.json");
    const categories: ImageCategory[] = await res.json();
    const cat = categories[0];
    const images = [];
    for (let i = 0; i < globalState.settings.number; i += 1)
      // cat.images.map((name) => `${cat.type}/${name}`);
      images.push(`${cat.type}/${cat.images[i]}`);
    console.log(images);
    this.main.element.appendChild(this.game.element);
    this.game.InitGame(images);
  }
}
