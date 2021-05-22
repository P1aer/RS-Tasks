import { BaseComponent } from "./base-component";
import globalState from "../../shared/services/globalState";

export class Timer extends BaseComponent {
  constructor() {
    super("h3", ["timer"]);
  }

  setShowTimer() {
    this.element.innerHTML = ` 0 : ${globalState.settings.SHOW_TIME}`;
    let from = new Date().getTime() + globalState.settings.SHOW_TIME * 1000;
    const countdownfunc = setInterval(() => {
      const now = new Date().getTime();
      const distance = Math.abs(from - now);
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.round((distance % (1000 * 60)) / 1000);
      this.element.innerHTML = `${minutes} : ${seconds}`;
      if (distance <= 0) {
        from = new Date().getTime();
      }
      if (distance >= globalState.settings.time * 1000) {
        clearInterval(countdownfunc);
      }
    }, 1000);
  }
}
