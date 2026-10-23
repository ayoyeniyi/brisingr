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

export {
    generateRandomIndex,
    generateRandomCoordinate,
    getRandomDirection,
};
