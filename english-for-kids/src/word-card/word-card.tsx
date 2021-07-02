import React, { useState } from "react";
import "./word-card.scss";
import { connect, ConnectedProps } from "react-redux";

function handleState(state: boolean, pressed:boolean) {
  const cardStyles = ["card"];
  if (pressed) {
    cardStyles.push("flipped");
  }
  if (state) {
    cardStyles.push("play-mode");
  }
  return cardStyles.join(" ");
}

const mapStateToProps = (state:{
    game:{ audio:string[], isPlayed: boolean},
    header:{playBtn:boolean}
}) => ({
  game: state.game,
  toggled: state.header.playBtn,
});
const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux &{
    info:{ word:string, translation:string, image:string, audio: string }
}
function Word({ info, game, toggled }:Props):React.ReactElement {
  const [pressed, setPressed] = useState(false);
  const sound = new Audio(info.audio);
  function Click() {
    if (!toggled) {
      sound.play();
    }
  }
  return (
      <div className={"word-container"}>
          <div className={handleState(toggled, pressed)} onMouseLeave={() => setPressed(false)}>
              <div className={"front"}>
                  <img src={info.image} onClick={() => Click() }/>
                  <div className="card-bottom">
                      <h3 onClick={() => Click() }> {info.word} </h3>
                      <img onClick={() => setPressed(!pressed)} src="images/translate.png"/>
                  </div>
              </div>
              <div className={"back"} >
                  <img src={info.image}/>
                  <div className="card-bottom">
                       <h3> {info.translation}</h3>
                  </div>
              </div>
          </div>
  </div>);
}

export default connector(Word);
