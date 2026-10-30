import "./styles.css";
import { renderBoard, populateBoardRandomly } from "./boardMethods.js";
import { createPlayers, generateRandomCoordinate } from "./helpers.js";
import { createBoardClickHandler, createCellDragStartHandler, createCellDragEndHandler, createCellDragOverHandler, createRandomizeButtonHandler, disableRandomizeButton } from "./dom.js";

function initializeGame() {
    const players = createPlayers();
    const human = players.human;
    const computer = players.computer;
    const gameState = { settingUp: true };
    let currentPlayer = "human";

    function gameOver() {
        return human.board.allAreSunk || computer.board.allAreSunk;
    }

    function attackPlayer(x, y, gameboard) {
        if (gameOver()) {
            return;
        }
        if (currentPlayer === "human") {
            if (!gameboard.checkValidAttack(x, y)) {
                return;
            }
            gameState.settingUp = false;
            gameboard.receiveAttack(x, y);
            disableRandomizeButton();
            if (gameboard.allAreSunk) {
                renderBoard(gameboard.board, "two", true, gameState.settingUp);
                setTimeout(() => {
                    alert("All ships have been sunk! You win!");
                }, 100);
            } else {
                renderBoard(gameboard.board, "two", false, gameState.settingUp);
                currentPlayer = "computer";
                computerAttack(human.board);
            }
        }
    }

    function computerAttack(gameboard) {
        if (gameOver()) {
            return;
        }
        if (currentPlayer === "computer") {
            let [x, y] = [
                generateRandomCoordinate(),
                generateRandomCoordinate(),
            ];
            while (!gameboard.checkValidAttack(x, y)) {
                [x, y] = [
                    generateRandomCoordinate(),
                    generateRandomCoordinate(),
                ];
            }

            gameboard.receiveAttack(x, y);
            renderBoard(gameboard.board, "one", true, gameState.settingUp);
            if (gameboard.allAreSunk) {
                alert("All ships have been sunk! The computer wins!");
                renderBoard(gameboard.board, "one", true, gameState.settingUp);
            } else {
                currentPlayer = "human";
            }
        }
    }

    createBoardClickHandler("two", computer.board, attackPlayer);
    createCellDragStartHandler(human.board, gameState);
    createCellDragEndHandler();
    createCellDragOverHandler(human.board, gameState);
    createRandomizeButtonHandler(human.board, gameState);

    populateBoardRandomly(human.board, "one");
    populateBoardRandomly(computer.board, "two");
    renderBoard(human.board.board, "one", true, gameState.settingUp);
    renderBoard(computer.board.board, "two", false, gameState.settingUp);
}

initializeGame();
