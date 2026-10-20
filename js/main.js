/* ============================================
   MAIN GAME LOGIC
   Critical choices, perspective transitions, game start
   Story causality is documented in STORY_LOGIC.md
   ============================================ */

// Plays a list of [delayMs, fn] steps in order
function sequence(steps) {
  let t = 0;
  steps.forEach(([delay, fn]) => {
    t += delay;
    setTimeout(fn, t);
  });
}

// Shared layout for every critical choice. Choice scenes always show in full.
function presentChoice(choice, options) {
  advanceTime();
  clearOutput();
  inputLocked = true;
  showSystemAlert(choice.alert);

  sequence([
    [500, () => showSystemPrompt(getFullText(choice.prompt))],
    [800, () => {
      showText(getFullText(choice.description), 'environment');
      showInterior(choice.interior);
      inputLocked = false;
      displayOptions(options);
    }]
  ]);
}

// Shows an outcome's result, followup and interior, then continues
function playOutcome(outcome, next) {
  inputLocked = true;
  displayOptions([]);
  showText(getFullText(outcome.result), 'environment');
  sequence([
    [1500, () => {
      showText(getFullText(outcome.followup), 'environment');
      showInterior(outcome.interior);
    }],
    [2500, next]
  ]);
}

// Plays a death/end sequence of text lines, then continues
function playEndSequence(alert, lines, next) {
  clearOutput();
  showSystemAlert(alert);
  const steps = lines.map((line, i) => [i === 0 ? 800 : 1500, () => showText(getFullText(line), 'environment')]);
  steps.push([1500, next]);
  sequence(steps);
}

// ============================================
// CHAPTER 1: MAINTAINER — POWER ALLOCATION
// ============================================
function triggerPowerAllocationChoice() {
  const choice = CRITICAL_CHOICES.maintainer_power;
  presentChoice(choice, choice.options.map(opt => ({
    text: opt.text, action: () => makePowerChoice(opt.value)
  })));
}

function makePowerChoice(choice) {
  const choiceData = CRITICAL_CHOICES.maintainer_power;
  state.flags.maintainer_power_choice = choice;
  advanceTime();
  clearOutput();
  playOutcome(choiceData.outcomes[choice], () => {
    const death = choiceData.death[choice];
    playEndSequence(death.alert, death.sequence, () => transitionToPerspective(2));
  });
}

// ============================================
// CHAPTER 2: OBSERVER — CLASSIFICATION
// ============================================
function triggerSpecimenClassification() {
  const choice = CRITICAL_CHOICES.observer_classification;
  presentChoice(choice, choice.options.map(opt => ({
    text: opt.text, action: () => makeClassificationChoice(opt.value)
  })));
}

function makeClassificationChoice(choice) {
  const choiceData = CRITICAL_CHOICES.observer_classification;
  state.flags.observer_classification = choice;
  advanceTime();
  clearOutput();

  let outcome = choiceData.outcomes[choice];
  if (choice !== 'anomaly') {
    // Every lower class ends with the crystal in the fabricators (R3)
    state.crystalDestroyed = true;
    const label = choiceData.outcomes.labels[choice];
    const fill = t => ({ full: t.full.replace('%LABEL%', label), medium: t.medium.replace('%LABEL%', label), minimal: t.minimal });
    outcome = { result: fill(outcome.result), followup: outcome.followup, interior: outcome.interior };
  }
  playOutcome(outcome, triggerObserverEnd);
}

// Archive countdown ran out before classification
function triggerObserverTimeout() {
  if (state.flags.observer_classification) return;
  state.flags.observer_classification = 'timeout';
  state.crystalDestroyed = true;
  clearOutput();
  displayOptions([]);
  playOutcome(CRITICAL_CHOICES.observer_classification.timeout, triggerObserverEnd);
}

function triggerObserverEnd() {
  const end = CRITICAL_CHOICES.observer_classification.end;
  playEndSequence(end.alert, resolve(end.sequence), () => {
    // R4: the Observer going dark drops power below stasis — the pod in 7-C opens
    if (state.crystalDestroyed) {
      showRunEnded('nothingLeft');
    } else if (sorenLived()) {
      transitionToPerspective(3);
    } else {
      transitionToPerspective(4);
    }
  });
}

// ============================================
// CHAPTER 3: WANDERER — MEMORY SUPPRESSION
// ============================================
function triggerMemoryPurgeChoice() {
  const choice = CRITICAL_CHOICES.wanderer_purge;
  presentChoice(choice, choice.options.map(opt => ({
    text: opt.text, action: () => makePurgeChoice(opt.value)
  })));
}

