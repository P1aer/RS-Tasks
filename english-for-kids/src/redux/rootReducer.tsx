import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import headerReducer from "./headerReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  header: headerReducer,
});
export default rootReducer;
