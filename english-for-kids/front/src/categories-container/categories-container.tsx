import React from "react";
import "./categories-container.scss";
import {
  connect, useSelector,
} from "react-redux";
import Card from "../category-card/card";

function CategoryContainer():React.ReactElement {
  const arr = useSelector(((state:{data: {cards:{
      name: string; image: string}[]}}) => state.data.cards
  ));
  return (<div className={"category-container"}>
     {
       arr.map((card) => <Card cardInfo={card} key={card.name}/>)
     }
   </div>);
}

export default connect()(CategoryContainer);
