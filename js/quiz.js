/********************************
 * QUESTIONS
 ********************************/
const questions = [
  {
    text: "What was the first thing about me that made you feel safe talking to me?",
    type: "text",
    reward: "Reading that made me smile ❤️",
    keywords: ["safe", "listen", "trust", "comfort", "calm", "favorite"]
  },
  {
    text: "What time of day do you feel most connected to me?",
    type: "text",
    reward: "I love knowing that 🥰",
    keywords: ["night", "morning", "late", "time", "talk", "connected"]
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
  // 👉 add more questions below
];

/********************************
 * STATE
 ********************************/
let index = 0;

/********************************
 * SAFE DOM ACCESS
 ********************************/
function el(id) {
  return document.getElementById(id);
}

/********************************
 * VALIDATION DATA
 ********************************/
const blocked = [
  "pta nhi", "pata nahi", "idk", "i don't know",
  "yaad nahi", "mmmm", "hmm", "nothing",
  "no idea", "dont know", "don't know"
];

const cheatWords = [
  "ok", "okay", "hogya", "ho gaya",
  "done", "complete", "completed", "finish", "15"
];

const hindiRegex = /[\u0900-\u097F]/;

/********************************
 * HELPER CHECKS
 ********************************/
function hasEnoughWords(text) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length >= 3).length >= 3;
}

function hasSentenceFlow(text) {
  return text.trim().split(/\s+/).length >= 4;
}

function looksLikeGibberish(text) {
  const words = text.split(/\s+/);
  const shortWords = words.filter(w => w.length <= 2).length;
  const upperCount = text.replace(/[^A-Z]/g, "").length;

  if (shortWords > words.length / 2) return true;
  if (upperCount > text.length * 0.4) return true;

  return false;
}

function containsCheatWords(text) {
  const lower = text.toLowerCase();
  return cheatWords.some(w => lower.includes(` ${w}`));
}

function isRelatedToQuestion(answer, keywords) {
  if (!keywords || keywords.length === 0) return true;

  const lower = answer.toLowerCase();
  let matches = 0;

  for (let key of keywords) {
    if (lower.includes(key)) matches++;
  }

  return matches >= 1; // very gentle relevance
}

/********************************
 * UI HELPERS
 ********************************/
function showError(msg) {
  if (!el("error")) return;
  el("error").innerText = msg;
}

function showReward(text) {
  if (!el("reward")) return;
  el("reward").innerText = text;
  el("nextBtn").style.display = "block";
}

/********************************
 * LOAD QUESTION
 ********************************/
function loadQuestion() {
  const q = questions[index];
  if (!q || !el("question")) return;

  el("question").innerText = q.text;
  el("reward").innerText = "";
  el("error").innerText = "";
  el("nextBtn").style.display = "none";
  el("textBox").style.display = "none";
  el("optionsBox").innerHTML = "";

  if (q.type === "text") {
    el("answer").value = "";
    el("charCount").innerText = "0";
    el("submitBtn").disabled = true;
    el("textBox").style.display = "block";
  } else {
    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerText = opt;
      div.onclick = () => showReward(q.reward);
      el("optionsBox").appendChild(div);
    });
  }
}

/********************************
 * CHARACTER COUNTER (15 chars)
 ********************************/
function updateCounter() {
  if (!el("answer")) return;
  const count = el("answer").value.length;
  el("charCount").innerText = count;
  el("submitBtn").disabled = count < 15;
}

/********************************
 * SUBMIT TEXT ANSWER
 ********************************/
function submitText() {
  const q = questions[index];
  const answer = el("answer").value.trim();
  const lower = answer.toLowerCase();

  if (answer.length < 15)
    return showError("Please write at least 15 characters 🙂");

  if (hindiRegex.test(answer))
    return showError("Please write in English letters only 🙂");

  for (let w of blocked) {
    if (lower.includes(w))
      return showError("Please write a real answer from your heart ❤️");
  }

  if (containsCheatWords(answer))
    return showError("Please don’t use shortcuts 😊");

  if (!hasEnoughWords(answer))
    return showError("Please write at least 3 meaningful words 💕");

  if (looksLikeGibberish(answer))
    return showError("That doesn’t look like a real sentence 🙂");

  if (!isRelatedToQuestion(answer, q.keywords)) {
    return showError("That’s sweet ❤️ Can you tell me a little more?");
  }

  // ✅ VALID ANSWER
  localStorage.setItem(`answer_${index}`, answer);
  showReward(q.reward);
}

/********************************
 * NEXT QUESTION
 ********************************/
function nextQuestion() {
  index++;
  if (index >= questions.length) {
    window.location.href = "proposal.html";
  } else {
    loadQuestion();
  }
}

/********************************
 * START AFTER DOM READY
 ********************************/
document.addEventListener("DOMContentLoaded", loadQuestion);
