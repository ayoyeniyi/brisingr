function renderPOneBoard(gameboard, showShips) {
    const board = document.querySelector(".board-one");
    board.textContent = "";
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < gameboard[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `player-one-${i}-${j}`;

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

function renderPTwoBoard(gameboard, showShips) {
    const board = document.querySelector(".board-two");
    board.textContent = "";
    for (let i = 0; i < gameboard.length; i++) {
        for (let j = 0; j < gameboard[i].length; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.id = `player-two-${i}-${j}`;

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
export { renderPOneBoard, renderPTwoBoard };
