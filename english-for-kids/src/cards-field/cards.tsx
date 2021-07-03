import React from "react";
import { useParams } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import Word from "../word-card/word-card";
import allWords from "./words.json";
import "./cards.scss";
import { startGame } from "../redux/actions";

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

const connector = connect(mapStateToProps, { startGame });
type PropsFromRedux = ConnectedProps<typeof connector>

function Cards(props:PropsFromRedux):React.ReactElement {
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
