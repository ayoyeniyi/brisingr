export default class Ship {
    constructor(length = 0) {
        this.length = length;
        this.hitAmount = 0;
        this.sunk = false;
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
