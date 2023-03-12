import { GRID_SIZE, SUBGRID_SIZE } from "./constants";

const getBox = (i, j) => SUBGRID_SIZE * Math.floor(j / SUBGRID_SIZE) + Math.floor(i / SUBGRID_SIZE);
const getListOfSets = (n) => new Array(n).fill().map((_) => new Set());

export function isValidSudoku(grid) {
  let rows = getListOfSets(grid.length);
  let cols = getListOfSets(grid.length);
  let boxes = getListOfSets(grid.length);
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      let c = grid[i][j];

      if (c.value === null) {
        continue;
      }

      let box = getBox(i, j);
      if (rows[i].has(c.value) || cols[j].has(c.value) || boxes[box].has(c.value)) {
        return false;
      } else {
        rows[i].add(c.value);
        cols[j].add(c.value);
        boxes[box].add(c.value);
      }
    }
  }
  return true;
}

export function isFinished(grid) {
  for (const row of grid) {
    for (const cell of row) {
      if (cell.value === null) {
        return false;
      }
    }
  }
  return true && isValidSudoku(grid);
}
