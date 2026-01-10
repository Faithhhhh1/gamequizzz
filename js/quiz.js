// ================= COLLECT ANSWERS =================
const collectedAnswers = [];

// ================= QUESTIONS =================
const questions = [
  {
    text: "1. What was the first thing about me that made you feel safe talking to me?",
    type: "text",
    reward: "Reading that made me smile ❤️"
  },
  {
    text: "2. What time of day do you feel most connected to me?",
    type: "text",
    reward: "I love knowing that 🕰️"
  },
  {
    text: "3. What’s one habit of mine you secretly find cute?",
    type: "text",
    reward: "That’s adorable 😌"
  },
  {
    text: "4. When you imagine us talking in the future, what’s the one thing you hope never changes?",
    type: "text",
    reward: "I’ll protect that 💞"
  },
  {
    text: "5. Which word best describes how I make you feel?",
    type: "text",
    reward: "That word means everything 💗"
  },
  {
    text: "6. What’s your favorite way I show care for you?",
    type: "text",
    reward: "I’ll keep doing that 🤍"
  },
  {
    text: "7. If I’m having a bad day, what do you think helps me the most?",
    type: "text",
    reward: "You understand me 🫂"
  },
  {
    text: "8. What was your first thought when we had our very first real conversation?",
    type: "text",
    reward: "That moment mattered ✨"
  },
  {
    text: "9. Which moment made you think: “Okay… he is different”?",
    type: "text",
    reward: "That changed things 💫"
  },
  {
    text: "10. Which of my messages do you still remember clearly that you love?",
    type: "text",
    reward: "I love that you remember it 🥺"
  },
  {
    text: "11. What’s one small thing I do that makes you smile instantly?",
    type: "text",
    reward: "I’ll never stop 😊"
  },
  {
    text: "12. What’s your favorite version of me?",
    type: "options",
    options: ["Sleepy me","Serious me","Loving but naughty me","Normal me"],
    reward: "I love you. 💖"
  },
  {
    text: "13. What’s one thing about me you would never accept, even if the whole world said it was true?",
    type: "options",
    options: [
      "That I don’t feel things deeply for you",
      "That I think about other girls",
      "That I don’t love you seriously",
      "That I’m not enough for you",
      "Or you won't listen to anyone"
    ],
    reward: "That kind of faith means everything to me 💓"
  },
  {
    text: "14. What song reminds you of us the most?",
    type: "text",
    reward: "That song is ours 🎶"
  },
  {
    text: "15. When did you first feel emotionally close to me?",
    type: "text",
    reward: "That closeness still exists 💞"
  },
  {
    text: "16. What do you think I appreciate most about you?",
    type: "text",
    reward: "You’re more right than you know 💝"
  },
  {
    text: "17. What’s one thing you wish you could have experienced with me already?",
    type: "text",
    reward: "One day… soon 🤍"
  },
  {
    text: "18. If we had a shared memory album, what would the first page be titled?",
    type: "text",
    reward: "That title sounds beautiful 📖"
  },
  {
    text: "19. If I leaned closer while talking, what would you notice first?",
    type: "text",
    reward: "That’s dangerously sweet 😏"
  },
  {
    text: "20. Which compliment from me makes you feel the most blushed?",
    type: "text",
    reward: "I love making you blush 💕"
  },
  {
    text: "21. If I whispered something just for you, what kind of thing would you hope it was?",
    type: "text",
    reward: "I might whisper it someday 😌"
  },
  {
    text: "22. What’s one innocent thing I do that doesn’t feel innocent to you?",
    type: "text",
    reward: "You noticed 😈"
  },
  {
    text: "23. If I teased and kissed you a little, what would leave me?",
    type: "text",
    reward: "I like this thought 😘"
  },
  {
    text: "24. If you imagine me close to you, how does it make you feel?",
    type: "text",
    reward: "I feel it too 🤍"
  },
  {
    text: "25. What do you think I value most in you?",
    type: "options",
    options: ["Your beauty","Your dumbness","Your emotional depth","Your sarcasm"],
    reward: "You matter to me 💖"
  },
  {
    text: "26. How do I make you think I’m loving you so much right now?",
    type: "options",
    options: ["Giving space","Talking naughty","Flirting","Sending long love messages"],
    reward: "Because I mean it 💘"
  },
  {
    text: "27. What was your first impression of me?",
    type: "options",
    options: ["Timepass","Interesting","Too serious","Boring"],
    reward: "First impressions evolve 😉"
  },
  {
    text: "28. When did you start feeling emotionally close to me?",
    type: "options",
    options: ["First chat","First flirt","After proposal","I'm still not attached"],
    reward: "Feelings grow 💞"
  },
  {
    text: "29. What kind of messages from me do you like most?",
    type: "options",
    options: ["Short ones","Long timepass","Nothing","Random love & naughty texts"],
    reward: "Noted carefully 😏"
  },
  {
    text: "30. What do you think I’m best at?",
    type: "options",
    options: ["Making you laugh","Loving you","Giving advice","Being dramatic"],
    reward: "I’ll keep doing that 💕"
  },
  {
    text: "31. If we were on a long call, what would make you smile?",
    type: "options",
    options: ["Awkward silence","My laugh","Nothing","Flirting"],
    reward: "I can imagine that smile 😊"
  },
  {
    text: "32. What kind of compliment from me hits you hardest?",
    type: "options",
    options: ["About your beauty","About your body","About your voice","About your clothes"],
    reward: "You deserve all of them 💗"
  },
  {
    text: "33. What do you think I notice about you first?",
    type: "options",
    options: ["Your yapping","Your mood","Your beauty","Your words"],
    reward: "I notice everything 👀"
  },
  {
    text: "34. What kind of romance from me affects you the most?",
    type: "options",
    options: ["Direct touch","Little touch and loving looks","Talking naughty","No teasing only action"],
    reward: "That intensity is mutual 🔥"
  },
  {
    text: "35. What makes conversations with me feel intense sometimes?",
    type: "options",
    options: ["Long pauses","Emotional depth","Serious topics","Random jokes"],
    reward: "That’s our thing 🖤"
  },
  {
    text: "36. What scares you a little about how close we are?",
    type: "options",
    options: ["Distance","Feelings getting deeper","Time difference","My love for you"],
    reward: "Some fears are worth it 💞"
  },
  {
    text: "37. What do you think I imagine when I think of you?",
    type: "options",
    options: ["Your smile","Your voice","Your messages","Your photos"],
    reward: "You’re always on my mind 💭"
  },
  {
    text: "38. If I went quiet suddenly, what would you assume?",
    type: "options",
    options: ["I’m bored","I’m angry","I’m thinking about you","I forgot"],
    reward: "Silence has meaning 🌙"
  },
  {
    text: "39. What do you think keeps us strong despite distance?",
    type: "options",
    options: ["Attraction","Communication","Habit","Curiosity"],
    reward: "Whatever it is — it’s real 💕"
  },
  {
    text: "40. What do you believe I feel for you?",
    type: "options",
    options: ["Interest","Care","Something deeper","Curiosity"],
    reward: "Some feelings go beyond words ❤️"
  },
  {
    text: "41. What do you think this game is really about?",
    type: "options",
    options: ["Winning rewards","Passing time","Proving something","Feeling close"],
    reward: "You already know 💖"
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

  const lengthOK = value.trim().length >= 10;
  const hasForbidden = forbiddenPatterns.some(p => p.test(value.trim()));

  charCount.textContent = value.length;
  submitBtn.disabled = !(lengthOK && !hasForbidden);
});

// ================= LOAD QUESTION =================
function loadQuestion() {
  const q = questions[index];
  if (!q) return;

  questionEl.textContent = q.text;
  rewardEl.textContent = "";
  optionsBox.innerHTML = "";
  gifEl.src = gifs[Math.floor(Math.random() * gifs.length)];

  answerEl.value = "";
  charCount.textContent = "0";
  submitBtn.disabled = true;

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

        rewardEl.textContent = q.reward;

        setTimeout(() => {
          index++;
          sessionStorage.setItem("quizIndex", index);
          index >= questions.length ? finishQuiz() : loadQuestion();
        }, 700);
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
  rewardEl.textContent = questions[index].reward;

  setTimeout(() => {
    index++;
    sessionStorage.setItem("quizIndex", index);
    index >= questions.length ? finishQuiz() : loadQuestion();
  }, 800);
});

// ================= FINISH QUIZ =================
function finishQuiz() {
  sessionStorage.removeItem("quizIndex");
  window.location.href = "proposal.html";
}

// ✅ INIT
loadQuestion();
