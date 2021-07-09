import {
  FetchCards, FetchCardsComplete, FetchWords, FetchWordsComplete,
} from "./types";

const initialState = {
  words: {},
  cards: [],
  wordsFetch: false,
  cardsFetch: false,
};
type Action = {
    type: string
    cards?:{name:string, image: string, id: number}[]
    words?: JSON,
}
type State = {
    words: JSON,
    cards: []
    wordsFetch: boolean,
    cardsFetch: boolean,
}
function wordReducer(state = initialState, action:Action):State {
  switch (action.type) {
    case FetchWords: return { ...state, words: action.words, wordsFetch: true } as State;
    case FetchCards: return { ...state, cards: action.cards, cardsFetch: true } as State;
    case FetchCardsComplete: return { ...state, cardsFetch: false } as State;
    case FetchWordsComplete: return { ...state, wordsFetch: false } as State;

    default: return state as State;
  }
}
export default wordReducer;
