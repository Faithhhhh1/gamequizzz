/******** QUESTIONS ********/
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

/******** GIFS ********/
const gifs = [
  "assets/assets1.gif",
  "assets/assets2.gif",
  "assets/assets3.gif",
  "assets/assets4.gif",
  "assets/assets5.gif",
  "assets/assets6.gif",
  "assets/assets7.gif",
  "assets/assets8.gif",
  "assets/assets9.gif",
  "assets/assets10.gif"
];

let index = 0;
let musicStarted = false;

/******** MUSIC ********/
function playYouTubeMusic() {
  if (musicStarted) return;
  musicStarted = true;

  const iframe = document.getElementById("ytPlayer");
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func: "unMute", args: [] }),
    "*"
  );
  iframe.contentWindow.postMessage(
    JSON.stringify({ event: "command", func: "playVideo", args: [] }),
    "*"
  );
}

/******** RANDOM GIF ********/
function setRandomGif() {
  const img = document.getElementById("questionGif");
  const src = gifs[Math.floor(Math.random() * gifs.length)];
  img.src = src;
}

/******** LOAD QUESTION ********/
function loadQuestion() {
  const q = questions[index];

  document.getElementById("question").innerText = q.text;
  document.getElementById("reward").innerText = "";
  document.getElementById("error").innerText = "";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("optionsBox").innerHTML = "";
  document.getElementById("textBox").style.display = "none";

  setRandomGif();

  if (q.type === "text") {
    document.getElementById("answer").value = "";
    document.getElementById("charCount").innerText = "0 / 15 characters";
    document.getElementById("submitBtn").disabled = true;
    document.getElementById("submitBtn").style.opacity = "0.5";
    document.getElementById("textBox").style.display = "block";
  } else {
    q.options.forEach(opt => {
      const div = document.createElement("div");
      div.className = "option";
      div.innerText = opt;
      div.onclick = () => {
        playYouTubeMusic();
        document.getElementById("reward").innerText = q.reward;
        document.getElementById("nextBtn").style.display = "block";
      };
      document.getElementById("optionsBox").appendChild(div);
    });
  }
}

/******** COUNTER ********/
function updateCounter() {
  const input = document.getElementById("answer");
  const submitBtn = document.getElementById("submitBtn");
  const count = input.value.length;

  document.getElementById("charCount").innerText =
    `${count} / 15 characters`;

  if (count >= 15) {
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
  } else {
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.5";
  }
}

/******** SUBMIT ********/
function submitText() {
  const text = document.getElementById("answer").value.toLowerCase();

  if (
    text.includes("dont know") ||
    text.includes("don't know") ||
    text.includes("idk") ||
    text.includes("no idea")
  ) {
    document.getElementById("error").innerText =
      "Say something from your heart 💗";
    return;
  }

  playYouTubeMusic();
  document.getElementById("reward").innerText = questions[index].reward;
  document.getElementById("nextBtn").style.display = "block";
}

/******** NEXT ********/
function nextQuestion() {
  index++;
  if (index >= questions.length) {
    window.location.href = "proposal.html";
  } else {
    loadQuestion();
  }
}

/******** SAKURA ********/
const sakuraContainer = document.getElementById("sakura-container");
for (let i = 0; i < 30; i++) {
  const petal = document.createElement("div");
  petal.className = "sakura";
  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 8 + Math.random() * 10 + "s";
  petal.style.animationDelay = Math.random() * 5 + "s";
  petal.style.transform = `scale(${0.5 + Math.random()})`;
  sakuraContainer.appendChild(petal);
}

/******** INIT ********/
document.addEventListener("DOMContentLoaded", loadQuestion);
