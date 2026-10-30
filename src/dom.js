import { populateBoardRandomly, renderBoard } from "./boardMethods.js";

let STORE = [];

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

function createRandomizeButtonHandler(gameboard, gameState = { settingUp: true }) {
    const randomizeButton = document.querySelector(".randomize");
    randomizeButton.addEventListener("click", () => {
        if (!gameState.settingUp) {
            return;
        }
        gameboard.clearBoard();
        populateBoardRandomly(gameboard, "one");
        renderBoard(gameboard.board, "one", true, gameState.settingUp);
    });
}

function disableRandomizeButton() {
    const randomizeButton = document.querySelector(".randomize");
    randomizeButton.disabled = true;
}

function createCellDragStartHandler(gameboard, gameState = { settingUp: true }) {
    const board = document.querySelector(".board-one");
    board.addEventListener("dragstart", (event) => {
        if (!gameState.settingUp) {
            event.preventDefault();
            return;
        }
        if (!event.target.classList.contains("cell")) {
            return;
        }
        const x = parseInt(event.target.dataset.x, 10);
        const y = parseInt(event.target.dataset.y, 10);
        STORE.push([x, y]);
        
        const ship = gameboard.board[x][y].ship;
        const coords = gameboard.scanBoard(ship);
        for (let i = 0; i < coords.length; i++) {
            const [cx, cy] = coords[i];
            const cell = document.getElementById(`player-one-${cx}-${cy}`);
            if (cell) {
                cell.classList.add("dragging");
            }
        }
    });
}

function createCellDragEndHandler() {
    const board = document.querySelector(".board-one");
    board.addEventListener("dragend", (event) => {
        if (!event.target.classList.contains("cell")) {
            return;
        }

        const cells = document.querySelectorAll(".dragging");
        for (let i = 0; i < cells.length; i++) {
            cells[i].classList.remove("dragging");
        }
        STORE.length = 0;
    });
}

function createCellDragOverHandler(gameboard, gameState = { settingUp: true }) {
    const board = document.querySelector(".board-one");
    board.addEventListener("dragover", (event) => {
        if (!gameState.settingUp) {
            return;
        }
        if (!event.target.classList.contains("cell")) {
            return;
        }

        const x = parseInt(event.target.dataset.x, 10);
        const y = parseInt(event.target.dataset.y, 10);
        const ship = gameboard.board[x][y].ship;

        if (ship === null) {
            event.preventDefault();
        }
    });

    board.addEventListener("drop", (event) => {
        if (!gameState.settingUp) {
            return;
        }
        if (!event.target.classList.contains("cell")) {
            return;
        }

        const x = parseInt(event.target.dataset.x, 10);
        const y = parseInt(event.target.dataset.y, 10);
        const [prevX, prevY] = STORE.pop();
        gameboard.moveShip(prevX, prevY, x, y);
        renderBoard(gameboard.board, "one", true, gameState.settingUp);
    });
}

export {
    createBoardClickHandler,
    createRandomizeButtonHandler,
    disableRandomizeButton,
    createCellDragStartHandler,
    createCellDragEndHandler,
    createCellDragOverHandler,
};
