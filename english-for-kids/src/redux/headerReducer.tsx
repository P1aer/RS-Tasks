import { ChangeMenu, ExitMenu, Toggle } from "./types";

const initialState = {
  menu: false,
  playBtn: false,
};
interface Action {
  type: string,
}

function headerReducer(state = initialState, action:Action) {
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
