import "./styles.css";
import Gameboard from "./Gameboard.js";
import { renderBoard, populateBoardRandomly } from "./boardMethods.js";
import { Human, Computer } from "./Player.js";

function initializeGame() {
    const players = createPlayers();
    const human = players.human;
    const computer = players.computer;

    populateBoardRandomly(human.board, "one");
    populateBoardRandomly(computer.board, "two");
    renderBoard(human.board.board, "one", true);
    renderBoard(computer.board.board, "two", true);
}

function createPlayers() {
    const human = new Human();
    const computer = new Computer();
    return { human, computer };
}

initializeGame();
