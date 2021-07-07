import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import headerReducer from "./headerReducer";
import wordReducer from "./wordReducer";

const rootReducer = combineReducers({
  game: gameReducer,
  header: headerReducer,
  data: wordReducer,
});
export default rootReducer;
