export default class Ship {
    constructor(length) {
        this.length = length;
        this.hitAmount = 0;
        this.sunk = false;
        this.orientation = null;
    }

    hit() {
        this.hitAmount++;
    }

    isSunk() {
        if (this.length !== 0 && this.hitAmount >= this.length) {
            this.sunk = true;
        }
        return this.sunk;
    }
}
