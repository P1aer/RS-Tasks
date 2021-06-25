import React, { ReactElement } from "react";
import "./category-card.scss";
import { Link } from "react-router-dom";

interface CardInfo {
    cardInfo: {name: string, id: number, image: string}
}

function Card({ cardInfo }: CardInfo):ReactElement {
  return (<Link to={`/${cardInfo.name}`} className={"category-card"}>
              <img src={cardInfo.image}/>
              <p>{cardInfo.name}</p>
          </Link>
  );
}
export default Card;
