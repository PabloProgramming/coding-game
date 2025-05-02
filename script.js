// Game State
let score = 0;
let level = 1;
let timeLeft = 60;
let gameActive = false;
let timer;
let currentQuestionInLevel = 0;
let fallingManInterval;
let destructionProgress = 0;
// DOM Elements
const fallContainer = document.querySelector(".fall-container");
const fallingManContainer = document.getElementById("falling-man");
const ground = document.getElementById("ground");
const codeSnippetsContainer = document.getElementById("code-snippets");
const timerDisplay = document.getElementById("timer");
const levelDisplay = document.getElementById("level");
const scoreDisplay = document.getElementById("score");
const startBtn = document.getElementById("start-btn");

const containerHeight = fallContainer.offsetHeight;
const groundPosition = ground.offsetTop;

// Code Challenges (Progressive Difficulty)
const challenges = [
  // Level 1 - Basic Syntax
  {
    question: "Declare a variable:",
    correct: "let x = 5;",
    options: ["var x = 5;", "const x;", "x = 5;"],
  },
  {
    question: "Fix the function:",
    correct: "function greet() { return 'Hello!'; }",
    options: [
      "func greet() {}",
      "greet() => {}",
      "function greet return 'Hello!'",
    ],
  },
  {
    question: "Correct the loop:",
    correct: "for (let i = 0; i < 5; i++) {}",
    options: ["for i < 5 {}", "loop (i = 0 to 5)", "while i++ {}"],
  },

  // Level 2 - Data Types
  {
    question: "Create an array:",
    correct: "const arr = [1, 2, 3];",
    options: [
      "const arr = {1, 2, 3};",
      "array arr = [1, 2, 3];",
      "const arr = (1, 2, 3);",
    ],
  },
  {
    question: "Create an object:",
    correct: "const obj = { key: 'value' };",
    options: [
      "const obj = [key: 'value'];",
      "const obj = ('key': 'value');",
      "object obj = { key: 'value' };",
    ],
  },
  {
    question: "Convert to string:",
    correct: "String(42)",
    options: ["42.toString()", "toString(42)", "42.string()"],
  },

  // Level 3 - Functions
  {
    question: "Arrow function:",
    correct: "const sum = (a, b) => a + b;",
    options: [
      "const sum = a, b => a + b;",
      "function sum = (a, b) => a + b",
      "const sum => (a, b) { a + b }",
    ],
  },
  {
    question: "Default parameter:",
    correct: "function greet(name = 'Guest') {}",
    options: [
      "function greet(name: 'Guest') {}",
      "function greet(name || 'Guest') {}",
      "function greet(name ?= 'Guest') {}",
    ],
  },
  {
    question: "IIFE pattern:",
    correct: "(function() { /* code */ })();",
    options: [
      "function() { /* code */ }();",
      "[function() { /* code */ }]();",
      "{ function() { /* code */ } }();",
    ],
  },

  // Level 4 - DOM Manipulation
  {
    question: "Select element by ID:",
    correct: "document.getElementById('myId');",
    options: [
      "document.querySelector('#myId');",
      "document.getElement('myId');",
      "document.select('#myId');",
    ],
  },
  {
    question: "Add event listener:",
    correct: "btn.addEventListener('click', handler);",
    options: [
      "btn.on('click', handler);",
      "btn.click(handler);",
      "btn.addEvent('click', handler);",
    ],
  },
  {
    question: "Create new element:",
    correct: "document.createElement('div');",
    options: [
      "new Element('div');",
      "document.new('div');",
      "document.create('div');",
    ],
  },

  // Level 5 - Array Methods
  {
    question: "Array map:",
    correct: "arr.map(item => item * 2);",
    options: [
      "arr.map(function(item) { item * 2 });",
      "arr.forEach(item => item * 2);",
      "arr.map(item * 2);",
    ],
  },
  {
    question: "Array filter:",
    correct: "arr.filter(num => num > 5);",
    options: [
      "arr.filter(function(num) { return num > 5 });",
      "arr.find(num => num > 5);",
      "arr.filter(num > 5);",
    ],
  },
  {
    question: "Array reduce:",
    correct: "arr.reduce((sum, num) => sum + num, 0);",
    options: [
      "arr.reduce(sum + num, 0);",
      "arr.reduce((sum, num) => { sum + num }, 0);",
      "arr.reduce(sum => sum + num, 0);",
    ],
  },

  // Level 6 - ES6+ Features
  {
    question: "Destructure object:",
    correct: "const { name, age } = person;",
    options: [
      "const [name, age] = person;",
      "const name, age = person;",
      "const (name, age) = person;",
    ],
  },
  {
    question: "Spread operator:",
    correct: "const newArr = [...arr];",
    options: [
      "const newArr = [arr...];",
      "const newArr = [...arr, ...];",
      "const newArr = [..arr];",
    ],
  },
  {
    question: "Template literal:",
    correct: "`Hello ${name}`",
    options: ["'Hello ${name}'", '"Hello ${name}"', "'Hello ' + name"],
  },

  // Level 7 - Async/Await
  {
    question: "Async function:",
    correct: "async function fetchData() {}",
    options: [
      "function async fetchData() {}",
      "await function fetchData() {}",
      "sync function fetchData() {}",
    ],
  },
  {
    question: "Await promise:",
    correct: "const data = await fetchData();",
    options: [
      "const data = fetchData().await();",
      "await const data = fetchData();",
      "const data = fetchData() await;",
    ],
  },
  {
    question: "Promise chain:",
    correct: "fetchData().then().catch();",
    options: [
      "fetchData().then().finally();",
      "fetchData().catch().then();",
      "fetchData().then().thenCatch();",
    ],
  },

  // Level 8 - Classes
  {
    question: "Class definition:",
    correct: "class Person {}",
    options: [
      "function Person() {}",
      "object Person {}",
      "new class Person {}",
    ],
  },
  {
    question: "Constructor:",
    correct: "constructor() { this.name = name; }",
    options: [
      "function constructor() {}",
      "init() { this.name = name; }",
      "constructor(name) { name = this.name; }",
    ],
  },
  {
    question: "Method definition:",
    correct: "greet() { return 'Hello'; }",
    options: [
      "function greet() { return 'Hello'; }",
      "greet: function() { return 'Hello'; }",
      "method greet() { return 'Hello'; }",
    ],
  },

  // Level 9 - Modules
  {
    question: "Export function:",
    correct: "export function myFunc() {}",
    options: [
      "export default function myFunc() {}",
      "function export myFunc() {}",
      "module.exports = myFunc;",
    ],
  },
  {
    question: "Import default:",
    correct: "import myModule from './module';",
    options: [
      "import { myModule } from './module';",
      "import './module' as myModule;",
      "require('./module');",
    ],
  },
  {
    question: "Named import:",
    correct: "import { func } from './module';",
    options: [
      "import func from './module';",
      "import 'func' from './module';",
      "import [func] from './module';",
    ],
  },

  // Level 10 - Advanced Concepts
  {
    question: "Closure example:",
    correct: "function outer() { let x = 1; function inner() { x++; } }",
    options: [
      "function outer() { let x = 1; } function inner() { x++; }",
      "function outer() { x = 1; function inner() { x++; } }",
      "function outer() { let x = 1; () => { x++; } }",
    ],
  },
  {
    question: "Currying:",
    correct: "const add = a => b => a + b;",
    options: [
      "const add = (a, b) => a + b;",
      "const add = a, b => a + b;",
      "const add = (a) => (b) => { a + b };",
    ],
  },
  {
    question: "Memoization:",
    correct:
      "const memoize = fn => { const cache = {}; return (...args) => { /* cache logic */ }; };",
    options: [
      "const memoize = fn => { return (...args) => fn(...args); };",
      "const memoize = (fn, cache) => { /* cache logic */ };",
      "function memoize(fn) { return function() { /* no cache */ }; }",
    ],
  },
];

