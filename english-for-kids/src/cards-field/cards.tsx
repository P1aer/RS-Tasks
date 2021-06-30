import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Word from "../word-card/word-card";
import allWords from "./words.json";
import "./cards.scss";
import context from "../context";

interface WordType{
    word:string,
    translation:string,
    image:string,
    audio: string
}

function Cards():React.ReactElement {
  const { cardSet } = useParams<{ cardSet:string }>();
  const { state } = useContext(context);
  const btnClass = ["start-btn"];
  if (!state.play) {
    btnClass.push("not-started");
  }
  // мега костыль -> перепиши меня мудила
  const res = JSON.stringify(allWords);
  const words = JSON.parse(res)[`${cardSet}`];
  return (<div className={"category-container"}>
      { words.map((word:WordType) => <Word info={word} key={words.indexOf(word)}/>)}
          <div className={"start-btn-container"}>
              <button className={btnClass.join(" ")}>Start Game</button>
          </div>
         </div>);
}
export default Cards;
