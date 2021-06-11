const globalState: {
  isRace: boolean;
  carsPage: number;
  cars: [{ id?: number; name?: string }];
  carsCount: number;
  winnersPage: number;
  winnersCount: number;
  sortType: string;
  winners: unknown[];
} = {
  isRace: false,
  carsPage: 1,
  cars: [{ id: 5, name: "" }],
  carsCount: 0,
  winnersPage: 1,
  winners: [{}],
  winnersCount: 0,
  sortType: "",
};

export default globalState;
