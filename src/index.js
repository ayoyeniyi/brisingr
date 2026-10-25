import "./styles.css";
import { renderBoard, populateBoardRandomly } from "./boardMethods.js";
import { createPlayers, generateRandomCoordinate } from "./helpers.js";
import { createBoardClickHandler } from "./dom.js";

function initializeGame() {
    const players = createPlayers();
    const human = players.human;
    const computer = players.computer;
    let currentPlayer = "human";

    function attackPlayer(x, y, gameboard) {
        if (currentPlayer === "human") {
            gameboard.receiveAttack(x, y);
            renderBoard(gameboard.board, "two", false);
            if (gameboard.allAreSunk) {
                alert("All ships have been sunk! You win!");
                renderBoard(gameboard.board, "two", false);
            } else {
                currentPlayer = "computer";
                computerAttack(human.board);
            }
        }
    }

    function computerAttack(gameboard) {
        if (currentPlayer === "computer") {
            let [x, y] = [generateRandomCoordinate(), generateRandomCoordinate()];
            while (!gameboard.checkValidAttack(x, y)) {
                [x, y] = [generateRandomCoordinate(), generateRandomCoordinate()];
            }

            gameboard.receiveAttack(x, y);
            renderBoard(gameboard.board, "one", true);
            if (gameboard.allAreSunk) {
                alert("All ships have been sunk! The computer wins!");
                renderBoard(gameboard.board, "two", false);
            } else {
                currentPlayer = "human";
            }
        }
    }

    createBoardClickHandler("two", computer.board, attackPlayer);

    populateBoardRandomly(human.board, "one");
    populateBoardRandomly(computer.board, "two");
    renderBoard(human.board.board, "one", true);
    renderBoard(computer.board.board, "two", false);
}

initializeGame();
