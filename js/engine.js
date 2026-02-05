/* ============================================
   GAME ENGINE
   Core systems: rendering, state, transitions, input
   ============================================ */

// ============================================
// STATE
// ============================================
const state = {
  time: 0,
  decay: 0,
  perspective: 1, // 1=Maintainer, 2=Observer, 3=Wanderer, 4=Inheritor
  location: 'command',
  specimenLocation: 'storage', // storage -> observation (auto) -> observation -> carried
  observerCycles: 100, // Cycle counter for Observer (decrements with actions)
  wandererProximity: 5, // 0-10, affects Wanderer text clarity (higher = clearer)
  previousText: null,
  visits: {
    command: 0, corridor: 0, quarters: 0, medical: 0,
    engineering: 0, observation: 0, storage: 0, airlock: 0
  },
  flags: {
    seen_specimen: false,
    maintainer_power_choice: null,
    maintainer_checked_reactor: false,
    maintainer_saw_alert: false,
    maintainer_has_token: false,
    maintainer_logged_447: false,
    maintainer_found_star: false,
    maintainer_read_chain_log: false,
    // Observer flags
    observer_classification: null,
    observer_found_847: false,
    observer_uploaded_archive: false,
    observer_found_remains: false,
    observer_examined_specimen: false,
    observer_fragment_command: false,
    observer_fragment_engineering: false,
    observer_fragment_observation: false,
    observer_fragment_medical: false,
    observer_left_message: false,
    observer_found_maintainer_log: false,
    // Wanderer flags
    wanderer_purge_choice: null,
    wanderer_found_specimen: false,
    wanderer_heard_message: false,
    // Inheritor flags
    inheritor_final_choice: null
  },
  chainIntact: true
};

// ============================================
// DOM REFERENCES
// ============================================
let outputDiv, optionsDiv, headerDiv, transitionDiv, screenFrame;
let selectedIndex = 0;
let currentOptions = [];
let isTransitioning = false;

function initDOMReferences() {
  outputDiv = document.getElementById('output');
  optionsDiv = document.getElementById('options');
  headerDiv = document.getElementById('header');
  transitionDiv = document.getElementById('transition');
  screenFrame = document.getElementById('screen-frame');
}

// ============================================
// TEXT DECAY SYSTEM
// ============================================
function decay(full, medium, minimal) {
  if (state.decay < 5) return full;
  if (state.decay < 10) return medium;
  return minimal;
}

function getDecayText(textObj) {
  if (typeof textObj === 'string') return textObj;
  if (state.decay < 5) return textObj.full;
  if (state.decay < 10) return textObj.medium;
  return textObj.minimal;
}

function advanceTime() {
  state.time++;
  const previousDecay = state.decay;
  state.decay++;
  updateDecayClass();

  // Observer cycle decrement
  if (state.perspective === 2) {
    state.observerCycles = Math.max(0, state.observerCycles - 1);
    updateCycleCounter();
  }

  // Check for decay threshold crossings
  if (previousDecay < 5 && state.decay >= 5) {
    setTimeout(() => showDecayThresholdFeedback(1), 800);
  } else if (previousDecay < 10 && state.decay >= 10) {
    setTimeout(() => showDecayThresholdFeedback(2), 800);
  }
}

// Count Observer fragments collected
function getObserverFragmentCount() {
  let count = 0;
  if (state.flags.observer_fragment_command) count++;
  if (state.flags.observer_fragment_engineering) count++;
  if (state.flags.observer_fragment_observation) count++;
  if (state.flags.observer_fragment_medical) count++;
  return count;
}

// Check if Observer can classify (needs 3+ fragments)
function canObserverClassify() {
  return getObserverFragmentCount() >= 3;
}

// Update cycle counter display
function updateCycleCounter() {
  const cycleEl = document.getElementById('cycle-value');
  if (cycleEl && state.perspective === 2) {
    cycleEl.textContent = state.observerCycles;
    // Visual warning at low cycles
    if (state.observerCycles <= 20) {
      cycleEl.style.color = '#a66';
    } else if (state.observerCycles <= 50) {
      cycleEl.style.color = '#a96';
    }
  }
}

function showDecayThresholdFeedback(level) {
  const feedback = DECAY_FEEDBACK[state.perspective]?.[level];
  if (feedback) {
    if (feedback.type === 'system') {
      showDecayNotice(feedback.text);
    } else {
      showInterior(feedback.text);
    }
  }
}

