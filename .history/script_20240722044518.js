const items = document.querySelector("#items");
let currentIndex = 0;
const itemCount = items.children.length;
const scrollAmount = items.clientWidth;

function scrollToNext() {
  currentIndex = (currentIndex + 1) % itemCount;
  items.scrollTo({
    left: scrollAmount * currentIndex,
    behavior: 'smooth'
  });
}

// Define o intervalo para mudar a cada 3 segundos
setInterval(scrollToNext, 3000);

items.addEventListener("wheel", event => {
  clearInterval(autoScrollInterval);
  if(event.deltaY > 0) {
    items.scrollBy({left: scrollAmount, behavior: 'smooth'});
  } else {
    items.scrollBy({left: -scrollAmount, behavior: 'smooth'});
  }
  autoScrollInterval = setInterval(scrollToNext, 4000);
});


const carousel = document.querySelector('.carousel-inner');
let currentIndex = 0;

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % carousel.children.length;
    updateCarousel();
};

const prevSlide = () => {
    currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
    updateCarousel();
};

const updateCarousel = () => {
    const offset = -currentIndex * 100;
    carousel.style.transform = `translateX(${offset}%)`;
};

let startX;
let isDragging = false;

carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
});

carousel.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const moveX = e.touches[0].clientX;
    const distance = moveX - startX;
    const offset = -currentIndex * 100 + (distance / window.innerWidth) * 100;
    carousel.style.transform = `translateX(${offset}%)`;
});

carousel.addEventListener('touchend', (e) => {
    isDragging = false;
    const endX = e.changedTouches[0].clientX;
    const distance = endX - startX;
    if (Math.abs(distance) > 50) {
        if (distance > 0) {
            prevSlide();
        } else {
            nextSlide();
        }
    } else {
        updateCarousel();
    }
});