function startTimer() {
  timer = setInterval(() => {
    if (gameActive) {
      timeLeft--;
      timerDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        endGame(false);
      }
    }
  }, 1000);
}

function startFallingManAnimation() {
  // Clear any existing content
  fallingManContainer.innerHTML = "";

  // Add the SVG man
  fallingManContainer.innerHTML = `
    <svg version="1.1" id="falling-man-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 491.395 491.395" style="enable-background:new 0 0 491.395 491.395;" xml:space="preserve" width="50" height="50">
      <path d="M457.605,23.993c-10.055-5.713-21.448-8.733-32.947-8.733c-24.012,0-46.291,12.957-58.142,33.813
        c-18.198,32.028-6.948,72.892,25.08,91.092c10.053,5.712,21.445,8.731,32.944,8.731c24.014,0,46.294-12.958,58.146-33.815
        C500.884,83.052,489.633,42.191,457.605,23.993z M475.295,110.882c-10.344,18.205-29.792,29.515-50.755,29.515
        c-10.029,0-19.969-2.636-28.745-7.622c-27.953-15.884-37.772-51.549-21.888-79.502c10.343-18.204,29.79-29.513,50.751-29.513
        c10.03,0,19.971,2.637,28.748,7.624C481.359,47.265,491.178,82.928,475.295,110.882z"/>
      <path d="M387.871,141.577c-14.273-8.11-30.827-10.551-46.81-6.972L216.755,61.273c-5.026-2.964-10.752-4.531-16.56-4.531
        c-11.516,0-22.301,6.155-28.148,16.064c-9.146,15.505-3.972,35.561,11.533,44.707l85.629,50.516l-84.844,2.722
        c-8.715,0.279-16.801,3.937-22.766,10.297c-5.965,6.361-9.097,14.665-8.817,23.382c0.566,17.637,15.098,31.602,32.624,31.602
        c0.351,0,0.703-0.006,1.055-0.017l73.452-2.356l-31.948,56.226l-158.04-76.162c-10.501-5.06-22.343-5.73-33.349-1.883
        c-11.004,3.847-19.85,11.749-24.91,22.249c-5.061,10.501-5.731,22.344-1.885,33.347c3.846,11.004,11.748,19.852,22.25,24.913
        l116.565,56.176L28.942,391.399c-10.974,3.933-19.76,11.902-24.738,22.442c-4.979,10.54-5.555,22.389-1.623,33.362
        c6.201,17.305,22.711,28.932,41.083,28.932c5.01,0,9.963-0.864,14.72-2.568L235.5,410.106c10.188,5.753,21.272,8.487,32.219,8.487
        c22.901,0,45.186-11.966,57.287-33.261l87.554-154.091C430.473,199.715,419.397,159.491,387.871,141.577z M179.368,77.126
        c4.325-7.33,12.306-11.884,20.827-11.884c4.289,0,8.522,1.159,12.241,3.353l141.046,83.207c5.555,3.277,9.502,8.523,11.112,14.769
        c1.61,6.247,0.692,12.746-2.585,18.302c-4.324,7.329-12.304,11.883-20.824,11.883c-4.29,0-8.524-1.16-12.244-3.354l-141.043-83.207
        C176.431,103.427,172.604,88.593,179.368,77.126z M186.188,227.519c-13.285,0.444-24.484-10.056-24.911-23.361
        c-0.207-6.448,2.109-12.59,6.522-17.295c4.412-4.704,10.392-7.409,16.838-7.615l98.245-3.152l7.293,4.303l-25.341,44.599
        L186.188,227.519z M35.721,284.693c-8.457-4.076-14.82-11.201-17.917-20.061c-3.097-8.859-2.558-18.396,1.519-26.852
        c2.221-4.609,5.354-8.59,9.175-11.766c0.256,0.212,0.531,0.406,0.843,0.559l113.328,55.334c2.108,1.028,4.654,0.155,5.684-1.955
        c1.03-2.108,0.155-4.653-1.954-5.684l-109.45-53.441c0.797-0.346,1.604-0.673,2.433-0.963c8.86-3.096,18.397-2.559,26.853,1.517
        l157.522,75.912l-13.105,23.064c-1.319,2.32-2.495,4.736-3.525,7.197l-47.302,16.949L35.721,284.693z M55.517,465.565
        c-3.834,1.374-7.822,2.07-11.853,2.07c-14.793,0-28.088-9.363-33.081-23.299c-0.882-2.462-1.472-4.979-1.793-7.512l128.566-48.09
        c2.199-0.822,3.314-3.271,2.492-5.47c-0.822-2.198-3.272-3.313-5.469-2.491L8.835,427.733c0.483-3.51,1.498-6.965,3.055-10.26
        c4.009-8.487,11.084-14.905,19.92-18.071l213.84-76.622c3.833-1.373,7.82-2.07,11.851-2.07c14.796,0,28.093,9.364,33.086,23.302
        c6.535,18.241-2.989,38.399-21.23,44.935L55.517,465.565z M405.17,227.043l-87.554,154.091
        c-14.262,25.099-44.759,35.298-70.863,24.941l25.471-9.126c22.653-8.117,34.48-33.151,26.365-55.805
        c-6.201-17.307-22.713-28.935-41.088-28.935c-5.01,0-9.962,0.864-14.718,2.568l-24.09,8.632l78.804-138.691l27.125,16.002
        c5.028,2.967,10.755,4.534,16.564,4.534c11.514,0,22.299-6.155,28.145-16.064c4.431-7.51,5.672-16.297,3.494-24.742
        c-2.177-8.445-7.513-15.536-15.023-19.967l-4.953-2.922c10.695-0.493,21.339,2.02,30.823,7.408
        c8.963,5.093,16.013,12.264,20.92,20.559c-0.015,0.024-0.033,0.046-0.048,0.07l-53,90c-1.191,2.023-0.517,4.627,1.505,5.818
        c2.024,1.191,4.628,0.518,5.819-1.506l50.139-85.142C414.707,194.097,413.862,211.744,405.17,227.043z"/>
    </svg>
  `;

  const fallingMan = document.getElementById("falling-man-svg");

  // Position the man at the top center
  fallingMan.style.position = "absolute";
  fallingMan.style.left = "50%";
  fallingMan.style.transform = "translateX(-50%)";
  fallingMan.style.top = "0";
  fallingMan.style.transition = "top 0.1s linear";

  // Start falling animation based on time left
  fallingManInterval = setInterval(() => {
    if (!gameActive) return;

    // Calculate current position based on time left (60s to 0s)
    const progress = 1 - timeLeft / 60;
    const newTop = progress * (containerHeight - 65);

    fallingMan.style.top = `${newTop}px`;

    // Rotate the man as he falls to make it look more natural
    fallingMan.style.transform = `translateX(-50%) rotate(${
      progress * 180
    }deg)`;

    // Check if reached the ground
    if (newTop >= groundPosition - 50) {
      clearInterval(fallingManInterval);
      endGame(false);
    }
  }, 100);
}

