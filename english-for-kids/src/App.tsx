import React from "react";
import { Switch, Route } from "react-router-dom";
import "./style/App.scss";
import Header from "./header/header";
import CategoryContainer from "./categories-container/categories-container";
import context from "./context";
import Cards from "./cards-field/cards";

const cards = [
  { name: "Actions 1", image: "images/action1.jpg", id: 1 },
  { name: "Actions 2", image: "images/action2.jpg", id: 2 },
  { name: "Animals 1", image: "images/animals1.jpg", id: 3 },
  { name: "Animals 2", image: "images/animals2.png", id: 4 },
  { name: "Clothes", image: "images/clothes.jpg", id: 5 },
  { name: "Emotions", image: "images/emotions.jpg", id: 6 },
  { name: "Nature", image: "images/nature.jpg", id: 7 },
  { name: "Things", image: "images/things.jpg", id: 8 },
];

function App() :React.ReactElement {
  return (
      <context.Provider value={{ cards }}>
          <div className="App">
              <Header />
              <Switch>
                  <Route exact path="/">
                      <CategoryContainer/>
                  </Route>
                  <Route path="/:cardSet" component={Cards}/>
              </Switch>
          </div>
      </context.Provider>
  );
}

export default App;
