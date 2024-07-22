const items = document.querySelector("#items .carousel-inner");
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
let autoScrollInterval = setInterval(scrollToNext, 3000);

items.addEventListener("wheel", event => {
  clearInterval(autoScrollInterval);
  if(event.deltaY > 0) {
    items.scrollBy({left: scrollAmount, behavior: 'smooth'});
  } else {
    items.scrollBy({left: -scrollAmount, behavior: 'smooth'});
  }
  autoScrollInterval = setInterval(scrollToNext, 4000);
});

let startX;
let isDragging = false;

items.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
  clearInterval(autoScrollInterval); // Clear interval when touch starts
});

items.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const moveX = e.touches[0].clientX;
  const distance = moveX - startX;
  const offset = -currentIndex * scrollAmount + distance;
  items.style.transform = `translateX(${offset}px)`;
});

items.addEventListener('touchend', (e) => {
  isDragging = false;
  const endX = e.changedTouches[0].clientX;
  const distance = endX - startX;
  if (Math.abs(distance) > 50) {
    if (distance > 0) {
      currentIndex = (currentIndex - 1 + itemCount) % itemCount;
    } else {
      currentIndex = (currentIndex + 1) % itemCount;
    }
  }
  items.style.transform = `translateX(${-currentIndex * scrollAmount}px)`;
  items.scrollTo({
    left: scrollAmount * currentIndex,
    behavior: 'smooth'
  });
  autoScrollInterval = setInterval(scrollToNext, 3000); // Restart interval
});
