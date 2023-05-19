import "./App.scss";
import Main from "./components/main";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./state/userSlice";

import React, { Component } from "react";

export const store = configureStore({
  reducer: userSlice,
});

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
};

export default App;
