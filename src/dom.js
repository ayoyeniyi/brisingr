import { populateBoardRandomly, renderBoard } from "./boardMethods.js";

function createBoardClickHandler(number, gameboard, attackPlayer) {
    const board = document.querySelector(`.board-${number}`);
    board.addEventListener("click", (event) => {
        if (!event.target.classList.contains("cell")) {
            return;
        }
        const x = parseInt(event.target.dataset.x, 10);
        const y = parseInt(event.target.dataset.y, 10);
        attackPlayer(x, y, gameboard);
    });
}

function createRandomizeButtonHandler(gameboard) {
    const randomizeButton = document.querySelector(".randomize");
    randomizeButton.addEventListener("click", () => {
        gameboard.clearBoard();
        populateBoardRandomly(gameboard, "one");
        renderBoard(gameboard.board, "one", true);
    });
}

function disableRandomizeButton() {
    const randomizeButton = document.querySelector(".randomize");
    randomizeButton.disabled = true;
}

function createCellDragHandler(gameboard) {
    const board = document.querySelector(".board-one");
    board.addEventListener("dragstart", (event) => {
        if (!event.target.classList.contains("cell")) {
            return;
        }
        const x = parseInt(event.target.dataset.x, 10);
        const y = parseInt(event.target.dataset.y, 10);
        const ship = gameboard.board[x][y].ship;
        const coords = gameboard.scanBoard(ship);
        for (let i = 0; i < coords.length; i++) {
            const [cx, cy] = coords[i];
            const cell = document.getElementById(`player-one-${cx}-${cy}`);
            cell.classList.add("dragging");
        }
    });
}

export { createBoardClickHandler, createRandomizeButtonHandler, disableRandomizeButton, createCellDragHandler };
