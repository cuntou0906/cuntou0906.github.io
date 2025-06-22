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