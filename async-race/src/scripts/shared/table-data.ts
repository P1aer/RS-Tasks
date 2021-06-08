import GaragePlace from "../components/garage-place/garage-place";
import WinnersPlace from "../components/winners-place/winners-place";

export const garageTable: GaragePlace[] = [];
export const winnersTable: WinnersPlace[] = [];

export const garageTableClear = () => {
  garageTable.forEach((item) => item.element.remove());
  garageTable.splice(0, garageTable.length);
};

export const garageTableCheck = () => {
  const arr = garageTable.filter((item) => item.ID !== 0);
  if (garageTable.length !== arr.length) {
    garageTable.splice(0, garageTable.length, ...arr);
  }
};

export const winnersTableClear = () => {
  winnersTable.forEach((item) => item.element.remove());
  winnersTable.splice(0, garageTable.length);
}

export const winnersDelete = (id: number) => {
  const index = winnersTable.findIndex(
    (item: WinnersPlace) => item.number === id
  );
  console.log(index);
  if (typeof index !== "undefined") {
    winnersTable[index].element.remove();
    winnersTable.splice(index, 1);
  }
}