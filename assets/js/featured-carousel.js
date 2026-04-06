document.querySelectorAll('.featured-stack').forEach(stack => {
  const cards = stack.querySelectorAll('.featured-card');
  const dotsContainer = stack.querySelector('.featured-dots');
  const intervalTime = parseInt(stack.dataset.interval) || 8000;
  let current = 0;

  // Punkte generieren
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll('span');

  // Carousel Funktion
  setInterval(() => {
    cards[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (current + 1) % cards.length;
    cards[current].classList.add('active');
    dots[current].classList.add('active');
  }, intervalTime);
});
