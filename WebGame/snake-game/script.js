// 游戏常量
const GRID_SIZE = 20;
const TILE_COUNT = 20;
const INITIAL_SPEED = 150;

// 游戏状态
const GAME_STATE = {
    READY: 'ready',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'game-over'
};

// 方向常量
const DIRECTION = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 }
};

// 蛇类
class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        // 初始位置在画布中央
        this.body = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.direction = DIRECTION.RIGHT;
        this.nextDirection = DIRECTION.RIGHT;
    }

    move() {
        // 更新方向
        this.direction = this.nextDirection;

        // 计算新的头部位置
        const head = { ...this.body[0] };
        head.x += this.direction.x;
        head.y += this.direction.y;

        // 将新头部添加到身体前端
        this.body.unshift(head);

        // 移除尾部（除非吃到食物）
        return this.body.pop();
    }

    grow() {
        // 如果吃到食物，不移除尾部，蛇就变长了
        // 在move方法中，我们已经移除了尾部，所以这里不需要做任何事情
        // 实际上，在游戏主循环中，如果吃到食物，就不会调用removeTail()
    }

    removeTail() {
        this.body.pop();
    }

    setDirection(newDirection) {
        // 防止蛇反向移动（不能直接从右转向左等）
        if (
            (this.direction === DIRECTION.UP && newDirection === DIRECTION.DOWN) ||
            (this.direction === DIRECTION.DOWN && newDirection === DIRECTION.UP) ||
            (this.direction === DIRECTION.LEFT && newDirection === DIRECTION.RIGHT) ||
            (this.direction === DIRECTION.RIGHT && newDirection === DIRECTION.LEFT)
        ) {
            return;
        }
        this.nextDirection = newDirection;
    }

    checkCollision() {
        const head = this.body[0];

        // 检查是否撞墙
        if (
            head.x < 0 ||
            head.x >= TILE_COUNT ||
            head.y < 0 ||
            head.y >= TILE_COUNT
        ) {
            return true;
        }

        // 检查是否撞到自己（跳过头部）
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }

        return false;
    }

    getHead() {
        return this.body[0];
    }
}

// 食物类
class Food {
    constructor() {
        this.position = { x: 0, y: 0 };
        this.generateNewPosition([]);
    }

    generateNewPosition(snakeBody) {
        let newPosition;
        let overlapping;

        // 确保食物不会生成在蛇身上
        do {
            overlapping = false;
            newPosition = {
                x: Math.floor(Math.random() * TILE_COUNT),
                y: Math.floor(Math.random() * TILE_COUNT)
            };

            // 检查是否与蛇身重叠
            for (const segment of snakeBody) {
                if (segment.x === newPosition.x && segment.y === newPosition.y) {
                    overlapping = true;
                    break;
                }
            }
        } while (overlapping);

        this.position = newPosition;
    }
}

