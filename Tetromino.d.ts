/**
 * Tetromino block definition and functionality.
 * Shape and color constant maps tetromino types to attributes.
 *    - shape: array of matrices where each matrix represents a rotation state,
 *      matrix uses 1s and 0s to define filled (1) and empty (0) blocks of the shape.
 *    - color
 *    - currentRotation: tracks rotation state in the shape array
 *    - current x and y offset on the game grid
 */
interface TetrominoShape {
    shape: number[][][];
    color: string;
}
declare const TETROMINOS: {
    [key: string]: TetrominoShape;
};
export declare class Tetromino {
    shape: number[][][];
    color: string;
    currentRotation: number;
    x: number;
    y: number;
    constructor(type: keyof typeof TETROMINOS);
    rotate(): void;
    getCurrentShape(): number[][];
}
export {};
