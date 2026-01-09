const questions = [
  {
    text: "What was the first thing about me that made you feel safe talking to me?",
    type: "text",
    reward: "Reading that made me smile ❤️"
  },
  {
    text: "What’s your favorite version of me?",
    type: "options",
    options: [
      "Sleepy me",
      "Serious me",
      "Loving but naughty me",
      "Normal me"
    ],
    reward: "I love that version too 💖"
  }
];

const gifs = [
  "assets/assets1.gif",
  "assets/assets2.gif",
  "assets/assets3.gif"
];

let index = 0;

// Elements
const questionEl = document.getElementById("question");
const hintEl = document.getElementById("hint");
const answerEl = document.getElementById("answer");
const submitBtn = document.getElementById("submitBtn");
const rewardEl = document.getElementById("reward");
const counterEl = document.getElementById("counter");
const charCount = document.getElementById("charCount");
const optionsBox = document.getElementById("optionsBox");
const gifEl = document.getElementById("questionGif");

function loadQuestion() {
  const q = questions[index];

  questionEl.textContent = q.text;
  rewardEl.textContent = "";
  optionsBox.innerHTML = "";

  gifEl.src = gifs[Math.floor(Math.random() * gifs.length)];

  // RESET EVERYTHING
  answerEl.value = "";
  charCount.textContent = "0";
  submitBtn.disabled = true;

  if (q.type === "text") {
    // TEXT QUESTION
    hintEl.textContent = "Write honestly (min 15 characters, English only)";
    hintEl.style.display = "block";

    answerEl.style.display = "block";
    counterEl.style.display = "block";
    submitBtn.style.display = "inline-block";
    optionsBox.style.display = "none";
  } 
  else {
    // OPTIONS QUESTION
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
        rewardEl.textContent = q.reward;

        // small delay for sweetness, then move on
        setTimeout(() => {
          index++;
          if (index >= questions.length) {
            window.location.href = "proposal.html";
          } else {
            loadQuestion();
          }
        }, 700);
      };

      optionsBox.appendChild(btn);
    });
  }
}

// TEXT INPUT COUNTER
answerEl.addEventListener("input", () => {
  const len = answerEl.value.trim().length;
  charCount.textContent = len;
  submitBtn.disabled = len < 15;
});

// SUBMIT TEXT ANSWER
submitBtn.addEventListener("click", () => {
  rewardEl.textContent = questions[index].reward;

  setTimeout(() => {
    index++;
    loadQuestion();
  }, 800);
});

// INIT
loadQuestion();
