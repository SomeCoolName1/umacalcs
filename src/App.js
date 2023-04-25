import "./App.scss";
import Main from "./components/main";
import React, { Component } from "react";

class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <div className="App">
          <Main />
        </div>
      </React.StrictMode>
    );
  }
}

export default App;
