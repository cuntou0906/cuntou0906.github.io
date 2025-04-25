function randomEmoji() {
  const min = Math.min(...arguments), max = Math.max(...arguments);
  const randomUnicode = Math.floor(Math.random() * (max - min + 1)) + min;
  return String.fromCodePoint(randomUnicode);
}

let isAnimating_Emoj = false;
let isMoving_Emoj = false;
let moveTimer_Emoj = null;

function getRandomEmoji() {
    //return emojis[Math.floor(Math.random() * emojis.length)];
	if(Math.random()>0.5){
		return randomEmoji(0x1F600, 0x1F64F);
	}else{
		return randomEmoji(0x1F300, 0x1F5FF);
	}
}

function createFloatingEmoji(x, y) {
    if (isAnimating_Emoj) return;
    
    isAnimating_Emoj = true;
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = getRandomEmoji();
    
    emoji.style.left = x + 'px';
    emoji.style.top = y + 'px';
    
    document.getElementById('EmojContainer').appendChild(emoji);
    
    setTimeout(() => {
        emoji.remove();
        isAnimating_Emoj = false;
    }, 500);
}

document.addEventListener('mousemove', (e) => {
    if (!isMoving_Emoj) {
        isMoving_Emoj = true;
        createFloatingEmoji(e.clientX, e.clientY);
    }

    // Reset the timer on each movement
    clearTimeout(moveTimer_Emoj);
    moveTimer_Emoj = setTimeout(() => {
        isMoving_Emoj = false;
    }, 100); // Consider mouse stopped after 100ms of no movement
});


// document.addEventListener('click', function(event) {
//     // 检查点击事件是否为左键点击
//      createFloatingEmoji(event.clientX, event.clientY);

// });

// 鼠标点击波纹特效
document.addEventListener('click', function(event) {
    // 获取鼠标点击位置相对于视口的位置
    const rect = document.body.getBoundingClientRect();
    const x = event.clientX - rect.left; // 计算相对于页面的X坐标
    const y = event.clientY - rect.top;  // 计算相对于页面的Y坐标

    // 创建多个波纹效果元素
    for (let i = 0; i < 5; i++) { // 生成5个波纹
        const ripple = document.createElement('div');
        ripple.className = 'ripple_mouseClick';
        
        // 设置波纹效果的位置
        ripple.style.left = `${x - 15}px`; // 使波纹中心在点击位置
        ripple.style.top = `${y - 15}px`; // 使波纹中心在点击位置
        
        // 随机化波纹的初始大小
        const size = Math.random() * 10 + 20; // 随机大小范围在20px到30px之间
        ripple.style.width = `${size}px`; // 波纹初始宽度
        ripple.style.height = `${size}px`; // 波纹初始高度
        
        // 将波纹效果添加到页面
        document.body.appendChild(ripple);
        
        // 在动画结束后移除元素
        ripple.addEventListener('animationend', function() {
            ripple.remove();
        });
    }
});