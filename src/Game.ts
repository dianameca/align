import { GraphicsManager } from './GraphicsManager'
import { Tetromino } from './Tetromino'
import { Board } from './Board'
import { UserInput } from './UserInput';

/**
 * Main controller.
 * Manages gameplay flow, rendering and interactions between 
 * game components (board, tetrominoes, user input).
 *    - Initialization
 *    - Game Start and Loop
 *    - Tetromino Control
 *    - Collision Detection
 *    - Scoring and Game Over
 */

export class Game {
  private canvas: HTMLCanvasElement;
  private board: Board;
  private graphicsManager: GraphicsManager;
  private score: number;
  private currentTetromino: Tetromino | null;
  private isGameOver: boolean;

  constructor(canvas: HTMLCanvasElement, board: Board) {
    this.canvas = canvas;
    this.board = board;
    this.graphicsManager = new GraphicsManager(canvas, board);
    this.score = 0;
    this.currentTetromino = null;
    this.isGameOver = false;

    // start game
    this.start();
  }

  // initiate game by spawning the first tetromino, enter gameLoop
  start(): void {
    this.spawnTetromino();
    this.gameLoop();
  }

  // randomly select tetromino type, create new instance
  spawnTetromino(): void {
    const tetrominoTypes: string[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    const randomType = tetrominoTypes[Math.floor(Math.random() * tetrominoTypes.length)];
    this.currentTetromino = new Tetromino(randomType);
  }

  // run continuously moving the tetromino down,
  // check for collisions with the board
  gameLoop(): void {
    if (this.isGameOver) return;

    this.moveTetrominoDown();

    // check for collision with the board
    if (this.currentTetromino && !this.board.isPositionValid(this.currentTetromino)) {
      // if the position is invalid, place tetromino and clear full lines
      this.board.placeTetromino(this.currentTetromino);
      const linesCleared = this.board.clearFullLines();
      this.score += linesCleared * 1000; // add points for cleared lines
      this.spawnTetromino(); // spawn a new tetromino

      // check if the new tetromino is already colliding with the board (game over)
      if (this.currentTetromino && !this.board.isPositionValid(this.currentTetromino)) {
        this.isGameOver = true;
        alert('GAME OVER');
      }
    }

    // render updated game state
    if (this.currentTetromino) {
      this.graphicsManager.render(this.currentTetromino, this.score);
    }

    // continue the game loop
    setTimeout(() => this.gameLoop(), 300); // adjust? 300ms per frame
  }

  // move tetromino down one row, checks for collisions
  moveTetrominoDown(): void {
    if (this.currentTetromino) {
      this.currentTetromino.y++;

      // check if the new position is valid
      if (!this.board.isPositionValid(this.currentTetromino)) {
        this.currentTetromino.y--;  // revert the tetromino to its previous position
        this.board.placeTetromino(this.currentTetromino);  // place it on the board
        const linesCleared = this.board.clearFullLines();  // clear full lines
        this.score += linesCleared * 1000;  // add score for cleared lines
        this.spawnTetromino();  // spawn new tetromino

        // check if the new tetromino collides immediately after spawning
        if (!this.board.isPositionValid(this.currentTetromino)) {
          this.isGameOver = true;
          alert('GAME OVER');
        }
      }
    }
  }

  // allow horizontal and vertical movement based
  moveTetromino(dx: number, dy: number): void {
    if (this.currentTetromino) {
      const newX = this.currentTetromino.x + dx;
      const newY = this.currentTetromino.y + dy;

      // check if the move is valid and update position
      if (this.isValidMove(newX, newY, this.currentTetromino.getCurrentShape())) {
        this.currentTetromino.x = newX;
        this.currentTetromino.y = newY;
      }
    }
  }

  // rotate the current tetromino and verifies the rotation using `isValidMove`
  // if the rotation is invalid, it reverts to the previous orientation.
  rotateTetromino(): void {
    if (this.currentTetromino) {
      this.currentTetromino.rotate();

      // check if the rotation is valid - if not, revert
      if (!this.isValidMove(this.currentTetromino.x, this.currentTetromino.y, this.currentTetromino.getCurrentShape())) {
        this.currentTetromino.rotate();
      }
    }
  }

  // check if a given position is within bounds and not colliding with
  // existing blocks on the board. Returns `true` if the move is valid, otherwise `false`.
  isValidMove(x: number, y: number, shape: number[][]): boolean {
    const booleanShape: boolean[][] = shape.map(row => row.map(cell => cell !== 0));
  
    for (let row = 0; row < booleanShape.length; row++) {
      for (let col = 0; col < booleanShape[row].length; col++) {
        if (booleanShape[row][col]) {
          const boardX = x + col;
          const boardY = y + row;
  
          // check if the piece is out of bounds
          if (boardX < 0 || boardX >= this.board.getCols() || boardY < 0 || boardY >= this.board.getRows()) {
            return false;  // Out of bounds
          }
  
          // check if the space is already occupied
          if (this.board.grid[boardY] && this.board.grid[boardY][boardX]) {
            return false;  // collision with another block
          }
        }
      }
    }
    return true;
  }  
}