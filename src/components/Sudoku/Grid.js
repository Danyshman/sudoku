import React, { useState, useCallback, useEffect } from "react";
import _ from "lodash";

import SubGrid from "./SubGrid";
import CheckAnswerBtn from "./CheckAnswerBtn";

import { GRID_SIZE, SUBGRID_SIZE } from "../../constants";
import { isValidSudoku, isFinished } from "../../utils";

const createEmptyGrid = () => {
  const grid = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    const row = [];
    for (let j = 0; j < GRID_SIZE; j++) {
      row.push({
        row: i,
        col: j,
        isFocus: false,
        value: null,
      });
    }
    grid.push(row);
  }
  return grid;
};

const getRelevantNumbersForSubGrid = (supergridNumbers, parentY, parentX) => {
  const startingRow = parentY * SUBGRID_SIZE;
  const startingColumn = parentX * SUBGRID_SIZE;
  const subgrid = [];
  for (let col = 0; col < SUBGRID_SIZE; col++) {
    const cells = [];
    for (let row = 0; row < SUBGRID_SIZE; row++) {
      cells.push(supergridNumbers[startingRow + row][startingColumn + col]);
    }
    subgrid.push(cells);
  }
  return subgrid;
};

const Grid = ({ setGridStatus }) => {
  const [grid, setGrid] = useState(createEmptyGrid);
  const [lastFocusedCell, setLastFocusedCell] = useState(null);
  const squares = [];

  useEffect(() => {
    if (isFinished(grid)) {
      setGridStatus({ isFinished: true, isValid: true });
    }
  }, [grid]);

  const updateCell = useCallback(
    (row, col, newCellData) => {
      setGrid((prevState) => {
        const newGrid = _.cloneDeep(prevState);
        newGrid[row][col] = { ...grid[row][col], ...newCellData };
        return newGrid;
      });
    },
    [grid]
  );

  const focusCell = useCallback(
    (row, col) => {
      if (lastFocusedCell && lastFocusedCell.isFocus) {
        updateCell(lastFocusedCell.row, lastFocusedCell.col, { isFocus: false });
      }
      updateCell(row, col, { isFocus: true });
      setLastFocusedCell({ ...grid[row][col], isFocus: true });
    },
    [lastFocusedCell, grid]
  );

  const enterNumber = (number) => {
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isFocus) {
          updateCell(cell.row, cell.col, { value: number, isFocus: false });
        }
      });
    });
  };

  const onKeyDown = (event) => {
    if (!isNaN(event.key) && event.key != 0) {
      enterNumber(parseInt(event.key, 10));
    } else if (event.key === " ") {
      enterNumber(null);
    }
  };

  const checkAnswerHandler = () => {
    setGridStatus({
      isValid: isValidSudoku(grid),
      isFinished: isFinished(grid),
    });
  };

  for (let col = 0; col < SUBGRID_SIZE; col++) {
    for (let row = 0; row < SUBGRID_SIZE; row++) {
      squares.push(
        <SubGrid key={`${row}_${col}`} numbers={getRelevantNumbersForSubGrid(grid, row, col)} focusCell={focusCell} />
      );
    }
  }

  return (
    <>
      <div
        className="parent grid-wrapper top-grid"
        tabIndex={-1}
        onKeyDown={onKeyDown}
        style={{ gridTemplate: `repeat(${SUBGRID_SIZE}, 1fr) / repeat(${SUBGRID_SIZE}, 1fr)` }}
      >
        {squares}
      </div>
      <CheckAnswerBtn onClick={checkAnswerHandler} />
    </>
  );
};

export default Grid;
