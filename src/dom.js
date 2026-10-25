import { populateBoardRandomly, renderBoard } from "./boardMethods.js";

function createBoardClickHandler(number, gameboard, attackPlayer) {
    console.log("clicked!");
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

export { createBoardClickHandler, createRandomizeButtonHandler };
