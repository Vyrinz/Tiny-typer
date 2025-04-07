const wordBox = document.getElementById("word-box");
const input = document.getElementById("input");
const wpmDisplay = document.getElementById("wpm");

const words = "apple banana orange computer keyboard monitor mouse code screen developer language typing javascript python random challenge focus speed logic create write structure learn gaming input terminal memory result".split(" ");

let testWords = [];
let charSpans = [];
let charIndex = 0;
let startTime = null;

function generateParagraph(wordCount = 50) {
  testWords = [];
  for (let i = 0; i < wordCount; i++) {
    testWords.push(words[Math.floor(Math.random() * words.length)]);
  }

  const paragraph = testWords.join(" ") + " ";
  wordBox.innerHTML = "";

  charSpans = [];
  for (let char of paragraph) {
    const span = document.createElement("span");
    span.textContent = char;
    wordBox.appendChild(span);
    charSpans.push(span);
  }

  charIndex = 0;
  charSpans[0].classList.add("current");
}

function updateWPM() {
  const elapsed = (Date.now() - startTime) / 60000;
  const typed = input.value.length;
  const wpm = Math.round((typed / 5) / elapsed);
  wpmDisplay.textContent = `WPM: ${wpm}`;
}

input.addEventListener("input", () => {
  const typed = input.value;

  if (!startTime) startTime = Date.now();

  // Reset all
  charSpans.forEach(span => {
    span.classList.remove("correct", "incorrect", "current");
  });

  for (let i = 0; i < charSpans.length; i++) {
    const char = typed[i];
    const expected = charSpans[i].textContent;

    if (char == null) {
      // Not typed yet
    } else if (char === expected) {
      charSpans[i].classList.add("correct");
    } else {
      charSpans[i].classList.add("incorrect");
    }

    if (i === typed.length) {
      charSpans[i].classList.add("current");
    }
  }

  updateWPM();
});

generateParagraph();
