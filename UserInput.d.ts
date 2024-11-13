/**
 * Process user input through keyboard events,
 * communicate with game object.
 */
export declare class UserInput {
    game: any;
    constructor(game: any);
    bindEvents(): void;
    handleKeyDown(event: KeyboardEvent): void;
}
