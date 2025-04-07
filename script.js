const wordBox = document.getElementById("word-box");
const input = document.getElementById("input");
const wpmDisplay = document.getElementById("wpm");

const words = "apple banana orange computer keyboard monitor mouse code screen developer language typing javascript python random challenge focus speed performance logic pixel display memory dark light digital create solve build write structure learn practice school gaming letter input result terminal style mousepad".split(" ");

let testWords = [];
let currentIndex = 0;
let startTime = null;
let typedWords = 0;

function generateWords(count = 35) {
  testWords = [];
  for (let i = 0; i < count; i++) {
    const word = words[Math.floor(Math.random() * words.length)];
    testWords.push(word);
  }
  displayWords();
}

function displayWords() {
  wordBox.innerHTML = "";
  testWords.forEach((word, idx) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.classList.add("word");
    if (idx === currentIndex) {
      span.classList.add("current");
    }
    wordBox.appendChild(span);
  });
}

function updateWPM() {
  const elapsed = (Date.now() - startTime) / 60000;
  const wpm = Math.round(typedWords / elapsed);
  wpmDisplay.textContent = `WPM: ${wpm}`;
}

input.addEventListener("input", () => {
  const currentWordSpan = wordBox.children[currentIndex];
  const currentWord = testWords[currentIndex];
  const typed = input.value;

  currentWordSpan.classList.remove("correct", "incorrect");

  if (!startTime) {
    startTime = Date.now();
  }

  if (typed.endsWith(" ")) {
    const cleanTyped = typed.trim();
    if (cleanTyped === currentWord) {
      currentWordSpan.classList.add("correct");
    } else {
      currentWordSpan.classList.add("incorrect");
    }
    typedWords++;
    currentIndex++;
    input.value = "";
    if (currentIndex < testWords.length) {
      displayWords();
    } else {
      input.disabled = true;
      updateWPM();
    }
    updateWPM();
  } else {
    if (currentWord.startsWith(typed)) {
      currentWordSpan.classList.remove("incorrect");
    } else {
      currentWordSpan.classList.add("incorrect");
    }
  }
});

generateWords();
