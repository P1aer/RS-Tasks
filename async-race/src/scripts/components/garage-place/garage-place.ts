import BaseComponent from "../base-component";
import "./garage-place.scss";

class GaragePlace extends BaseComponent {
  private readonly placeID: number;

  get ID() {
    return this.placeID;
  }

  constructor(car: { id: number; color: string; name: string }) {
    super("div", ["garage-place"]);
    this.placeID = car.id;
    this.element.innerHTML = `
      <div class="place-info">
       <div class="place-inputs">
          <button class="place-select">select</button>
          <button class="place-remove">select</button>
          <h3 class="place-name">${car.name}</h3>
        </div>
          <div class="place-car">
                <div class="place-car-btns">
                   <button class="place-start">Start</button>
                  <button class="place-break">Break</button>
                </div>
                <div class="place-car-container">
                </div>
           </div>
      </div>
      <div class="flag-container">  
    </div>
    `;
  }
}

export default GaragePlace;
