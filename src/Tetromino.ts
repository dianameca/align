/**
 * Tetromino block definition and functionality.
 * Shape and color constant maps tetromino types to attributes.
 *    - shape: array of matrices where each matrix represents a rotation state,
 *      matrix uses 1s and 0s to define filled (1) and empty (0) blocks of the shape.
 *    - color
 *    - currentRotation: tracks rotation state in the shape array
 *    - current x and y offset on the game grid
 */

interface TetrominoShape {
  shape: number[][][];
  color: string;
}
// order
// 0°
// 90°
// 180°
// 270°
const TETROMINOS: { [key: string]: TetrominoShape } = {
  I: {
    shape: [
      [[1, 1, 1, 1]],
      [[1], [1], [1], [1]],
      [[1, 1, 1, 1]],
      [[1], [1], [1], [1]],
    ],
    color: 'cyan',
  },
  J: {
    shape: [
      [[0, 0, 1], [1, 1, 1]],
      [[1, 0], [1, 0], [1, 1]],
      [[1, 1, 1], [1, 0, 0]],
      [[1, 1], [0, 1], [0, 1]],
    ],
    color: 'blue',
  },
  L: {
    shape: [
      [[1, 0, 0], [1, 1, 1]],
      [[1, 1], [1, 0], [1, 0]],
      [[1, 1, 1], [0, 0, 1]],
      [[0, 1], [0, 1], [1, 1]],
    ],
    color: 'orange',
  },
  O: {
    shape: [
      [[1, 1], [1, 1]],
      [[1, 1], [1, 1]],
      [[1, 1], [1, 1]],
      [[1, 1], [1, 1]],
    ],
    color: 'yellow',
  },
  S: {
    shape: [
      [[0, 1, 1], [1, 1, 0]],
      [[1, 0], [1, 1], [0, 1]],
      [[0, 1, 1], [1, 1, 0]],
      [[1, 0], [1, 1], [0, 1]],
    ],
    color: 'green',
  },
  T: {
    shape: [
      [[0, 1, 0], [1, 1, 1]],
      [[1, 0], [1, 1], [1, 0]],
      [[1, 1, 1], [0, 1, 0]],
      [[0, 1], [1, 1], [0, 1]],
    ],
    color: 'purple',
  },
  Z: {
    shape: [
      [[1, 1, 0], [0, 1, 1]],
      [[0, 1], [1, 1], [1, 0]],
      [[1, 1, 0], [0, 1, 1]],
      [[0, 1], [1, 1], [1, 0]],
    ],
    color: 'red',
  },
};

export class Tetromino {
  shape: number[][][];
  color: string;
  currentRotation: number;
  x: number;
  y: number;

  constructor(type: keyof typeof TETROMINOS) {
    const tetrominoData = TETROMINOS[type];
    this.shape = tetrominoData.shape;
    this.color = tetrominoData.color;
    this.currentRotation = 0;
    this.x = 3; // starting position
    this.y = 0;
  }

  // current rotation state + 1, cycling through 
  // the available shapes to simulate rotation
  rotate(): void {
    this.currentRotation = (this.currentRotation + 1) % this.shape.length;
  }

  // returns the current rotation shape matrix
  getCurrentShape(): number[][] {
    return this.shape[this.currentRotation];
  }
}