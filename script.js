const digitText = {
  0: [
    "┌", "─", "─", "┐",
    "|", "┌", "┐", "|",
    "|", "|", "|", "|",
    "|", "|", "|", "|",
    "|", "└", "┘", "|",
    "└", "─", "─", "┘"
  ],
  1: [
    "┌", "─", "┐", "?",
    "└", "┐", "|", "?",
    "?", "|", "|", "?",
    "?", "|", "|", "?",
    "┌", "┘", "└", "┐",
    "└", "─", "─", "┘"
  ],
  2: [
    "┌", "─", "─", "┐",
    "└", "─", "┐", "|",
    "┌", "─", "┘", "|",
    "|", "┌", "─", "┘",
    "|", "└", "─", "┐",
    "└", "─", "─", "┘"
  ],
  3: [
    "┌", "─", "─", "┐",
    "└", "─", "┐", "|",
    "┌", "─", "┘", "|",
    "└", "─", "┐", "|",
    "┌", "─", "┘", "|",
    "└", "─", "─", "┘"
  ],
  4: [
    "┌", "┐", "┌", "┐",
    "|", "|", "|", "|",
    "|", "└", "┘", "|",
    "└", "─", "┐", "|",
    "?", "?", "|", "|",
    "?", "?", "└", "┘"
  ],
  5: [
    "┌", "─", "─", "┐",
    "|", "┌", "─", "┘",
    "|", "└", "─", "┐",
    "└", "─", "┐", "|",
    "┌", "─", "┘", "|",
    "└", "─", "─", "┘"
  ],
  6: [
    "┌", "─", "─", "┐",
    "|", "┌", "─", "┘",
    "|", "└", "─", "┐",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "└", "─", "─", "┘"
  ],
  7: [
    "┌", "─", "─", "┐",
    "└", "─", "┐", "|",
    "?", "?", "|", "|",
    "?", "?", "|", "|",
    "?", "?", "|", "|",
    "?", "?", "└", "┘"
  ],
  8: [
    "┌", "─", "─", "┐",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "└", "─", "─", "┘"
  ],
  9: [
    "┌", "─", "─", "┐",
    "|", "┌", "┐", "|",
    "|", "└", "┘", "|",
    "└", "─", "┐", "|",
    "┌", "─", "┘", "|",
    "└", "─", "─", "┘"
  ]
};

const charToAngles = {
  '┐': [180, 270],
  '└': [0, 90],
  '┘': [0, 270],
  '┌': [90, 180],
  '|': [0, 180],
  '─': [90, 270],
  '?':[225, 225]
};

function parseDigitPattern(textPattern) {
  const pattern = [];
  
  for (let i = 0; i < 24; i++) {
    const char = textPattern[i];
    const angles = charToAngles[char];
    if (!angles) {
      throw new Error(`Unknown glyph character "${char}" at cell ${i}`);
    }
    pattern.push(angles);
  }
  
  return pattern;
}

const digitPatterns = {};
for (let digit in digitText) {
  digitPatterns[digit] = parseDigitPattern(digitText[digit]);
}

function createClock(hourAngle, minuteAngle) {
  const clock = document.createElement('div');
  clock.className = 'clock';
  
  const hourHand = document.createElement('div');
  hourHand.className = 'hand hour';
  hourHand.style.transform = `rotate(${hourAngle}deg)`;
  
  const minuteHand = document.createElement('div');
  minuteHand.className = 'hand minute';
  minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  
  clock.appendChild(hourHand);
  clock.appendChild(minuteHand);
  
  return { element: clock, hourHand, minuteHand };
}

function createDigit(num) {
  const element = document.createElement('div');
  element.className = 'digit';
  
  const clocks = [];
  const pattern = digitPatterns[num];
  for (let i = 0; i < 24; i++) {
    const [hourAngle, minuteAngle] = pattern[i];
    const clock = createClock(hourAngle, minuteAngle);
    element.appendChild(clock.element);
    clocks.push(clock);
  }
  
  return { element, clocks, value: num };
}

function updateClockHands(digit, num) {
  if (digit.value === num) return;
  digit.value = num;
  
  const pattern = digitPatterns[num];
  digit.clocks.forEach((clock, i) => {
    const [hourAngle, minuteAngle] = pattern[i];
    clock.hourHand.style.transform = `rotate(${hourAngle}deg)`;
    clock.minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
  });
}

let digitElements = [];

function initDisplay() {
  const container = document.getElementById('clockContainer');
  container.innerHTML = '';
  digitElements = [];
  
  for (let i = 0; i < 6; i++) {
    digitElements.push(createDigit(0));
    container.appendChild(digitElements[i].element);
    
    if (i === 1 || i === 3) {
      const colon = document.createElement('div');
      colon.className = 'colon';
      colon.innerHTML = '<div class="dot"></div><div class="dot"></div>';
      container.appendChild(colon);
    }
  }
}

function updateDisplay() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  updateClockHands(digitElements[0], parseInt(hours[0], 10));
  updateClockHands(digitElements[1], parseInt(hours[1], 10));
  updateClockHands(digitElements[2], parseInt(minutes[0], 10));
  updateClockHands(digitElements[3], parseInt(minutes[1], 10));
  updateClockHands(digitElements[4], parseInt(seconds[0], 10));
  updateClockHands(digitElements[5], parseInt(seconds[1], 10));
  
  setTimeout(updateDisplay, 1000 - (Date.now() % 1000));
}

initDisplay();
updateDisplay();