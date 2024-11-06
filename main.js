import { Game } from './Game.js';
import { Board } from './Board.js';
import { UserInput } from './UserInput.js'
import { GraphicsManager } from './GraphicsManager.js';

const canvas = document.getElementById("canvas");
canvas.width = 300;  // set the width of the canvas
canvas.height = 600; // set the height of the canvas

const cellSize = 30; // define the size of each cell
const rows = canvas.height / cellSize; // calculate the number of rows based on the canvas height
const cols = canvas.width / cellSize; // calculate the number of columns based on the canvas width

const graphicsManager = new GraphicsManager
                    (canvas, 
                        { grid: Array.from({ length: rows }, () => Array(cols).fill(0)) });

// Render the grid
function render() {
    graphicsManager.clear(); // clear the canvas
    graphicsManager.drawGrid(); // draw the grid
}
  
render();