function makePurgeChoice(choice) {
  const choiceData = CRITICAL_CHOICES.wanderer_purge;
  state.flags.wanderer_purge_choice = choice;
  // Kept: he carries her up to the viewport. Purged: he leaves the crystal on a tray.
  state.specimenLocation = choice === 'retain' ? 'observation' : 'medical';
  advanceTime();
  clearOutput();
  playOutcome(choiceData.outcomes[choice], () => triggerWandererDeath(choice));
}

function triggerWandererDeath(choice) {
  const death = CRITICAL_CHOICES.wanderer_purge.death[choice];
  const screenFrame = document.getElementById('screen-frame');
  if (choice === 'retain') screenFrame.classList.add('glitch');
  playEndSequence(death.alert, death.sequence, () => {
    screenFrame.classList.remove('glitch');
    transitionToPerspective(4);
  });
}

// ============================================
// CHAPTER 4: INHERITOR — RELEASE
// ============================================
function triggerInheritorChoice() {
  const choice = CRITICAL_CHOICES.inheritor_release;
  presentChoice(choice, choice.options.map(opt => ({
    text: opt.text, action: () => makeInheritorChoice(opt.value)
  })));
}

function makeInheritorChoice(choice) {
  const choiceData = CRITICAL_CHOICES.inheritor_release;
  state.flags.inheritor_final_choice = choice;
  advanceTime();
  clearOutput();
  playOutcome(choiceData.outcomes[choice], () => triggerInheritorEnd(choice));
}

function triggerInheritorEnd(choice) {
  const end = CRITICAL_CHOICES.inheritor_release.end;
  // What the crystal gives back depends on what it was given (R2)
  const ending = choice === 'consume' ? 'dark' : (sorenRemembered() ? 'light' : 'star');
  playEndSequence(end.alert, end[ending], () => {
    if (ending === 'dark') triggerFailureEnding();
    else triggerSuccessEnding(ending);
  });
}

// ============================================
// PERSPECTIVE TRANSITIONS & CHECKPOINTS
// ============================================
let checkpoint = null;

function transitionToPerspective(newPerspective) {
  const transitionEl = document.getElementById('perspective-transition');
  const trans = getTransition(newPerspective);

  transitionEl.querySelector('.transition-text').textContent = trans.title;
  transitionEl.querySelector('.stats').innerHTML = trans.stats;
  transitionEl.classList.add('active');

  setTimeout(() => {
    transitionEl.classList.remove('active');
    setTimeout(() => beginPerspective(newPerspective), 1000);
  }, 4000);
}

// Starts a chapter. The state on entry is saved so a dead run can be retried from here.
function beginPerspective(perspective) {
  checkpoint = JSON.parse(JSON.stringify(state));

  state.perspective = perspective;
  state.decay = 0;
  state.time = 0;
  Object.keys(state.visits).forEach(k => state.visits[k] = 0);

  // The station brings #447 up to the archive for the Observer to judge
  if (perspective === 2) state.specimenLocation = 'observation';

  const perspData = PERSPECTIVES[perspective];
  state.location = perspData.startLocation;
  state.visits[perspData.startLocation]++;

  inputLocked = false;
  updateDecayClass();
  clearOutput();
  displayOptions([]);

  playBootSequence(perspective, () => {
    updateHeader();
    updateSidePanel();
    showText(getDecayText(perspData.arrivalText), 'environment');

    setTimeout(() => {
      showText(getDecayText(perspData.arrivalText2), 'environment');
      showInterior(perspData.arrivalInterior);
      renderLocation(state.location);
    }, 1500);
  });
}

// A run that cannot continue: explain why, offer a retry from the last chapter
function showRunEnded(key) {
  const transitionEl = document.getElementById('perspective-transition');
  const trans = TRANSITIONS[key];
  transitionEl.querySelector('.transition-text').textContent = trans.title;
  transitionEl.querySelector('.stats').innerHTML = trans.stats +
    `<br><br><span style="color:#888">[1] Return to the ${PERSPECTIVES[state.perspective].name.toLowerCase()}'s waking &nbsp; [2] Begin again</span>`;
  transitionEl.classList.add('active');

  const handler = (e) => {
    if (e.key === '1') {
      document.removeEventListener('keydown', handler);
      const retry = state.perspective;
      const snap = JSON.parse(JSON.stringify(checkpoint));
      Object.keys(snap).forEach(k => state[k] = snap[k]);
      transitionEl.classList.remove('active');
      setTimeout(() => beginPerspective(retry), 800);
    } else if (e.key === '2') {
      location.reload();
    }
  };
  setTimeout(() => document.addEventListener('keydown', handler), 1500);
}

