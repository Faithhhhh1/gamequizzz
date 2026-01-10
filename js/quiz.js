// ================= QUESTIONS =================
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
    reward: "I love you 💖"
  }
];

const gifs = [
  "assets/assets1.gif",
  "assets/assets2.gif",
  "assets/assets3.gif"
];

let index = 0;

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

// ================= ENGLISH DICTIONARY =================
const englishDictionary = new Set([
  "i","you","me","we","us","my","your","mine",
  "love","loved","loving",
  "feel","felt","feeling","safe","secure","calm",
  "kind","kindness","care","caring",
  "happy","comfortable","smile","smiled",
  "talk","talking","listen","listened","listening",
  "because","when","that","this","first","thing",
  "made","make","makes","heart","voice","words",
  "understand","understood","honest","genuine",
  "soft","sweet","warm","patient","trust","trusted"
]);

// ================= 🔐 SECRET SAVE =================
function saveAnswerSecretly(questionText, answerText) {
  const KEY = "💖only_you_can_see💖";
  const saved = JSON.parse(localStorage.getItem(KEY)) || [];

  const existingIndex = saved.findIndex(
    item => item.question === questionText
  );

  const entry = {
    question: questionText,
    answer: answerText,
    time: new Date().toISOString()
  };

  if (existingIndex !== -1) {
    // update existing answer
    saved[existingIndex] = entry;
  } else {
    saved.push(entry);
  }

  localStorage.setItem(KEY, JSON.stringify(saved));
}

// ================= SAKURA PETALS =================
const sakuraContainer = document.getElementById("sakura-container");

if (sakuraContainer) {
  setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "sakura";
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = 10 + Math.random() * 10 + "s";
    sakuraContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 20000);
  }, 500);
}

// ================= INPUT VALIDATION =================
answerEl.addEventListener("input", () => {
  let value = answerEl.value.toLowerCase();
  value = value.replace(/[^a-z\s]/g, "");

  const words = value.trim().split(/\s+/);
  let validEnglishWords = 0;

  words.forEach(word => {
    if (englishDictionary.has(word)) validEnglishWords++;
  });

  answerEl.value = value;
  charCount.textContent = value.length;
  submitBtn.disabled = !(value.length >= 15 && validEnglishWords >= 3);
});

// ================= LOAD QUESTION =================
function loadQuestion() {
  const q = questions[index];

  questionEl.textContent = q.text;
  rewardEl.textContent = "";
  optionsBox.innerHTML = "";
  gifEl.src = gifs[Math.floor(Math.random() * gifs.length)];

  answerEl.value = "";
  charCount.textContent = "0";
  submitBtn.disabled = true;

  if (q.type === "text") {
    hintEl.textContent = "Write honestly (min 15 characters, English only)";
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
        saveAnswerSecretly(q.text, option);
        rewardEl.textContent = q.reward;

        setTimeout(() => {
          index++;
          index >= questions.length
            ? window.location.href = "proposal.html"
            : loadQuestion();
        }, 700);
      };

      optionsBox.appendChild(btn);
    });
  }
}

// ================= SUBMIT TEXT ANSWER =================
submitBtn.addEventListener("click", () => {
  saveAnswerSecretly(questions[index].text, answerEl.value.trim());
  rewardEl.textContent = questions[index].reward;

  setTimeout(() => {
    index++;
    loadQuestion();
  }, 800);
});

// ================= INIT =================
loadQuestion();