startBtn.addEventListener("click", () => {
  gameActive = true;
  startBtn.disabled = true;
  timerDisplay.textContent = timeLeft;
  levelDisplay.textContent = level;
  scoreDisplay.textContent = score;

  startTimer();
  currentQuestionInLevel = 0;
  startFallingManAnimation(); // Replace vortex animation with falling man animation
  loadNextQuestion();
});

// Load the next question in current level
function loadNextQuestion() {
  const challengeIndex = (level - 1) * 3 + currentQuestionInLevel;

  // Check if we've completed all questions in this level
  if (currentQuestionInLevel >= 3) {
    levelCompleted();
    return;
  }

  const challenge = challenges[challengeIndex];

  codeSnippetsContainer.innerHTML = `
    <div class="question">Level ${level} - ${challenge.question}</div>
    ${[...challenge.options, challenge.correct]
      .sort(() => Math.random() - 0.5)
      .map((code) => `<div class="code-block">${code}</div>`)
      .join("")}
  `;

  // Add click handlers to each code block
  document.querySelectorAll(".code-block").forEach((block) => {
    block.addEventListener("click", () => {
      validateCode(block.textContent, challenge.correct);
    });
  });
}

// Show level completion message
function levelCompleted() {
  // Reset timer for next level
  clearInterval(timer);
  timeLeft = 60;
  timerDisplay.textContent = timeLeft;
  startTimer();

  if (level >= 10) {
    showFinalResults();
    return;
  }

  gameActive = false;
  codeSnippetsContainer.innerHTML = `
    <div class="level-complete">
      <h2>Level ${level} Complete!</h2>
      <p>Score: ${score}</p>
      <p>Time reset to 60 seconds</p>
      <button id="next-level-btn">Continue to Level ${level + 1}</button>
    </div>
  `;

  document.getElementById("next-level-btn").addEventListener("click", () => {
    level++;
    levelDisplay.textContent = level;
    currentQuestionInLevel = 0;
    gameActive = true;
    loadNextQuestion();
  });
}

