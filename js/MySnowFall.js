let heartInterval;
let hearts = [];
let isAnimating = false;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createHeart() {
    if (!isAnimating) return;

    const heart = document.createElement('div');
    heart.className = 'heartFall';
    heart.innerHTML = '❤';
    
    // 随机起始位置
    heart.style.left = random(5, 95) + 'vw';
    
    // 随机大小
    const size = random(8, 15);
    heart.style.fontSize = size + 'px';
    
    // 随机动画持续时间
    const duration = random(7, 9);
    
    // 创建随机轨迹
    let startTime = null;
    const amplitude = random(40, 60);
    const frequency = random(2, 3);
    
    document.body.appendChild(heart);
    hearts.push(heart);
    
    function animate(currentTime) {
        if (!isAnimating) {
            heart.remove();
            return;
        }
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / (duration * 1000);
        
        if (progress < 1) {
            const x = Math.sin(progress * frequency * Math.PI) * amplitude;
            const y = progress * window.innerHeight * 1.1;
            const rotate = Math.sin(progress * frequency * Math.PI * 2) * 15;
            
            heart.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
            requestAnimationFrame(animate);
        } else {
            const index = hearts.indexOf(heart);
            if (index > -1) {
                hearts.splice(index, 1);
            }
            heart.remove();
        }
    }
    
    requestAnimationFrame(animate);
}

function clearHearts() {
    hearts.forEach(heart => heart.remove());
    hearts = [];
    if (heartInterval) {
        clearInterval(heartInterval);
        heartInterval = null;
    }
    isAnimating = false;
}

function startHearts() {
    isAnimating = true;
    setTimeout(() => {
        // 初始创建一些爱心
        for(let i = 0; i < 2; i++) {
            setTimeout(createHeart, i * 200);
        }
        // 定期创建新的爱心
        heartInterval = setInterval(createHeart, 2500);
    }, 500);
}

// 监听页面可见性变化
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearHearts();
    } else {
        startHearts();
    }
});

// 等待页面加载完成后再开始动画
window.addEventListener('load', startHearts);
