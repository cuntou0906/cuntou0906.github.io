// Minesweeper game implementation
let GRID_SIZE = 8;
let MINES = 10;
let gameBoard = [];
let gameActive = false;
let timer = 0;
let timerInterval;

document.addEventListener('DOMContentLoaded', () => {
    // 默认加载初级难度
    initGame(8, 10);

    // 难度选择下拉框
    const difficultySelect = document.getElementById('difficulty-select');
    difficultySelect.addEventListener('change', () => {
        const selectedOption = difficultySelect.options[difficultySelect.selectedIndex];
        const size = parseInt(selectedOption.dataset.size);
        const mines = parseInt(selectedOption.dataset.mines);
        initGame(size, mines);
    });
});

function initGame(gridSize, mineCount) {
    GRID_SIZE = gridSize;
    MINES = mineCount;

    gameActive = true;
    timer = 0;
    clearInterval(timerInterval);

    gameBoard = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill().map(() => ({})));

    placeMines();

    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;

    // 移除旧的尺寸类
    grid.classList.remove('wide', 'expert');

    // 根据难度添加尺寸类
    if (GRID_SIZE >= 16) {
        grid.classList.add('wide');
    }
    if (GRID_SIZE >= 20) {
        grid.classList.add('expert');
    }

    createGrid();
    updateStatus('游戏开始! 🎮');
    startTimer();
}

function placeMines() {
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        const x = Math.floor(Math.random() * GRID_SIZE);
        const y = Math.floor(Math.random() * GRID_SIZE);
        if (!gameBoard[x][y].isMine) {
            gameBoard[x][y].isMine = true;
            minesPlaced++;
        }
    }
}

function createGrid() {
    const grid = document.getElementById('grid');

    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;

            cell.addEventListener('click', handleCellClick);
            cell.addEventListener('contextmenu', handleCellRightClick);

            grid.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    if (!gameActive) return;

    const cell = e.target;
    const x = parseInt(cell.dataset.x);
    const y = parseInt(cell.dataset.y);

    if (gameBoard[x][y].isMine) {
        gameOver();
        return;
    }

    revealCell(x, y);
}

function handleCellRightClick(e) {
    e.preventDefault();
    if (!gameActive) return;

    const cell = e.target;
    if (cell.classList.contains('flag')) {
        cell.classList.remove('flag');
    } else {
        cell.classList.add('flag');
    }
}

function revealCell(x, y) {
    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    if (!cell || cell.classList.contains('revealed')) return;

    cell.classList.remove('flag');
    cell.classList.add('revealed');

    const mines = countAdjacentMines(x, y);
    if (mines > 0) {
        cell.textContent = mines;
        cell.classList.add(`cell-${mines}`);
    } else {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE) {
                    revealCell(nx, ny);
                }
            }
        }
    }

    // 检查是否胜利
    checkWin();
}

function countAdjacentMines(x, y) {
    let count = 0;
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            const nx = x + dx;
            const ny = y + dy;
            if (nx >= 0 && nx < GRID_SIZE && ny >= 0 && ny < GRID_SIZE && gameBoard[nx][ny].isMine) {
                count++;
            }
        }
    }
    return count;
}

function gameOver() {
    gameActive = false;
    clearInterval(timerInterval);

    for (let x = 0; x < GRID_SIZE; x++) {
        for (let y = 0; y < GRID_SIZE; y++) {
            if (gameBoard[x][y].isMine) {
                const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                cell.classList.add('revealed');
                cell.textContent = '💣';
            }
        }
    }

    updateStatus('游戏结束! 😢');
}

function checkWin() {
    const cells = document.querySelectorAll('.cell');
    let allRevealed = true;

    cells.forEach(cell => {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        if (!gameBoard[x][y].isMine && !cell.classList.contains('revealed')) {
            allRevealed = false;
        }
    });

    if (allRevealed && gameActive) {
        gameActive = false;
        clearInterval(timerInterval);
        updateStatus('恭喜胜利! 🎉');

        // 显示所有旗帜在地雷上
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
                if (gameBoard[x][y].isMine) {
                    const cell = document.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
                    cell.classList.add('flag');
                }
            }
        }
    }
}

function updateStatus(message) {
    const status = document.querySelector('.status');
    // 更新状态文本,保留 timer span
    status.innerHTML = message + ' <span id="timer">00:00</span>';
    if (message.includes('游戏结束')) {
        status.style.color = '#ff6b6b';
    } else if (message.includes('恭喜胜利')) {
        status.style.color = '#64dd17';
    } else {
        status.style.color = '#c5cae9';
    }
}

function startTimer() {
    timer = 0;
    timerInterval = setInterval(() => {
        timer++;
        const minutes = Math.floor(timer / 60).toString().padStart(2, '0');
        const seconds = (timer % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;
    }, 1000);
}