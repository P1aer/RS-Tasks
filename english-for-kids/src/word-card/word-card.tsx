import React, { useState } from "react";
import "./word-card.scss";

function Word({ info }:
                  {
                    info:{
                        word:string,
                        translation:string,
                        image:string,
                        audio: string
                  }}):React.ReactElement {
  const [pressed, setPressed] = useState(false);
  const cardStyles = ["card"];
  const sound = new Audio(info.audio);
  if (pressed) {
    cardStyles.push("flipped");
  }
  return (
      <div className={"word-container"}>
          <div className={cardStyles.join(" ")} onMouseLeave={() => setPressed(false)}>
              <div className={"front"}>
                  <img src={info.image} onClick={() => sound.play() }/>
                  <div className="card-bottom">
                      <h3 onClick={() => sound.play() }> {info.word} </h3>
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
