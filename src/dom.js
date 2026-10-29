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

function createCellDragStartHandler(gameboard) {
    const board = document.querySelector(".board-one");
    board.addEventListener("dragstart", (event) => {
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
            cell.classList.add("dragging");
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
            STORE = [];
        }
    });
}

function createCellDragOverHandler(gameboard) {
    const board = document.querySelector(".board-one");
    board.addEventListener("dragover", (event) => {
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
        if (!event.target.classList.contains("cell")) {
            return;
        }

        const x = parseInt(event.target.dataset.x, 10);
        const y = parseInt(event.target.dataset.y, 10);
        const [prevX, prevY] = STORE.pop();
        gameboard.removeShip(prevX, prevY);
        renderBoard(gameboard.board, "one", true);
        console.log([prevX, prevY]);
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
