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


document.addEventListener('click', function(event) {
    // 检查点击事件是否为左键点击
     createFloatingEmoji(event.clientX, event.clientY);

});