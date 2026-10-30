export default class Gameboard {
    constructor() {
        this.board = this.initializeBoard();
        this.missedAttacks = [];
        this.ships = 0;
        this.moving = false;
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
            ship.orientation = "vertical";
            for (let i = 0; i < ship.length; i++) {
                let cell = this.board[x + i][y];
                cell.ship = ship;
            }
            this.moving ? this.ships++ : null;
        }

        if (orientation === "horizontal") {
            ship.orientation = "horizontal";
            for (let i = 0; i < ship.length; i++) {
                let cell = this.board[x][y + i];
                cell.ship = ship;
            }
            this.moving ? this.ships++ : null;
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

    removeShip(x, y) {
        const ship = this.board[x][y].ship;
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                if (this.board[i][j].ship === ship) {
                    this.board[i][j].ship = null;
                }
            }
        }
    }

    moveShip(prevX, prevY, nextX, nextY) {
        const ship = this.board[prevX][prevY].ship;
        const coords = this.scanBoard(ship);

        //Find the ship's current start and orientation.
        const [startX, startY] = coords[0];
        const orientation = ship.orientation;

        //calculate where the start would be after the move
        let startOffset;
        let nextStart;

        if (orientation === "vertical") {
            startOffset = prevX - startX;
            nextStart = nextX - startOffset;
        } else {
            startOffset = prevY - startY;
            nextStart = nextY - startOffset;
        }

        //check if the ship can be placed in the new location
        if (!this.canPlace(nextStart, nextY, ship, orientation)) {
            return;
        }

        //remove the ship from its current location
        this.removeShip(prevX, prevY);

        //place the ship in its new location
        this.placeShips(nextStart, nextY, ship, orientation);
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
