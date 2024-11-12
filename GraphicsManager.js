/**
 * Manages rendering on the canvas.
 *    - Canvas Sizing
 *    - Grid Management
 *    - Drawing Elements
 *    - Score Display
 */
export class GraphicsManager {
  constructor(canvas, board) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.context.imageSmoothingEnabled = true;
    this.board = board;
    
    // set initial canvas size based on window dimensions
    this.setCanvasSize();
    
    // recalculate rows and columns based on canvas size
    this.updateGridSize();
  }

  // adjust canvas size
  setCanvasSize() {
    // set the canvas width and height to maintain elongated rectangle
    this.canvas.width = window.innerWidth * 0.4;
    this.canvas.height = window.innerHeight * 0.8;
  }

  // calculate rows and columns that can fit
  updateGridSize() {
    this.cellSize = 30;
    this.rows = Math.floor(this.canvas.height / this.cellSize);
    this.cols = Math.floor(this.canvas.width / this.cellSize);

    // round down to nearest full cell
    this.canvas.height = this.rows * this.cellSize;
    this.canvas.width = this.cols * this.cellSize;
  }

  // clear canvas, prep for the next frame.
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  // iterate through grid, draw each cell with designated color or
  // a transparent background if unoccupied.
  drawGrid() {
    // Use this.board.grid to reference the grid
    for (let y = 0; y < this.board.grid.length; y++) {
      for (let x = 0; x < this.board.grid[y].length; x++) {
        const color = this.board.grid[y][x];
        if (color) {  // if not empty draw it
          this.drawCell(x, y, color);
        } else {  // else draw empty space
          this.drawCell(x, y, 'transparent');
        }
      }
    }
  }

  // draw only the current state of the board with placed blocks
  drawBoard() {
    for (let y = 0; y < this.board.grid.length; y++) {
      for (let x = 0; x < this.board.grid[y].length; x++) {
        if (this.board.grid[y][x]) {
          this.drawCell(x, y, this.board.grid[y][x]);
        }
      }
    }
  }

  // render the current tetromino on the canvas
  drawTetromino(tetromino) {
    const shape = tetromino.getCurrentShape();
    shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          this.drawCell(tetromino.x + x, tetromino.y + y, tetromino.color);
        }
      });
    });
  }
  // fill cell with color/border
  drawCell(x, y, color) {
    this.context.fillStyle = color;
    this.context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);

    this.context.strokeStyle = 'black';
    this.context.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
  }

  // display current score on the canvas.
  displayScore(score) {
    this.context.fillStyle = 'black';
    this.context.font = '30px Arial';
    this.context.fillText(`Score: ${score}`, 10, 30);
  }

  // central rendering function that clears the canvas, draws the grid, board, tetromino,
  // and score in a single frame update.
  render(tetromino, score) {
    this.clear(); // clear for next frame
    this.drawGrid(); // draw grid with dark lines
    this.drawBoard(); // draw the current state
    this.drawTetromino(tetromino); // draw current tetromino
    this.displayScore(score);
  }
}
