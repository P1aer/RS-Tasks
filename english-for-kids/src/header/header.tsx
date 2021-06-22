import React, { ReactElement } from "react";
import "./header.scss";

export default function Header():ReactElement {
  return (
       <header className={"app-header"}>
         <nav>
             <div className="menuToggle">
                 <input type="checkbox"/>
                 <span/>
                 <span/>
                 <span/>
             </div>
         </nav>
           <label className="switch">
               <input type="checkbox" id="togBtn"/>
                   <div className="slider round">
                       <span className="on">PLAY</span>
                       <span className="off">TRAIN</span>
                   </div>
           </label>
       </header>
  );
}
