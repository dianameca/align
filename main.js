import { Game } from './Game.js';
import { Board } from './Board.js';
import { GraphicsManager } from './GraphicsManager.js';
import { UserInput } from './UserInput.js';


const canvas = document.getElementById("canvas");
const board = new Board(20, 10);
const game = new Game(canvas, board); 
const userInput = new UserInput(game);

// initialize GraphicsManager
const graphicsManager = new GraphicsManager(canvas, { grid: [] });

function render() {
  graphicsManager.clear(); // Clear the canvas for the next frame
  graphicsManager.drawGrid(); // Draw the grid
}

// initial rendering
render();

window.addEventListener('resize', () => {
  graphicsManager.setCanvasSize(); 
  graphicsManager.updateGridSize(); 
  render(); // re-render grid after size update
});
