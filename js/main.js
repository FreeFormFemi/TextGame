/* ============================================
   MAIN GAME LOGIC
   Critical choices, perspective transitions, game start
   ============================================ */

// ============================================
// CRITICAL CHOICE: POWER ALLOCATION
// ============================================
function triggerPowerAllocationChoice() {
  const choice = CRITICAL_CHOICES.maintainer_power;
  advanceTime();
  clearOutput();

  showSystemAlert(choice.alert);

  setTimeout(() => {
    showSystemPrompt(choice.prompt);

    setTimeout(() => {
      showText(getDecayText(choice.description), 'environment');
      if (state.decay < 8) showInterior(choice.interior);

      displayOptions([
        { text: choice.options[0].text, action: () => makePowerChoice('cryo') },
        { text: choice.options[1].text, action: () => makePowerChoice('life_support') }
      ]);
    }, 800);
  }, 500);
}

function makePowerChoice(choice) {
  const choiceData = CRITICAL_CHOICES.maintainer_power;
  state.flags.maintainer_power_choice = choice;
  advanceTime();
  clearOutput();

  if (choice === 'cryo') {
    const outcome = choiceData.outcomes.cryo;
    showText(getDecayText(outcome.result), 'environment');

    setTimeout(() => {
      showText(getDecayText(outcome.followup), 'environment');
      if (state.decay < 10) showInterior(outcome.interior);
      setTimeout(() => triggerMaintainerDeath(), 2000);
    }, 1500);
  } else {
    state.chainIntact = false;
    const outcome = choiceData.outcomes.life_support;
    showText(getDecayText(outcome.result), 'environment');

    setTimeout(() => {
      showText(getDecayText(outcome.followup), 'environment');
      setTimeout(() => triggerMaintainerDeath(), 2000);
    }, 1500);
  }
}

function triggerMaintainerDeath() {
  const death = CRITICAL_CHOICES.maintainer_power.death;
  clearOutput();

  showSystemAlert(death.alert);

  setTimeout(() => {
    showText(getDecayText(death.sequence[0]), 'environment');

    setTimeout(() => {
      showText(getDecayText(death.sequence[1]), 'environment');

      setTimeout(() => {
        showText(death.sequence[2], 'environment');

        setTimeout(() => {
          transitionToPerspective(2);
        }, 1500);
      }, 1000);
    }, 1500);
  }, 800);
}

// ============================================
// CRITICAL CHOICE: SPECIMEN CLASSIFICATION
// ============================================
function triggerSpecimenClassification() {
  const choice = CRITICAL_CHOICES.observer_classification;
  advanceTime();
  clearOutput();

  showSystemAlert(choice.alert);

  setTimeout(() => {
    showSystemPrompt(choice.prompt);

    setTimeout(() => {
      showText(getDecayText(choice.description), 'environment');
      showInterior(choice.interior);

      displayOptions(choice.options.map(opt => ({
        text: opt.text,
        action: () => makeClassificationChoice(opt.value)
      })));
    }, 800);
  }, 500);
}

function makeClassificationChoice(choice) {
  const choiceData = CRITICAL_CHOICES.observer_classification;
  state.flags.observer_classification = choice;
  advanceTime();
  clearOutput();

  if (choice === 'anomaly') {
    const outcome = choiceData.outcomes.anomaly;
    showText(getDecayText(outcome.result), 'environment');

    setTimeout(() => {
      showText(getDecayText(outcome.followup), 'environment');
      showInterior(outcome.interior);
      setTimeout(() => triggerObserverEnd(), 2500);
    }, 1500);
  } else {
    state.chainIntact = false;
    const label = choiceData.outcomes.labels[choice];
    let result = getDecayText(choiceData.outcomes.wrong.result).replace('%LABEL%', label);
    showText(result, 'environment');

    setTimeout(() => {
      showText(getDecayText(choiceData.outcomes.wrong.followup), 'environment');
      setTimeout(() => triggerObserverEnd(), 2500);
    }, 1500);
  }
}

