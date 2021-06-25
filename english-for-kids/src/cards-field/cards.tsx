import React from "react";
import { useParams } from "react-router-dom";
import Word from "../word-card/word-card";
import allWords from "./words.json";

interface WordType{
    word:string,
    translation:string,
    image:string,
    audio: string
}

function Cards():React.ReactElement {
  const { cardSet } = useParams<{ cardSet:string }>();
  // мега костыль -> перепиши меня мудила
  const res = JSON.stringify(allWords);
  const words = JSON.parse(res)[`${cardSet}`];
  return (<div className={"category-container"}>
      { words.map((word:WordType) => <Word info={word} key={words.indexOf(word)}/>)}
         </div>);
}
export default Cards;
