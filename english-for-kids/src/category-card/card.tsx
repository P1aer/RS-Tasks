import React, { ReactElement } from "react";
import "./category-card.scss";

interface CardInfo {
    cardInfo: {name: string, id: number, image: string}
}

function Card({ cardInfo }: CardInfo):ReactElement {
  return (<div className={"category-card"}>
          <img src={cardInfo.image}/>
           <p>{cardInfo.name}</p>
          </div>
  );
}
export default Card;
