import React, { useState } from "react";

import Grid from "./Grid";
import MessageDisplay from "./MessageDisplay";

import "../../styles/topLevel.css";
import "../../styles/grid.css";
import "../../styles/buttonArea.css";

export default function Sudoku() {
  const [gridStatus, setGridStatus] = useState({
    isFinished: false,
    isValid: true,
  });

  return (
    <div>
      <MessageDisplay gridStatus={gridStatus} />
      <Grid setGridStatus={setGridStatus} />
    </div>
  );
}
