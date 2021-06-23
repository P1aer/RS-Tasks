import React from "react";
import "./categories-container.scss";
import Card from "../category-card/card";

const cards = [
  { name: "Actions 1", image: "images/action1.jpg", id: 1 },
  { name: "Actions 2", image: "images/action2.jpg", id: 2 },
  { name: "Animals 1", image: "images/animals1.jpg", id: 3 },
  { name: "Animals 2", image: "images/animals2.png", id: 4 },
  { name: "Clothes", image: "images/clothes.jpg", id: 5 },
  { name: "Emotions", image: "images/emotions.jpg", id: 6 },
  { name: "Nature", image: "images/nature.jpg", id: 7 },
  { name: "Things", image: "images/things.jpg", id: 8 },
];

const CategoryContainer:React.FC = () => (<div className={"category-container"}>
          {
              cards.map((card) => <Card cardInfo={card} key={card.id}/>)
          }
          </div>
);

export default CategoryContainer;
