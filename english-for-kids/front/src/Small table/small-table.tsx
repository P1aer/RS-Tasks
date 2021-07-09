import React from "react";
import "./small-table.scss";

type Props = {
   data: {word:string, translation: string}[],
   name: string
    sort: { dir: boolean; type: string; }
}
window.addEventListener("storage", () => window.location.reload());

function WordsTable({ data, name, sort } :Props):React.ReactElement {
  const words = data.map((key) => {
    const train = localStorage?.[key.word] ? JSON.parse(localStorage[key.word]).train || 0 : 0;
    const play = localStorage?.[key.word] ? JSON.parse(localStorage[key.word]).play || 0 : 0;
    const mist = localStorage?.[key.word] ? JSON.parse(localStorage[key.word]).mist || 0 : 0;
    return {
      word: key.word,
      translation: key.translation,
      train,
      play,
      mist,
      percent: ((mist / (mist + play)) * 100 || 0).toFixed(1),
    };
  });
  function sortData() {
    return words.sort((a, b) => {
      const right = sort.dir ? 1 : -1;
      const wrong = sort.dir ? -1 : 1;
      switch (sort.type) {
        case "train":
          if (a.train > b.train) {
            return right;
          }
          if (b.train > a.train) {
            return wrong;
          }
          return 0;
        case "play":
          if (a.play > b.play) {
            return right;
          }
          if (b.play > a.play) {
            return wrong;
          }
          return 0;
        case "mist":
          if (a.mist > b.mist) {
            return right;
          }
          if (b.mist > a.mist) {
            return wrong;
          }
          return 0;
        case "percent":
          if (a.percent > b.percent) {
            return right;
          }
          if (b.percent > a.percent) {
            return wrong;
          }
          return 0;
        default: if (a.word > b.word) {
          return right;
        }
          if (b.word > a.word) {
            return wrong;
          }
          return 0;
      }
    });
  }

  const sorted = sortData();
  return (<div className={"small-table"}>
    <div className={"table-name"}>
      <h3>{name}</h3>
    </div>
    { sorted.map((key) => <div className={"table-body"}
             key={key.word}>
            <h3 className={"table-elem-word"}>{key.word} </h3>
            <h3 className={"table-elem"}>{key.train}</h3>
            <h3 className={"table-elem"}>{key.play}</h3>
            <h3 className={"table-elem"}>{key.mist}</h3>
            <h3 className={"table-elem"}>{key.percent}</h3>
        </div>) }
  </div>);
}

export default WordsTable;
