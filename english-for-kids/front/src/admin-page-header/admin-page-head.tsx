import React, { useContext, MouseEvent } from "react";
import "./admin-page-head.scss";
import { NavLink } from "react-router-dom";
import context from "../context";

function AdminHeader({ words = false } : {words?: boolean}):React.ReactElement {
  const auth = useContext(context);
  const logoutHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    auth.logout();
  };
  return (<header className={"admin-header"}>
        <div className={"admin-header-container"}>
            <nav className={"admin-nav"}>
                <NavLink className={"nav-link"}
                         activeStyle={{ textDecoration: "underline" }} exact to={"/"}>
                    Categories
                </NavLink>
                <h3 className={"nav-link"} style={words ? { textDecoration: "underline" } : {}}>
                    Words
                </h3>
            </nav>
            <div className={"header-button"} >
                <button onClick={logoutHandler} className={"logout"}> logout </button>
            </div>
        </div>
    </header>);
}

export default AdminHeader;
