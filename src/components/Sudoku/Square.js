import React from "react";

const Square = ({ cell, focusCell }) => {
  let content = null;
  let valueClass = "";
  let gridClass = "";

  content = cell.value ? <span>{cell.value}</span> : null;
  valueClass = " center-value";

  const focusClass = cell.isFocus ? " focus" : "";
  const onClick = () => {
    !cell.isFocus && focusCell(cell.row, cell.col);
  };
  return (
    <div className={`grid-child square ${focusClass} ${valueClass} ${gridClass}`} onClick={onClick}>
      {content}
    </div>
  );
};

export default Square;
