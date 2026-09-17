export default class Ship {
    constructor() {
        this.length = 0;
        this.hitAmount = 0;
        this.sunk = false;
    }

    hit() {
        this.hitAmount++;
    }

    isSunk() {
        if (
            this.length !== 0 &&
            this.length >= this.hitAmount
        ) {
            this.sunk = true;
        }
        return this.sunk;
    }
}
