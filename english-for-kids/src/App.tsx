import React from "react";
import { Switch, Route } from "react-router-dom";
import "./style/App.scss";
import { useDispatch, useSelector } from "react-redux";
import Header from "./header/header";
import CategoryContainer from "./categories-container/categories-container";
import Cards from "./cards-field/cards";
import Stats from "./stats page/statistic";
import { fetchCards, fetchWords } from "./redux/actions";

function App() :React.ReactElement {
  const dispatch = useDispatch();
  const cardFetch = useSelector(((state:{data: {cardsFetch:boolean}}) => state.data.cardsFetch));
  const wordsFetch = useSelector(((state:{data: {wordsFetch:boolean}}) => state.data.wordsFetch));
  if (!cardFetch) {
    dispatch(fetchCards());
  }
  if (!wordsFetch) {
    dispatch(fetchWords());
  }
  return (<div className="App">
          <Header />
          <Switch>
              <Route exact path="/">
                  <CategoryContainer/>
              </Route>
              <Route exact path="/statistic">
                  <Stats/>
              </Route>
              <Route path="/:cardSet" component={Cards}/>

          </Switch>
      </div>
  );
}
export default App;
