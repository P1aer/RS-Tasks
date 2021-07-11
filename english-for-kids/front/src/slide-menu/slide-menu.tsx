import React from "react";
import "./slide-menu.scss";
import { NavLink, Link } from "react-router-dom";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { changeCategory, exitMenu, stopGame } from "../redux/actions";

const mapStateToProps = (state:{header:{ menu:boolean, playBtn:boolean},
    data: { currentCard:string | undefined }}) => ({
  menu: state.header.menu,
  play: state.header.playBtn,
  current: state.data.currentCard,
});
const connector = connect(mapStateToProps, { exitMenu, stopGame, changeCategory });
type PropsFromRedux = ConnectedProps<typeof connector> & {
    modal: React.Dispatch<React.SetStateAction<boolean>>
}

function SlideMenu(props:PropsFromRedux):React.ReactElement {
  const cards = useSelector(((state:{data: {cards:{
                    name: string; image: string}[]}}) => state.data.cards
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
          <NavLink onClick={() => { props.exitMenu(); props.stopGame(); props.changeCategory("Main"); }}
              activeStyle={{ color: "#4FBE79" }} className="menu-item" to="/" exact={true}>
              Main Page
          </NavLink>
          <NavLink to="/statistic" className={"menu-item"}
                   onClick={() => { props.exitMenu(); props.stopGame(); props.changeCategory("Stats"); }}>
              Statistic
          </NavLink>
          {
              cards.map((card) => (
                  <Link onClick={() => { props.exitMenu(); props.stopGame(); props.changeCategory(card.name); }}
                        className={props.current === card.name ? "menu-item menu-active" : "menu-item"}
                        to={"/public-cards"} key={card.name}>{card.name}
                  </Link>))
          }
          <button className={"log-in"} onClick={() => props.modal(true)}> Log In </button>
      </ul>
  );
}

export default connector(SlideMenu);
