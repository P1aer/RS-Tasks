import React, { ReactElement } from "react";
import "./category-card.scss";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { changeCategory } from "../redux/actions";

const mapStateToProps = (state:{header:{ playBtn:boolean}}) => ({
  game: state.header.playBtn,
});
const connector = connect(mapStateToProps, { change: changeCategory });
type PropsFromRedux = ConnectedProps<typeof connector>
type CardInfo = PropsFromRedux & {
    cardInfo: {name: string, image: string}
}
function Card({ cardInfo, game, change }: CardInfo):ReactElement {
  const classes = ["category-card"];
  if (game) {
    classes.push("orange-card");
  }
  return (<Link onClick={() => change(cardInfo.name)} to={"/public-cards"} className={classes.join(" ")}>
              <img src={cardInfo.image}/>
              <p>{cardInfo.name}</p>
          </Link>
  );
}
export default connector(Card);