// Show final results with personalized message
function showFinalResults() {
  clearInterval(timer);
  gameActive = false;

  let message = "";
  const finalScore = score;
  const percentage = Math.round((finalScore / 1500) * 100);

  if (percentage >= 90) {
    message =
      "Master Rescuer! You've saved every falling developer with perfect code!";
  } else if (percentage >= 70) {
    message = "Senior Lifesaver! You caught most developers safely!";
  } else if (percentage >= 50) {
    message = "Good Effort! You saved many developers! Keep practicing!";
  } else {
    message =
      "Apprentice Rescuer! Every developer needs help sometimes - try again!";
  }

  codeSnippetsContainer.innerHTML = `
      <div class="final-results">
      <h2>Mission Complete!</h2>
      <p class="final-score">Developers Saved: ${finalScore}</p>
      <p class="final-level">Levels Completed: ${level}/10</p>
      <p class="final-message">${message}</p>
      <button id="play-again-btn">Rescue More Developers</button>
    </div>
  `;

  document
    .getElementById("play-again-btn")
    .addEventListener("click", resetGame);
}

// Validate Answer
function validateCode(selectedCode, correctCode) {
  if (selectedCode === correctCode) {
    // Correct answer
    score += level * 10;
    scoreDisplay.textContent = score;
    currentQuestionInLevel++;
    loadNextQuestion();
  } else {
    // Wrong answer handling
    timeLeft -= 5;
    timerDisplay.textContent = timeLeft;

    // Visual feedback for wrong answer
    const blocks = document.querySelectorAll(".code-block");
    blocks.forEach((block) => {
      if (block.textContent === selectedCode) {
        block.classList.add("wrong-answer");
        setTimeout(() => {
          block.classList.remove("wrong-answer");
        }, 500);
      }
    });

    // Flash timer red
    timerDisplay.style.color = "red";
    setTimeout(() => {
      timerDisplay.style.color = "";
    }, 500);

    // Check if game over
    if (timeLeft <= 0) {
      endGame(false);
    }
  }
}

