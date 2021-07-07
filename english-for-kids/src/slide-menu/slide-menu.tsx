import React from "react";
import "./slide-menu.scss";
import { NavLink } from "react-router-dom";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { exitMenu, stopGame } from "../redux/actions";

const mapStateToProps = (state:{header:{ menu:boolean, playBtn:boolean}}) => ({
  menu: state.header.menu,
  play: state.header.playBtn,
});
const connector = connect(mapStateToProps, { exitMenu, stopGame });
type PropsFromRedux = ConnectedProps<typeof connector>

function SlideMenu(props:PropsFromRedux):React.ReactElement {
  const cards = useSelector(((state:{data: {cards:{
                    name: string; id: number; image: string}[]}}) => state.data.cards
  ));
  const classes = ["menu"];
  if (props.menu) {
    classes.push("menuVisible");
  }
  if (props.play) {
    classes.push("orange");
  }
  return (
      <ul className={classes.join(" ")}>
          <NavLink
              onClick={() => {
                props.exitMenu();
                props.stopGame();
              }}
              className="menu-item" to="/" exact={true}>
              Main Page
          </NavLink>
          <NavLink to="/statistic" className={"menu-item"} onClick={() => {
            props.exitMenu();
            props.stopGame();
          }}>
              Statistic
          </NavLink>
          {
              cards.map((card) => (
                  <NavLink
                      onClick={() => {
                        props.exitMenu();
                        props.stopGame();
                      }}
                      className={"menu-item"} to={`/${card.name}`}
                      key={card.id}>
                      {card.name}
                  </NavLink>))
          }
      </ul>
  );
}

export default connector(SlideMenu);
