import "./styles.css";
import Gameboard from "./Gameboard.js";
import { renderPOneBoard, renderPTwoBoard } from "./renderBoards.js";
import { Human, Computer } from "./Player.js";

function initializeGame() {
    const players = createPlayers();
    const human = players.human;
    const computer = players.computer;

    renderPOneBoard(human.board.board);
    renderPTwoBoard(computer.board.board);
}

function createPlayers() {
    const human = new Human();
    const computer = new Computer();
    return { human, computer };
};

initializeGame();