// ============================================
// BOOT SEQUENCE
// ============================================
function playBootSequence(perspective, onComplete) {
  const bootEl = document.getElementById('boot-sequence');
  const loadingEl = document.getElementById('boot-loading');
  const initEl = document.getElementById('boot-init');
  const typeLabelEl = document.getElementById('boot-type-label');
  const typeEl = document.getElementById('boot-type');
  const functionsEl = document.getElementById('boot-functions');

  const bootData = BOOT_SEQUENCES[perspective];
  const timing = bootData.timing;

  // Reset elements
  bootEl.className = '';
  initEl.className = '';
  initEl.textContent = '';
  typeLabelEl.className = '';
  typeLabelEl.textContent = '';
  typeEl.className = '';
  typeEl.textContent = '';
  functionsEl.className = '';
  functionsEl.innerHTML = '';

  // Apply style class (glitchy for Wanderer)
  if (bootData.style === 'glitchy') {
    bootEl.classList.add('glitchy');
  }

  // Show boot sequence
  bootEl.classList.add('active');

  let totalDelay = 0;

  // Phase 1: Loading dots
  totalDelay += timing.dots;

  // Phase 2: Init text
  setTimeout(() => {
    initEl.textContent = bootData.init;
    initEl.classList.add('visible');

    // Fade in station status during boot
    updateStationStatus(perspective);
    document.getElementById('station-status').classList.add('visible');
  }, totalDelay);
  totalDelay += timing.init;

  // Phase 2.5: Pre-type (Observer only - shows the previous shift)
  if (bootData.preType && timing.preType) {
    setTimeout(() => {
      typeLabelEl.textContent = bootData.preType;
      typeLabelEl.classList.add('visible');
    }, totalDelay);
    totalDelay += timing.preType;

    // Clear pre-type before showing actual type label
    setTimeout(() => {
      typeLabelEl.classList.remove('visible');
    }, totalDelay - 200);
  }

  // Phase 2.75: Echo types (Inheritor only - flickers through previous types)
  if (bootData.echoTypes && timing.echoes) {
    bootData.echoTypes.forEach((echoType, i) => {
      setTimeout(() => {
        typeEl.textContent = echoType;
        typeEl.classList.add('visible');
        typeEl.style.opacity = '0.4';
      }, totalDelay + (i * timing.echoes));

      setTimeout(() => {
        typeEl.classList.remove('visible');
      }, totalDelay + (i * timing.echoes) + timing.echoes - 100);
    });
    totalDelay += bootData.echoTypes.length * timing.echoes;
  }

  // Phase 3: Type label
  setTimeout(() => {
    typeLabelEl.textContent = bootData.typeLabel;
    typeLabelEl.classList.add('visible');
  }, totalDelay);
  totalDelay += 400;

  // Phase 4: Type name (prominent)
  setTimeout(() => {
    typeEl.textContent = bootData.type;
    typeEl.style.opacity = '1';
    typeEl.classList.add('visible');
  }, totalDelay);
  totalDelay += timing.type;

  // Phase 5: Functions (line by line)
  setTimeout(() => {
    functionsEl.innerHTML = bootData.functions.map(f =>
      `<div class="function-line">${f}</div>`
    ).join('');
    functionsEl.classList.add('visible');

    // Reveal each function line
    const lines = functionsEl.querySelectorAll('.function-line');
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('visible');
      }, i * timing.functions);
    });
  }, totalDelay);
  totalDelay += bootData.functions.length * timing.functions + 800;

  // Phase 6: Fade out boot sequence
  setTimeout(() => {
    bootEl.classList.remove('active');

    setTimeout(() => {
      onComplete();
    }, 800);
  }, totalDelay);
}

function updateStationStatus(perspective) {
  const perspData = PERSPECTIVES[perspective];

  document.getElementById('power-value').textContent =
    (perspData.power * 100).toFixed(1) + '%';
  document.getElementById('comms-value').textContent = 'OFFLINE';
  document.getElementById('integrity-value').textContent =
    perspData.integrity + '%';

  // Show/hide cycle counter based on perspective
  const cycleRow = document.getElementById('cycle-row');
  if (cycleRow) {
    if (perspective === 2) {
      cycleRow.style.display = 'flex';
      state.observerCycles = perspData.startCycles || 100;
      document.getElementById('cycle-value').textContent = state.observerCycles;
      document.getElementById('cycle-value').style.color = '';
    } else {
      cycleRow.style.display = 'none';
    }
  }
}

// ============================================
// GAME START
// ============================================
function startGame() {
  beginPerspective(state.perspective);
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
  initDOMReferences();
  initInputHandling();
  initHiddenConfig();
  playIntro(startGame);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
