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

    placeShips(x, y) {}

    receiveAttack(x, y) {}
}

const playerBoard = new Gameboard();
console.log(playerBoard.board[0][0]);
