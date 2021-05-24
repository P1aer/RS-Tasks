import { BaseComponent } from "./base-component";

export class ScoreBoard extends BaseComponent {
  constructor() {
    super("div", ["scoreboard-container"]);
    this.element.innerHTML = `<h3 class="scoreboard-h3">TOP 10 CHALLENGERS</h3>`;
  }

  //checkDataBase()

  //addChallenger()
}
