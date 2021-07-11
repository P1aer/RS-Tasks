import React, { useState } from "react";
import "./style/App.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards, fetchWords } from "./redux/actions";
import useRoutes from "./routes";
import useAuth from "./hooks/auth.hook";
import context from "./context";

function App() :React.ReactElement {
  const dispatch = useDispatch();
  const {
    token, login, logout, userId,
  } = useAuth();
  const isAuthenticated = !!token;
  const [active, setActive] = useState(false);
  const cardFetch = useSelector(((state:{data: {cardsFetch:boolean}}) => state.data.cardsFetch));
  if (!cardFetch) {
    dispatch(fetchCards());
  }
  const wordsFetch = useSelector(((state:{data: {wordsFetch:boolean}}) => state.data.wordsFetch));
  if (!wordsFetch) {
    dispatch(fetchWords());
  }
  const routes = useRoutes({ isAuthenticated, active, setActive });
  return (<context.Provider value={{
    token, login, logout, userId, isAuthenticated,
  }}>
    <div className="App">
      {routes}
    </div>
  </context.Provider>

  );
}
export default App;
