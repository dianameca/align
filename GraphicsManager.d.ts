/**
 * Manages rendering on the canvas.
 *    - Canvas Sizing
 *    - Grid Management
 *    - Drawing Elements
 *    - Score Display
 */
export declare class GraphicsManager {
    private canvas;
    private context;
    private board;
    private cellSize;
    private rows;
    private cols;
    constructor(canvas: HTMLCanvasElement, board: any);
    setCanvasSize(): void;
    updateGridSize(): void;
    clear(): void;
    drawGrid(): void;
    private drawBoard;
    private drawTetromino;
    private drawCell;
    private displayScore;
    render(tetromino: any, score: number): void;
}
