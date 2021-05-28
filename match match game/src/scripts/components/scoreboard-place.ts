import { BaseComponent } from "./base-component";

export class ScoreBoardPlace extends BaseComponent {
  constructor(
    img: string,
    name: string,
    surname: string,
    mail: string,
    score: number
  ) {
    super("div", ["scoreboard-place"]);
    this.element.innerHTML = `
       <div class="profile-container">
         <img src=${img} alt="profile picture">
            <div class="profile-text-container">
                <h4 class="profile-title">${name} ${surname}</h4>
                <h5 class="profile-mail">${mail}</h5>
            </div>
      </div>
       <p class="scoreboard-text">
       Score:
        <span class="scoreboard-score">${score}</span>
        </p>
      `;
  }
}
