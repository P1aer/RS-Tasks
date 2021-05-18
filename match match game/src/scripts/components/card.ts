import { BaseComponent } from "./base-component";

const FLIPP_CLASS = "flipped";

export class Card extends BaseComponent {
  constructor(readonly image: string) {
    super("div", ["card-container"]);
    this.element.innerHTML = `
        <div class="card">
           <div class="card-front" style="background-image:url('./images/${image}') "></div>
           <div class="card-back"></div>
        </div>`;
  }

  flipToBack() {
    return this.flip(true);
  }

  flipToFront() {
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.element.classList.toggle(FLIPP_CLASS, !isFront);
      this.element.addEventListener("transitionend", () => resolve(), {
        once: true,
      });
    });
  }
}
