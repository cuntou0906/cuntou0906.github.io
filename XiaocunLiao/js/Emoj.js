
function randomEmoji() {
  const min = Math.min(...arguments), max = Math.max(...arguments);
  const randomUnicode = Math.floor(Math.random() * (max - min + 1)) + min;
  return String.fromCodePoint(randomUnicode);
}

let isAnimating = false;
let isMoving = false;
let moveTimer = null;

function getRandomEmoji() {
    //return emojis[Math.floor(Math.random() * emojis.length)];
	if(Math.random()>0.5){
		return randomEmoji(0x1F600, 0x1F64F);
	}else{
		return randomEmoji(0x1F300, 0x1F5FF);
	}
}

function createFloatingEmoji(x, y) {
    if (isAnimating) return;
    
    isAnimating = true;
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = getRandomEmoji();
    
    emoji.style.left = x + 'px';
    emoji.style.top = y + 'px';
    
    document.getElementById('EmojContainer').appendChild(emoji);
    
    setTimeout(() => {
        emoji.remove();
        isAnimating = false;
    }, 500);
}

document.addEventListener('mousemove', (e) => {
    if (!isMoving) {
        isMoving = true;
        createFloatingEmoji(e.clientX, e.clientY);
    }

    // Reset the timer on each movement
    clearTimeout(moveTimer);
    moveTimer = setTimeout(() => {
        isMoving = false;
    }, 100); // Consider mouse stopped after 100ms of no movement
});


document.addEventListener('click', function(event) {
    // 检查点击事件是否为左键点击
     createFloatingEmoji(event.clientX, event.clientY);

});