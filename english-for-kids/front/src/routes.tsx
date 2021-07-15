import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./header/header";
import Modal from "./modal/modal";
import CategoryContainer from "./categories-container/categories-container";
import Stats from "./stats page/statistic";
import Cards from "./cards-field/cards";
import AdminPageCategories from "./admin-page-cat/admin-page-cat";
import AdminPageWords from "./admin-word-page/admin-page-words";

type Prop = {
    isAuthenticated:boolean,
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const useRoutes = ({ isAuthenticated, active, setActive }:Prop): React.ReactElement => {
  if (!isAuthenticated) {
    return (
            <Switch>
                <Route exact path="/">
                    <Header modal={setActive}/>
                    <Modal active={active} setActive={setActive}/>
                    <CategoryContainer/>
                </Route>
                <Route path="/statistic">
                    <Header modal={setActive}/>
                    <Modal active={active} setActive={setActive}/>
                    <Stats/>
                </Route>
                <Route path="/public-cards">
                    <Header modal={setActive}/>
                    <Modal active={active} setActive={setActive}/>
                    <Cards/>
                </Route>
                <Redirect to={"/"}/>
            </Switch>
    );
  }
  return (
          <Switch>
              <Route exact path={"/"}>
                  <AdminPageCategories/>
              </Route>
              <Route path={"/:name/words"}>
                <AdminPageWords/>
              </Route>
              <Redirect to={"/"}/>
          </Switch>
  );
};

export default useRoutes;