function triggerObserverEnd() {
  const end = CRITICAL_CHOICES.observer_classification.end;
  clearOutput();

  showSystemAlert(end.alert);

  setTimeout(() => {
    showText(getDecayText(end.sequence[0]), 'environment');

    setTimeout(() => {
      showText(getDecayText(end.sequence[1]), 'environment');
      showInterior(end.interior);

      setTimeout(() => {
        showText(end.final, 'environment');

        setTimeout(() => {
          showText("...", 'environment');

          setTimeout(() => {
            transitionToPerspective(3);
          }, 1500);
        }, 1000);
      }, 2000);
    }, 1500);
  }, 800);
}

// ============================================
// CRITICAL CHOICE: MEMORY PURGE (WANDERER)
// ============================================
function triggerMemoryPurgeChoice() {
  const choice = CRITICAL_CHOICES.wanderer_purge;
  advanceTime();
  clearOutput();

  showSystemAlert(choice.alert);

  setTimeout(() => {
    showSystemPrompt(choice.prompt);

    setTimeout(() => {
      showText(getDecayText(choice.description), 'environment');
      showInterior(choice.interior);

      displayOptions([
        { text: choice.options[0].text, action: () => makePurgeChoice('purge') },
        { text: choice.options[1].text, action: () => makePurgeChoice('retain') }
      ]);
    }, 800);
  }, 500);
}

function makePurgeChoice(choice) {
  const choiceData = CRITICAL_CHOICES.wanderer_purge;
  state.flags.wanderer_purge_choice = choice;
  advanceTime();
  clearOutput();

  if (choice === 'retain') {
    // Correct choice
    const outcome = choiceData.outcomes.retain;
    showText(getDecayText(outcome.result), 'environment');

    setTimeout(() => {
      showText(getDecayText(outcome.followup), 'environment');
      showInterior(outcome.interior);
      setTimeout(() => triggerWandererDeath(true), 2500);
    }, 1500);
  } else {
    // Wrong choice - chain broken
    state.chainIntact = false;
    const outcome = choiceData.outcomes.purge;
    showText(getDecayText(outcome.result), 'environment');

    setTimeout(() => {
      showText(getDecayText(outcome.followup), 'environment');
      setTimeout(() => triggerWandererDeath(false), 2500);
    }, 1500);
  }
}

function triggerWandererDeath(correct) {
  const death = CRITICAL_CHOICES.wanderer_purge.death;
  const sequence = correct ? death.correct : death.wrong;
  clearOutput();

  showSystemAlert(death.alert);

  // Light UI glitch
  const screenFrame = document.getElementById('screen-frame');
  screenFrame.classList.add('glitch');

  setTimeout(() => {
    showText(getDecayText(sequence[0]), 'environment');

    setTimeout(() => {
      // Another glitch pulse
      screenFrame.classList.remove('glitch');
      void screenFrame.offsetWidth;
      screenFrame.classList.add('glitch');

      showText(getDecayText(sequence[1]), 'environment');

      setTimeout(() => {
        showText(sequence[2] || "...", 'environment');
        screenFrame.classList.remove('glitch');

        setTimeout(() => {
          transitionToPerspective(4);
        }, 1500);
      }, 1000);
    }, 1500);
  }, 800);
}

// ============================================
// CRITICAL CHOICE: FINAL RELEASE (INHERITOR)
// ============================================
function triggerInheritorChoice() {
  const choice = CRITICAL_CHOICES.inheritor_release;
  advanceTime();
  clearOutput();

  showSystemAlert(choice.alert);

  setTimeout(() => {
    showSystemPrompt(choice.prompt);

    setTimeout(() => {
      showText(getDecayText(choice.description), 'environment');
      showInterior(choice.interior);

      displayOptions([
        { text: choice.options[0].text, action: () => makeInheritorChoice('release') },
        { text: choice.options[1].text, action: () => makeInheritorChoice('consume') }
      ]);
    }, 800);
  }, 500);
}

function makeInheritorChoice(choice) {
  const choiceData = CRITICAL_CHOICES.inheritor_release;
  state.flags.inheritor_choice = choice;
  advanceTime();
  clearOutput();

  if (choice === 'release') {
    // Correct choice - success ending
    const outcome = choiceData.outcomes.release;
    showText(getDecayText(outcome.result), 'environment');

    setTimeout(() => {
      showText(getDecayText(outcome.followup), 'environment');
      showInterior(outcome.interior);
      setTimeout(() => triggerInheritorEnd(true), 2500);
    }, 1500);
  } else {
    // Wrong choice - failure ending
    const outcome = choiceData.outcomes.consume;
    showText(getDecayText(outcome.result), 'environment');

    setTimeout(() => {
      showText(getDecayText(outcome.followup), 'environment');
      showInterior(outcome.interior);
      setTimeout(() => triggerInheritorEnd(false), 2500);
    }, 1500);
  }
}

