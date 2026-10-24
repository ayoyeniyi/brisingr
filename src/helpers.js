import { Human, Computer } from "./Player.js";

const DIRECTION_OPTIONS = ["horizontal", "vertical"];

function generateRandomCoordinate() {
    return Math.floor(Math.random() * 10);
}

function generateRandomIndex() {
    return Math.floor(Math.random() * 2);
}

function getRandomDirection() {
    return DIRECTION_OPTIONS[generateRandomIndex()];
}

function createPlayers() {
    const human = new Human();
    const computer = new Computer();
    return { human, computer };
}

export {
    generateRandomIndex,
    generateRandomCoordinate,
    getRandomDirection,
    createPlayers,
};
