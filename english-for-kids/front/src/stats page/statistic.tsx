import React, { useState } from "react";
import "./statistic.scss";
import { useSelector } from "react-redux";
import WordsTable from "../Small table/small-table";
import Cards from "../cards-field/cards";

type WordType = {
    word:string,
    translate:string,
    image:string,
    audio: string
}

function defineHard(words: [][]):WordType[] {
  const all: {word: string, mist: number}[] = [];
  const keys = Object.keys(localStorage);
  if (keys.length === 0) {
    return [];
  }
  for (let i = 0; i < keys.length; i += 1) {
    if (JSON.parse(localStorage[keys[i]])?.mist) {
      all.push({ word: keys[i], mist: JSON.parse(localStorage[keys[i]]).mist });
    }
  }
  let answer:{word: string, mist: number}[];
  if (all.length > 8) {
    all.sort((a, b) => {
      if (a.mist < b.mist) {
        return 1;
      }
      if (a.mist > b.mist) {
        return -1;
      }
      return 0;
    });
    answer = all.slice(0, 8);
  } else answer = [...all];
  const flatWords:WordType[] = words.flat(1);
  const result:WordType[] = [];
  answer.forEach((elem) => {
    const temp = flatWords.find((item) => item.word === elem.word);
    if (temp) {
      result.push(temp);
    }
  });
  return result;
}

function Stats():React.ReactElement {
  const words = useSelector(((state:{data: {words:{key:[]}}}) => state.data.words));
  const keys = Object.keys(words);
  const [sort, setStore] = useState({ dir: false, type: "mist" });
  const [hard, setHard] = useState(false);
  function clickSort(type:string) {
    setStore({ dir: !sort.dir, type });
  }
  if (hard) {
    return (<Cards cards={defineHard(Object.values(words))}/>);
  }
  return (<div className={"statistic-container"}>
       <div className={"statistic-btns"}>
           <button onClick={() => {
             localStorage.clear();
             window.location.reload();
           }} className={"stats-btn"}>Reset</button>
           <button onClick={() => setHard(true)} className={"stats-btn"}>Repeat hard words</button>
       </div>
      <div className={"table-names"}>
          <div onClick={() => clickSort("word")} className={"elem-word-wrapper"}>
              <h4>Categories / Words</h4>
          </div>
          <div onClick={() => clickSort("train")} className={"elem-wrapper"}>
              <h4>Train</h4>
          </div>
          <div onClick={() => clickSort("play")} className={"elem-wrapper"}>
              <h4>Play</h4>
          </div>
          <div onClick={() => clickSort("mist")} className={"elem-wrapper"}>
              <h4>Mistakes</h4>
          </div>
          <div onClick={() => clickSort("percent")} className={"elem-wrapper"}>
              <h4>% Mistakes</h4>
          </div>
      </div>
      <div className={"table"}>
          {
              keys.map((key) => <WordsTable key={key}
                                         data={Object.values(words)[keys.indexOf(key)]}
                                            sort={ sort}
                                         name={key}/>)}
      </div>
   </div>);
}
export default Stats;
