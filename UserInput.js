/**
 * Process user input through keyboard events,
 * communicate with game object.
 */

export class UserInput {
    constructor(game) {
      this.game = game; // store a ref to main game instance
      this.bindEvents(); // listen and capture user input
    }
  
    bindEvents() {
      window.addEventListener('keydown', (event) => this.handleKeyDown(event));
    }
  
    handleKeyDown(event) {
      const key = event.key;
  
      switch (key) {
        case 'ArrowLeft':  // left
          this.game.moveTetromino(-1, 0);
          break;
        case 'ArrowRight': // right
          this.game.moveTetromino(1, 0);
          break;
        case 'ArrowDown':  // down faster
          this.game.moveTetromino(0, 1);
          break;
        case 'ArrowUp':    // rotate clockwise
          this.game.rotateTetromino();
          break;
        default:
          break; // ignore the rest for now
      }
    }
}