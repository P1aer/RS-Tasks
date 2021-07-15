import React, { useState } from "react";
import "./word-card.scss";
import { connect, ConnectedProps } from "react-redux";
import { rightAnswer, wrongAnswer } from "../redux/actions";

function addToDataTrain(data: string) {
  if (localStorage?.[data]) {
    const current = JSON.parse(localStorage[data]);
    const train = current?.train + 1 || 1;
    localStorage[data] = JSON.stringify({ ...current, train });
  } else {
    localStorage[data] = JSON.stringify({ train: 1 });
  }
}

function addToDataPlay(data: string, right: boolean) {
  if (localStorage?.[data]) {
    const current = JSON.parse(localStorage[data]);
    const play = right ? current?.play + 1 || 1 : current?.mist + 1 || 1;
    localStorage[data] = right ? JSON.stringify({ ...current, play })
      : JSON.stringify({ ...current, mist: play });
  } else {
    localStorage[data] = right ? JSON.stringify({ play: 1 })
      : JSON.stringify({ mist: 1 });
  }
}

function handleState(
  state: boolean,
  pressed:boolean,
  game :{ isPlayed:boolean, audio: string[] },
  word: string,
) {
  const cardStyles = ["card"];
  if (pressed) {
    cardStyles.push("flipped");
  }
  if (state) {
    cardStyles.push("play-mode");
  }
  if (game.isPlayed && !game.audio.includes(word)) {
    cardStyles.push("unactive-card");
  }
  return cardStyles.join(" ");
}

const mapStateToProps = (state:{
    game:{ audio:string[], isPlayed: boolean},
    header:{playBtn:boolean}
}) => ({
  game: state.game,
  toggled: state.header.playBtn,
});
const errorSound = new Audio("audio/error.mp3");
const successSound = new Audio("audio/correct.mp3");
const mapDispatchToProps = {
  Tanswer: rightAnswer,
  Fanswer: wrongAnswer,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux &{
    info:{ word:string, translate:string, image:string, audio: string }
}
function Word({
  info, game, toggled, Tanswer, Fanswer,
}:Props):React.ReactElement {
  const [pressed, setPressed] = useState(false);
  const sound = new Audio(info.audio);

  function Click() {
    const arr = game.audio;
    if (game.isPlayed && arr[arr.length - 1] === info.audio) {
      successSound.play().then(() => {
        Tanswer();
        addToDataPlay(info.word, true);
      });
      if (game.audio.length > 1) { new Audio(`${arr[arr.length - 2]}`).play(); }
    } else if (game.isPlayed && arr[arr.length - 1] !== info.audio && arr.includes(info.audio)) {
      errorSound.play().then(() => {
        addToDataPlay(info.word, false);
        Fanswer();
      });
    }
    if (!toggled) {
      sound.play().then(() => addToDataTrain(info.word));
    }
  }

  return (
      <div className={"word-container"}>
          <div className={handleState(toggled, pressed, game, info.audio)}
               onMouseLeave={() => setPressed(false)}>
              <div className={"front"}>
                  <img src={info.image} onClick={() => Click() }/>
                  <div className="card-bottom">
                      <h3 onClick={() => Click() }> {info.word} </h3>
                      <img onClick={() => setPressed(!pressed)} src="images/translate.png"/>
                  </div>
              </div>
              <div className={"back"} >
                  <img src={info.image}/>
                  <div className="card-bottom">
                       <h3> {info.translate}</h3>
                  </div>
              </div>
          </div>
  </div>);
}

export default connector(Word);
