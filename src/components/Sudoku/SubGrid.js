import React from "react";
import Square from "./Square";
import { SUBGRID_SIZE } from "../../constants";

const SubGrid = ({ numbers, focusCell }) => {
  const squares = [];
  numbers.forEach((row) => {
    row.forEach((cell) => {
      squares.push(<Square key={`${cell.row}_${cell.col}`} cell={cell} focusCell={focusCell} />);
    });
  });

  return (
    <div
      className="grid-wrapper sub-grid"
      style={{ gridTemplate: `repeat(${SUBGRID_SIZE}, 1fr) / repeat(${SUBGRID_SIZE}, 1fr)` }}
    >
      {squares}
    </div>
  );
};

export default SubGrid;
