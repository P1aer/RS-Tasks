import BaseComponent from "./base-component";
import Timer from "./timer";

class TimerContainer extends BaseComponent {
  readonly timer: Timer;

  constructor() {
    super("div", ["card-timer"]);
    this.timer = new Timer();
    this.element.appendChild(this.timer.element);
  }
}

export default TimerContainer;
