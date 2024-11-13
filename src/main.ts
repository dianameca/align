import { Game } from './Game';
import { Board } from './Board';
import { GraphicsManager } from './GraphicsManager';
import { UserInput } from './UserInput';


const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const board = new Board(20, 10, canvas);
const game = new Game(canvas, board);
const userInput = new UserInput(game);

// initialize GraphicsManager
const graphicsManager = new GraphicsManager(canvas, { grid: [] });

function render(): void {
  graphicsManager.clear(); // clear the canvas for the next frame
  graphicsManager.drawGrid(); // draw the grid
}

// initial rendering
render();

window.addEventListener('resize', () => {
  graphicsManager.setCanvasSize();
  graphicsManager.updateGridSize();
  render(); // re-render grid after size update
});