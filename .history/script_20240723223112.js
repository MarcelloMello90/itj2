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

// carousel

document.querySelector("#items").addEventListener("wheel", event =>{
  if(event.deltaY > 0){
    event.target.scrollBy(300, 0)
  }else{
    event.target.scrollBy(-300, 0)

  }
})
