const gridSize = 4;
let board = [];
let score = 0;
let bestScore = parseInt(localStorage.getItem('bestScore2048')) || 0;

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    initGame();
});

function initGame() {
    board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    score = 0;
    updateScore(0);

    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    gameBoard.style.gridTemplateColumns = 'repeat(4, 1fr)';
    gameBoard.style.gridTemplateRows = 'repeat(4, 1fr)';

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = `tile-${i}-${j}`;
            gameBoard.appendChild(tile);
        }
    }

    addRandomTile();
    addRandomTile();
    updateBoard();
}

function addRandomTile() {
    const emptyCells = [];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === 0) {
                emptyCells.push({ row: i, col: j });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
}

function updateBoard() {
    const gameBoard = document.getElementById('gameBoard');

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const tile = document.getElementById(`tile-${i}-${j}`);
            const value = board[i][j];

            tile.className = 'tile';
            tile.innerHTML = '';

            if (value !== 0) {
                tile.classList.add(`tile-${value}`);
                const valueSpan = document.createElement('span');
                valueSpan.className = 'tile-value';
                valueSpan.textContent = value;
                tile.appendChild(valueSpan);
            }
        }
    }
}

function animateTileMove(tileElement, fromRow, fromCol, toRow, toCol) {
    const deltaRow = toRow - fromRow;
    const deltaCol = toCol - fromCol;

    // Calculate pixel movement based on grid position
    const tileSize = 80; // Approximate tile size including gap
    const rowDelta = deltaRow * (tileSize + 8); // tile size + gap
    const colDelta = deltaCol * (tileSize + 8);

    tileElement.classList.add('moving');
    tileElement.style.setProperty('--tx', colDelta + 'px');
    tileElement.style.setProperty('--ty', rowDelta + 'px');

    // Remove animation class after transition completes
    setTimeout(() => {
        tileElement.classList.remove('moving');
    }, 120);
}

function moveLeft() {
    let moved = false;
    let newBoard = board.map(row => [...row]);
    let moves = [];

    for (let i = 0; i < gridSize; i++) {
        let row = [];
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] !== 0) {
                row.push({ value: board[i][j], row: i, col: j });
            }
        }

        if (row.length === 0) continue;

        let merged = [];
        let skip = false;
        for (let j = 0; j < row.length; j++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (j < row.length - 1 && row[j].value === row[j + 1].value) {
                merged.push({ value: row[j].value * 2, row: row[j].row, col: 0 });
                score += row[j].value * 2;
                skip = true;
            } else {
                merged.push({ value: row[j].value, row: row[j].row, col: 0 });
            }
        }

        while (merged.length < gridSize) {
            merged.push({ value: 0, row: 0, col: 0 });
        }

        let rowChanged = false;
        for (let j = 0; j < gridSize; j++) {
            if (newBoard[i][j] !== merged[j].value) {
                rowChanged = true;
                if (merged[j].value !== 0) {
                    moves.push({
                        tile: document.getElementById(`tile-${i}-${j}`),
                        fromRow: i,
                        fromCol: j,
                        toRow: i,
                        toCol: j
                    });
                }
            }
            newBoard[i][j] = merged[j].value;
        }

        if (rowChanged) {
            moved = true;
        }
    }

    board = newBoard;
    if (moved) {
        // Animate moves first, then add tile and update
        animateMoves(moves, function() {
            addRandomTile();
            updateBoard();
            updateScore(score);
            checkGameOver();
        });
    }
}

function moveRight() {
    let moved = false;
    let newBoard = board.map(row => [...row]);
    let moves = [];

    for (let i = 0; i < gridSize; i++) {
        let row = [];
        for (let j = gridSize - 1; j >= 0; j--) {
            if (board[i][j] !== 0) {
                row.push({ value: board[i][j], row: i, col: j });
            }
        }

        if (row.length === 0) continue;

        let merged = [];
        let skip = false;
        for (let j = 0; j < row.length; j++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (j < row.length - 1 && row[j].value === row[j + 1].value) {
                merged.push({ value: row[j].value * 2, row: row[j].row, col: gridSize - 1 });
                score += row[j].value * 2;
                skip = true;
            } else {
                merged.push({ value: row[j].value, row: row[j].row, col: gridSize - 1 });
            }
        }

        while (merged.length < gridSize) {
            merged.push({ value: 0, row: 0, col: 0 });
        }

        merged.reverse();

        let rowChanged = false;
        for (let j = 0; j < gridSize; j++) {
            if (newBoard[i][j] !== merged[j].value) {
                rowChanged = true;
                if (merged[j].value !== 0) {
                    moves.push({
                        tile: document.getElementById(`tile-${i}-${j}`),
                        fromRow: i,
                        fromCol: j,
                        toRow: i,
                        toCol: j
                    });
                }
            }
            newBoard[i][j] = merged[j].value;
        }

        if (rowChanged) {
            moved = true;
        }
    }

    board = newBoard;
    if (moved) {
        animateMoves(moves, function() {
            addRandomTile();
            updateBoard();
            updateScore(score);
            checkGameOver();
        });
    }
}

