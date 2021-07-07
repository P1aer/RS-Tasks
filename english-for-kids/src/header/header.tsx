import React from "react";
import "./header.scss";
import { connect, ConnectedProps } from "react-redux";
import SlideMenu from "../slide-menu/slide-menu";
import {
  toggle, changeMenu, exitMenu, stopGame,
} from "../redux/actions";

const mapStateToProps = (state:{header:{menu:boolean}, game:{isPlayed:boolean}}) => ({
  menu: state.header.menu,
  isPlayed: state.game.isPlayed,
});
const connector = connect(mapStateToProps, {
  toggle, changeMenu, exitMenu, stopGame,
});
type PropsFromRedux = ConnectedProps<typeof connector>

function Header(props:PropsFromRedux):React.ReactElement {
  const divRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    document.onclick = (event) => {
      if (divRef.current && event.target && props.menu) {
        if (!divRef.current.contains((event.target) as Node)) {
          props.exitMenu();
        }
      }
    };
  });
  return (<header className={"app-header"}>
            <nav ref={divRef}>
                <div className="menuToggle">
                    <input type="checkbox" onClick={() => {
                      props.changeMenu();
                    }}/>
                    <span className={props.menu ? "span1" : ""}/>
                    <span className={props.menu ? "span2" : ""}/>
                    <span className={props.menu ? "span3" : ""}/>
                    <SlideMenu/>
                </div>
            </nav>
            <label className="switch">
                <input type="checkbox" onClick={() => {
                  props.toggle();
                  if (props.isPlayed) {
                    props.stopGame();
                  }
                }} />
                <div className="slider round">
                    <span className="on">PLAY</span>
                    <span className="off">TRAIN</span>
                </div>
            </label>
        </header>);
}
export default connector(Header);
