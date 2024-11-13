import { Board } from './Board';
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
export declare class Game {
    private canvas;
    private board;
    private graphicsManager;
    private score;
    private currentTetromino;
    private isGameOver;
    constructor(canvas: HTMLCanvasElement, board: Board);
    start(): void;
    spawnTetromino(): void;
    gameLoop(): void;
    moveTetrominoDown(): void;
    moveTetromino(dx: number, dy: number): void;
    rotateTetromino(): void;
    isValidMove(x: number, y: number, shape: number[][]): boolean;
}