function triggerInheritorEnd(success) {
  const end = CRITICAL_CHOICES.inheritor_release.end;
  const sequence = success ? end.success : end.failure;
  clearOutput();

  showSystemAlert(end.alert);

  setTimeout(() => {
    showText(getDecayText(sequence[0]), 'environment');

    setTimeout(() => {
      showText(getDecayText(sequence[1]), 'environment');

      setTimeout(() => {
        if (success) {
          triggerSuccessEnding();
        } else {
          triggerFailureEnding();
        }
      }, 2000);
    }, 1500);
  }, 800);
}

// ============================================
// PERSPECTIVE TRANSITIONS
// ============================================
function transitionToPerspective(newPerspective) {
  const transitionEl = document.getElementById('perspective-transition');
  const textEl = transitionEl.querySelector('.transition-text');
  const statsEl = transitionEl.querySelector('.stats');

  transitionEl.classList.add('active');

  // Get transition content
  let transitionKey;
  if (newPerspective === 2) transitionKey = 'toObserver';
  else if (newPerspective === 3) transitionKey = 'toWanderer';
  else if (newPerspective === 4) transitionKey = 'toInheritor';

  const transData = TRANSITIONS[transitionKey];
  const variant = state.chainIntact ? 'success' : 'failure';

  textEl.textContent = transData[variant].title;
  statsEl.innerHTML = transData[variant].stats;

  if (!state.chainIntact) {
    setTimeout(() => showFailureScreen(), 4000);
    return;
  }

  setTimeout(() => {
    // Reset state for new perspective
    state.perspective = newPerspective;
    state.decay = 0;
    state.time = 0;
    Object.keys(state.visits).forEach(k => state.visits[k] = 0);

    // Move specimen to observation for Observer (auto-moved by station protocol)
    if (newPerspective === 2) {
      state.specimenLocation = 'observation';
    }

    const perspData = PERSPECTIVES[newPerspective];
    state.location = perspData.startLocation;
    state.visits[perspData.startLocation]++;

    updateDecayClass();
    clearOutput();

    // Hide the old transition, then play boot sequence
    transitionEl.classList.remove('active');

    setTimeout(() => {
      // Play boot sequence for new perspective
      playBootSequence(newPerspective, () => {
        updateHeader();
        updateSidePanel();

        // Show arrival text
        showText(getDecayText(perspData.arrivalText), 'environment');

        setTimeout(() => {
          showText(getDecayText(perspData.arrivalText2), 'environment');
          showInterior(perspData.arrivalInterior);

          renderLocation(state.location);
        }, 1500);
      });
    }, 1000);
  }, 3000);
}

function showFailureScreen() {
  const transitionEl = document.getElementById('perspective-transition');
  const statsEl = transitionEl.querySelector('.stats');

  statsEl.innerHTML += `<br><br><span style="color:#666; cursor:pointer" onclick="location.reload()">[ Press any key to restart ]</span>`;

  const restartHandler = (e) => {
    document.removeEventListener('keydown', restartHandler);
    location.reload();
  };
  document.addEventListener('keydown', restartHandler);
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

  // Phase 2.5: Pre-type (Observer only - shows prior awareness)
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
  const perspData = PERSPECTIVES[state.perspective];

  // Play boot sequence instead of old transition
  playBootSequence(state.perspective, () => {
    state.location = perspData.startLocation;
    state.visits[perspData.startLocation]++;
    updateHeader();
    updateSidePanel();

    // Show arrival text
    showText(getDecayText(perspData.arrivalText), 'environment');

    setTimeout(() => {
      showText(getDecayText(perspData.arrivalText2), 'environment');
      showInterior(perspData.arrivalInterior);
      displayOptions(getLocationOptions(state.location));
    }, 1500);
  });
}

// ============================================
// INITIALIZATION
// ============================================
function init() {
  initDOMReferences();
  initInputHandling();
  playIntro(startGame);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', init);
