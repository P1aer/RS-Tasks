import React, { useContext, useState } from "react";
import "./word-card.scss";
import context from "../context";

function handleState(state: {play:boolean}, pressed:boolean) {
  const cardStyles = ["card"];
  if (pressed) {
    cardStyles.push("flipped");
  }
  if (state.play) {
    cardStyles.push("play-mode");
  }
  return cardStyles.join(" ");
}

function handleFrontClick(sound: HTMLAudioElement, state:{play:boolean}) {
  if (!state.play) {
    sound.play();
  }
}

function Word({ info }: {
    info:{ word:string, translation:string, image:string, audio: string }}):React.ReactElement {
  const [pressed, setPressed] = useState(false);
  const { state } = useContext(context);
  const sound = new Audio(info.audio);
  return (
      <div className={"word-container"}>
          <div className={handleState(state, pressed)} onMouseLeave={() => setPressed(false)}>
              <div className={"front"}>
                  <img src={info.image} onClick={() => handleFrontClick(sound, state) }/>
                  <div className="card-bottom">
                      <h3 onClick={() => handleFrontClick(sound, state) }> {info.word} </h3>
                      <img onClick={() => setPressed(!pressed)} src="images/translate.png"/>
                  </div>
              </div>
              <div className={"back"} >
                  <img src={info.image}/>
                  <div className="card-bottom">
                       <h3> {info.translation}</h3>
                  </div>
              </div>
          </div>
  </div>);
}

export default Word;
