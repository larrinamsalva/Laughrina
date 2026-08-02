const comedyModes = {
  "Porch Talk": {
    emoji: "🪑",
    note: "Everyday stories",
    jokes: [
      ["I cleaned one corner of the room and immediately started acting like I had my life together.", "suspiciously productive"],
      ["I don't gossip. I provide emotionally accurate neighborhood updates.", "community service"],
      ["Some days I am a powerful warrior. Other days I lose my phone while holding it.", "range"],
      ["I sat down for five minutes and my body submitted a formal request to remain seated forever.", "management is reviewing it"]
    ]
  },
  "Read the Room": {
    emoji: "👀",
    note: "People-watching",
    jokes: [
      ["Nothing tests your patience like someone saying ‘calm down’ while contributing absolutely no calm.", "bold strategy"],
      ["He entered the room with the confidence of a man who had never replayed a conversation at 2 a.m.", "must be peaceful"],
      ["Some people don't read the room. They skim the title and start a podcast.", "volume one"],
      ["You can tell a lot about a person by how quickly they make someone else's story about themselves.", "speed networking"]
    ]
  },
  "Animal Chaos": {
    emoji: "🐾",
    note: "Pets run the house",
    jokes: [
      ["My dogs don't bark at danger. They bark because a leaf has made a personal decision.", "security team"],
      ["A cat will ignore the expensive bed and sleep inside the box it came in. Honestly, that's financial wisdom.", "tiny accountant"],
      ["I opened a snack quietly. Eight dogs appeared like I had activated a furry emergency broadcast system.", "they heard the cheese"],
      ["The dog watched me clean the floor, then brought in one leaf. Teamwork means different things to different species.", "quality control"]
    ]
  },
  "Truth Hits Different": {
    emoji: "✨",
    note: "Funny but real",
    jokes: [
      ["Growth is realizing you don't need the last word. You just need a dramatic exit and a snack.", "healing journey"],
      ["Your ego is not your bodyguard. Sometimes it's just a loud intern with no training.", "please revoke the badge"],
      ["I forgive, but my memory keeps excellent meeting notes.", "minutes approved"],
      ["Being kind doesn't mean being available for nonsense during business hours.", "office closed"]
    ]
  },
  "RV Life": {
    emoji: "🚐",
    note: "Tiny home, big stories",
    jokes: [
      ["RV living teaches minimalism. Mostly because every object is already touching three other objects.", "open concept"],
      ["In an RV, walking to the kitchen is one step. Somehow I still forget why I went there.", "long journey"],
      ["The weather said light rain. The RV park said character development.", "waterfront property"],
      ["You haven't known suspense until you hear a mystery sound inside an RV at midnight.", "probably fine"]
    ]
  },
  "Wildflower Wit": {
    emoji: "🌻",
    note: "Soft heart, sharp eye",
    jokes: [
      ["I am one with nature, except mosquitoes. That relationship is currently in litigation.", "boundaries"],
      ["I talked to my plants today. They listened better than half the people I know.", "strong listeners"],
      ["Wildflowers don't ask permission to bloom. They also don't answer group texts, which feels healthy.", "unavailable and thriving"],
      ["I went outside to find peace and immediately stepped in something mysterious.", "nature answered"]
    ]
  }
};

const moods = [
  ["😊", "Need a smile", "Porch Talk"],
  ["😮‍💨", "Long day", "Animal Chaos"],
  ["👀", "I noticed something", "Read the Room"],
  ["🔥", "Tiny bit spicy", "Truth Hits Different"],
  ["🎲", "Surprise me", "random"]
];

const roasts = {
  1: [
    "You are doing great. Your decision-making just occasionally wears flip-flops to a construction site.",
    "You're not a mess. You're a limited-edition organizational mystery.",
    "You have main-character energy and background-tab memory."
  ],
  2: [
    "You said ‘I got this’ with the confidence of someone who had not yet looked at the instructions.",
    "Your attention span just left to investigate a noise in another room.",
    "You're not avoiding the task. You're giving it time to think about what it did."
  ],
  3: [
    "That plan had confidence, glitter, and absolutely no adult supervision.",
    "Your ego brought a microphone to a conversation that needed headphones.",
    "You didn't miss the red flag. You admired the fabric and asked whether it came in purple."
  ]
};

