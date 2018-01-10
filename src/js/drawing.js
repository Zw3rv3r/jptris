import { BackgroundColor, Colors } from "./colors";

const _canvas = document.getElementById("game");
const _context = _canvas.getContext("2d");

_context.scale(20, 20);

const _drawMatrix = (matrix, offset = { x: 0, y: 0 }) => {
  matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        _context.fillStyle = Colors[value];
        _context.fillRect(x + offset.x, y + offset.y, 1, 1);
      }
    });
  });
};

export const draw = (player, arena) => {
  _context.fillStyle = BackgroundColor;
  _context.fillRect(0, 0, _canvas.width, _canvas.height);
  _drawMatrix(player.matrix, player.pos);
  _drawMatrix(arena);
};
