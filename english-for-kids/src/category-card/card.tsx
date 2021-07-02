import React, { ReactElement } from "react";
import "./category-card.scss";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";

const mapStateToProps = (state:{header:{ playBtn:boolean}}) => ({
  game: state.header.playBtn,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
type CardInfo = PropsFromRedux & {
    cardInfo: {name: string, id: number, image: string}
}
function Card({ cardInfo, game }: CardInfo):ReactElement {
  const classes = ["category-card"];
  if (game) {
    classes.push("orange-card");
  }
  return (<Link to={`/${cardInfo.name}`} className={classes.join(" ")}>
              <img src={cardInfo.image}/>
              <p>{cardInfo.name}</p>
          </Link>
  );
}
export default connector(Card);
