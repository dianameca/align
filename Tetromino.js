const TETROMINOS = {
    I: [
      [[1, 1, 1, 1]],         // Horizontal
      [[1], [1], [1], [1]],   // Vertical
    ],
    J: [
      [[0, 0, 1], [1, 1, 1]],  // L-shape
      [[1, 0, 0], [1, 1, 1]],  // Rotated
    ],
    L: [
      [[1, 0, 0], [1, 1, 1]],  // L-shape
      [[0, 0, 1], [1, 1, 1]],  // Rotated
    ],
    O: [
      [[1, 1], [1, 1]],        // Square
    ],
    S: [
      [[0, 1, 1], [1, 1, 0]],  // Z-shape
      [[1, 0], [1, 1], [0, 1]],// Rotated
    ],
    T: [
      [[0, 1, 0], [1, 1, 1]],  // T-shape
      [[1, 0], [1, 1], [1, 0]],// Rotated
    ],
    Z: [
      [[1, 1, 0], [0, 1, 1]],  // Z-shape
      [[0, 1], [1, 1], [1, 0]],// Rotated
    ],
  };

export class Tetromino {
    constructor(type) {
      this.shape = TETROMINOS[type];
      this.currentRotation = 0;
      this.x = 3; // Starting position
      this.y = 0;
    }
  
    rotate() {
      this.currentRotation = (this.currentRotation + 1) % this.shape.length;
    }
  
    getCurrentShape() {
      return this.shape[this.currentRotation];
    }
  }
  