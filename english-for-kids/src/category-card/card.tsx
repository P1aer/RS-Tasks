import React, { ReactElement } from "react";
import "./category-card.scss";
import { Link } from "react-router-dom";
import context from "../context";

interface CardInfo {
    cardInfo: {name: string, id: number, image: string}
}

function Card({ cardInfo }: CardInfo):ReactElement {
  const { state } = React.useContext(context);
  const classes = ["category-card"];
  if (state.play) {
    classes.push("orange-card");
  }
  return (<Link to={`/${cardInfo.name}`} className={classes.join(" ")}>
              <img src={cardInfo.image}/>
              <p>{cardInfo.name}</p>
          </Link>
  );
}
export default Card;
