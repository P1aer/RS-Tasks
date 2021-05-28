import { Game } from "./components/game";
import { ImageCategory } from "./models/image-category-model";
import globalState from "../shared/services/globalState";
import { Header } from "./components/header";
import { MainContainer } from "./components/main-container";
import { AboutWrapper } from "./components/about-wrapper";
import { Settings } from "./components/settings";
import { ScoreBoard } from "./components/score-board";
import { ScoreBoardPlace } from "./components/scoreboard-place";

export class App {
  private readonly userData = {
    name: "",
    surname: "",
    mail: "",
    img: "",
    score: 0,
  };

  private readonly game: Game;

  private readonly header: Header;

  private readonly main: MainContainer;

  private readonly about: AboutWrapper;

  private readonly settings: Settings;

  private readonly score: ScoreBoard;

  private request: IDBOpenDBRequest;

  constructor(rootElement: HTMLElement) {
    this.score = new ScoreBoard();
    this.settings = new Settings();
    this.about = new AboutWrapper();
    this.main = new MainContainer();
    this.game = new Game();
    this.header = new Header();
    this.request = indexedDB.open("P1aer", 1);
    rootElement.appendChild(this.header.element);
    this.header.createHeader();
    rootElement.appendChild(this.main.element);
  }

  addProfile = () => {
    const transaction = this.request.result.transaction(
      "profiles",
      "readwrite"
    );
    const store = transaction.objectStore("profiles");
    // Define a person
    const person = {
      score: this.userData.score,
      name: this.userData.name,
      email: this.userData.mail,
      surname: this.userData.surname,
      img: this.userData.img,
      created: new Date(),
    };

    // Perform the add
    const request = store.add(person);

    request.onerror = function () {
      console.log("add Error");
    };

    request.onsuccess = function () {
      console.log("Woot! Did it");
    };
  };

  getTopScores = () => {
    const transaction = this.request.result.transaction("profiles");
    const profiles = transaction.objectStore("profiles");

    const request = profiles.openCursor();

    const all = [];

    const comparer = (a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 0;
    };

    request.onsuccess = () => {
      const cursor = request.result;
      if (cursor) {
        all.push(cursor.value);
        cursor.continue();
      } else {
        console.log(all.sort(comparer));
        this.updateBestPlaces(all.sort(comparer));
      }
    };
  };

  updateBestPlaces(arr) {
    this.score.cleanScoreBoard();
    const data = arr;
    console.log(data.length);
    for (let i = 0; i < 10; i += 1) {
      if (data.length === i) {
        break;
      }
      const challenger = new ScoreBoardPlace(
        data[i].img,
        data[i].name,
        data[i].surname,
        data[i].email,
        data[i].score
      );
      this.score.addChallenger(challenger);
    }
  }

  buildFirstPage() {
    this.request.onupgradeneeded = function () {
      const DB = this.result;
      if (!DB.objectStoreNames.contains("profiles")) {
        // если хранилище не существует
        console.log("database created");
        DB.createObjectStore("profiles", { autoIncrement: true }); // создаем хранилище
      }
    };
    this.request.onsuccess = () => {
      console.log("success");
      this.getTopScores();
    };

    this.request.onerror = function () {
      console.log("error");
    };
    this.buildAboutPage();
    this.settings.initInputs();
    this.header.Form.element.addEventListener("submit", this.defineProfile);
    this.header.Form.element.addEventListener("submit", () =>
      this.about.deployBtn(this.about.element)
    );
    this.about.playbtn.element.addEventListener("click", () =>
      this.startGame()
    );
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
    this.userData.score = this.game.Score;
    this.addProfile();
    this.getTopScores();
    this.buildScorePage();
    this.game.ResultForm.element.remove();
  }

  defineProfile = () => {
    this.userData.img = (<HTMLImageElement>(
      document.getElementById("preview")
    )).src;
    this.userData.name = (<HTMLInputElement>(
      document.getElementById("fname")
    )).value;
    this.userData.surname = (<HTMLInputElement>(
      document.getElementById("fsur")
    )).value;
    this.userData.mail = (<HTMLInputElement>(
      document.getElementById("fmail")
    )).value;
    this.header.Form.element.remove();
  };

  async startGame() {
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
