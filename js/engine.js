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
  specimenLocation: 'storage', // storage -> observation (station) -> carried / observation / medical
  crystalDestroyed: false, // Set when the Observer fails to protect #447 — the story cannot continue
  observerCycles: 60, // Archive shutdown countdown for Observer (decrements with actions)
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
    maintainer_heard_soren: false,
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
    wanderer_took_specimen: false,
    wanderer_heard_name: false,
    // Inheritor flags
    inheritor_final_choice: null,
    inheritor_echo_maintainer: false,
    inheritor_echo_observer: false,
    inheritor_echo_wanderer: false,
    inheritor_echo_mira: false,
    inheritor_has_specimen: false
  }
};

// Story branch helpers (see STORY_LOGIC.md)
function sorenLived() { return state.flags.maintainer_power_choice === 'cryo'; }
function sorenRemembered() { return sorenLived() && state.flags.wanderer_purge_choice === 'retain'; }

// ============================================
// DOM REFERENCES
// ============================================
let outputDiv, optionsDiv, headerDiv, transitionDiv, screenFrame;
let selectedIndex = 0;
let currentOptions = [];
let isTransitioning = false;
let inputLocked = false; // Blocks options while a scripted sequence plays

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
// Decay rises with each move between rooms. It blurs how rooms are perceived,
// never what the player chose to read.
const DECAY_MEDIUM = 8;
const DECAY_MINIMAL = 16;

function decay(full, medium, minimal) {
  if (state.decay < DECAY_MEDIUM) return full;
  if (state.decay < DECAY_MINIMAL) return medium;
  return minimal;
}

// Content can be a function of state so text follows earlier choices
function resolve(content) {
  return typeof content === 'function' ? content(state) : content;
}

function getDecayText(textObj) {
  textObj = resolve(textObj);
  if (typeof textObj === 'string') return textObj;
  if (state.decay < DECAY_MEDIUM) return textObj.full;
  if (state.decay < DECAY_MINIMAL) return textObj.medium;
  return textObj.minimal;
}

// Logs and recordings are the story — always shown in full
function getFullText(textObj) {
  textObj = resolve(textObj);
  return typeof textObj === 'string' ? textObj : textObj.full;
}