// End Game - now redirects to showFinalResults
function endGame(win) {
  if (win) {
    showFinalResults();
  } else {
    clearInterval(timer);
    gameActive = false;

    // Hide game UI elements
    document.querySelectorAll(".game-ui").forEach((el) => {
      el.classList.add("game-ui-hidden");
    });

    codeSnippetsContainer.innerHTML = `
      <div class="final-results">
        <h2>Mission Failed</h2>
        <p class="final-score">Developers Saved: ${score}</p>
        <p class="final-level">Level Reached: ${level}</p>
        <p class="final-message">The developer hit the ground! Quick, try again to save more!</p>
        <button id="play-again-btn">Try Rescue Again</button>
      </div>
    `;

    document
      .getElementById("play-again-btn")
      .addEventListener("click", resetGame);
  }
}

// Reset (unchanged)
function resetGame() {
  clearInterval(timer);
  clearInterval(fallingManInterval);
  score = 0;
  level = 1;
  timeLeft = 60;
  destructionProgress = 0;
  scoreDisplay.textContent = score;
  levelDisplay.textContent = level;
  timerDisplay.textContent = timeLeft;
  timerDisplay.style.color = "";
  startBtn.disabled = false;
  codeSnippetsContainer.innerHTML = "";
  currentQuestionInLevel = 0;

  // Show game UI elements again
  document.querySelectorAll(".game-ui").forEach((el) => {
    el.classList.remove("game-ui-hidden");
  });
}
