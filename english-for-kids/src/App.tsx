import React from "react";
/* import { BrowserRouter, Switch, Route } from "react-router-dom"; */
import "./style/App.scss";
import Header from "./header/header";
import CategoryContainer from "./categories-container/categories-container";

function App() :React.ReactElement {
  return (<div className="App">
      <Header />
      <CategoryContainer/>
  </div>
  );
}

export default App;
