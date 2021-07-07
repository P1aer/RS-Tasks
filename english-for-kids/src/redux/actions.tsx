import { Action, AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  ChangeMenu,
  ExitMenu,
  FetchCards,
  FetchCardsComplete,
  FetchWords,
  FetchWordsComplete,
  GameStart,
  GameStop,
  RightAnswer,
  Toggle,
  WrongAnswer,
} from "./types";

type SimpleFunc = {
  type: string;
}
type DataFunc = {
   type: string
  data:string[]
}

export function changeMenu():SimpleFunc {
  return {
    type: ChangeMenu,
  };
}
export function exitMenu(): SimpleFunc {
  return {
    type: ExitMenu,
  };
}
export function toggle():SimpleFunc {
  return {
    type: Toggle,
  };
}
export function startGame(audio:string[]):DataFunc {
  new Audio(`audio/${audio[audio.length - 1]}.mp3`).play();
  return {
    type: GameStart,
    data: audio,
  };
}
export function stopGame():SimpleFunc {
  return {
    type: GameStop,
  };
}
export function rightAnswer(): SimpleFunc {
  return {
    type: RightAnswer,
  };
}
export function wrongAnswer(): SimpleFunc {
  return {
    type: WrongAnswer,
  };
}
 type ThunkAction<
    R, // Return type of the thunk function
    S, // state type used by getState
    E, // any "extra argument" injected into the thunk
    A extends Action // known types of actions that can be dispatched
    > = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R

export function fetchWords():ThunkAction<void, {word: unknown, cards: []}, unknown, AnyAction> {
  return async (dispatch) => {
    const result = await fetch("words.json");
    const words = await result.json();
    dispatch({ type: FetchWords, words });
  };
}

export function fetchCards():ThunkAction<void, {word: unknown, cards: []}, unknown, AnyAction> {
  return async (dispatch) => {
    const result = await fetch("cards.json");
    const cardsObj = await result.json();
    const { cards } = cardsObj;
    dispatch({ type: FetchCards, cards });
  };
}

export function fetchCardsComplete(): SimpleFunc {
  return {
    type: FetchCardsComplete,
  };
}
export function fetchWordsComplete():SimpleFunc {
  return {
    type: FetchWordsComplete,
  };
}
