const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');
const scoreDrawDisplay = document.getElementById('scoreDraw');

let board, currentPlayer, gameActive, scoreX = 0, scoreO = 0, scoreDraw = 0;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function initializeGame() {
    board = Array(9).fill('');
    currentPlayer = '○';
    gameActive = true;
    statusDisplay.textContent = `次のプレイヤー: ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning');
    });
    clearFireworks();
}

function handleCellClick(event) {
    const index = event.target.getAttribute('data-index');
    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `🎉 勝者: ${currentPlayer}`;
        updateScore(currentPlayer);
        gameActive = false;
        launchFireworks();
    } else if (!board.includes('')) {
        statusDisplay.textContent = '🤝 引き分け！';
        scoreDraw++;
        updateScoreboard();
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === '○' ? '×' : '○';
        statusDisplay.textContent = `次のプレイヤー ${currentPlayer}`;
    }
}

function checkWin() {
    return winningCombinations.find(comb => {
        const [a, b, c] = comb;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            comb.forEach(i => cells[i].classList.add('winning'));
            return true;
        }
        return false;
    });
}

function updateScore(player) {
    if (player === '×') scoreX++;
    else if (player === '○') scoreO++;
    updateScoreboard();
}

function updateScoreboard() {
    scoreXDisplay.textContent = `×: ${scoreX}`;
    scoreODisplay.textContent = `○: ${scoreO}`;
    scoreDrawDisplay.textContent = `引き分け: ${scoreDraw}`;
}

// 花火エフェクトの実装
function launchFireworks() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworksCanvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    resizeCanvas(canvas);

    let particles = [];
    const colors = ['#ff0044', '#ffdd00', '#00ff88', '#44aaff', '#ff00cc'];

    function resizeCanvas(canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createFirework() {
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                size: 4,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 100
            });
        }
    }

    function updateParticles() {
        particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 2;
            if (particle.life <= 0) particles.splice(index, 1);
        });
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
    }

    function animate() {
        updateParticles();
        drawParticles();
        if (particles.length > 0) requestAnimationFrame(animate);
        else setTimeout(() => canvas.remove(), 1000);
    }

    createFirework();
    animate();
}

function clearFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    if (canvas) canvas.remove();
}

restartButton.addEventListener('click', initializeGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

initializeGame();