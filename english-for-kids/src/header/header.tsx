import React, { useContext } from "react";
import "./header.scss";
import SlideMenu from "../slide-menu/slide-menu";
import context from "../context";

function Header():React.ReactElement {
  const { state, setState, exitMenu } = useContext(context);
  const divRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    document.onclick = (event) => {
      if (divRef.current && event.target) {
        if (!divRef.current.contains((event.target) as Node)) {
          exitMenu();
        }
      }
    };
  });
  return (<header className={"app-header"}>
            <nav ref={divRef}>
                <div className="menuToggle">
                    <input type="checkbox" onClick={() => {
                      setState({ play: state.play, menu: !state.menu });
                    }}/>
                    <span/>
                    <span/>
                    <span/>
                    <SlideMenu/>
                </div>
            </nav>
            <label className="switch">
                <input type="checkbox" id="togBtn" />
                <div className="slider round">
                    <span className="on">PLAY</span>
                    <span className="off">TRAIN</span>
                </div>
            </label>
        </header>);
}
export default Header;
