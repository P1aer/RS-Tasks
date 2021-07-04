import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import Word from "../word-card/word-card";
import allWords from "./words.json";
import "./cards.scss";
import { startGame, stopGame } from "../redux/actions";

type WordType = {
    word:string,
    translation:string,
    image:string,
    audio: string
}

function shuffle(arr: []) {
  const shuffled = [...arr];
  let j; let
    temp;
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = shuffled[j];
    shuffled[j] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled;
}
const mapStateToProps = (state:{
    game:{ audio:string[], isPlayed: boolean, answers: boolean[]},
    header:{playBtn:boolean}
}) => ({
  game: state.game,
  toggled: state.header.playBtn,
  score: state.game.answers,
});
function handleEndGame(score: boolean[], stop:()=>{type:string}):React.ReactElement {
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
  }, 3000));
  const element = <div className={"end-screen"}>
                        <h3 className={"end-screen-h3"}>{!mistakes ? "Congrats!" : `Sorry, but you have mistakes: ${mistakes} `}</h3>
                        <img src={!mistakes ? "images/success.jpg" : "images/failure.jpg"} alt="End"/>
                  </div>;
  return (element);
}
const connector = connect(mapStateToProps, { startGame, stopGame });
type PropsFromRedux = ConnectedProps<typeof connector>

function Cards(props:PropsFromRedux):React.ReactElement {
  if (props.game.isPlayed && props.game.audio.length === 0) {
    return handleEndGame(props.score, props.stopGame);
  }
  const btnClass = ["start-btn"];
  if (!props.toggled) {
    btnClass.push("not-started");
  }
  if (props.game.isPlayed) {
    btnClass.push("repeat");
  }
  const style = {
    backgroundImage: "url(images/replay.png),linear-gradient(40deg, #ffd86f, #fc6262)",
  };
  const { cardSet } = useParams<{ cardSet:string }>();
  const res = JSON.stringify(allWords); // мега костыль -> перепиши меня мудила
  const words = JSON.parse(res)[`${cardSet}`];
  const names = words.map((word:WordType) => word.word);
  function handleClick() {
    if (!props.game.isPlayed) {
      props.startGame(shuffle(names));
    } else {
      new Audio(`audio/${props.game.audio[props.game.audio.length - 1]}.mp3`).play();
    }
  }
  const keys = [];
  for (let i = 0; i < props.score.length; i += 1) {
    keys.push(i);
  }
  return (<div className={"category-container"}>
      <div className={"score-board"}>
          {
              keys.map((key) => <div key={key}
              style={props.score[key] ? { backgroundImage: "url(images/right.png)" } : { backgroundImage: "url(images/wrong.png)" }}
              className={"answer-card"}/>) }
      </div>
      { words.map((word:WordType) => <Word info={word} key={words.indexOf(word)}/>)}
            <div className={"start-btn-container"}>
                <button onClick={() => handleClick()} style={props.game.isPlayed ? style : {}} className={btnClass.join(" ")}>Start Game</button>
             </div>
         </div>);
}
export default connector(Cards);
