import React from "react";
import "./header.scss";
import SlideMenu from "../slide-menu/slide-menu";

const Header:React.FC = () => (
       <header className={"app-header"}>
         <nav>
             <div className="menuToggle">
                 <input type="checkbox"/>
                 <span/>
                 <span/>
                 <span/>
                 <SlideMenu/>
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
export default Header;
