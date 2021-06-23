import React from "react";
import "./header.scss";
import SlideMenu from "../slide-menu/slide-menu";

const names = ["a", "b", "c", "d"];

const Header:React.FC = () => (
       <header className={"app-header"}>
         <nav>
             <div className="menuToggle">
                 <input type="checkbox"/>
                 <span/>
                 <span/>
                 <span/>
                 <SlideMenu cardNames={names}/>
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
