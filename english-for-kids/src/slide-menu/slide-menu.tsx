import React from "react";
import "./slide-menu.scss";

function SlideMenu({ cardNames }:{cardNames:string[]}):React.ReactElement {
  return (
        <ul className="menu">
            <li className="menu-item">Main Page</li>
            {
                cardNames.map((name) => (<li className={"menu-item"} key={cardNames.indexOf(name + 1)}>{name}</li>))
            }
        </ul>
  );
}

export default SlideMenu;
