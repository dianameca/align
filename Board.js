export class Board {
    constructor(rows, cols) {
      this.rows = rows;
      this.cols = cols;
      this.grid = this.createEmptyGrid();
    }
  
    createEmptyGrid() {
      return Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
    }
  
    isPositionValid(tetromino) {
      const shape = tetromino.getCurrentShape();
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] && this.grid[tetromino.y + y] && this.grid[tetromino.y + y][tetromino.x + x]) {
            return false; // Collision detected
          }
        }
      }
      return true; // Valid position
    }
  
    placeTetromino(tetromino) {
      const shape = tetromino.getCurrentShape();
      shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            this.grid[tetromino.y + y][tetromino.x + x] = value; // mark the grid
          }
        });
      });
    }
  
    clearFullLines() {
      this.grid = this.grid.filter(row => row.some(cell => cell === 0));
      const linesCleared = this.rows - this.grid.length;
      for (let i = 0; i < linesCleared; i++) {
        this.grid.unshift(Array(this.cols).fill(0)); // add empty rows at the top
      }
      return linesCleared; // return number of lines cleared
    }
  
    // additional methods for rendering, checking game over, etc.
  }