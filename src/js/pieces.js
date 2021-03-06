/* the naming conventions are using the "official" Tetris names. */

const Pieces = {
  T: [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
  O: [[2, 2], [2, 2]],
  S: [[0, 3, 3], [3, 3, 0], [0, 0, 0]],
  Z: [[4, 4, 0], [0, 4, 4], [0, 0, 0]],
  L: [[0, 5, 0], [0, 5, 0], [0, 5, 5]],
  J: [[0, 6, 0], [0, 6, 0], [6, 6, 0]],
  I: [[0, 7, 0, 0], [0, 7, 0, 0], [0, 7, 0, 0], [0, 7, 0, 0]]
};

export const randomPiece = () =>
  Object.values(Pieces)[(Object.keys(Pieces).length * Math.random()) | 0];