function updateDecayClass() {
  const frame = document.getElementById('screen-frame');
  frame.classList.remove('decay-1', 'decay-2', 'decay-3');
  if (state.decay >= 15) frame.classList.add('decay-3');
  else if (state.decay >= 10) frame.classList.add('decay-2');
  else if (state.decay >= 5) frame.classList.add('decay-1');
}

// ============================================
// RENDERING
// ============================================
function updateHeader() {
  headerDiv.textContent = `SECTOR: ${LOCATION_FULL_NAMES[state.location] || '---'}`;
}

function showText(text, cssClass = 'environment') {
  outputDiv.querySelectorAll('.paragraph:not(.previous)').forEach(p => {
    p.classList.add('previous');
  });

  const p = document.createElement('div');
  p.className = `paragraph ${cssClass}`;
  p.textContent = text;
  outputDiv.appendChild(p);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function showSystemAlert(text) {
  const p = document.createElement('div');
  p.className = 'paragraph system-alert';
  p.textContent = text;
  outputDiv.appendChild(p);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function showSystemPrompt(text) {
  const p = document.createElement('div');
  p.className = 'paragraph system-prompt';
  p.textContent = text;
  outputDiv.appendChild(p);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function showNotice(text) {
  const p = document.createElement('div');
  p.className = 'paragraph notice';
  p.textContent = text;
  outputDiv.appendChild(p);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function showInterior(text) {
  if (state.decay >= 10) return; // No interior voice at high decay
  const p = document.createElement('div');
  p.className = 'paragraph interior';
  p.textContent = text;
  outputDiv.appendChild(p);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function showTerminalData(text) {
  const p = document.createElement('div');
  p.className = 'paragraph terminal-data';
  p.textContent = text;
  outputDiv.appendChild(p);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function showDecayNotice(text) {
  const p = document.createElement('div');
  p.className = 'paragraph decay-notice';
  p.textContent = text;
  outputDiv.appendChild(p);
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

function clearOutput() {
  outputDiv.innerHTML = '';
}

// ============================================
// OPTIONS DISPLAY
// ============================================
function displayOptions(options) {
  currentOptions = options;
  optionsDiv.innerHTML = '';
  selectedIndex = 0;

  const actions = options.filter(opt => !opt.isNav);
  const navigation = options.filter(opt => opt.isNav);

  if (actions.length > 0) {
    const actionsSection = document.createElement('div');
    actionsSection.id = 'actions-section';

    actions.forEach((opt, i) => {
      const div = document.createElement('div');
      div.className = 'option action-option' + (i === 0 ? ' selected' : '');
      div.innerHTML = `<span class="bullet">›</span>${opt.text}${i === 0 ? '<span class="cursor"></span>' : ''}`;
      div.addEventListener('click', () => selectOption(i));
      actionsSection.appendChild(div);
    });

    optionsDiv.appendChild(actionsSection);
  }

  if (navigation.length > 0) {
    const separator = document.createElement('div');
    separator.className = 'nav-separator';
    optionsDiv.appendChild(separator);

    const navLabel = document.createElement('div');
    navLabel.className = 'nav-label';
    navLabel.textContent = 'navigate';
    optionsDiv.appendChild(navLabel);

    const navSection = document.createElement('div');
    navSection.id = 'nav-section';

    navigation.forEach((opt, i) => {
      const globalIndex = actions.length + i;
      const div = document.createElement('div');
      div.className = 'option nav-option' + (actions.length === 0 && i === 0 ? ' selected' : '');
      div.innerHTML = `<span class="nav-arrow">→</span>${opt.text}${actions.length === 0 && i === 0 ? '<span class="cursor"></span>' : ''}`;
      div.addEventListener('click', () => selectOption(globalIndex));
      navSection.appendChild(div);
    });

    optionsDiv.appendChild(navSection);
  }
}

function highlightOption(index) {
  const options = optionsDiv.querySelectorAll('.option');
  options.forEach((opt, i) => {
    opt.classList.toggle('selected', i === index);
    const existingCursor = opt.querySelector('.cursor');
    if (existingCursor) existingCursor.remove();
    if (i === index) {
      opt.innerHTML += '<span class="cursor"></span>';
    }
  });
}

function selectOption(index) {
  if (isTransitioning) return;
  if (index >= 0 && index < currentOptions.length) {
    currentOptions[index].action();
  }
}

function screenFlicker() {
  screenFrame.classList.remove('flicker');
  void screenFrame.offsetWidth;
  screenFrame.classList.add('flicker');
}

// ============================================
// SIDE PANEL
// ============================================
function updateSidePanel() {
  const currentLocEl = document.querySelector('#current-location .location-name');
  currentLocEl.textContent = LOCATION_FULL_NAMES[state.location];

  const perspEl = document.querySelector('#perspective-indicator .perspective-name');
  perspEl.textContent = PERSPECTIVES[state.perspective].name;

  updateMap();
  updateRoomList();
}

function updateMap() {
  const mapContainer = document.getElementById('map-container');
  const current = state.location;
  const adjacent = ROOM_CONNECTIONS[current] || [];

  const map = `
    OBS
     |
CMD-COR-QTR
     |   |
    AIR MED
     |   |
    STO-ENG
`.trim();

  const codes = {
    'observation': 'OBS',
    'command': 'CMD',
    'corridor': 'COR',
    'quarters': 'QTR',
    'airlock': 'AIR',
    'medical': 'MED',
    'storage': 'STO',
    'engineering': 'ENG'
  };

  let displayMap = map;
  const currentCode = codes[current];
  if (currentCode) {
    displayMap = displayMap.replace(currentCode, `<span class="current">[${currentCode}]</span>`);
  }

  adjacent.forEach(adj => {
    const adjCode = codes[adj];
    if (adjCode && !displayMap.includes(`[${adjCode}]`)) {
      displayMap = displayMap.replace(adjCode, `<span class="adjacent">${adjCode}</span>`);
    }
  });

  mapContainer.innerHTML = displayMap;
}

function updateRoomList() {
  const roomList = document.getElementById('room-list');
  const current = state.location;
  const adjacent = ROOM_CONNECTIONS[current] || [];

  let html = '<div class="room-title">SECTORS</div>';

  Object.keys(LOCATION_NAMES).forEach(room => {
    let className = 'room-item';
    if (room === current) {
      className += ' current';
    } else if (adjacent.includes(room)) {
      className += ' adjacent';
    } else {
      className += ' locked';
    }
    html += `<div class="${className}" data-room="${room}">${LOCATION_NAMES[room]}</div>`;
  });

  roomList.innerHTML = html;

  roomList.querySelectorAll('.room-item.adjacent').forEach(el => {
    el.addEventListener('click', () => {
      const room = el.dataset.room;
      if (room) goto(room);
    });
  });
}

// ============================================
// NAVIGATION
// ============================================
function goto(locationId) {
  if (isTransitioning) return;

  const adjacent = ROOM_CONNECTIONS[state.location] || [];
  if (!adjacent.includes(locationId)) {
    screenFlicker();
    return;
  }

  isTransitioning = true;
  transitionDiv.classList.add('active');

  setTimeout(() => {
    clearOutput();
    state.location = locationId;
    state.visits[locationId]++;
    advanceTime();

    // Wanderer proximity adjustment
    if (state.perspective === 3) {
      updateWandererProximity(locationId);
    }

    updateHeader();
    updateSidePanel();

    renderLocation(locationId);

    setTimeout(() => {
      transitionDiv.classList.remove('active');
      isTransitioning = false;
    }, 150);

  }, 150);
}

// Wanderer emotional proximity to specimen
function updateWandererProximity(locationId) {
  const specimenRoom = state.specimenLocation;
  if (locationId === specimenRoom) {
    // Near specimen: clarity increases
    state.wandererProximity = Math.min(10, state.wandererProximity + 3);
  } else if (ROOM_CONNECTIONS[locationId]?.includes(specimenRoom)) {
    // Adjacent to specimen: slight increase
    state.wandererProximity = Math.min(10, state.wandererProximity + 1);
  } else {
    // Far from specimen: clarity decreases
    state.wandererProximity = Math.max(0, state.wandererProximity - 2);
  }
}

// Get Wanderer text based on proximity (high proximity = clearer text)
function getWandererText(clear, confused, fragmented) {
  if (state.wandererProximity >= 7) return clear;
  if (state.wandererProximity >= 4) return confused;
  return fragmented;
}

// Get text for Wanderer considering both decay AND proximity
// proximityObj has: { clear, confused, fragmented } - each with { full, medium, minimal }
function getWandererDecayText(textObj) {
  // If it's a simple object without proximity variants, use standard decay
  if (!textObj.clear) return getDecayText(textObj);

  // Select based on proximity first
  let proximityText;
  if (state.wandererProximity >= 7) {
    proximityText = textObj.clear;
  } else if (state.wandererProximity >= 4) {
    proximityText = textObj.confused;
  } else {
    proximityText = textObj.fragmented;
  }

  // Then apply decay to the selected proximity level
  if (typeof proximityText === 'string') return proximityText;
  return getDecayText(proximityText);
}

function returnToLocation(locationId) {
  setTimeout(() => {
    displayOptions(getLocationOptions(locationId));
  }, 100);
}

// ============================================
// LOCATION RENDERING (content-driven)
// ============================================
function renderLocation(locationId) {
  const content = ROOM_CONTENT[locationId]?.[state.perspective];
  if (!content) {
    showText(`${LOCATION_FULL_NAMES[locationId]}.`);
    displayOptions(getLocationOptions(locationId));
    return;
  }

  // Description - select appropriate variant
  const isFirst = state.visits[locationId] === 1;
  let descObj;

  // Special case: Engineering with token shows different description
  if (locationId === 'engineering' && state.perspective === 1 &&
      state.flags.maintainer_has_token && !state.flags.maintainer_power_choice &&
      content.description.withToken) {
    descObj = content.description.withToken;
  } else {
    descObj = isFirst ? content.description.first : content.description.repeat;
  }

  // Wanderer uses proximity + decay; others use just decay
  if (state.perspective === 3 && descObj.clear) {
    showText(getWandererDecayText(descObj));
  } else {
    showText(getDecayText(descObj));
  }

  // Notice
  const notice = getLocationNotice(locationId, content);
  if (notice) showNotice(notice);

  // Options
  displayOptions(getLocationOptions(locationId));
}

function getLocationNotice(locationId, content) {
  if (!content.notices) return null;

  // Special case handling for specific rooms
  if (locationId === 'command' && state.perspective === 1) {
    if (state.visits.command === 1) return content.notices.first;
    if (!state.flags.maintainer_saw_alert && state.visits.engineering > 0) {
      state.flags.maintainer_saw_alert = true;
      return content.notices.afterEngineering;
    }
  }

  if (locationId === 'engineering' && state.perspective === 1) {
    if (state.visits.engineering === 1) return content.notices.first;
    // Show token requirement if they don't have it yet
    if (!state.flags.maintainer_has_token && !state.flags.maintainer_power_choice) {
      return content.notices.needsToken;
    }
    // Show choice pending if they have token but haven't chosen
    if (state.flags.maintainer_has_token && !state.flags.maintainer_power_choice) {
      return content.notices.choicePending;
    }
  }

  // Observer classification notice (now in observation)
  if (locationId === 'observation' && state.perspective === 2) {
    if (canObserverClassify() && !state.flags.observer_classification) {
      return "ARCHIVE PROTOCOL: Classification fragments recovered. Item #447 classification now available.";
    }
    if (state.visits.observation === 1) return content.notices.first;
  }

  if (locationId === 'storage' && state.perspective === 2) {
    if (state.visits.storage === 1) return content.notices.first;
  }

  // Wanderer Medical purge warning
  if (locationId === 'medical' && state.perspective === 3) {
    if (state.flags.wanderer_found_specimen && state.decay >= 7 && !state.flags.wanderer_purge_choice) {
      return content.notices.purgeWarning;
    }
  }

  // Wanderer Observation specimen notice
  if (locationId === 'observation' && state.perspective === 3) {
    if (state.specimenLocation === 'observation') {
      // After finding specimen, show "specimenHere"; before, show "first"
      if (state.flags.wanderer_found_specimen) {
        return content.notices.specimenHere;
      } else if (state.visits[locationId] === 1) {
        return content.notices.first;
      }
    }
  }

  // Default first-visit notice
  if (state.visits[locationId] === 1 && content.notices.first) {
    return content.notices.first;
  }

  return null;
}

function getLocationOptions(locationId) {
  const opts = [];
  const content = ROOM_CONTENT[locationId]?.[state.perspective];

  // Special: Engineering critical choice - only show manual trigger if token is present
  // (The "Access power distribution console" action handles this now via triggersChoice)
  // This fallback handles edge cases
  if (locationId === 'engineering' && state.perspective === 1) {
    if (state.flags.maintainer_has_token && !state.flags.maintainer_power_choice) {
      // The action list will show "Access power distribution console" which triggers the choice
      // No need for special handling here anymore
    }
  }

  // Special: Observation classification choice (Observer) - requires 3+ fragments
  if (locationId === 'observation' && state.perspective === 2 && state.specimenLocation === 'observation') {
    if (canObserverClassify() && !state.flags.observer_classification) {
      opts.push({ text: "Classify Item #447", action: triggerSpecimenClassification });
      addNavigationOptions(opts, locationId);
      return opts;
    }
  }

  // Special: Medical purge choice (Wanderer)
  if (locationId === 'medical' && state.perspective === 3) {
    if (state.flags.wanderer_found_specimen && state.decay >= 7 && !state.flags.wanderer_purge_choice) {
      opts.push({ text: "Listen to the machines", action: triggerMemoryPurgeChoice });
      addNavigationOptions(opts, locationId);
      return opts;
    }
  }

  // Standard actions from content
  if (content?.actions) {
    content.actions.forEach(action => {
      // Check specimen requirement
      if (action.requiresSpecimen && state.specimenLocation !== locationId) {
        return;
      }

      // Check token requirements (Maintainer only)
      if (action.requiresToken && !state.flags.maintainer_has_token) {
        return;
      }
      if (action.requiresNoToken && state.flags.maintainer_has_token) {
        return;
      }

      // Check flag requirements (e.g., "!maintainer_logged_447" means flag must be false)
      if (action.requiresFlag) {
        const flagName = action.requiresFlag.replace('!', '');
        const requiresFalse = action.requiresFlag.startsWith('!');
        const flagValue = state.flags[flagName];
        if (requiresFalse && flagValue) return;
        if (!requiresFalse && !flagValue) return;
      }

      // Skip if flag already set (don't show completed actions)
      if (action.flag && state.flags[action.flag]) {
        return;
      }

      opts.push({
        text: action.text,
        action: () => {
          advanceTime();
          if (action.flag) state.flags[action.flag] = true;

          // Handle specimen movement (Wanderer takes it to Observation)
          if (action.movesSpecimen && state.perspective === 3) {
            state.specimenLocation = 'observation';
          }

          // Use terminal styling for data/log readouts
          if (action.terminal) {
            showTerminalData(getDecayText(action.result));
          } else {
            showText(getDecayText(action.result));
          }
          if (action.interior) showInterior(action.interior);

          // Check if this action triggers a critical choice
          if (action.triggersChoice) {
            setTimeout(() => {
              if (state.perspective === 1) {
                triggerPowerAllocationChoice();
              } else if (state.perspective === 4) {
                triggerInheritorChoice();
              }
            }, 1500);
          } else {
            returnToLocation(locationId);
          }
        }
      });
    });
  }

  addNavigationOptions(opts, locationId);
  return opts;
}

function addNavigationOptions(opts, locationId) {
  const adjacent = ROOM_CONNECTIONS[locationId] || [];
  adjacent.forEach(room => {
    opts.push({ text: LOCATION_FULL_NAMES[room], action: () => goto(room), isNav: true });
  });
}

// ============================================
// INPUT HANDLING
// ============================================
function initInputHandling() {
  document.addEventListener('keydown', (e) => {
    if (isTransitioning) return;

    if (e.key >= '1' && e.key <= '9') {
      const index = parseInt(e.key) - 1;
      if (index < currentOptions.length) {
        highlightOption(index);
        selectOption(index);
      } else {
        screenFlicker();
      }
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(0, selectedIndex - 1);
      highlightOption(selectedIndex);
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(currentOptions.length - 1, selectedIndex + 1);
      highlightOption(selectedIndex);
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      selectOption(selectedIndex);
    }

    if (!['ArrowUp', 'ArrowDown', 'Enter', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(e.key)) {
      screenFlicker();
    }
  });
}

// ============================================
// INTRO SEQUENCE
// ============================================
function playIntro(onComplete) {
  const container = document.getElementById('intro-text');
  let current = 0;

  function addLine() {
    if (current >= INTRO_LINES.length) {
      settleFinal();
      return;
    }

    const text = INTRO_LINES[current];

    if (text === "") {
      const spacer = document.createElement('div');
      spacer.className = 'intro-spacer';
      container.appendChild(spacer);
      current++;
      setTimeout(addLine, 700);
      return;
    }

    const div = document.createElement('div');
    div.className = 'intro-line';

    // Mark final lines that will persist
    if (INTRO_FINAL_INDEXES.includes(current)) {
      div.classList.add('final');
    }

    div.textContent = text;
    container.appendChild(div);

    requestAnimationFrame(() => div.classList.add('visible'));

    // Fade older non-final lines
    const allLines = container.querySelectorAll('.intro-line');
    allLines.forEach((l, i) => {
      if (i < allLines.length - 5 && !l.classList.contains('final')) {
        l.classList.add('faded');
      }
    });

    current++;
    setTimeout(addLine, 1200);
  }

  function settleFinal() {
    // Fade all non-final lines to zero
    const allLines = container.querySelectorAll('.intro-line');
    allLines.forEach(l => {
      if (!l.classList.contains('final')) {
        l.style.opacity = '0';
      }
    });

    // Also hide spacers
    container.querySelectorAll('.intro-spacer').forEach(s => {
      s.style.opacity = '0';
    });

    // Center the remaining text
    setTimeout(() => {
      container.classList.add('settled');
    }, 800);

    // Hold, then transition to game
    setTimeout(() => {
      document.getElementById('intro').classList.add('hidden');
      setTimeout(onComplete, 1500);
    }, 3500);
  }

  addLine();
}

// ============================================
// ENDINGS
// ============================================
function triggerSuccessEnding() {
  const fade = document.getElementById('fade');
  const field = document.getElementById('end-field');
  const text = fade.querySelector('.end-text');

  fade.classList.add('white');
  text.textContent = 'Let there be light.';
  text.style.color = '#111';

  field.style.cssText = `
    position: absolute; inset: 0;
    display: flex; justify-content: center; align-items: center;
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px; color: #000; white-space: pre;
    opacity: 0; transition: opacity 0.5s;
  `;

  fade.classList.add('active');

  setTimeout(() => {
    field.style.opacity = '1';
    let frame = 0;
    const cols = 80, rows = 30;
    const cx = cols / 2, cy = rows / 2;
    const symbols = ['.', '*', 'o', 'O', '+'];
    let particles = [];

    for (let i = 0; i < 120; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.3;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.5,
        sym: symbols[Math.floor(Math.random() * symbols.length)]
      });
    }

    const interval = setInterval(() => {
      const grid = Array.from({length: rows}, () => Array(cols).fill(' '));

      particles.forEach(p => {
        const x = Math.floor(p.x), y = Math.floor(p.y);
        if (x >= 0 && x < cols && y >= 0 && y < rows) grid[y][x] = p.sym;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 1.08;
        p.vy *= 1.08;
      });

      field.textContent = grid.map(r => r.join('')).join('\n');
      frame++;

      if (frame > 40) {
        clearInterval(interval);
        field.style.opacity = '0';
      }
    }, 50);
  }, 500);
}

function triggerFailureEnding() {
  const fade = document.getElementById('fade');
  const field = document.getElementById('end-field');
  const text = fade.querySelector('.end-text');

  text.textContent = '';
  text.style.color = '#333';

  field.style.cssText = `
    position: absolute; inset: 0;
    display: flex; justify-content: center; align-items: center;
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px; color: #666; white-space: pre;
    opacity: 0; transition: opacity 0.5s;
  `;

  fade.classList.add('active');

  setTimeout(() => {
    field.style.opacity = '1';
    let frame = 0;
    const cols = 80, rows = 30;
    const cx = cols / 2, cy = rows / 2;
    const symbols = ['.', '*', 'o', '+', 'x'];
    let particles = [];

    for (let i = 0; i < 150; i++) {
      const x = Math.random() * cols;
      const y = Math.random() * rows;
      const dx = cx - x, dy = cy - y;
      const dist = Math.sqrt(dx*dx + dy*dy) + 0.1;
      particles.push({
        x, y,
        vx: (dx / dist) * 0.4,
        vy: (dy / dist) * 0.4,
        sym: symbols[Math.floor(Math.random() * symbols.length)]
      });
    }

    const interval = setInterval(() => {
      const grid = Array.from({length: rows}, () => Array(cols).fill(' '));

      particles = particles.filter(p => {
        const dx = p.x - cx, dy = p.y - cy;
        return Math.sqrt(dx*dx + dy*dy) > 1;
      });

      particles.forEach(p => {
        const x = Math.floor(p.x), y = Math.floor(p.y);
        if (x >= 0 && x < cols && y >= 0 && y < rows) grid[y][x] = p.sym;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 1.04;
        p.vy *= 1.04;
      });

      field.textContent = grid.map(r => r.join('')).join('\n');
      frame++;

      if (particles.length < 5 || frame > 80) {
        clearInterval(interval);
        field.textContent = '';
        field.style.opacity = '0';
      }
    }, 50);
  }, 500);
}
