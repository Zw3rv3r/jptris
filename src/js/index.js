import {updateScore} from "./score";
import { randomPiece } from "./pieces";
import { draw } from "./drawing";
import "../css/style.scss";

const RotateLeft = -1;
const RotateRight = 1;

let timestamp = 0;
let dropCounter = 0;
let dropSpeed = 500;

const _sweep = () => {
  let rowCount = 1;
  outer: for (let y = arena.length - 1; y > 0; y--) {
    for (let x = 0; x < arena[y].length; x++) {
      if (arena[y][x] === 0) {
        continue outer;
      }
    }
    const row = arena.splice(y, 1)[0].fill(0);
    arena.unshift(row);
    player.score += rowCount * 10;
    rowCount *= 2;
    y++;
  }
};

const _playerReset = () => {
  player.matrix = randomPiece();
  player.pos.y = 0;
  player.pos.x =
    ((arena[0].length / 2) | 0) - ((player.matrix[0].length / 2) | 0);
  if (_collide(arena, player)) {
    arena.forEach(row => row.fill(0));
    player.score = 0;
    updateScore(player);
  }
};

const _collide = (field, piece) => {
  const [m, o] = [piece.matrix, piece.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 && (field[y + o.y] && field[y + o.y][x + o.x]) !== 0) {
        return true;
      }
    }
  }
  return false;
};

const _createMatrix = (w, h) => {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
};

const _movePiece = dx => {
  player.pos.x += dx;
  if (_collide(arena, player)) {
    player.pos.x -= dx;
  }
};

const _rotate = (piece, d) => {
  for (let y = 0; y < piece.length; y++) {
    for (let x = 0; x < y; x++) {
      [piece[x][y], piece[y][x]] = [piece[y][x], piece[x][y]];
    }
  }
  if (d > 0) {
    piece.forEach(row => row.reverse());
  } else {
    piece.reverse();
  }
};

const _rotatePiece = d => {
  const x = player.pos.x;
  let offset = 1;
  _rotate(player.matrix, d);
  while (_collide(arena, player)) {
    player.pos.x += offset;
    offset = -(offset + (offset > 0 ? 1 : -1));
    if (offset > player.matrix[0].length) {
      player.pos.x = x;
      _rotate(player.matrix, -d);
    }
  }
};

const _drop = () => {
  player.pos.y++;
  if (_collide(arena, player)) {
    player.pos.y--;
    _merge(arena, player);
    player.pos.y = 0;
    _playerReset();
    _sweep();
    updateScore(player);
  }
  dropCounter = 0;
};

const _update = (time = 0) => {
  const delta = time - timestamp;
  timestamp = time;
  dropCounter += delta;
  if (dropCounter > dropSpeed) {
    _drop();
  }
  draw(player, arena);
  requestAnimationFrame(_update);
};

const _merge = (field, piece) => {
  piece.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value !== 0) {
        field[y + piece.pos.y][x + piece.pos.x] = value;
      }
    });
  });
};

const player = {
  pos: { x: 0, y: 0 },
  matrix: null,
  score: 0
};
const arena = _createMatrix(12, 20); // classic tetris

document.addEventListener("keydown", event => {
  switch (event.keyCode) {
    case 37: // ArrowLeft
      _movePiece(-1);
      break;
    case 39: // ArrowRight
      _movePiece(1);
      break;
    case 81: // Q
    case 38: // ArrowUp
      _rotatePiece(RotateLeft);
      break;
    case 87: // W
    case 40: // ArrowDown
      _rotatePiece(RotateRight);
      break;
    case 32: // space
      _drop();
      break;
    default:
  }
});

_playerReset();
updateScore(player);
_update();
