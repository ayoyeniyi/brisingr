export default class Gameboard {
    constructor() {
        this.board = this.initializeBoard();
    }

    initializeBoard() {
        const board = [];
        for (let i = 1; i <= 10; i++) {
            const row = [];
            for (let j = 1; j <= 10; j++) {
                const cell = [{ ship: null, attacked: false }];
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
console.log(playerBoard.board);
