/**
 * Process user input through keyboard events,
 * communicate with game object.
 */

export class UserInput {
  game: any; // reference to the game instance

  constructor(game: any) {
    this.game = game; // store a reference to the main game instance
    this.bindEvents(); // listen and capture user input
  }

  bindEvents(): void {
    window.addEventListener('keydown', (event: KeyboardEvent) => this.handleKeyDown(event));
  }

  handleKeyDown(event: KeyboardEvent): void {
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