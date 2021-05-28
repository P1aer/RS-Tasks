import { BaseComponent } from "./base-component";
import { ScoreBoardPlace } from "./scoreboard-place";

export class ScoreBoard extends BaseComponent {

  private places:ScoreBoardPlace[]

  constructor() {
    super("div", ["scoreboard-container"]);
    this.places = [];
    this.element.innerHTML = `<h3 class="scoreboard-h3">TOP 10 CHALLENGERS</h3>`;
  }

  addChallenger(place: ScoreBoardPlace) {
    this.places.push(place);
    this.element.append(place.element);
    console.log(place.element);
  }

  cleanScoreBoard() {
    this.places.forEach((place) => place.element.remove())
    this.places = [];
  }
}
