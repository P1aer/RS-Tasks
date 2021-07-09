import { ChangeMenu, ExitMenu, Toggle } from "./types";

const initialState = {
  menu: false,
  playBtn: false,
};
interface Action {
  type: string,
}
type State = {
  menu: boolean,
  playBtn: boolean,
}

function headerReducer(state = initialState, action:Action): State {
  switch (action.type) {
    case ChangeMenu:
      return { ...state, menu: !state.menu };
    case ExitMenu:
      return { ...state, menu: false };
    case Toggle:
      return { ...state, playBtn: !state.playBtn };
    default: return state;
  }
}
export default headerReducer;
