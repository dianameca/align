import { Tetromino } from "./Tetromino";
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
export declare class Board {
    private rows;
    private cols;
    private context;
    private cellSize;
    grid: (string | null)[][];
    getCols(): number;
    getRows(): number;
    constructor(rows: number, cols: number, canvas: HTMLCanvasElement);
    isPositionValid(tetromino: Tetromino): boolean;
    placeTetromino(tetromino: Tetromino): void;
    clearFullLines(): number;
    drawTetromino(tetromino: Tetromino): void;
    drawCell(x: number, y: number, color: string): void;
}
