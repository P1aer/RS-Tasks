import React, { useContext, MouseEvent } from "react";
import "./admin-page-head.scss";
import { NavLink, useHistory } from "react-router-dom";
import context from "../context";

function AdminHeader():React.ReactElement {
  const category = "Action 1";
  const history = useHistory();
  const auth = useContext(context);
  const logoutHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (<header className={"admin-header"}>
        <div className={"admin-header-container"}>
            <nav className={"admin-nav"}>
                <NavLink className={"nav-link"}
                         activeStyle={{ textDecoration: "underline" }} to={"/categories"}>
                    Categories
                </NavLink>
                <NavLink className={"nav-link"}
                         activeStyle={{ textDecoration: "underline" }} to={`/${category}/words`}>
                    Words
                </NavLink>
            </nav>
            <div className={"header-button"}>
                <button onClick={logoutHandler} className={"logout"}> logout </button>
            </div>
        </div>
    </header>);
}

export default AdminHeader;
