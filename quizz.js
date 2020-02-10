let user, questions, answered, selected;

let start = document.querySelector(".start");
let inputUser = document.querySelector(".input[name=user]");

inputUser.addEventListener("keydown", (event) => {
  if (event.which == 13 || event.keyCode == 13) {
    startGame();
  }
});

start.addEventListener("click", startGame);

function startGame() {
  const menu = document.querySelector(".menu");
  const error = document.querySelector(".error");

  if (inputUser.value.length > 0) {
    user = inputUser.value;
    menu.style.display = "none";
    renderTemplate();
  } else error.textContent = "Veillez entrer un nom";
}

const renderTemplate = () => {
  const quizGame = document.querySelector(".game");
  quizGame.innerHTML = `
      <p class="count"></p>
      <p class="errorQuestion"></p>
      <p class="question"></p>
      <section class="content"></section>
      <button onclick="submitAnswer()" class="next">Suivant</button>
`;
  renderQuestion();
};

const renderQuestion = () => {
  const questionElement = document.querySelector(".question");
  const answeres = document.querySelector(".content");
  const counter = document.querySelector(".count");
  questionElement.innerHTML = `${user} ${questions[0].question}`;
  answeres.innerHTML = questions[0].answers
    .map((answer) => {
      return `
    <button onclick="select(this, '${answer.letter}')" id="${answer.letter}" class="answer">
      <span class="letter">${answer.letter}</span> ${answer.answer}
    </button>`;
    })
    .join("");
  counter.textContent = `Question ${answered.length + 1}/${questions.length +
    answered.length}`;
};

const select = (e, answer) => {
  selected = answer;

  if (selected) {
    const previousElements = document.getElementsByClassName("active");
    while (previousElements.length > 0) {
      previousElements[0].classList.remove("active");
    }
  }
  if (selected) {
    document.querySelector(".next").classList.add("active");
  }
  document.getElementById(e.id).classList.add("active");
  console.log(selected);
};

const setError = (text) => {
  const errors = document.querySelector(".errorQuestion");
  errors.innerText = text;
  errors.style.color = "red";
};

const finishQuiz = () => {
  const all = answered.length;
  let correct = 0;
  for (let i = 0; i < answered.length; i++) {
    if (answered[i].selected === answered[i].correct) {
      correct += 1;
    }
  }
  const score = (correct / all) * 100;

  const quizGame = document.querySelector(".game");

  quizGame.innerHTML = `
    <p class="count">Question ${answered.length}/${questions.length +
    answered.length}</p>
    <p class="question">${score}%</p>
    <section class="content">
      <p class="end">${user} vous avez fini avec ${correct} bonne réponses sur ${all}! voulez vous recommencer ?</p>
    </section>
    <button onclick="restart()" class="next">Recommencer</button>
  `;
  document.querySelector(".question").style.fontSize = "2.5rem";
};

const submitAnswer = () => {
  document.querySelector(".next").classList.remove("active");
  setError("");
  if (selected) {
    const lastQuestion = questions.shift();
    lastQuestion.selected = selected;
    answered.push(lastQuestion);
    selected = null;

    if (questions.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  } else {
    setError("Vous devez choisir une réponse !");
  }
};

const generationQuiz = () => {
  questions = [].concat(questionsTemplate);
  answered = [];
  selected = null;
};
const restart = () => {
  generationQuiz();
  renderTemplate();
};

generationQuiz();
