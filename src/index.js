import React, { Component } from "react";
import { render } from "react-dom";
import Sudoku from "./components/Sudoku";

import "./styles/topLevel.css";
import "./styles/grid.css";
import "./styles/buttonArea.css";

class App extends Component {
  render() {
    return <Sudoku />;
  }
}

render(<App />, document.getElementById("root"));