const moodGrid = document.querySelector("#moodGrid");
const modeGrid = document.querySelector("#modeGrid");
const jokeText = document.querySelector("#jokeText");
const jokeTag = document.querySelector("#jokeTag");
const modeLabel = document.querySelector("#modeLabel");
const nextButton = document.querySelector("#nextButton");
const favoriteButton = document.querySelector("#favoriteButton");
const favoritesList = document.querySelector("#favoritesList");
const favoriteCount = document.querySelector("#favoriteCount");
const roastSlider = document.querySelector("#roastSlider");
const roastButton = document.querySelector("#roastButton");
const themeButton = document.querySelector("#themeButton");
const clearFavorites = document.querySelector("#clearFavorites");

let currentMode = "Porch Talk";
let currentJoke = { text: comedyModes[currentMode].jokes[0][0], tag: comedyModes[currentMode].jokes[0][1] };
let favorites = JSON.parse(localStorage.getItem("laughrina-favorites") || "[]");

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function chooseRandomMode() {
  return randomItem(Object.keys(comedyModes));
}

function showJoke(mode = currentMode) {
  currentMode = mode === "random" ? chooseRandomMode() : mode;
  const [text, tag] = randomItem(comedyModes[currentMode].jokes);
  currentJoke = { text, tag, mode: currentMode };
  jokeText.textContent = text;
  jokeTag.textContent = `— ${tag}`;
  modeLabel.textContent = currentMode.toUpperCase();
  document.querySelectorAll(".mode-button").forEach(button => {
    button.classList.toggle("active", button.dataset.mode === currentMode);
  });
  updateFavoriteButton();
}

function renderControls() {
  moods.forEach(([emoji, label, mode]) => {
    const button = document.createElement("button");
    button.className = "mood-chip";
    button.type = "button";
    button.textContent = `${emoji} ${label}`;
    button.addEventListener("click", () => showJoke(mode));
    moodGrid.appendChild(button);
  });

  Object.entries(comedyModes).forEach(([name, data]) => {
    const button = document.createElement("button");
    button.className = "mode-button";
    button.type = "button";
    button.dataset.mode = name;
    button.innerHTML = `${data.emoji} ${name}<small>${data.note}</small>`;
    button.addEventListener("click", () => showJoke(name));
    modeGrid.appendChild(button);
  });
}

function isSaved(text) {
  return favorites.some(item => item.text === text);
}

function updateFavoriteButton() {
  const saved = isSaved(currentJoke.text);
  favoriteButton.textContent = saved ? "♥ Saved" : "♡ Save";
  favoriteButton.classList.toggle("saved", saved);
}

function saveFavorites() {
  localStorage.setItem("laughrina-favorites", JSON.stringify(favorites));
  renderFavorites();
  updateFavoriteButton();
}

function renderFavorites() {
  favoritesList.innerHTML = "";
  favoriteCount.textContent = `${favorites.length} saved`;
  if (!favorites.length) {
    favoritesList.innerHTML = '<p class="empty-state">Your favorite jokes will wait here like snacks hidden from everybody else.</p>';
    return;
  }
  favorites.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "favorite-item";
    row.innerHTML = `<p><strong>${item.mode || "Laughrina"}</strong><br>${item.text}</p>`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.setAttribute("aria-label", "Remove saved joke");
    remove.textContent = "×";
    remove.addEventListener("click", () => {
      favorites.splice(index, 1);
      saveFavorites();
    });
    row.appendChild(remove);
    favoritesList.appendChild(row);
  });
}

nextButton.addEventListener("click", () => showJoke(currentMode));

favoriteButton.addEventListener("click", () => {
  if (isSaved(currentJoke.text)) {
    favorites = favorites.filter(item => item.text !== currentJoke.text);
  } else {
    favorites.unshift(currentJoke);
  }
  saveFavorites();
});

roastButton.addEventListener("click", () => {
  const level = roastSlider.value;
  currentMode = "Gentle Fire";
  currentJoke = { text: randomItem(roasts[level]), tag: ["warm tease", "little crispy", "truth with glitter"][level - 1], mode: "Gentle Fire" };
  jokeText.textContent = currentJoke.text;
  jokeTag.textContent = `— ${currentJoke.tag}`;
  modeLabel.textContent = "GENTLE FIRE";
  updateFavoriteButton();
  document.querySelector(".stage-card").scrollIntoView({ behavior: "smooth", block: "center" });
});

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  themeButton.textContent = light ? "☀" : "☾";
  localStorage.setItem("laughrina-theme", light ? "light" : "dark");
});

clearFavorites.addEventListener("click", () => {
  favorites = [];
  saveFavorites();
});

if (localStorage.getItem("laughrina-theme") === "light") {
  document.body.classList.add("light");
  themeButton.textContent = "☀";
}

renderControls();
renderFavorites();
showJoke("Porch Talk");
