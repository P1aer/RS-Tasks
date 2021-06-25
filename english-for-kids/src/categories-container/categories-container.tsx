import React, { useContext } from "react";
import "./categories-container.scss";
import Card from "../category-card/card";
import context from "../context";

function CategoryContainer():React.ReactElement {
  const { cards } = useContext(context);
  return (<div className={"category-container"}>
     {
       cards.map((card) => <Card cardInfo={card} key={card.id}/>)
     }
   </div>);
}

export default CategoryContainer;
