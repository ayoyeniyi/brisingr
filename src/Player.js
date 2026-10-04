import Gameboard from "./Gameboard";
class Player {
    constructor() {
        this.board = new Gameboard;
    }
}

class Human extends Player {}

class Computer extends Player {}

export { Human, Computer };
