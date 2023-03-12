import types from './types/actionTypes';

export const clear = () => ({ type: types.CLEAR });

export const focus = (x, y) => ({ type: types.FOCUS, x, y });

export const enterNumber = number => ({ type: types.ENTER_NUMBER, number});

export const navigateGrid = direction => ({ type: types.NAVIGATE_GRID, direction});

export const togglePossibilities = () => ({ type: types.TOGGLE_POSSIBILITIES,});
