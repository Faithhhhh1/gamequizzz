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
    reward: "I love the way you see me 😌"
  }
  // ➕ add the rest here
];

let index = 0;

const blocked = [
  "pta nhi", "pata nahi", "idk", "i don't know",
  "yaad nahi", "mmmm", "hmm", "nothing", "no idea"
];

const hindiRegex = /[\u0900-\u097F]/;

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
    document.getElementById("textBox").style.display = "block";
  } else {
    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerText = opt;
      div.onclick = () => showReward(q.reward);
      document.getElementById("optionsBox").appendChild(div);
    });
  }
}

function submitText() {
  const answer = document.getElementById("answer").value.trim();
  const lower = answer.toLowerCase();

  if (answer.length < 20)
    return showError("Please write at least 20 characters.");

  if (hindiRegex.test(answer))
    return showError("Please write in English letters only 🙂");

  for (let word of blocked) {
    if (lower.includes(word))
      return showError("Please write a proper answer from your heart ❤️");
  }

  localStorage.setItem(`answer_${index}`, answer);
  showReward(questions[index].reward);
}

function showReward(text) {
  document.getElementById("reward").innerText = text;
  document.getElementById("nextBtn").style.display = "block";
}

function showError(msg) {
  document.getElementById("error").innerText = msg;
}

function nextQuestion() {
  index++;
  if (index >= questions.length) {
    window.location.href = "proposal.html";
  } else {
    loadQuestion();
  }
}

loadQuestion();
