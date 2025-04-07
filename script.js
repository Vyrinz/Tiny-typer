const wordBox = document.getElementById("word-box");
const input = document.getElementById("input");
const wpmDisplay = document.getElementById("wpm");

const words = "cat dog sun big red fun run toy boy joy hat mat map log zip day way go yes no if on in up to do it we me you all can not but and".split(" ");

let testWords = [];
let charSpans = [];
let charIndex = 0;
let startTime = null;

function generateParagraph(wordCount = 40) {
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
    span.classList.add("char");
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

  charSpans.forEach(span => {
    span.classList.remove("correct", "incorrect", "current");
  });

  for (let i = 0; i < charSpans.length; i++) {
    const char = typed[i];
    const expected = charSpans[i].textContent;

    if (char == null) {
      // not typed yet
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
