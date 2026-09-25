import Ship from "./Ship.js";
export default class Gameboard {
    constructor() {
        this.board = this.initializeBoard();
    }

    initializeBoard() {
        const board = [];
        for (let i = 0; i <= 9; i++) {
            const row = [];
            for (let j = 0; j <= 9; j++) {
                const cell = { ship: null, attacked: false };
                row.push(cell);
            }
            board.push(row);
        }
        return board;
    }

    placeShips(x, y, ship, orientation) {
        let cell = this.board[x][y];
        for (let i = 1; i <= ship.length; i++) {
            if (orientation === "vertical") {
                if (cell.ship !== null) {
                    throw new Error(
                        "Can't place ships on already occupied cells!"
                    );
                }
                cell.ship = ship;
                cell = this.board[x + i][y];
                console.log(x + i, y);
            }

            if (orientation === "horizontal") {
                if (cell.ship !== null) {
                    throw new Error(
                        "Can't place ships on already occupied cells!"
                    );
                }
                cell.ship = ship;
                cell = this.board[x][y + i];
                console.log(x, y + i);
            }
        }
    }

    receiveAttack(x, y) {}
}

const playerBoard = new Gameboard();
const ship = new Ship(3);
playerBoard.placeShips(0, 0, ship, "horizontal");
console.log(playerBoard.board);
