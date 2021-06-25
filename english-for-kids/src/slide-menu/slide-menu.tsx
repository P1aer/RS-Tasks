import React, { useContext } from "react";
import "./slide-menu.scss";
import { NavLink } from "react-router-dom";
import context from "../context";

function SlideMenu():React.ReactElement {
  const { cards } = useContext(context);
  return (
        <ul className="menu ">
            <NavLink className="menu-item" to="/" exact={true}>Main Page</NavLink>
            {
                cards.map((card) => (<NavLink className={"menu-item"} to={`/${card.name}`} key={card.id}>{card.name}</NavLink>))
            }
        </ul>
  );
}
export default SlideMenu;
