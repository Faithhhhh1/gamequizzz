/*************************
 * QUESTIONS
 *************************/
const questions = [
  {
    text: "What was the first thing about me that made you feel safe talking to me?",
    type: "text",
    reward: "Reading that made me smile ❤️",
    keywords: ["safe", "listen", "trust", "comfort", "calm"]
  },
  {
    text: "What time of day do you feel most connected to me?",
    type: "text",
    reward: "I love knowing that 🥰",
    keywords: ["night", "morning", "late", "time", "talk"]
  },
  {
    text: "What’s one habit of mine you secretly find cute?",
    type: "text",
    reward: "That’s adorable 😌",
    keywords: ["habit", "cute", "smile", "small"]
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
  // 👉 add remaining questions here
];

/*************************
 * STATE
 *************************/
let index = 0;

/*************************
 * VALIDATION DATA
 *************************/
const blocked = [
  "pta nhi", "pata nahi", "idk", "i don't know",
  "yaad nahi", "mmmm", "hmm", "nothing",
  "no idea", "dont know", "don't know"
];

const cheatWords = [
  "20", "ok", "okay", "hogya", "ho gaya",
  "done", "complete", "completed", "finish"
];

const hindiRegex = /[\u0900-\u097F]/;

const commonWords = [
  "i","you","me","we","us","feel","felt","safe","talk",
  "when","because","your","my","with","love","care",
  "time","first","made","thing","moment","always",
  "listen","listened","talking","connected","close"
];

/*************************
 * HELPER FUNCTIONS
 *************************/
function hasSentenceFlow(text) {
  return text.trim().split(/\s+/).length >= 5;
}

function hasEnoughWords(text) {
  const words = text
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length >= 3);
  return words.length >= 6;
}

function hasMeaningfulWords(text) {
  const lower = text.toLowerCase();
  let count = 0;

  for (let word of commonWords) {
    if (
      lower.includes(` ${word} `) ||
      lower.startsWith(word + " ") ||
      lower.endsWith(" " + word)
    ) {
      count++;
    }
  }
  return count >= 2;
}

function containsCheatWords(text) {
  const lower = text.toLowerCase();
  return cheatWords.some(word => lower.includes(` ${word}`));
}

function looksLikeGibberish(text) {
  const words = text.split(/\s+/);

  const shortWords = words.filter(w => w.length <= 2).length;
  if (shortWords > words.length / 2) return true;

  const upperCount = text.replace(/[^A-Z]/g, "").length;
  if (upperCount > text.length * 0.4) return true;

  return false;
}

function isRelatedToQuestion(answer, keywords) {
  if (!keywords || keywords.length === 0) return true;

  const lower = answer.toLowerCase();
  let matches = 0;

  for (let key of keywords) {
    if (lower.includes(key)) matches++;
  }
  return matches >= 2;
}

/*************************
 * UI HELPERS
 *************************/
function showError(msg) {
  const err = document.getElementById("error");
  err.innerText = msg;
  err.style.animation = "none";
  err.offsetHeight;
  err.style.animation = null;
}

function showReward(text) {
  document.getElementById("reward").innerText = text;
  document.getElementById("nextBtn").style.display = "block";
}

/*************************
 * LOAD QUESTION
 *************************/
function loadQuestion() {
  const q = questions[index];

  document.getElementById("question").innerText = q.text;
  document.getElementById("reward").innerText = "";
  document.getElementById("error").innerText = "";
  document.getElementById("nextBtn").style.display = "none";

  document.getElementById("textBox").style.display = "none";
  document.getElementById("optionsBox").innerHTML = "";

  if (q.type === "text") {
    document.getElementById("answer").value = "";
    document.getElementById("charCount").innerText = "0";
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("textBox").style.display = "block";
  } else {
    q.options.forEach(opt => {
      const btn = document.createElement("div");
      btn.className = "option";
      btn.innerText = opt;
      btn.onclick = () => showReward(q.reward);
      document.getElementById("optionsBox").appendChild(btn);
    });
  }
}

/*************************
 * CHARACTER COUNTER
 *************************/
function updateCounter() {
  const textarea = document.getElementById("answer");
  const count = textarea.value.length;

  document.getElementById("charCount").innerText = count;
  document.getElementById("submitBtn").disabled = count < 20;
}

/*************************
 * SUBMIT TEXT ANSWER
 *************************/
function submitText() {
  const answer = document.getElementById("answer").value.trim();
  const lower = answer.toLowerCase();
  const q = questions[index];

  if (answer.length < 20)
    return showError("Please write at least 20 characters.");

  if (hindiRegex.test(answer))
    return showError("Please write your answer in English letters only 🙂");

  for (let word of blocked) {
    if (lower.includes(word))
      return showError("Please write a proper answer from your heart ❤️");
  }

  if (containsCheatWords(answer))
    return showError("Please write a real answer, not shortcuts 😊");

  if (!hasSentenceFlow(answer))
    return showError("Please write a complete sentence 😊");

  if (!hasEnoughWords(answer))
    return showError("Please write a more detailed answer ❤️");

  if (!hasMeaningfulWords(answer))
    return showError("Please write something meaningful ❤️");

  if (looksLikeGibberish(answer))
    return showError("That doesn’t look like a real answer 🙂");

  if (!isRelatedToQuestion(answer, q.keywords))
    return showError("Try answering related to the question 😊");

  // ✅ PASSED ALL CHECKS
  localStorage.setItem(`answer_${index}`, answer);
  showReward(q.reward);
}

/*************************
 * NEXT QUESTION
 *************************/
function nextQuestion() {
  index++;
  if (index >= questions.length) {
    window.location.href = "proposal.html";
  } else {
    loadQuestion();
  }
}

/*************************
 * START
 *************************/
loadQuestion();