function advanceTime(isMove = false) {
  state.time++;
  const previousDecay = state.decay;
  if (isMove) state.decay++;
  updateDecayClass();

  // Observer cycle decrement
  if (state.perspective === 2 && !state.flags.observer_classification) {
    state.observerCycles = Math.max(0, state.observerCycles - 1);
    updateCycleCounter();
    if (state.observerCycles === 20 || state.observerCycles === 10) {
      setTimeout(() => showDecayNotice(`ARCHIVE NOTICE: Shutdown in ${state.observerCycles}. Unclassified items will be reclaimed by the fabricators.`), 600);
    }
    if (state.observerCycles === 0) {
      inputLocked = true;
      setTimeout(() => triggerObserverTimeout(), 1500);
    }
  }

  // Check for decay threshold crossings
  if (previousDecay < DECAY_MEDIUM && state.decay >= DECAY_MEDIUM) {
    setTimeout(() => showDecayThresholdFeedback(1), 800);
  } else if (previousDecay < DECAY_MINIMAL && state.decay >= DECAY_MINIMAL) {
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

// Count Inheritor echoes collected
function getInheritorEchoCount() {
  let count = 0;
  if (state.flags.inheritor_echo_maintainer) count++;
  if (state.flags.inheritor_echo_observer) count++;
  if (state.flags.inheritor_echo_wanderer) count++;
  if (state.flags.inheritor_echo_mira) count++;
  return count;
}

// Check if Inheritor can make final choice (needs 3+ echoes)
function canInheritorChoose() {
  return getInheritorEchoCount() >= 3;
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
  if (state.decay >= DECAY_MINIMAL + 6) frame.classList.add('decay-3');
  else if (state.decay >= DECAY_MINIMAL) frame.classList.add('decay-2');
  else if (state.decay >= DECAY_MEDIUM) frame.classList.add('decay-1');
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
  text = resolve(text);
  if (!text || state.decay >= DECAY_MINIMAL) return; // No interior voice at high decay
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
  if (isTransitioning || inputLocked) return;
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
    advanceTime(true);

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
  if (specimenRoom === 'carried' || locationId === specimenRoom) {
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
  textObj = resolve(textObj);
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

  descObj = resolve(descObj);

  // Wanderer uses proximity + decay; others use just decay
  if (state.perspective === 3 && descObj.clear) {
    showText(getWandererDecayText(descObj));
  } else {
    showText(getDecayText(descObj));
  }

  // Notice
  const notice = resolve(getLocationNotice(locationId, content));
  if (notice) showNotice(notice);

  // Wanderer hears his own name paged after taking the crystal
  if (state.perspective === 3 && state.flags.wanderer_took_specimen &&
      !state.flags.wanderer_purge_choice && locationId !== 'medical' && !state.flags.wanderer_heard_name) {
    state.flags.wanderer_heard_name = true;
    showInterior("Soren. That's— that's me. That's my name. She used to say it like a question when she wanted me to look up.");
  }

  // Options
  displayOptions(getLocationOptions(locationId));
}

function getLocationNotice(locationId, content) {
  // Wanderer: Medical pages him once he has the crystal
  if (state.perspective === 3 && state.flags.wanderer_took_specimen && !state.flags.wanderer_purge_choice) {
    if (locationId === 'medical') return content.notices.purgeWarning;
    return "MEDICAL BAY — PAGING SOREN, K. NEURAL CASCADE DETECTED. REPORT TO MEDICAL IMMEDIATELY.";
  }

  // Inheritor: the airlock is where it ends
  if (locationId === 'airlock' && state.perspective === 4 && !state.flags.inheritor_final_choice) {
    if (!state.flags.inheritor_has_specimen) {
      return state.visits.airlock === 1 ? content.notices.first : "The crystal isn't with me. I can't do this empty-handed.";
    }
    if (!canInheritorChoose()) {
      return `I'm holding it. But I'm still mostly strangers to myself. Echoes found: ${getInheritorEchoCount()} of 3. I need to know who I'm deciding for.`;
    }
    return null;
  }

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

  // Inheritor: once enough echoes are found, point to the airlock
  if (state.perspective === 4 && canInheritorChoose() && content.notices.echoesComplete &&
      !state.flags.inheritor_final_choice) {
    return content.notices.echoesComplete;
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

  // Special: Airlock final choice (Inheritor) - must carry the crystal and know who they are
  if (locationId === 'airlock' && state.perspective === 4) {
    if (state.flags.inheritor_has_specimen && canInheritorChoose() && !state.flags.inheritor_final_choice) {
      opts.push({ text: "Cycle the inner door", action: () => {
        advanceTime();
        showText("The inner door opens. The chamber is small and very cold. The crystal is the only warm thing in it. Behind me, the corridor runs back toward Medical and the fabricator. Ahead, the outer door.");
        inputLocked = true;
        setTimeout(() => { inputLocked = false; triggerInheritorChoice(); }, 1500);
      }});
      addNavigationOptions(opts, locationId);
      return opts;
    }
  }

  // Special: Medical purge choice (Wanderer) - he is paged here after taking the crystal
  if (locationId === 'medical' && state.perspective === 3) {
    if (state.flags.wanderer_took_specimen && !state.flags.wanderer_purge_choice) {
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

      // Story-branch condition (function of state)
      if (action.showIf && !action.showIf(state)) {
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

          // Picking up the crystal
          if (action.takesSpecimen) {
            state.specimenLocation = 'carried';
          }

          // Results are what the player chose to read: always shown in full
          if (action.terminal) {
            showTerminalData(getFullText(action.result));
          } else {
            showText(getFullText(action.result));
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
          } else if (action.triggersSecretTerminal) {
            // Show the secret terminal input after displaying the result
            setTimeout(() => {
              openSecretTerminal();
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
// ending: 'light' (the crystal held everything) or 'star' (it held less, gives back less)
function triggerSuccessEnding(ending = 'light') {
  const fade = document.getElementById('fade');
  const field = document.getElementById('end-field');
  const text = fade.querySelector('.end-text');
  const isStar = ending === 'star';

  if (!isStar) fade.classList.add('white');
  // Use custom success message if configured
  const successMsg = isStar ? 'One star. The one that stayed.' : (window.gameConfig?.success || 'Let there be light.');
  text.textContent = successMsg;
  text.style.color = isStar ? '#ccc' : '#111';

  field.style.cssText = `
    position: absolute; inset: 0;
    display: flex; justify-content: center; align-items: center;
    font-family: "IBM Plex Mono", monospace;
    font-size: 10px; color: ${isStar ? '#ddd' : '#000'}; white-space: pre;
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

    for (let i = 0; i < (isStar ? 1 : 120); i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.8 + 0.3;
      particles.push({
        x: cx, y: cy,
        // The single star stays where it is
        vx: isStar ? 0 : Math.cos(angle) * speed,
        vy: isStar ? 0 : Math.sin(angle) * speed * 0.5,
        sym: isStar ? '*' : symbols[Math.floor(Math.random() * symbols.length)]
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
        if (!isStar) field.style.opacity = '0';
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

// ============================================
// SECRET TERMINAL & HIDDEN LEVEL
// ============================================

let secretTerminalActive = false;

function openSecretTerminal() {
  const terminal = document.getElementById('secret-terminal');
  const input = document.getElementById('terminal-input');

  terminal.classList.add('active');
  secretTerminalActive = true;
  input.value = '';
  input.focus();

  // Handle input
  input.addEventListener('input', handleTerminalInput);
  document.addEventListener('keydown', handleTerminalKeydown);
}

function closeSecretTerminal() {
  const terminal = document.getElementById('secret-terminal');
  const input = document.getElementById('terminal-input');

  terminal.classList.remove('active');
  secretTerminalActive = false;

  input.removeEventListener('input', handleTerminalInput);
  document.removeEventListener('keydown', handleTerminalKeydown);

  // Return to location
  returnToLocation(state.location);
}

function handleTerminalInput(e) {
  const input = e.target;
  const value = input.value.trim();

  // Check for secret code
  if (value === '47') {
    setTimeout(() => {
      closeSecretTerminal();
      openHiddenLevel();
    }, 300);
  }
}

function handleTerminalKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeSecretTerminal();
  }
}

function openHiddenLevel() {
  const hidden = document.getElementById('hidden-level');
  hidden.classList.add('active');

  // Load saved config
  loadHiddenConfig();

  // Set up button handlers
  document.getElementById('config-save').onclick = saveHiddenConfig;
  document.getElementById('config-reset').onclick = resetHiddenConfig;
  document.getElementById('config-exit').onclick = closeHiddenLevel;
}

function closeHiddenLevel() {
  const hidden = document.getElementById('hidden-level');
  hidden.classList.remove('active');

  // Return to location
  returnToLocation(state.location);
}

function loadHiddenConfig() {
  const defaults = {
    specimen: '447',
    project: '847',
    success: 'Let there be light.',
    decay: '1.0',
    log: 'The chain must hold.',
    names: 'MAINTAINER,OBSERVER,WANDERER,INHERITOR'
  };

  const saved = localStorage.getItem('systemConfig');
  const config = saved ? JSON.parse(saved) : defaults;

  document.getElementById('config-specimen').value = config.specimen || defaults.specimen;
  document.getElementById('config-project').value = config.project || defaults.project;
  document.getElementById('config-success').value = config.success || defaults.success;
  document.getElementById('config-decay').value = config.decay || defaults.decay;
  document.getElementById('config-log').value = config.log || defaults.log;
  document.getElementById('config-names').value = config.names || defaults.names;
}

function saveHiddenConfig() {
  const config = {
    specimen: document.getElementById('config-specimen').value,
    project: document.getElementById('config-project').value,
    success: document.getElementById('config-success').value,
    decay: document.getElementById('config-decay').value,
    log: document.getElementById('config-log').value,
    names: document.getElementById('config-names').value
  };

  localStorage.setItem('systemConfig', JSON.stringify(config));

  // Apply config to game
  applyHiddenConfig(config);

  // Show status
  const status = document.getElementById('config-status');
  status.textContent = 'CONFIGURATION SAVED';
  setTimeout(() => { status.textContent = ''; }, 2000);
}

function resetHiddenConfig() {
  localStorage.removeItem('systemConfig');
  loadHiddenConfig();

  const status = document.getElementById('config-status');
  status.textContent = 'CONFIGURATION RESET TO DEFAULT';
  setTimeout(() => { status.textContent = ''; }, 2000);
}

function applyHiddenConfig(config) {
  // Apply perspective names
  if (config.names) {
    const names = config.names.split(',');
    if (names[0]) PERSPECTIVES[1].name = names[0].trim();
    if (names[1]) PERSPECTIVES[2].name = names[1].trim();
    if (names[2]) PERSPECTIVES[3].name = names[2].trim();
    if (names[3]) PERSPECTIVES[4].name = names[3].trim();
  }

  // Store other config for use in game
  window.gameConfig = config;
}

// Load config on startup
function initHiddenConfig() {
  const saved = localStorage.getItem('systemConfig');
  if (saved) {
    applyHiddenConfig(JSON.parse(saved));
  }
}
