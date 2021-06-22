import React, { ReactElement } from "react";
import "./style/App.scss";
import Header from "./header/header";
import CategoryContainer from "./categories-container/categories-container";

function App():ReactElement {
  return (<div className="App">
      <Header />
      <CategoryContainer/>
  </div>
  );
}

export default App;
