import Gameboard from "../src/Gameboard";
import Ship from "../src/Ship";

//helper function to check if ships are placed/cells are occupied
function shipWasPlaced(x, y, shipLength, orientation, board) {
    for (let i = 0; i < shipLength; i++) {
        if (orientation === "vertical") {
            let cell = board[x + i][y];
            if (cell.ship === null) {
                return false;
            }
        }

        if (orientation === "horizontal") {
            let cell = board[x][y + i];
            if (cell.ship === null) {
                return false;
            }
        }
    }
    return true;
}

test("board is initialized and has a length of 10", () => {
    const newBoard = new Gameboard();
    expect(newBoard.board.length).toBe(10);
});

test("each row has a length of 10", () => {
    const newBoard = new Gameboard();
    function rowsHaveLength10(board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i].length !== 10) return false;
        }
        return true;
    }
    expect(rowsHaveLength10(newBoard.board)).toBe(true);
});

test("a cell is an object with the ship and attacked properties", () => {
    const newBoard = new Gameboard();
    const cell = newBoard.board[0][0];
    expect(cell).toEqual({ ship: null, attacked: false });
});

test("ships can be placed vertically at the edge", () => {
    const newBoard = new Gameboard();
    const newShip = new Ship(3);
    newBoard.placeShips(7, 4, newShip, "vertical");
    expect(shipWasPlaced(7, 4, 3, "vertical", newBoard.board)).toBe(true);
});

test("ships can be placed horizontally at the edge", () => {
    const newBoard = new Gameboard();
    const newShip = new Ship(3);
    newBoard.placeShips(9, 7, newShip, "horizontal");
    expect(shipWasPlaced(9, 7, 3, "horizontal", newBoard.board)).toBe(true);
});

test("error is thrown if ships are placed past the edge", () => {
    const newBoard = new Gameboard();
    const newShip = new Ship(3);
    expect(() => newBoard.placeShips(8, 4, newShip, "vertical")).toThrow();
});

test("error is thrown if ships are placed on already occupied cells", () => {
    const newBoard = new Gameboard();
    const newShip = new Ship(3);
    const newerShip = new Ship(3);
    newBoard.placeShips(7, 4, newShip, "vertical");
    expect(() => newBoard.placeShips(8, 3, newerShip, "horizontal")).toThrow();
});

test("ships on the gameboard accurately receive attacks", () => {
    const newBoard = new Gameboard();
    const newShip = new Ship(3);
    newBoard.placeShips(7, 4, newShip, "vertical");
    newBoard.receiveAttack(7, 4);
    expect(newShip.hitAmount).toBe(1);
});

test("unoccupied attacked cells are accurately recorded as missed", () => {
    const newBoard = new Gameboard();
    newBoard.receiveAttack(7, 3);
    newBoard.receiveAttack(4, 4);
    newBoard.receiveAttack(9, 5);
    expect(newBoard.missedAttacks).toEqual([
        [7, 3],
        [4, 4],
        [9, 5],
    ]);
});
