import {
  ChangeCategory,
  FetchCards, FetchCardsComplete, FetchWords, FetchWordsComplete,
} from "./types";

type Action = {
    type: string
    cards?:{name:string, image: string, id: number}[]
    words: Record<string, unknown>,
    name?: string
}
type State = {
    words: Record<string, unknown>,
    cards: {name:string, image: string}[]
    wordsFetch: boolean,
    cardsFetch: boolean,
    currentCard:string | undefined
}
const initialState: State = {
  words: {},
  cards: [],
  wordsFetch: false,
  cardsFetch: false,
  currentCard: undefined,
};

function wordReducer(state = initialState, action:Action):State {
  switch (action.type) {
    case FetchWords: return { ...state, words: action.words, wordsFetch: true };
    case FetchCards:
      return {
        ...state,
        cards: action.cards,
        cardsFetch: true,
        currentCard: (localStorage.getItem("path") ? JSON.parse(localStorage.path).name
          : undefined) || state.cards[0]?.name,
      } as unknown as State;
    case FetchCardsComplete: return { ...state, cardsFetch: false };
    case FetchWordsComplete: return { ...state, wordsFetch: false };
    case ChangeCategory: return { ...state, currentCard: action.name };

    default: return state;
  }
}
export default wordReducer;
