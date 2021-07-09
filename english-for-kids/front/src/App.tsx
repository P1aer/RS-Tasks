import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./style/App.scss";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header/header";
import CategoryContainer from "./categories-container/categories-container";
import Cards from "./cards-field/cards";
import Stats from "./stats page/statistic";
import { fetchCards, fetchWords } from "./redux/actions";
import Modal from "./modal/modal";

function App() :React.ReactElement {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const cardFetch = useSelector(((state:{data: {cardsFetch:boolean}}) => state.data.cardsFetch));
  const wordsFetch = useSelector(((state:{data: {wordsFetch:boolean}}) => state.data.wordsFetch));
  if (!cardFetch) {
    dispatch(fetchCards());
  }
  if (!wordsFetch) {
    dispatch(fetchWords());
  }
  return (<div className="App">
          <Switch>
              <Route exact path="/">
                  <Header modal={setActive}/>
                  <Modal active={active} setActive={setActive}/>
                  <CategoryContainer/>
              </Route>
              <Route exact path="/statistic">
                  <Header modal={setActive}/>
                  <Modal active={active} setActive={setActive}/>
                  <Stats/>
              </Route>
              <Route path="/:cardSet">
                  <Header modal={setActive}/>
                  <Modal active={active} setActive={setActive}/>
                  <Cards/>
              </Route>
          </Switch>
      </div>
  );
}
export default App;
