import React, { ReactElement } from "react";
import "./category-card.scss";

function Card({ cardInfo }: {cardInfo: {name: string, id: number, image: string}}):ReactElement {
  return (<div className={"category-card"}>
           <p>{cardInfo.name}</p>
           <p>{cardInfo.image}</p>
          </div>
  );
}
export default Card;
