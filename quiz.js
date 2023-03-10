 /** @format */

var minutes = 120;

let hour = minutes / 60;

var seconds = minutes * 60;

timerdiv = document.getElementById("time");

let countdownInterval = setInterval(function () {
  let minutesleft = Math.floor(seconds / 60) % 60;
  let secondsleft = seconds % 60;
  let hourLeft = Math.floor(seconds);

  seconds--;

  if (secondsleft < 0) {
    secondsleft = "0" + secondsleft;
    timerdiv.style.color = "red";
  }

  timerdiv.innerHTML = minutesleft + " : " + secondsleft;

  if (seconds < 0) {
    clearInterval(countdownInterval);
    timerdiv.innerHTML = "Time Expired";
    timerdiv.style.color = "red";
  }
}, 1000);

function buildQuiz() {
  const output = [];

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];

    for (letters in currentQuestion.answers)
      answers.push(
        `<label>
               ${letters} <input type="radio" name="question${questionNumber}" value="${letters}">
         ${currentQuestion.answers[letters]}</label>`
      );

    output.push(`
    <div class="slide">
    <div class="question">${currentQuestion.question}</div>
    <hr class="line">
    <div class="answers">${answers.join("")}</div>
    </div>`);
  });
  quizContainer.innerHTML = output.join("");
}

function showResult() {
  const answerContainers = quizContainer.querySelectorAll(".answers");

  let numCorrect = 0;

  myQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;

      answerContainers[questionNumber].style.color = "lightgreen";
    } else {
      answerContainers[questionNumber].style.color = "red";
    }
  });

  resultsContainer.innerHTML = ` Result : ${Math.round(
    ((numCorrect * 10) / myQuestions.length) * 10
  ).toFixed(2)}% `;
}

function showSlide(n) {
  slides[currentSlide].classList.remove("active-slide");
  slides[n].classList.add("active-slide");
  currentSlide = n;
  if (currentSlide === 0) {
    previousButton.style.display = "none";
  } else {
    previousButton.style.display = "inline-block";
  }
  if (currentSlide === slides.length - 1) {
    nextButton.style.display = "none";
    submitButton.style.display = "inline-block";
  } else {
    nextButton.style.display = "inline-block";
    submitButton.style.display = "none";
  }
}

function next() {
  showSlide(currentSlide + 1);
}

function previous() {
  showSlide(currentSlide - 1);
}

// declear our variable

const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");

const myQuestions = [
  {
    question: "Which of the following is not a product of Google?",
    answers: {
      A: "Youtube",
      B: "Gmail",
      C: "Netflix",
      D: "Google",
    },
    correctAnswer: "C",
  },
  {
    question: "Which one of the following is not an area in Ibadan?",
    answers: {
      A: "Iwo road",
      B: "Gbagi",
      C: "Lekki",
      D: "Ojoo",
    },
    correctAnswer: "C",
  },

  {
    question: "Which is not an even number?",
    answers: {
      A: "2",
      B: "4",
      C: "8",
      D: "9",
    },
    correctAnswer: "D",
  },
  {
    question: "Who invented JavaScript?",
    answers: {
      A: "Douglas Crockford",
      B: "Sheryl Sandberg",
      C: "Brendan Eich",
    },
    correctAnswer: "C",
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      A: "Node.js",
      B: "TypeScript",
      C: "npm",
    },
    correctAnswer: "C",
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      A: "Angular",
      B: "jQuery",
      C: "RequireJS",
      D: "ESLint",
    },
    correctAnswer: "D",
  },

  {
    question:
      "The existence of an element in the same form in the same physical state is refeered to as?",
    answers: {
      A: "Concatenation",
      B: "Hydrogenation",
      C: "Allotropy",
      D: "Isotopy",
    },
    correctAnswer: "C",
  },

  {
    question: "When gases combine, they do so in?",
    answers: {
      A: "Multiple Whole Ration",
      B: "Simple Whole Ratio",
      C: "Complex Whole Ratio",
      D: "Simple volumes",
    },
    correctAnswer: "B",
  },

  {
    question: "The compound CaO is?",
    answers: {
      A: "Limestone",
      B: "Limewater",
      C: "Slaked lime",
      D: "Lime Acid",
    },
    correctAnswer: "B",
  },
];
buildQuiz();
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const slides = document.querySelectorAll(".slide");

let currentSlide = 0;

showSlide(currentSlide);

// event listener

previousButton.addEventListener("click", previous);
nextButton.addEventListener("click", next);
submitButton.addEventListener("click", () => {
  if (confirm("Click OK to check Result") == true) {
    showResult();
  } else {
    previous();
  }
});
