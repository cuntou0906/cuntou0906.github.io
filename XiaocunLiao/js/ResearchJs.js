// 轮播图
let RRO_currentIndex = 0;
const RRO_images = document.querySelectorAll('.RRO_carousel-image');
const RRO_totalImages = RRO_images.length;

// 自动播放功能
const RRO_autoPlayInterval = setInterval(() => {
    RRO_currentIndex = (RRO_currentIndex + 1) % RRO_totalImages;
    RRO_updateCarousel();
}, 2000);

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
}

