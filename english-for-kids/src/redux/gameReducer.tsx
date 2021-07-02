import { GameStart, GameStop } from "./types";

const initialState = {
  audio: [],
  isPlayed: false,
};
interface Action {
  type: string,
  data?: string[]
}
function gameReducer(state = initialState, action:Action) {
  switch (action.type) {
    case GameStart: return { audio: action.data, isPlayed: true };
    case GameStop: return { initialState };
    default: return state;
  }
}
export default gameReducer;
