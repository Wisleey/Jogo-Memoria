//var nome = prompt("Qual é o seu nome");

//while (!nome || nome.trim() === "") {
  //alert("Por favor, digite seu nome.");
  //nome = prompt("Qual é o seu nome");
//}

//alert("Boa sorte, " + nome + "! Ao clicar em OK, o jogo começará.");

const cardsContainer = document.getElementById("cardsContainer");
const cards = Array.from(document.querySelectorAll(".card"));
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let isGameFinished = false;
let timerInterval;
let time = 0;

function flipCard() {
  if (lockBoard || this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
  } else {
    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
    checkGameFinish();
  }
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function checkGameFinish() {
  let flippedCards = document.querySelectorAll(".card.flip");

  if (flippedCards.length === cards.length) {
    isGameFinished = true;
    clearInterval(timerInterval);
    console.log("Parabéns! Você virou todas as cartas.");
  }
}

function startTimer() {
  time = 0;
  document.getElementById("time").textContent = time;
  timerInterval = setInterval(() => {
    time++;
    document.getElementById("time").textContent = time;
  }, 1000);
}

function shuffleCards() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

function restartGame() {
  clearInterval(timerInterval);
  time = 0;
  document.getElementById("time").textContent = time;

  cards.forEach((card) => {
    card.classList.remove("flip");
    card.addEventListener("click", flipCard);
  });

  isGameFinished = false;
  startTimer();
  shuffleCards();
}

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
});

document.getElementById("restartButton").addEventListener("click", restartGame);

startTimer();
shuffleCards();
