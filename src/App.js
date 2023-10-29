import "./App.scss";
import Main from "./components/home/main";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./state/userSlice";
import {
  BrowserRouter,
  Routes,
  Route,
  Router,
  useNavigate,
} from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import CMMain from "./components/home/CMMain";

export const store = configureStore({
  reducer: userSlice,
});

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/cm" element={<CMMain />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};

export default App;
