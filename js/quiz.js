// ================= COLLECT ANSWERS =================
const collectedAnswers = [];

// ================= QUESTIONS =================
const questions = [
  {
    text: "1. What was the first thing about me that made you feel safe talking to me?",
    type: "text",
    reward: "Reading that made me smile ❤️"
  }
];

const gifs = [
  "assets/assets1.gif","assets/assets2.gif","assets/assets3.gif",
  "assets/assets4.gif","assets/assets5.gif","assets/assets6.gif",
  "assets/assets7.gif","assets/assets8.gif","assets/assets9.gif",
  "assets/assets10.gif"
];

// ✅ RESTORE PROGRESS
let index = Number(sessionStorage.getItem("quizIndex")) || 0;

// ================= ELEMENTS =================
const questionEl = document.getElementById("question");
const hintEl = document.getElementById("hint");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submitBtn");
const rewardEl = document.getElementById("reward");
const counterEl = document.getElementById("counter");
const charCount = document.getElementById("charCount");
const optionsBox = document.getElementById("optionsBox");
const gifEl = document.getElementById("questionGif");

// ================= FORBIDDEN WORDS =================
const forbiddenPatterns = [
  /\bidk\b/i, /\bdk\b/i, /\bi\s*don'?t\s*know\b/i, /\bdont\s*know\b/i,
  /\bno\s*idea\b/i, /\bnot\s*sure\b/i, /\bcant\s*remember\b/i,
  /\bdont\s*remember\b/i, /\bwhatever\b/i, /\banything\b/i,
  /^[^a-zA-Z]+$/
];

// ✅ FIX (THIS WAS MISSING)
answerEl.addEventListener("input", () => {
  let value = answerEl.value.replace(/[^a-zA-Z\s]/g, "");
  answerEl.value = value;

  // ✅ ADD THIS LINE HERE
  const lengthOK = value.trim().length >= 10;

  const hasForbidden = forbiddenPatterns.some(p => p.test(value.trim()));

  charCount.textContent = value.length;
  submitBtn.disabled = !(lengthOK && !hasForbidden);
  submitBtn.style.opacity = submitBtn.disabled ? "0.5" : "1";
});

// ================= LOAD QUESTION =================
function loadQuestion() {
  const q = questions[index];
  if (!q) return;

  questionEl.textContent = q.text;
rewardEl.textContent = "";
rewardEl.classList.remove("show", "pulse");
optionsBox.innerHTML = "";
gifEl.src = gifs[Math.floor(Math.random() * gifs.length)];

  optionsBox.innerHTML = "";
  gifEl.src = gifs[Math.floor(Math.random() * gifs.length)];

  answerEl.value = "";
  charCount.textContent = "0";
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.5";

  if (q.type === "text") {
    hintEl.style.display = "block";
    answerEl.style.display = "block";
    counterEl.style.display = "block";
    submitBtn.style.display = "inline-block";
    optionsBox.style.display = "none";
  } else {
    hintEl.style.display = "none";
    answerEl.style.display = "none";
    counterEl.style.display = "none";
    submitBtn.style.display = "none";
    optionsBox.style.display = "block";

    q.options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = option;

      btn.onclick = () => {
        collectedAnswers.push({ question: q.text, answer: option });
        sessionStorage.setItem("quizAnswers", JSON.stringify(collectedAnswers));

        setTimeout(() => {
  rewardEl.textContent = q.reward;
  rewardEl.classList.remove("show", "pulse"); // reset (safety)
  rewardEl.classList.add("show", "pulse");   // play animation
}, 400);

setTimeout(() => {
  index++;
  sessionStorage.setItem("quizIndex", index);
  index >= questions.length ? finishQuiz() : loadQuestion();
}, 900);
      };

      optionsBox.appendChild(btn);
    });
  }
}

// ================= SUBMIT TEXT ANSWER =================
submitBtn.addEventListener("click", () => {
  collectedAnswers.push({
    question: questions[index].text,
    answer: answerEl.value.trim()
  });

  sessionStorage.setItem("quizAnswers", JSON.stringify(collectedAnswers));

setTimeout(() => {
  rewardEl.textContent = questions[index].reward;
  rewardEl.classList.remove("show", "pulse"); // reset
  rewardEl.classList.add("show", "pulse");   // animate
}, 400);

setTimeout(() => {
  index++;
  sessionStorage.setItem("quizIndex", index);
  index >= questions.length ? finishQuiz() : loadQuestion();
}, 1000);
});

// ================= FINISH QUIZ =================
function finishQuiz() {
  const saved = sessionStorage.getItem("quizAnswers");

  // ✅ SAVE PERMANENTLY
  localStorage.setItem("quizAnswersFinal", saved);

  // clear progress index
  sessionStorage.removeItem("quizIndex");
  window.location.href = "proposal.html";
}

// ✅ INIT
loadQuestion();
