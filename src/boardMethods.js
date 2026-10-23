import { generateRandomCoordinate, getRandomDirection } from "./helpers.js";
import Ship from "./Ship.js";

function renderBoard(gameboard, number, showShips) {
    const board = document.querySelector(`.board-${number}`);
    board.textContent = "";
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < gameboard[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `player-${number}-${i}-${j}`;

            if (gameboard[i][j].attacked && gameboard[i][j].ship == null) {
                cell.classList.add("miss");
            } else if (
                gameboard[i][j].attacked &&
                gameboard[i][j].ship !== null
            ) {
                cell.classList.add("hit");
            } else if (gameboard[i][j].ship !== null && showShips) {
                cell.classList.add("occupied");
            }
            board.append(cell);
        }
    }
}

function populateBoardRandomly(gameboard, boardId) {
    const board = document.getElementById(`${boardId}`);
    board.textContent = "";

    while (gameboard.ships <= 5) {
        const x = generateRandomCoordinate();
        const y = generateRandomCoordinate();
        const direction = getRandomDirection();

        for (let i = 0; i < gameboard.fleetLengths; i++) {
            const ship = new Ship(i);
            gameboard.placeShips(x, y, ship, direction);
        }
    }
}

export { renderBoard };
