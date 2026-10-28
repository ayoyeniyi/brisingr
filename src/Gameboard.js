export default class Gameboard {
    constructor() {
        this.board = this.initializeBoard();
        this.missedAttacks = [];
        this.ships = 0;
        this.allAreSunk = false;
        this.fleetLengths = [5, 4, 3, 3, 2];
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
        if (!this.canPlace(x, y, ship, orientation)) {
            throw new Error("You can't place a ship here!");
        }

        if (orientation === "vertical") {
            for (let i = 0; i < ship.length; i++) {
                let cell = this.board[x + i][y];
                cell.ship = ship;
            }
            this.ships++;
        }

        if (orientation === "horizontal") {
            for (let i = 0; i < ship.length; i++) {
                let cell = this.board[x][y + i];
                cell.ship = ship;
            }
            this.ships++;
        }
    }

    //helper to check if cells are occupied or out of bounds
    canPlace(x, y, ship, orientation) {
        for (let i = 0; i < ship.length; i++) {
            if (orientation === "vertical") {
                if (x + i > 9) {
                    return false;
                }
                let cell = this.board[x + i][y];
                if (cell.ship !== null) {
                    return false;
                }
            }

            if (orientation === "horizontal") {
                if (y + i > 9) {
                    return false;
                }
                let cell = this.board[x][y + i];
                if (cell.ship !== null) {
                    return false;
                }
            }
        }

        return true;
    }

    scanBoard(ship) {
        const shipCoordinates = [];
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const cell = this.board[i][j];
                if (cell.ship === ship) {
                    shipCoordinates.push([i, j]);
                }
            }
        }
        return shipCoordinates;
    }

    receiveAttack(x, y) {
        const cell = this.board[x][y];
        const ship = cell.ship;
        if (cell.attacked) {
            throw new Error("You've already attacked this cell!");
        }
        
        cell.attacked = true;
        if (ship !== null) {
            ship.hit();
            if (ship.isSunk()) this.ships--;
            if (this.ships === 0) this.allAreSunk = true;
        } else {
            this.missedAttacks.push([x, y]);
        }
    }

    checkValidAttack(x, y) {
        const cell = this.board[x][y];
        return !cell.attacked;
    }

    clearBoard() {
        this.board = this.initializeBoard();
        this.ships = 0;
    }
}
