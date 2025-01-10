
  // 生成随机数的辅助函数
  function random(min, max) {
      return Math.random() * (max - min) + min;
  }

  function createHeart() {
      const heart = document.createElement('div');
      heart.className = 'heartFall';
      heart.innerHTML = '❤';
      
      // 随机起始位置
      heart.style.left = random(5, 95) + 'vw';
      
      // 随机大小
      const size = random(5, 17);
      heart.style.fontSize = size + 'px';
      
      // 随机动画持续时间
      const duration = random(6, 10);
      
      // 创建随机轨迹
      let startTime = null;
      const amplitude = random(30, 100); // 左右摆动幅度
      const frequency = random(1, 4);   // 摆动频率
      
      document.body.appendChild(heart);
      
      function animate(currentTime) {
          if (!startTime) startTime = currentTime;
          const progress = (currentTime - startTime) / (duration * 1000);
          
          if (progress < 1) {
              // 计算当前位置
              const x = Math.sin(progress * frequency * Math.PI) * amplitude;
              const y = progress * window.innerHeight * 1.1;
              const rotate = Math.sin(progress * frequency * Math.PI * 2) * 20;
              heart.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
              requestAnimationFrame(animate);
          } else {
              heart.remove();
          }
      }
      
      requestAnimationFrame(animate);
  }

  // 定期创建新的爱心
  setInterval(createHeart, 2000);
  
  // 初始创建一些爱心
  for(let i = 0; i < 4; i++) {
      setTimeout(createHeart, i * 200);
  }