// 游戏主类
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById('score');
        this.highScoreElement = document.getElementById('high-score');

        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.highScore = localStorage.getItem('snake-high-score') || 0;
        this.state = GAME_STATE.READY;
        this.speed = INITIAL_SPEED;

        this.highScoreElement.textContent = this.highScore;

        this.setupEventListeners();
        this.draw();
    }

    setupEventListeners() {
        // 按钮事件
        document.getElementById('start-btn').addEventListener('click', () => this.start());
        document.getElementById('pause-btn').addEventListener('click', () => this.pause());
        document.getElementById('restart-btn').addEventListener('click', () => this.restart());

        // 键盘事件
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                this.snake.setDirection(DIRECTION.UP);
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                this.snake.setDirection(DIRECTION.DOWN);
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                this.snake.setDirection(DIRECTION.LEFT);
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                this.snake.setDirection(DIRECTION.RIGHT);
                break;
            case ' ':
                if (this.state === GAME_STATE.READY || this.state === GAME_STATE.GAME_OVER) {
                    this.start();
                } else if (this.state === GAME_STATE.PLAYING) {
                    this.pause();
                } else if (this.state === GAME_STATE.PAUSED) {
                    this.resume();
                }
                break;
            case 'p':
            case 'P':
                if (this.state === GAME_STATE.PLAYING) {
                    this.pause();
                } else if (this.state === GAME_STATE.PAUSED) {
                    this.resume();
                }
                break;
            case 'r':
            case 'R':
                this.restart();
                break;
        }
    }

    start() {
        if (this.state === GAME_STATE.READY || this.state === GAME_STATE.GAME_OVER) {
            this.reset();
        }
        this.state = GAME_STATE.PLAYING;
        this.gameLoop();
    }

    pause() {
        if (this.state === GAME_STATE.PLAYING) {
            this.state = GAME_STATE.PAUSED;
        }
    }

    resume() {
        if (this.state === GAME_STATE.PAUSED) {
            this.state = GAME_STATE.PLAYING;
            this.gameLoop();
        }
    }

    restart() {
        this.reset();
        this.state = GAME_STATE.PLAYING;
        this.gameLoop();
    }

    reset() {
        this.snake.reset();
        this.food.generateNewPosition(this.snake.body);
        this.score = 0;
        this.speed = INITIAL_SPEED;
        this.scoreElement.textContent = this.score;
        this.state = GAME_STATE.READY;
    }

    gameLoop() {
        if (this.state !== GAME_STATE.PLAYING) return;

        setTimeout(() => {
            this.update();
            this.draw();

            if (this.state === GAME_STATE.PLAYING) {
                requestAnimationFrame(() => this.gameLoop());
            }
        }, this.speed);
    }

    update() {
        // 移动蛇
        const tail = this.snake.move();

        // 检查是否吃到食物
        const head = this.snake.getHead();
        if (head.x === this.food.position.x && head.y === this.food.position.y) {
            // 吃到食物，增加分数
            this.score += 10;
            this.scoreElement.textContent = this.score;

            // 生成新食物
            this.food.generateNewPosition(this.snake.body);

            // 每50分增加速度
            if (this.score % 50 === 0) {
                this.speed = Math.max(50, this.speed - 10);
            }
        } else {
            // 没吃到食物，移除尾部
        }

        // 检查碰撞
        if (this.snake.checkCollision()) {
            this.gameOver();
        }
    }

    draw() {
        // 清空画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格背景
        this.drawGrid();

        // 绘制食物
        this.drawFood();

        // 绘制蛇
        this.drawSnake();

        // 如果游戏暂停，显示暂停提示
        if (this.state === GAME_STATE.PAUSED) {
            this.drawPauseOverlay();
        }

        // 如果游戏结束，显示结束提示
        if (this.state === GAME_STATE.GAME_OVER) {
            this.drawGameOverOverlay();
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = '#e0e0e0';
        this.ctx.lineWidth = 0.5;

        // 绘制垂直线
        for (let x = 0; x <= TILE_COUNT; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * GRID_SIZE, 0);
            this.ctx.lineTo(x * GRID_SIZE, TILE_COUNT * GRID_SIZE);
            this.ctx.stroke();
        }

        // 绘制水平线
        for (let y = 0; y <= TILE_COUNT; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * GRID_SIZE);
            this.ctx.lineTo(TILE_COUNT * GRID_SIZE, y * GRID_SIZE);
            this.ctx.stroke();
        }
    }

    drawSnake() {
        // 绘制蛇身
        this.snake.body.forEach((segment, index) => {
            if (index === 0) {
                // 蛇头
                this.ctx.fillStyle = '#4CAF50';
            } else {
                // 蛇身
                this.ctx.fillStyle = '#8BC34A';
            }

            this.ctx.fillRect(
                segment.x * GRID_SIZE,
                segment.y * GRID_SIZE,
                GRID_SIZE - 1,
                GRID_SIZE - 1
            );

            // 添加蛇头的眼睛
            if (index === 0) {
                this.ctx.fillStyle = '#000';
                // 根据方向绘制眼睛
                const eyeSize = GRID_SIZE / 5;
                if (this.snake.direction === DIRECTION.RIGHT) {
                    this.ctx.fillRect(
                        (segment.x + 0.7) * GRID_SIZE,
                        (segment.y + 0.2) * GRID_SIZE,
                        eyeSize,
                        eyeSize
                    );
                    this.ctx.fillRect(
                        (segment.x + 0.7) * GRID_SIZE,
                        (segment.y + 0.7) * GRID_SIZE,
                        eyeSize,
                        eyeSize
                    );
                } else if (this.snake.direction === DIRECTION.LEFT) {
                    this.ctx.fillRect(
                        (segment.x + 0.2) * GRID_SIZE,
                        (segment.y + 0.2) * GRID_SIZE,
                        eyeSize,
                        eyeSize
                    );
                    this.ctx.fillRect(
                        (segment.x + 0.2) * GRID_SIZE,
                        (segment.y + 0.7) * GRID_SIZE,
                        eyeSize,
                        eyeSize
                    );
                } else if (this.snake.direction === DIRECTION.UP) {
                    this.ctx.fillRect(
                        (segment.x + 0.2) * GRID_SIZE,
                        (segment.y + 0.2) * GRID_SIZE,
                        eyeSize,
                        eyeSize
                    );
                    this.ctx.fillRect(
                        (segment.x + 0.7) * GRID_SIZE,
                        (segment.y + 0.2) * GRID_SIZE,
                        eyeSize,
                        eyeSize
                    );
                } else if (this.snake.direction === DIRECTION.DOWN) {
                    this.ctx.fillRect(
                        (segment.x + 0.2) * GRID_SIZE,
                        (segment.y + 0.7) * GRID_SIZE,
                        eyeSize,
                        eyeSize
                    );
                    this.ctx.fillRect(
                        (segment.x + 0.7) * GRID_SIZE,
                        (segment.y + 0.7) * GRID_SIZE,
                        eyeSize,
                        eyeSize
                    );
                }
            }
        });
    }

    drawFood() {
        this.ctx.fillStyle = '#FF5252';
        this.ctx.beginPath();
        const centerX = this.food.position.x * GRID_SIZE + GRID_SIZE / 2;
        const centerY = this.food.position.y * GRID_SIZE + GRID_SIZE / 2;
        const radius = GRID_SIZE / 2 - 1;
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fill();
    }

    drawPauseOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('游戏暂停', this.canvas.width / 2, this.canvas.height / 2);

        this.ctx.font = '16px Arial';
        this.ctx.fillText('按空格键或P键继续', this.canvas.width / 2, this.canvas.height / 2 + 40);
    }

    drawGameOverOverlay() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '30px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('游戏结束', this.canvas.width / 2, this.canvas.height / 2 - 30);

        this.ctx.font = '20px Arial';
        this.ctx.fillText(`最终得分: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 10);

        this.ctx.font = '16px Arial';
        this.ctx.fillText('按R键或点击重新开始按钮重新游戏', this.canvas.width / 2, this.canvas.height / 2 + 50);
    }

    gameOver() {
        this.state = GAME_STATE.GAME_OVER;

        // 更新最高分
        if (this.score > this.highScore) {
            this.highScore = this.score;
            localStorage.setItem('snake-high-score', this.highScore);
            this.highScoreElement.textContent = this.highScore;
        }
    }
}

// 页面加载完成后初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});