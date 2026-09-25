import Gameboard from "../src/Gameboard";

test("board is initialized and has a length of 10", () => {
    const newBoard = new Gameboard();
    expect(newBoard.board.length).toBe(10);
});

test("each row has a length of 10", () => {
    const newBoard = new Gameboard();
    expect(newBoard.board.length).toBe(10);
});

test("a cell is an object with the ship and attacked properties", () => {
    const newBoard = new Gameboard();
    const cell = newBoard.board[0][0];
    expect(cell).toEqual({ ship: null, attacked: false });
});
