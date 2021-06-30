import React, { useContext } from "react";
import "./slide-menu.scss";
import { NavLink } from "react-router-dom";
import context from "../context";

function SlideMenu():React.ReactElement {
  const { cards, state, exitMenu } = useContext(context);
  const classes = ["menu"];
  if (state.menu) {
    classes.push("menuVisible");
  }
  if (state.play) {
    classes.push("orange");
  }
  return (
      <ul className={classes.join(" ")}>
          <NavLink
              onClick={exitMenu }
              className="menu-item" to="/" exact={true}>
              Main Page
          </NavLink>
          {
              cards.map((card) => (
                  <NavLink
                      onClick={exitMenu}
                      className={"menu-item"} to={`/${card.name}`}
                      key={card.id}>
                      {card.name}
                  </NavLink>))
          }
      </ul>
  );
}

export default SlideMenu;
