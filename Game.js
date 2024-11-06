import { Board } from './Board.js';

export class Game {
  constructor(rows, cols) {
    this.board = new Board(rows, cols);
    this.currentTetromino = this.createRandomTetromino();
    this.score = 0;
  }

  createRandomTetromino() {
    const types = Object.keys(TETROMINOS);
    const randomType = types[Math.floor(Math.random() * types.length)];
    return new Tetromino(randomType);
  }

  update() {
    // handle movement, collision detection, and placing tetromino
    // update score and check for game over
  }

  // additional methods for game logic, starting/stopping the game, etc.
}
