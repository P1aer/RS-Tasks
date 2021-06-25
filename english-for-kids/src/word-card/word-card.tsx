import React from "react";
import "./word-card.scss";

function Word({ info }:
                  {
                    info:{
                        word:string,
                        translation:string,
                        image:string,
                        audio: string
                  }}):React.ReactElement {
  return (
      <div className={"word-container"}>
          <div className={"card"}>
              <div className={"word-front"}>
                  <img src={info.image}/>
                  <div className="card-bottom">
                      <h3> {info.word} </h3>
                      <img src="images/translate.png"/>
                  </div>
              </div>
              <div className={"word-translated"}>
              </div>
          </div>
  </div>);
}

export default Word;