function moveUp() {
    let moved = false;
    let newBoard = board.map(row => [...row]);
    let moves = [];

    for (let j = 0; j < gridSize; j++) {
        let column = [];
        for (let i = 0; i < gridSize; i++) {
            if (board[i][j] !== 0) {
                column.push({ value: board[i][j], row: i, col: j });
            }
        }

        if (column.length === 0) continue;

        let merged = [];
        let skip = false;
        for (let i = 0; i < column.length; i++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (i < column.length - 1 && column[i].value === column[i + 1].value) {
                merged.push({ value: column[i].value * 2, row: 0, col: j });
                score += column[i].value * 2;
                skip = true;
            } else {
                merged.push({ value: column[i].value, row: 0, col: j });
            }
        }

        while (merged.length < gridSize) {
            merged.push({ value: 0, row: 0, col: 0 });
        }

        let colChanged = false;
        for (let i = 0; i < gridSize; i++) {
            if (newBoard[i][j] !== merged[i].value) {
                colChanged = true;
                if (merged[i].value !== 0) {
                    moves.push({
                        tile: document.getElementById(`tile-${i}-${j}`),
                        fromRow: i,
                        fromCol: j,
                        toRow: i,
                        toCol: j
                    });
                }
            }
            newBoard[i][j] = merged[i].value;
        }

        if (colChanged) {
            moved = true;
        }
    }

    board = newBoard;
    if (moved) {
        animateMoves(moves, function() {
            addRandomTile();
            updateBoard();
            updateScore(score);
            checkGameOver();
        });
    }
}

function moveDown() {
    let moved = false;
    let newBoard = board.map(row => [...row]);
    let moves = [];

    for (let j = 0; j < gridSize; j++) {
        let column = [];
        for (let i = gridSize - 1; i >= 0; i--) {
            if (board[i][j] !== 0) {
                column.push({ value: board[i][j], row: i, col: j });
            }
        }

        if (column.length === 0) continue;

        let merged = [];
        let skip = false;
        for (let i = 0; i < column.length; i++) {
            if (skip) {
                skip = false;
                continue;
            }
            if (i < column.length - 1 && column[i].value === column[i + 1].value) {
                merged.push({ value: column[i].value * 2, row: gridSize - 1, col: j });
                score += column[i].value * 2;
                skip = true;
            } else {
                merged.push({ value: column[i].value, row: gridSize - 1, col: j });
            }
        }

        while (merged.length < gridSize) {
            merged.push({ value: 0, row: gridSize - 1, col: 0 });
        }

        merged.reverse();

        let colChanged = false;
        for (let i = 0; i < gridSize; i++) {
            if (newBoard[i][j] !== merged[i].value) {
                colChanged = true;
                if (merged[i].value !== 0) {
                    moves.push({
                        tile: document.getElementById(`tile-${i}-${j}`),
                        fromRow: i,
                        fromCol: j,
                        toRow: i,
                        toCol: j
                    });
                }
            }
            newBoard[i][j] = merged[i].value;
        }

        if (colChanged) {
            moved = true;
        }
    }

    board = newBoard;
    if (moved) {
        animateMoves(moves, function() {
            addRandomTile();
            updateBoard();
            updateScore(score);
            checkGameOver();
        });
    }
}

function animateMoves(moves, callback) {
    if (moves.length === 0) {
        callback();
        return;
    }

    // Animate each move sequentially
    let completed = 0;

    moves.forEach(function(move, index) {
        // Add moving class before the move
        move.tile.classList.add('moving');

        // Force reflow to ensure transition works
        move.tile.offsetHeight;

        // Set the transform
        const colDelta = move.toCol - move.fromCol;
        const rowDelta = move.toRow - move.fromRow;
        const tileSize = 80;
        const colPixel = colDelta * (tileSize + 8);
        const rowPixel = rowDelta * (tileSize + 8);

        move.tile.style.transform = `translate(${colPixel}px, ${rowPixel}px)`;

        // After animation completes
        setTimeout(function() {
            move.tile.classList.remove('moving');
            move.tile.style.transform = '';
            completed++;

            if (completed === moves.length) {
                callback();
            }
        }, 120);
    });
}

function updateScore(points) {
    document.getElementById('score').textContent = score;

    if (bestScore > 0) {
        document.getElementById('bestScore').textContent = bestScore;
    }
}

function checkGameOver() {
    // Check if there are any empty cells
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (board[i][j] === 0) return;
        }
    }

    // Check if any adjacent tiles can be merged
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const current = board[i][j];

            // Check right
            if (j < gridSize - 1 && board[i][j + 1] === current) return;

            // Check down
            if (i < gridSize - 1 && board[i + 1][j] === current) return;
        }
    }

    // Game over
    document.getElementById('finalScore').textContent = score;
    setTimeout(() => {
        document.getElementById('gameOverOverlay').classList.add('active');
    }, 500);
}

// Keyboard controls
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
            event.preventDefault();
            moveLeft();
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            event.preventDefault();
            moveRight();
            break;
        case 'ArrowUp':
        case 'w':
        case 'W':
            event.preventDefault();
            moveUp();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            event.preventDefault();
            moveDown();
            break;
    }
});