import React, { ReactElement } from "react";
import "./categories-container.scss";
import Card from "../category-card/card";

const cards = [
  { name: "card1", image: "path", id: 1 },
  { name: "card2", image: "path", id: 2 },
  { name: "card3", image: "path", id: 3 },
  { name: "card4", image: "path", id: 4 },
  { name: "card5", image: "path", id: 5 },
  { name: "card6", image: "path", id: 6 },
  { name: "card7", image: "path", id: 7 },
  { name: "card8", image: "path", id: 8 },
];

export default function CategoryContainer(): ReactElement {
  return (<div className={"category-container"}>
          {
              cards.map((card) => <Card cardInfo={card} key={card.id}/>)
          }
          </div>
  );
}
