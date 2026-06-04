/* ************************************************************************************ */
// 轮播图
let RRO_currentIndex = 0;
const RRO_images = document.querySelectorAll('.RRO_carousel-image');
const RRO_totalImages = RRO_images.length;
let RRO_autoPlayInterval;

function startAutoPlay() {
    RRO_autoPlayInterval = setInterval(() => {
        RRO_currentIndex = (RRO_currentIndex + 1) % RRO_totalImages;
        RRO_updateCarousel();
    }, 2000);
}

function stopAutoPlay() {
    clearInterval(RRO_autoPlayInterval);
}

// 启动自动播放
startAutoPlay();

document.getElementById('RRO_nextButton').addEventListener('click', () => {
    RRO_currentIndex = (RRO_currentIndex + 1) % RRO_totalImages;
    RRO_updateCarousel();
});

document.getElementById('RRO_prevButton').addEventListener('click', () => {
    RRO_currentIndex = (RRO_currentIndex - 1 + RRO_totalImages) % RRO_totalImages;
    RRO_updateCarousel();
});

function RRO_updateCarousel() {
    const carouselImages = document.getElementById('RRO_carouselImages');
    carouselImages.style.transform = `translateX(-${RRO_currentIndex * 100}%)`;

    // 更新小点状态
    const dots = document.querySelectorAll('.RRO_dot');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[RRO_currentIndex].classList.add('active');
}

// 鼠标悬浮事件
const carousel = document.getElementById('RRO_carousel');
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// 小点点击事件
const dots = document.querySelectorAll('.RRO_dot');
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        RRO_currentIndex = parseInt(dot.getAttribute('data-index'));
        RRO_updateCarousel();
    });
});



/* ************************************************************************************ */
/* 研究页 的侧边导航栏 */
  function MyResearchMenuToggleSidebar(TabId) {
    var MyResearchMenuSidebarList = document.getElementsByClassName('MyResearchMenuSidebar');
    var MyResearchMenuToggleButtonList = document.getElementsByClassName('MyResearchMenuToggleButton');
    var MyResearchMenuContent = document.getElementById('MaxContainer');
    for (var i = 0; i < MyResearchMenuSidebarList.length; i++) {
      // 处理每个元素
      var MyResearchMenuSidebar = MyResearchMenuSidebarList[i];
      var MyResearchMenuToggleButton = MyResearchMenuToggleButtonList[i];
      MyResearchMenuSidebar.classList.toggle('open'); // 切换侧边栏的打开状态

      // 调整页面内容位置
      if (MyResearchMenuSidebar.classList.contains('open')) {
        // document.body.style.marginLeft = '280px'; // 打开时调整内容位置
        MyResearchMenuContent.classList.add("MyResearchMenuContainerOpen");
        MyResearchMenuContent.classList.remove("MyResearchMenuContainerClose");

        // MyResearchMenuContent.style.marginLeft = '330px'; // 正文内容向右移动
        MyResearchMenuToggleButton.innerHTML = '<'; // 改变按钮符号为向左
      } else {
        // document.body.style.marginLeft = '0'; // 关闭时恢复内容位置
        MyResearchMenuContent.classList.add("MyResearchMenuContainerClose");
        MyResearchMenuContent.classList.remove("MyResearchMenuContainerOpen");

        // MyResearchMenuContent.style.marginLeft = '30px'; // 正文内容恢复
        MyResearchMenuToggleButton.innerHTML = '>'; // 改变按钮符号为向右
      }
    }
  }
  function MyResearchMenuToggleSubmenu(event) {
    const submenu = event.currentTarget.nextElementSibling; // 获取下一个兄弟元素（子菜单）
    const toggleButton = event.currentTarget.querySelector('.submenu-indicator');
    if (submenu) {
      submenu.classList.toggle('open'); // 切换子菜单的打开状态
      event.currentTarget.classList.toggle('active'); // 切换指示符状态
    }
  }


/* ************************************************************************************ */
//   <!-- /* 研究内容的段落展开与折叠 */ -->
document.querySelectorAll('.Personal-ExpandText-btn').forEach(button => {
    button.addEventListener('click', function () {
    const content = this.parentElement;
    const container = content.closest('.Personal-ExpandText-container');
    const isCollapsed = content.classList.contains('Personal-ExpandText-collapsed');

    // 切换展开/收起状态
    if (isCollapsed) {
        content.classList.remove('Personal-ExpandText-collapsed');
        content.classList.add('Personal-ExpandText-expanded');
        this.textContent = 'Contract';
        // 展开时也滚动到标题顶部
        container.scrollIntoView({ behavior: 'smooth' });
        const glowTitle = container.querySelector('.GlowTitle');
        if (glowTitle) {
        glowTitle.style.color = '#0083b0';
        }
    } else {
        content.classList.remove('Personal-ExpandText-expanded');
        content.classList.add('Personal-ExpandText-collapsed');
        this.textContent = 'Expand';
        // 收起时滚动到标题顶部
        container.scrollIntoView({ behavior: 'smooth' });
        const glowTitle = container.querySelector('.GlowTitle');
        if (glowTitle) {
        glowTitle.style.color = '#2c3e50';
        }
    }
    });
});