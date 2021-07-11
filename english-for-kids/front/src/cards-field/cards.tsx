import React from "react";
import { useHistory } from "react-router-dom";
import {
  connect, ConnectedProps, useDispatch,
} from "react-redux";
import Word from "../word-card/word-card";
import "./cards.scss";
import { changeCategory, startGame as Start, stopGame as Stop } from "../redux/actions";

type WordType = {
    word:string,
    translation:string,
    image:string,
    audio: string
}

function shuffle(arr: string[] | undefined) {
  let shuffled: string[] = [];
  if (arr) {
    shuffled = [...arr];
    let j; let
      temp;
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = shuffled[j];
      shuffled[j] = shuffled[i];
      shuffled[i] = temp;
    }
  }
  return shuffled;
}
const mapStateToProps = (state:{
    game:{ audio:string[], isPlayed: boolean, answers: boolean[]},
    header:{playBtn:boolean},
    data: {words:{key:WordType[]}, wordsFetch:boolean, currentCard:string | undefined}
}) => ({
  game: state.game,
  toggled: state.header.playBtn,
  score: state.game.answers,
  words: state.data.words,
  cardSet: state.data.currentCard,
});
function handleEndGame(score: boolean[], stop:()=>{type:string}):React.ReactElement {
  const dispatch = useDispatch();
  let mistakes = 0;
  const history = useHistory();
  score.forEach((ans) => {
    if (!ans) {
      mistakes += 1;
    }
  });
  const sound = !mistakes ? new Audio("audio/success.mp3") : new Audio("audio/failure.mp3");
  sound.play();
  setTimeout(() => setTimeout(() => {
    history.push("/");
    stop();
    dispatch(changeCategory("main"));
  }, 3000));
  const element = <div className={"end-screen"}>
      <h3 className={"end-screen-h3"}>{!mistakes ? "Congrats!" : `Sorry, but you have mistakes: ${mistakes} `}</h3>
      <img src={!mistakes ? "images/success.jpg" : "images/failure.jpg"} alt="End"/>
  </div>;
  return (element);
}
const connector = connect(mapStateToProps, { startGame: Start, stopGame: Stop });
type PropsFromRedux = ConnectedProps<typeof connector> & {
    cards?: WordType[] | undefined
}

function Cards({
  game, score, cards = undefined, toggled, words, startGame, stopGame, cardSet,
}:PropsFromRedux):React.ReactElement {
  if (game.isPlayed && game.audio.length === 0) {
    return handleEndGame(score, stopGame);
  }
  const btnClass = ["start-btn"];
  if (!toggled) {
    btnClass.push("not-started");
  }
  if (game.isPlayed) {
    btnClass.push("repeat");
  }
  const style = {
    backgroundImage: "url(images/replay.png),linear-gradient(40deg, #ffd86f, #fc6262)",
  };
  const wordTypes:WordType[] = cards || words?.[cardSet as keyof {key: WordType[]}] || [];
  function handleClick() {
    if (!game.isPlayed) {
      startGame(shuffle(wordTypes.map((elem:WordType) => elem.word)));
    } else {
      new Audio(`audio/${game.audio[game.audio.length - 1]}.mp3`).play();
    }
  }
  const keys = [];
  for (let i = 0; i < score.length; i += 1) {
    keys.push(i);
  }
  return (<div className={"category-container"}>
      <div className={"score-board"}>
          {keys.map((key) => <div key={key}
              style={score[key] ? { backgroundImage: "url(images/right.png)" }
                : { backgroundImage: "url(images/wrong.png)" }}
              className={"answer-card"}/>) }
      </div>
      { wordTypes.map((word:WordType) => <Word info={word} key={wordTypes.indexOf(word)}/>)}
            <div className={"start-btn-container"}>
                <button onClick={() => handleClick()}
                        style={game.isPlayed ? style : {}} className={btnClass.join(" ")}>Start Game</button>
             </div>
         </div>);
}
export default connector(Cards);
