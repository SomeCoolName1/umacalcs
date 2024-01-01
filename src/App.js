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
import React from "react";
import CMMain from "./components/home/CMMain";
import ScrollToTop from "./components/home/loading/scrollToTop";
import TrackMain from "./components/track/trackmain";

export const store = configureStore({
  reducer: userSlice,
});

const App = () => {
  const navigate = useNavigate();

  return (
    <Provider store={store}>
      <div className="App">
        <div className="main-header">
          <div
            className={`home-button-container header-button ${
              window.location.pathname === "/" ? "path-current" : ""
            }`}
            onClick={() => navigate("/")}
          >
            Stat Calculations
          </div>
          <div
            className={`CMGuide-button-container header-button ${
              window.location.pathname === "/cm" ? "path-current" : ""
            }`}
            onClick={() => navigate("/cm")}
          >
            CMGuide
          </div>
          <div
            className={`CMGuide-button-container header-button ${
              window.location.pathname === "/skillcheck" ? "path-current" : ""
            }`}
            onClick={() => navigate("/skillcheck")}
          >
            Skill Checker
          </div>
        </div>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/cm" element={<CMMain />} />
          <Route path="/skillcheck" element={<TrackMain />} />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
