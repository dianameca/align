/**
 * Represents the grid, manages the game board state, validates positions,
 * handles line clearing and draws on the board.
 *    - Grid Initialization
 *    - Position Validation
 *    - Tetromino Placement
 *    - Line Clearing
 *    - Tetromino Rendering 
 *    - Cell Rendering
 */

export class Board {

  // initialize the board grid with rows, columns, 
  // 2D array where each cell is null.
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = Array.from({ length: rows }, () => Array(cols).fill(null));
  }

  // check if current position and rotation fit within the board's 
  // bounds and if the space is unoccupied
  isPositionValid(tetromino) {
    const shape = tetromino.getCurrentShape();
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const gridX = tetromino.x + x;
          const gridY = tetromino.y + y;
  
          // check if the tetromino is within bounds and doesn't overlap
          if (gridX < 0 || gridX >= this.cols || gridY >= this.rows || this.grid[gridY][gridX]) {
            return false;  // invalid position if outside bounds or collision
          }
        }
      }
    }
    return true;  // valid position
  }
  
  // place permanently on the grid, copies shape into the board, 
  // stores the piece's color at the corresponding grid positions
  placeTetromino(tetromino) {
    const shape = tetromino.getCurrentShape();
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (shape[row][col]) {
          const gridX = tetromino.x + col;
          const gridY = tetromino.y + row;
  
          // check if coords are within bounds
          if (gridY >= 0 && gridY < this.rows && gridX >= 0 && gridX < this.cols) {
            this.grid[gridY][gridX] = tetromino.color;  // store color in the grid
          }
        }
      }
    }
  }  
  
  // scan for completely filled lines, remove from the grid and shifts 
  // everything above down by one line for each cleared line
  clearFullLines() {
    let linesCleared = 0;
    for (let y = this.rows - 1; y >= 0; y--) {
      if (this.grid[y].every(cell => cell !== null)) {
        linesCleared++;
        this.grid.splice(y, 1);
        this.grid.unshift(Array(this.cols).fill(0)); // Shift everything down
      }
    }
    return linesCleared;
  }

  // draw moving tetromino on the board, fill the 
  // cells based on position
  drawTetromino(tetromino) {
    const shape = tetromino.getCurrentShape();
    const color = tetromino.color;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          this.drawCell(tetromino.x + x, tetromino.y + y, color);
        }
      }
    }
  }

  // helper, fill single cell with a specified
  // color at given coordinates
  drawCell(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
  }
}