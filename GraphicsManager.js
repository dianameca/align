import { Board } from "./Board";

export class GraphicsManager {
    constructor(canvas, board) {
      this.canvas = canvas;
      this.context = canvas.getContext('2d');
      this.board = board; // Reference to the game board
      this.cellSize = 30; // Size of each cell in pixels
    }
  
    clear() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGrid() {
        this.context.strokeStyle = 'rgba(200, 200, 200, 0.5)'; // Light gray color for grid lines
        for (let x = 0; x <= this.canvas.width; x += this.cellSize) {
          this.context.beginPath();
          this.context.moveTo(x, 0);
          this.context.lineTo(x, this.canvas.height);
          this.context.stroke();
        }
        for (let y = 0; y <= this.canvas.height; y += this.cellSize) {
          this.context.beginPath();
          this.context.moveTo(0, y);
          this.context.lineTo(this.canvas.width, y);
          this.context.stroke();
        }
      }
  
    drawBoard() {
      for (let y = 0; y < this.board.grid.length; y++) {
        for (let x = 0; x < this.board.grid[y].length; x++) {
          if (this.board.grid[y][x]) {
            this.drawCell(x, y, this.board.grid[y][x]);
          }
        }
      }
    }
  
    drawTetromino(tetromino) {
      const shape = tetromino.getCurrentShape();
      shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            this.drawCell(tetromino.x + x, tetromino.y + y, value);
          }
        });
      });
    }
  
    drawCell(x, y, value) {
      const colors = ['transparent', 'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red']; // Define colors for each tetromino type
      this.context.fillStyle = colors[value];
      this.context.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
      this.context.strokeStyle = 'black';
      this.context.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize); // Draw border
    }
  
    displayScore(score) {
      this.context.fillStyle = 'white';
      this.context.font = '24px Arial';
      this.context.fillText(`Score: ${score}`, 10, 30);
    }
  
    render(tetromino, score) {
      this.clear(); // Clear the canvas for the next frame
      this.drawBoard(); // Draw the current state of the board
      this.drawTetromino(tetromino); // Draw the current tetromino
      this.displayScore(score); // Draw the score
    }
  }