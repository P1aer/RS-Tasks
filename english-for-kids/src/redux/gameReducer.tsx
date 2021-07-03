import {
  GameStart, GameStop, RightAnswer, WrongAnswer,
} from "./types";

const initialState = {
  audio: [],
  isPlayed: false,
  answers: [],
};
interface Action {
  type: string,
  data?: string[]
}
function gameReducer(state = initialState, action:Action) {
  switch (action.type) {
    case GameStart: return { answers: [], audio: action.data, isPlayed: true };
    case GameStop: return initialState;
    case RightAnswer: return {
      ...state,
      answers: [true, ...state.answers],
      audio: state.audio.slice(0, state.audio.length - 1),
    };
    case WrongAnswer: return { ...state, answers: [false, ...state.answers] };
    default: return state;
  }
}
export default gameReducer;
