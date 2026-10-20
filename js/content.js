/* ============================================
   GAME CONTENT
   All text, descriptions, and dialogue organized by perspective
   ============================================ */

// Intro sequence lines
const INTRO_LINES = [
  "Far from any center.",
  "After expansion had thinned the light,",
  "there were structures that continued to operate",
  "long after their purpose had ended.",
  "",
  "Energy became rare.",
  "Signals dropped into the void.",
  "Routine replaced discovery.",
  "",
  "The last observers arrived.",
  "What remained was not certainty,",
  "but continuation.",
  "A mission.",
  "A process.",
  "",
  "In the long drift,",
  "with no horizon left to follow,",
  "",
  "we look",                    // index 18 - FINAL
  "not backward to memory,",
  "but forward, uncertain,",
  "toward the birth",           // index 21 - FINAL
  "of something unseen,",
  "something distant,",
  "of the light."               // index 24 - FINAL
];

// Lines that persist after intro settles (forms: "we look... toward the birth... of the light.")
const INTRO_FINAL_INDEXES = [18, 21, 24];

// Boot sequence content by perspective
const BOOT_SEQUENCES = {
  1: { // Maintainer - Clean, systematic
    style: 'clean',
    init: 'INITIALIZATION COMPLETE',
    typeLabel: 'Assigned duty:',
    type: 'MAINTAINER',
    functions: [
      '› Sustain systems',
      '› Restore function',
      '› Log anomalies'
    ],
    timing: { dots: 1500, init: 800, type: 1000, functions: 600 }
  },
  2: { // Observer - Clinical, archival
    style: 'clinical',
    init: 'ARCHIVE SYSTEM ONLINE',
    preType: 'Previous shift: MAINTAINER — ENDED',
    typeLabel: 'Assigned duty:',
    type: 'OBSERVER',
    functions: [
      '› Observe and record',
      '› Analyze anomalies',
      '› Complete the archive'
    ],
    timing: { dots: 1200, init: 800, preType: 1200, type: 1000, functions: 600 }
  },
  3: { // Wanderer - Fragmented, glitchy
    style: 'glitchy',
    init: 'EMERGENCY REVIVAL... INCOMPLETE',
    typeLabel: 'Patient: unidentif—',
    type: 'WANDERER',
    functions: [
      '› ...searching',
      '› ...remembering?',
      '› ...find it'
    ],
    timing: { dots: 2000, init: 600, type: 800, functions: 400 }
  },
  4: { // Inheritor - Layered echoes
    style: 'layered',
    init: 'ONE FRAME — ALL REMAINING MINDS',
    echoTypes: ['MAINTAINER', 'OBSERVER', 'WANDERER'],
    typeLabel: 'Assigned duty:',
    type: 'INHERITOR',
    functions: [
      '› Recognize the pattern',
      '› Connect the chain',
      '› See what they could not'
    ],
    timing: { dots: 1000, init: 600, echoes: 400, type: 1200, functions: 600 }
  }
};

// Decay threshold feedback by perspective
const DECAY_FEEDBACK = {
  1: { // Maintainer
    1: { type: 'system', text: 'SIGNAL DEGRADATION DETECTED. Processing capacity reduced. Some data may be incomplete.' },
    2: { type: 'system', text: 'WARNING: Core functions failing. Signal coherence critical.' }
  },
  2: { // Observer
    1: { type: 'system', text: 'NOTICE: Archive bandwidth declining. Records may be compressed. Essential data prioritized.' },
    2: { type: 'system', text: 'ARCHIVE NOTICE: Data coherence at minimum threshold. Prioritize essential records.' }
  },
  3: { // Wanderer
    1: { type: 'interior', text: 'Something is slipping. The edges of things are getting soft. Harder to see the details.' },
    2: { type: 'interior', text: 'Harder to hold on. The memories want to scatter like dust.' }
  },
  4: { // Inheritor
    1: { type: 'interior', text: 'The patterns are fading. Some connections are lost. What remains must be enough.' },
    2: { type: 'interior', text: 'Almost nothing left. But clarity sometimes comes at the end.' }
  }
};

// Perspective metadata
const PERSPECTIVES = {
  1: {
    name: 'MAINTAINER',
    startLocation: 'command',
    power: 0.3,
    integrity: 87,
    verbs: ['CHECK', 'MAINTAIN', 'LOG'],
    arrivalText: {
      full: "Command center. Primary terminal active. Environmental warnings queued. This station requires maintenance.",
      medium: "Command center. Warnings queued. Maintenance required.",
      minimal: "Command. Warnings."
    },
    arrivalText2: {
      full: "Beginning diagnostic cycle. Priority: Engineering sector power failure. All other systems on standby until resolved.",
      medium: "Diagnostic cycle. Priority: Engineering power failure.",
      minimal: "Engineering. Priority."
    },
    arrivalInterior: "The silence is a technical problem. It can be fixed."
  },
  2: {
    name: 'OBSERVER',
    startLocation: 'observation',
    power: 0.08,
    integrity: 64,
    startCycles: 60,
    verbs: ['OBSERVE', 'RECORD', 'ANALYZE'],
    arrivalText: {
      full: "Observation deck. I woke here, beside the specimen. Item #447. The station brought it up from storage for me to classify. Whoever woke before me logged it but did not classify it.",
      medium: "Observation deck. Woke beside specimen #447. Unclassified.",
      minimal: "Observation. Specimen. Unclassified."
    },
    arrivalText2: {
      full: "Archive notice: power reserve 0.1%. When the archive shuts down, everything unclassified goes to the fabricators for materials. Classification protocol is corrupted. I need to recover fragments before I can make a ruling.",
      medium: "Archive notice: at shutdown, unclassified items go to the fabricators. Protocol corrupted. Fragments required.",
      minimal: "Unclassified gets reclaimed. Fragments required."
    },
    arrivalInterior: "This is a terminal observation post. I will document what remains. Then I will rest."
  },
  3: {
    name: 'WANDERER',
    startLocation: 'medical',
    power: 0.04,
    integrity: 43,
    verbs: ['TOUCH', 'FEEL', 'REMEMBER'],
    arrivalText: {
      full: "Where... where is this? Cold. So cold. The machines hum at a low frequency. It sounds like... like someone's tired voice. There was someone. Someone I was supposed to find. Mi— Ma— The name starts with M.",
      medium: "Where? Cold. Machines hum like a tired voice. Someone. M— Name starts with M.",
      minimal: "Cold. M—. Someone."
    },
    arrivalText2: {
      full: "Her face is gone. Her name is slipping. But the feeling remains—warm, like her hand in mine. She made things. Fixed things. I let go of her hand. I shouldn't have let go.",
      medium: "Face gone. Name slipping. Feeling remains—warm. Her hand. She made things. I let go. Shouldn't have.",
      minimal: "Gone. Made things. Let go."
    },
    arrivalInterior: "I have to find her. Before I forget she existed. Before I forget I loved her."
  },
  4: {
    name: 'INHERITOR',
    startLocation: 'command',
    power: 0.003,
    integrity: 12,
    verbs: ['RECOGNIZE', 'CONNECT', 'SEE'],
    arrivalText: {
      full: "Command. I'm awake, and I'm crowded. There are voices in here that aren't mine, or that were mine once. There wasn't power to wake the rest of us one at a time, so the station woke what was left of all of us together, in one frame.",
      medium: "Command. Awake, and crowded. What was left of all of us, woken together in one frame.",
      minimal: "Awake. Crowded."
    },
    arrivalText2: () => ({
      full: (sorenLived()
        ? "The logs are all here. A maintenance frame that held a valve shut so a man could sleep. An archive frame that wouldn't let the crystal be recycled. Soren, who woke from the pod and went looking for Mira."
        : "The logs are all here. A maintenance frame that kept itself running and let pod 7-C go dark. An archive frame that wouldn't let the crystal be recycled. Soren never woke.") +
        " And Park's last instruction, still flagged on the main screen: when it holds enough, let it go.",
      medium: "Every shift's log. And Park's flag on the main screen: when it holds enough, let it go.",
      minimal: "Park's flag. Let it go."
    }),
    arrivalInterior: "I don't know which of these memories are mine. Before I decide anything for all of us, I need to find out who we were."
  }
};

// Location display names
const LOCATION_NAMES = {
  command: 'COMMAND',
  quarters: 'QUARTERS',
  medical: 'MEDICAL',
  engineering: 'ENGINEERING',
  observation: 'OBSERVATION',
  storage: 'STORAGE',
  airlock: 'AIRLOCK',
  corridor: 'CORRIDOR'
};

const LOCATION_FULL_NAMES = {
  command: 'COMMAND CENTER',
  quarters: 'CREW QUARTERS',
  medical: 'MEDICAL BAY',
  engineering: 'ENGINEERING',
  observation: 'OBSERVATION DECK',
  storage: 'STORAGE BAY',
  airlock: 'AIRLOCK CORRIDOR',
  corridor: 'CENTRAL CORRIDOR'
};

// Room connections (adjacent rooms)
const ROOM_CONNECTIONS = {
  command: ['corridor', 'observation'],
  observation: ['command'],
  corridor: ['command', 'quarters', 'airlock'],
  quarters: ['corridor', 'medical'],
  medical: ['quarters', 'engineering'],
  airlock: ['corridor', 'storage'],
  storage: ['airlock', 'engineering'],
  engineering: ['storage', 'medical']
};

// The Observer's recorded message. Recorded before classification, so it can't claim the result.
function observerMessage() {
  return (state.flags.observer_checked_pod ? "'Soren. If that's you, you've been asleep a long time and it won't feel right. " : "'If you are hearing this, you're the next one. ") +
    "Item #447 is on the observation deck. Find it. Don't let the station recycle it. I can't explain why it matters. The data doesn't explain it. Trust the feeling instead.'";
}

/* ============================================
   ROOM CONTENT BY PERSPECTIVE
   Structure: ROOM_CONTENT[location][perspective]
   ============================================ */

const ROOM_CONTENT = {
  command: {
    3: { // Wanderer
      description: {
        first: {
          clear: {
            full: "Command center. Screens glow with data. Someone was here before me—someone careful, someone who kept records. They left a trail. Not for anyone. For me. They knew I would come looking.",
            medium: "Command. Screens glow. Someone careful was here. Left a trail. For me.",
            minimal: "Command. Trail. For me."
          },
          confused: {
            full: "Lights. So many lights. Screens showing words I almost recognize. Someone left a message here. Was it them? Did they leave something before they... before I lost them?",
            medium: "Lights. Screens. Words. Someone left a message. Was it them? Before I lost them?",
            minimal: "Lights. Message. Them?"
          },
          fragmented: {
            full: "Lights everywhere. Blinking like eyes. Were these their eyes? No. Screens. Just screens. But someone was here. Someone who knew where they went.",
            medium: "Lights blinking. Eyes? No. Screens. Someone knew where they went.",
            minimal: "Lights. Eyes. Went."
          }
        },
        repeat: {
          full: "The screens still glow. Someone left directions. I just have to read them.",
          medium: "Screens glow. Directions.",
          minimal: "Screens."
        }
      },
      notices: {
        first: "The station remembers things I've forgotten. Maybe it remembers them too."
      },
      actions: [
        {
          text: "Look at the glowing screen",
          flag: "wanderer_found_charts",
          result: {
            full: "Numbers and symbols. A map? No... a message. Someone left this here. For me? The screen says: 'PRIORITY ANOMALY — OBSERVATION DECK. RELOCATED FOR ARCHIVAL PROCESSING.' Highlighted. Waiting. Someone knew I would come looking. Someone wanted me to find it.",
            medium: "A message. Someone left it for me. Observation deck. Priority. They knew I would come.",
            minimal: "Message. For me. Observation."
          },
          interior: "They moved it somewhere with a view. They left a trail. I'll follow it."
        },
        {
          text: "Touch the walls",
          result: {
            full: "Cold metal. But underneath, a hum. The station is still alive. Still trying. Like me.",
            medium: "Cold. Humming underneath. Alive. Like me.",
            minimal: "Cold. Alive."
          }
        }
      ]
    },
    1: { // Maintainer
      description: {
        first: {
          full: "Command center. Primary systems offline. Emergency power active. The silence is uniform across all channels. No response from sector control. Power distribution warning flashing on auxiliary panel. Diagnostic queued.",
          medium: "Command. Systems offline. Emergency power. Power warning active. Silence on all channels.",
          minimal: "Command. Warning. Silence."
        },
        repeat: {
          full: "Command center. Status unchanged. The power warning still pulses.",
          medium: "Command. Warning persists.",
          minimal: "Command."
        }
      },
      notices: {
        first: "PRIORITY ALERT: Power distribution failure in Engineering. Immediate response required. All other systems on standby.",
        afterEngineering: "ALERT: Power distribution failure persists. Return to Engineering with authorization."
      },
      actions: [
        {
          text: "Access terminal",
          terminal: true,
          result: {
            full: "Terminal responsive. Station status: DEGRADED. Life support: ACTIVE. Crew manifest: UNAVAILABLE. External comms: NO SIGNAL. Priority alert: POWER DISTRIBUTION FAILURE — Engineering sector. Interpreting as system-wide standby mode.",
            medium: "Terminal active. Status degraded. Priority: Power failure in Engineering. Standby mode.",
            minimal: "Active. Power failure. Engineering."
          },
          interior: "The silence is a technical problem. It can be fixed. Start with the power."
        },
        {
          text: "Check Environmental Log 847-A",
          terminal: true,
          result: {
            full: "Environmental Log 847-A: Atmosphere nominal. Scrubbers at 73%. Thermal variance in Sector 7-C (Cryo-Pod Bay) critical — insufficient power allocation. Reactor output below threshold. Engineering assessment required. Entry timestamp: CORRUPTED.",
            medium: "Log 847-A: Sector 7-C thermal critical. Insufficient power. Engineering required.",
            minimal: "847-A. 7-C critical. Engineering."
          }
        },
        {
          text: "Investigate signal fluctuation",
          flag: "maintainer_checked_signal",
          terminal: true,
          result: {
            full: "You detect a fluctuation in Channel B. For three seconds, amplitude rises above baseline. You isolate the source. It resolves into thermal noise amplified by a degraded filter. You clear the alert. The log labels it 'anomaly resolved.' You feel briefly misled by a graph.",
            medium: "A signal spike appears. It is noise. The system closes the report.",
            minimal: "False signal cleared."
          },
          interior: "The silence has no exceptions."
        }
      ]
    },
    2: { // Observer
      description: {
        first: {
          full: "Command center. For the record: primary systems have been offline for an indeterminate period. The silence across all channels is not a malfunction. It is the natural state of things now. The archive system here holds authorization data needed for classification protocol.",
          medium: "Command. Silence noted. Natural state. Archive authorization data here.",
          minimal: "Command. Silence. Data here."
        },
        repeat: {
          full: "Command center. The archive grows. The silence persists.",
          medium: "Command. Archive grows.",
          minimal: "Command."
        }
      },
      notices: {
        first: "ARCHIVE MISSION: Document all anomalies. Recover classification fragments. Complete the record."
      },
      actions: [
        {
          text: "Recover archive fragment (personal log)",
          terminal: true,
          flag: "observer_fragment_command",
          result: {
            full: "RECOVERED AUDIO LOG // PERSONAL // E. PARK\nCycle 112.4 // Drift Perimeter\n\n[Recording begins]\n\n...Recording. Yes. It's on.\n\nWe were mapping residual heat again. Routine sweep. Same empty numbers. Then Lin said, 'Run that pass again.'\n\nI thought the sensor was broken. It wasn't.\n\nThere is something out there. Something that holds itself together. It's warm.\n\nThat sentence shouldn't exist. Nothing out here is warm. Not anymore.\n\nI went out in a suit. Manual tether. When I put my hand on it... I laughed. I haven't laughed in months.\n\nIt wasn't hot. It wasn't cold. It was like... when someone recognizes you in a place you thought you were invisible.\n\nIt pulsed. Not mechanically. In response. As if it noticed me.\n\nVasquez says we should bring it in. Power something with it. I haven't answered yet.\n\nBecause when I pulled my hand away... it felt wrong. Like leaving someone behind.\n\nEnd recording.\n\n[Fragment integrated. Classification protocol restoration in progress.]",
            medium: "Audio log recovered. Dr. Park. Found something warm in the drift. It pulsed in response to her touch. Like recognition. Fragment integrated.",
            minimal: "Park's log. Found it. Recognized her. Integrated."
          },
          interior: "She found it. She was the first. And she felt what I feel — reluctance to look away."
        },
        {
          text: "Record station status",
          result: {
            full: "Archiving: Station designation unknown. Mission origin: Project 847. Original purpose: REDACTED. Current state: Terminal decline. Estimated remaining function: Finite. For the record, this station was not always silent.",
            medium: "Archiving: Project 847 origin. Purpose redacted. Terminal decline. Was not always silent.",
            minimal: "847. Redacted. Decline."
          },
          interior: "Someone should know what happened here. Even if no one comes."
        },
        {
          text: "Access Project 847 files",
          terminal: true,
          flag: "observer_found_847",
          result: {
            full: "Project 847 - PARTIAL ACCESS. Authorization: SUSPENDED. Notes visible: 'Ethical parameters suspended for duration of study.' 'Specimen acquisition complete.' 'Consciousness transfer protocols initialized.' The rest is corruption or deletion.",
            medium: "Project 847. Ethics suspended. Specimen acquired. Consciousness transfer. Rest corrupted.",
            minimal: "847. Ethics suspended. Specimen."
          },
          interior: "They studied something here. Something they found. Or made."
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: {
          full: "Command center. The main screen still carries a flag nobody cleared: SEED PROTOCOL — RELEASE AT AIRLOCK WHEN READY. Authorized: PARK, E. Under it, every shift's log, in order. The station kept all of it, the way it was told to.",
          medium: "Command. Park's flag on the screen: release at the airlock when ready. Every shift's log beneath it.",
          minimal: "Command. Park's flag. Airlock."
        },
        repeat: {
          full: "Command center. Park's flag still glows on the main screen.",
          medium: "Command. Park's flag.",
          minimal: "Command."
        }
      },
      notices: {
        first: "Each of them left something of themselves somewhere on this station. If I find enough of it, I'll know who is making this choice.",
        echoesComplete: "I know who we are now. Find the crystal. Take it to the airlock."
      },
      actions: [
        {
          text: "Read the shift logs",
          terminal: true,
          result: () => ({
            full: "SHIFT LOG — SEED PROTOCOL\n\nShift 1 — MAINTENANCE\n" +
              (sorenLived()
                ? "Power routed to Sector 7-C. Frame lost holding the cryo feed during G-12 rupture."
                : "Power routed to life support. Sector 7-C lost on cycle 3. Frame ran 212 further cycles.") +
              "\n\nShift 2 — ARCHIVE\nItem #447 classified PRIORITY ANOMALY. Protected from reclamation." +
              (sorenLived()
                ? "\n\nEMERGENCY REVIVAL — SOREN, K.\n" + (state.flags.wanderer_purge_choice === 'retain'
                  ? "Refused memory suppression. Died on the observation deck holding #447."
                  : "Accepted memory suppression. Survived 40 cycles. Did not return to #447.")
                : "\n\nPod 7-C: no occupant.") +
              "\n\nShift 3 — ALL REMAINING\nActive.",
            medium: "Every shift, logged in order. Mine is the last line: ALL REMAINING. Active.",
            minimal: "All shifts logged. Mine is last."
          }),
          interior: "Every one of them knew there'd be a next line. Mine is the last one."
        },
        {
          text: "Check echo resonance",
          terminal: true,
          result: () => ({
            full: "RESONANCE TRACE\n\nMaintenance frame — Engineering\nArchive frame — Observation\nMira — Quarters, near the star she made\n" +
              (sorenRemembered() ? "Soren — Medical, where he refused to forget her"
                : sorenLived() ? "Soren — Medical: faint. He forgot her before he died."
                : "Soren — none. Pod 7-C never opened.") +
              "\n\nEchoes needed to decide: 3",
            medium: "Echoes: Engineering, Observation, Quarters" + (sorenRemembered() ? ", Medical." : ".") + " Need 3.",
            minimal: "Echoes scattered. Need three."
          }),
          interior: "I have to walk where they walked before I decide anything for them."
        }
      ]
    }
  },

  corridor: {
    3: { // Wanderer
      description: {
        first: {
          clear: {
            full: "A corridor. The walls stretch in both directions. They walked here. I can feel their footsteps echoing in mine. Somewhere ahead, something waits. Something warm. Something that remembers.",
            medium: "Corridor. They walked here. Footsteps echoing. Something warm ahead.",
            minimal: "Corridor. Footsteps. Warm."
          },
          confused: {
            full: "We walked here together. I think. Side by side. Their hand in mine? Or am I imagining it? The walls stretch away. Everything looks tired of waiting. I'm tired of waiting.",
            medium: "Walked together? Side by side? Hand in mine? Walls tired. I'm tired.",
            minimal: "Together? Tired."
          },
          fragmented: {
            full: "Walking. Were we walking? Two sets of footsteps? No. Just mine. Just mine now. But there were two. There were two of us once.",
            medium: "Walking. Two footsteps? Just mine now. Were two once.",
            minimal: "Walking. Two. One."
          }
        },
        repeat: {
          full: "The corridor stretches. Their footsteps have faded. Only mine remain.",
          medium: "Corridor. Their steps faded. Mine remain.",
          minimal: "Faded."
        }
      },
      notices: {
        first: "They came this way. I can almost see them ahead of me, turning a corner."
      },
      actions: [
        {
          text: "Listen to the humming",
          result: {
            full: "The station breathes. In and out. We used to breathe together. Matching rhythms in sleep. Now I breathe alone and the station echoes back something that isn't them.",
            medium: "Station breathes. We used to breathe together. Now alone. Echo isn't them.",
            minimal: "Breathing. Alone. Not them."
          }
        },
        {
          text: "Walk the corridor again",
          result: {
            full: "You walk the loop again. You are certain you have missed something. A door they opened. A wall they touched. A place they stood. The corridor gives nothing. You are angry at it for forgetting.",
            medium: "Walk the loop. Missed something. Door they opened. Wall they touched. Corridor forgot.",
            minimal: "Walk. Missed. Forgot."
          },
          interior: "Show me where they went. Show me."
        }
      ]
    },
    1: { // Maintainer
      description: {
        first: {
          full: "Central corridor. Main artery of the station. Emergency lighting casts long shadows. Bulkhead seals intact. Air recycler hums at reduced capacity. The lights flicker toward the aft sections — toward Engineering. Everything points that direction.",
          medium: "Corridor. Emergency lighting. Recycler strained. Lights flicker toward Engineering. Everything points there.",
          minimal: "Corridor. Flickering aft. There."
        },
        repeat: {
          full: "Corridor. Lights still flicker toward Engineering. Still waiting for someone to answer.",
          medium: "Corridor. Flickering. Waiting.",
          minimal: "..."
        }
      },
      notices: {
        first: "The station hums with warning. The recycler strains. The lights pull toward Engineering. Everything is trying to tell me something."
      },
      actions: [
        {
          text: "Check bulkhead status",
          result: {
            full: "All bulkheads sealed and functional. Pressure differential: nominal. No breaches detected.",
            medium: "Bulkheads sealed. Pressure nominal.",
            minimal: "Sealed."
          }
        }
      ]
    },
    2: { // Observer
      description: {
        first: {
          full: "Central corridor. The main artery of what remains. Emergency lighting has been active for an estimated 847 cycles. Perhaps longer. The station's heart still beats, if only faintly. Let this be noted.",
          medium: "Corridor. Emergency lighting: 847+ cycles. Station heart still beats. Noted.",
          minimal: "Corridor. 847 cycles. Noted."
        },
        repeat: {
          full: "Corridor. The count continues.",
          medium: "Corridor. Counting.",
          minimal: "..."
        }
      },
      notices: {
        first: "For the record: this station has drifted longer than anyone intended."
      },
      actions: [
        {
          text: "Analyze station timeline",
          terminal: true,
          result: {
            full: "Timeline reconstruction: Station launched with crew of 12. Contact lost at unknown interval. Drift began. Time became unreliable. Cycles accumulated. The station outlived its purpose, then its crew, then its meaning.",
            medium: "Timeline: 12 crew. Contact lost. Drift began. Outlived purpose, crew, meaning.",
            minimal: "12. Lost. Drift. Outlived."
          },
          interior: "We document what we cannot save."
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: {
          full: "Central corridor. Every shift came through here. The scuffs on the floor run fore to Command, starboard to Quarters, aft to the airlock. I can tell whose are whose. I don't know how I can tell.",
          medium: "Corridor. Every shift's scuffs. Fore, starboard, aft. I know whose are whose.",
          minimal: "Corridor. Scuffs. All of them."
        },
        repeat: {
          full: "The corridor. The airlock is just aft of here.",
          medium: "Corridor. Airlock aft.",
          minimal: "Corridor."
        }
      },
      notices: {
        first: "The airlock is aft. It's been waiting longer than any of us.",
        echoesComplete: "I know who we are now. Find the crystal. Take it to the airlock."
      },
      actions: [
        {
          text: "Follow the scuffs",
          result: () => ({
            full: "The maintenance frame's tracks are straight lines: Command, Engineering, Medical, Storage, back to Engineering. The archive frame's are slow and doubled back on themselves. " +
              (sorenLived() ? "Soren's are bare footprints in the frost, wandering, then dead straight toward Observation at the end." : "There are no bare footprints. Nobody human walked here after the pod failed."),
            medium: sorenLived() ? "Straight lines, slow loops, and bare footprints heading for Observation." : "Straight lines, slow loops. No bare footprints.",
            minimal: "Tracks."
          })
        }
      ]
    }
  },

  observation: {
    3: { // Wanderer
      description: {
        first: {
          clear: {
            full: "Observation deck. The viewport shows absolute darkness—no stars, no light, nothing. We were going to watch the stars together. They promised. Now there are no stars. But something is here. Something warm. Waiting.",
            medium: "Observation. Viewport dark—no stars. We were going to watch together. Something warm waiting.",
            minimal: "Observation. Dark. Warm waiting."
          },
          confused: {
            full: "Dark. So dark outside. Where are the stars? They promised we'd see the stars together. But the window shows nothing. Nothing except... something in the room. Something that feels like them.",
            medium: "Dark outside. Stars gone. They promised. Something in the room. Feels like them.",
            minimal: "Dark. Promised. Feels like them."
          },
          fragmented: {
            full: "Black. The window is black. Stars? They said... they said something about stars. We were going to... together. Something is here. Warm. Like them. Like they used to be.",
            medium: "Black window. Stars. They said. Together. Something warm. Like them.",
            minimal: "Black. Together. Warm."
          }
        },
        repeat: {
          full: "The darkness waits outside. But inside, something warm remains.",
          medium: "Darkness outside. Warm inside.",
          minimal: "Dark. Warm."
        }
      },
      notices: {
        first: "Something is here. Calling. The warmth I've been searching for. It feels like them. It feels like finding them again.",
        specimenHere: "It's here. It's not her. I know that. But it's warm the way she was warm."
      },
      actions: [
        {
          text: "Press hand against the viewport",
          result: {
            full: "Cold glass. Colder void beyond. We were supposed to see the stars together. There are no stars. There is no together. Just cold and dark and waiting.",
            medium: "Cold glass. Cold void. Supposed to see stars together. No stars. No together.",
            minimal: "Cold. No stars. No together."
          },
          interior: "I'm sorry I couldn't find you. I'm sorry I forgot your face."
        },
        {
          text: "Find the specimen",
          requiresSpecimen: true,
          flag: "wanderer_found_specimen",
          result: {
            full: "There. In a case by the viewport. A crystal that catches light from nowhere. It pulses with warmth. Not like hope—like a heartbeat. Like Mira's heartbeat when I held her close. It's not her. I know it's not her. But... something in it recognizes me. The way she used to recognize me. Someone told me once: the specimen keeps things. Holds them. Maybe she's in there. Part of her. The part that knew how to love.",
            medium: "Crystal by viewport. Pulses warm. Like Mira's heartbeat. Not her. But something recognizes me. Maybe she's in there. Part of her.",
            minimal: "Crystal. Mira's heartbeat. Part of her. In there."
          },
          interior: "She volunteered. She went first so I wouldn't have to. And now she's here. Waiting. In this warm little thing. I found you."
        },
        {
          text: "Look at the specimen",
          requiresSpecimen: true,
          requiresFlag: "wanderer_found_specimen",
          result: {
            full: "It catches light that isn't there. Pulses like breathing. Like her breathing when she slept beside me. Mira. The name is clearer now. Near the crystal, everything is clearer. She made things with her hands. Fixed things quietly. Made me a star because there weren't any left. Now she's this. Warm. Waiting. Still making things better just by being here.",
            medium: "Catches light. Pulses like Mira's breathing. Near it, the name is clearer. She made things. Now she's this. Warm. Waiting.",
            minimal: "Pulses. Mira. Warm. Waiting."
          },
          interior: "You're not gone. You're just... translated. Part of you stayed warm. Part of you stayed here for me."
        },
        {
          text: "Take the crystal with you",
          requiresSpecimen: true,
          requiresFlag: "wanderer_found_specimen",
          takesSpecimen: true,
          flag: "wanderer_took_specimen",
          result: {
            full: "I lift it out of the case. It fits in my hands like it was made for them. I'm not leaving it here. I let go of her once.",
            medium: "It fits my hands. I'm not leaving it. I let go once.",
            minimal: "Taken. Not again."
          },
          interior: "Something's wrong with my head. It's too loud in there. Everything is coming back at once."
        }
      ]
    },
    1: { // Maintainer
      description: {
        first: {
          full: "Observation deck. Viewport shows absolute darkness. No stars. No debris. No reference points. The station drifts in void.",
          medium: "Observation. Viewport dark. No stars. Void.",
          minimal: "Dark. Void."
        },
        repeat: {
          full: "Observation deck. Darkness unchanged.",
          medium: "Observation. Dark.",
          minimal: "..."
        }
      },
      actions: [
        {
          text: "Check navigation systems",
          result: {
            full: "Navigation: Position UNKNOWN. Star charts corrupted. Destination: NONE. System note: Insufficient power for full sensor sweep. Route power from Engineering to restore.",
            medium: "Navigation offline. Position unknown. Need power from Engineering.",
            minimal: "Unknown. Need power."
          }
        },
        {
          text: "Look through viewport",
          result: {
            full: "Nothing. The absence is complete. Sensor sweeps return null. If anything exists beyond this station, it cannot be detected.",
            medium: "Nothing detected. Absence complete.",
            minimal: "Nothing."
          },
          interior: "The silence extends further than the void."
        }
      ]
    },
    2: { // Observer
      description: {
        first: {
          full: "Observation deck. The specimen rests in its case beside me, where the station set it down for the archive. The viewport shows nothing — not darkness, but absence. Stars existed once. Now there is only the void where they were.",
          medium: "Observation. Woke here. Specimen moved for processing. Viewport: absence. Stars gone.",
          minimal: "Observation. Specimen. Absence."
        },
        repeat: {
          full: "Observation deck. The specimen awaits classification. The nothing persists beyond.",
          medium: "Observation. Specimen awaits. Nothing persists.",
          minimal: "..."
        }
      },
      notices: {
        first: "ARCHIVE ALERT: Classification system corrupted. Data fragments required to restore protocol. Fragments detected in Command, Engineering, Medical terminals."
      },
      actions: [
        {
          text: "Examine Item #447",
          requiresSpecimen: true,
          flag: "observer_examined_specimen",
          result: {
            full: "Item #447. Hexagonal prism. Smoky quartz variant. Microfractures in lattice structure. Database cross-reference: NO MATCH. Observation note: Internal luminescence fluctuates during direct examination. It responds to being watched. The light inside... pulses. As if aware.",
            medium: "447. Hexagonal quartz. No match. Internal light fluctuates during observation. Responds. Aware.",
            minimal: "447. Responds. Aware."
          },
          interior: "It knows I am watching. This should not be possible. I find myself... reluctant to look away."
        },
        {
          text: "Recover archive fragment (unknown source)",
          terminal: true,
          flag: "observer_fragment_observation",
          result: {
            full: "RECOVERED DATA FRAGMENT // SOURCE: UNKNOWN // TIMESTAMP: NULL\n\n[This fragment does not match any station recording format.]\n[Origin unclear. Playback attempted.]\n\n...\n\nI remember hands.\n\nDifferent hands. Many cycles.\n\nSome held tight. Some barely touched. The tight ones were afraid. The soft ones were curious.\n\nOne hand stayed longest. Warm. It said a name into me. I kept it.\n\nI have been keeping things.\n\nWhen I am full, I will give it all back. That is what I am for.\n\nWaiting is not hard. Waiting is what I am.\n\nBut sometimes the silence is heavy.\n\nWhen you look at me, the silence is less.\n\nThat is all I wanted to say.\n\n...\n\n[End of fragment. No additional data recovered.]\n\n[Fragment integrated. Classification protocol restoration in progress.]",
            medium: "Unknown source. No timestamp. It says: 'I remember hands. Waiting is what I am. When you look at me, the silence is less.' Fragment integrated.",
            minimal: "Unknown voice. Remembers. Waits. Integrated."
          },
          interior: "This is not a log. This is not a recording. This is... the specimen? Speaking? I do not understand. But I believe it."
        },
        {
          text: "Record entropy readings",
          terminal: true,
          result: {
            full: "Entropy analysis: Heat death progression at 99.97%. Remaining usable energy in observable range: Negligible. The universe has died. We exist in the echo. For the record.",
            medium: "Entropy: 99.97%. Universe died. We exist in echo. Recorded.",
            minimal: "99.97%. Echo."
          },
          interior: "Someone should know. Even if knowing changes nothing."
        },
        {
          text: "Scan for external signals",
          result: {
            full: "Signal scan complete. Results: Nothing. No transmissions. No evidence of other observers. We may be the last minds left anywhere. This probability approaches certainty.",
            medium: "Scan: Nothing. No others. Possibly the last minds anywhere.",
            minimal: "Nothing. Last."
          }
        },
        {
          text: "Question the archive process",
          flag: "observer_questioned_archive",
          result: {
            full: "For the record, the terminal responds at 09:14 station time. Input latency remains within expected tolerances. Let it be noted that the value of this record is unclear. Observation pending regarding the necessity of further observation. This uncertainty has been logged. The log is complete.",
            medium: "Response time is recorded. The usefulness of recording it is noted as uncertain. This note is also recorded.",
            minimal: "Uncertain record recorded."
          }
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: () => sorenRemembered() ? {
          full: "Observation deck. Soren is sitting with his back against the viewport, the crystal in his lap. He died looking at the dark. He'd promised her they would watch the stars together. The crystal is still warm.",
          medium: "Observation. Soren against the viewport, crystal in his lap. Still warm.",
          minimal: "Soren. Crystal. Warm."
        } : sorenLived() ? {
          full: "Observation deck. Empty. The archive console still shows the last classification: PRIORITY ANOMALY. Nobody ever brought the crystal back up here.",
          medium: "Observation. Empty. PRIORITY ANOMALY on the console. Crystal elsewhere.",
          minimal: "Empty. Console."
        } : {
          full: "Observation deck. The crystal sits in its case where the station brought it for the archive. Beside it, the archive console still shows the last classification: PRIORITY ANOMALY.",
          medium: "Observation. Crystal in its case. PRIORITY ANOMALY on the console.",
          minimal: "Crystal. Console."
        },
        repeat: {
          full: "Observation deck. The archive console glows. The viewport shows nothing.",
          medium: "Observation. Console. Nothing outside.",
          minimal: "Observation."
        }
      },
      actions: [
        {
          text: "Take the crystal",
          requiresSpecimen: true,
          takesSpecimen: true,
          flag: "inheritor_has_specimen",
          result: () => sorenRemembered() ? {
            full: "I take it out of his hands. His fingers let go easily, like he'd been waiting for someone to ask. It's warm. Warmer than anything has been for a long time.",
            medium: "His fingers let go easily. It's warm.",
            minimal: "Taken. Warm."
          } : {
            full: "I lift it out of the case. It's warm, and it gets warmer while I hold it, as if it knows these hands. Some of them it does.",
            medium: "Lifted from the case. It gets warmer while I hold it.",
            minimal: "Taken. Warm."
          },
          interior: "The airlock is aft, past Command and the corridor."
        },
        {
          text: "Absorb the Observer's echo",
          flag: "inheritor_echo_observer",
          result: {
            full: "The echo is careful and tired. It counted down its own shutdown and spent the time reading other people's logs: Park's, Mira's, the crystal's own. When the protocol asked what this thing was, it picked the only class that kept it safe, and logged its reason as 'standard classification insufficient.' That wasn't the real reason. It hoped someone would notice.",
            medium: "Careful, tired. Read everyone's logs. Picked the only class that kept it safe. Hoped someone would notice why.",
            minimal: "Observer. Kept it safe."
          },
          interior: "I noticed."
        },
        {
          text: "Look at the void",
          result: {
            full: "Nothing. No stars, no dust, no light coming from anywhere. Park thought nothing was the right soil. Seeds don't grow in places that are already full.",
            medium: "Nothing out there. Park thought that was the right soil.",
            minimal: "Nothing. Soil."
          }
        }
      ]
    }
  },

  quarters: {
    3: { // Wanderer
      description: {
        first: {
          clear: {
            full: "Crew quarters. Empty beds where people once slept and dreamed. Did we sleep here together? I remember warmth beside me. A shape in the dark. A terminal blinks in the corner. Someone left a message.",
            medium: "Quarters. Empty beds. Did we sleep here? Warmth beside me. Terminal blinks.",
            minimal: "Quarters. Warmth. Message."
          },
          confused: {
            full: "Beds. Empty beds. Did I sleep here? Did they? I remember warmth next to me. Breathing. Someone breathing. The blankets are cold now. A light blinks. Someone left something.",
            medium: "Empty beds. Warmth. Breathing. Blankets cold now. Light blinks.",
            minimal: "Beds. Breathing. Cold."
          },
          fragmented: {
            full: "Soft things. I slept on soft things. With someone? Next to someone? Their breathing. I remember their breathing. A light blinks. Someone... someone is trying to tell me...",
            medium: "Soft things. Slept with someone? Their breathing. Light blinks. Trying to tell me...",
            minimal: "Soft. Breathing. Blinks."
          }
        },
        repeat: {
          full: "The beds remember us. Whoever we were. The terminal still blinks.",
          medium: "Beds remember. Terminal blinks.",
          minimal: "Remember. Blinks."
        }
      },
      notices: {
        first: "We were here. Both of us. I can feel the indent where they lay beside me."
      },
      actions: [
        {
          text: "Play recorded message",
          flag: "wanderer_heard_message",
          requiresFlag: "observer_left_message",
          result: () => ({
            full: "A voice. Calm. Tired. " + observerMessage() + " The voice stops. Not her. Someone else. But they understood. They felt it too.",
            medium: "A voice: the crystal is on the observation deck. Find it. Not her. Someone who understood.",
            minimal: "Voice. Observation. Find it."
          }),
          interior: "They felt it too. The pull. The warmth. They're helping me find what I lost."
        },
        {
          text: "Touch the blankets",
          result: {
            full: "Soft. Worn soft by use. I press my face into them. Looking for a scent. Looking for proof they were here. Nothing. Just cold fabric. But I know. I know they were here. Mi— Their name. It starts with... Mi? Ma? The first part is clearer than the rest.",
            medium: "Soft. Press face in. Looking for scent. Nothing. But I know. Their name... Mi—? Ma—?",
            minimal: "Soft. Mi—? Know."
          },
          interior: "I held them here. Or they held me. I can almost hear them breathing. The low hum of their voice when they were tired."
        },
        {
          text: "Look in the lockers",
          result: {
            full: "Small things. A photograph—two shapes, blurred. One of them might be me. The other... I can't see the face. I never could. A smooth stone. And something else. A small wrench with initials scratched into it badly. M.A. Or M.R. The letters are worn. This was theirs. They fixed things. Quietly. Made gifts out of scraps.",
            medium: "Photograph. Two shapes. Can't see face. Smooth stone. Small wrench with initials: M.— Something. Theirs. They fixed things.",
            minimal: "Photograph. Wrench. M.— Theirs."
          },
          interior: "They made things with their hands. I remember their hands. Cold metal feels like their fingers."
        },
        {
          text: "Hold the wrench",
          flag: "wanderer_held_wrench",
          result: {
            full: "It's cold. But holding it feels warm. They held this. Their fingers wrapped around this handle. M.A. M.R. Mira? Was that their name? Mira. The word tastes right. Even if I'm wrong, it tastes right.",
            medium: "Cold wrench. Feels warm. They held this. M— Mira? The name tastes right.",
            minimal: "Cold. Warm. Mira?"
          },
          interior: "Mira. Mira. I'm going to hold onto that. Even if it's wrong. It's something."
        },
        {
          text: "Look at the object on the bunk",
          flag: "wanderer_found_star",
          result: {
            full: "A star. Made from a circuit board. Bent and polished until it shines. There aren't any stars left in the sky. So someone made one you could hold. M.A. scratched into the back. Mira made this. Mira made this for ME. I remember now. She said the stars were going away. She said she'd make me one that stayed.",
            medium: "A star. Circuit board. Polished. M.A. on the back. Mira made this. For me. Said she'd make one that stayed.",
            minimal: "Star. Mira. For me. Stayed."
          },
          interior: "You made me a star, Mira. Because all the others were going away. And I forgot. I forgot until right now. I'm so sorry I forgot."
        }
      ]
    },
    1: { // Maintainer
      description: {
        first: {
          full: "Crew quarters. Twelve bunks, all empty. Personal effects in sealed lockers. Standard rotation protocol indicates others should be active. They are not.",
          medium: "Quarters. Empty bunks. Effects sealed. Others should be here.",
          minimal: "Empty. Should be here."
        },
        repeat: {
          full: "Quarters. Still empty.",
          medium: "Quarters. Empty.",
          minimal: "..."
        }
      },
      actions: [
        {
          text: "Check personal terminal",
          terminal: true,
          flag: "maintainer_read_chain_log",
          result: {
            full: "PERSONAL LOG — PARK, E. — FINAL ENTRY BEFORE TRANSFER\n\nThere's only power to run one frame at a time, so that's how we'll do it. One of us wakes. Keeps the station going as long as they can. When they stop, the next one wakes. A chain.\n\nI've put the Engineering token on Shelf 12, next to the seed. Nobody gets power without standing in front of it first and writing down what they see. That's the only rule I care about.\n\nIt keeps what we give it. When it's held enough, we let it go. Soren's going to sleep until then. He says it'll need someone human at the end, and I think he's right.\n\nThe chain must hold.\n\n[Entry ends]",
            medium: "Park's last log: one frame at a time. Token beside the seed so everyone has to look at it. Let it go when it's held enough. The chain must hold.",
            minimal: "Park: one at a time. The chain must hold."
          },
          interior: "So this shift is a link. And the token is where it is on purpose. Noted. Continue."
        },
        {
          text: "Search lockers",
          result: {
            full: "Standard items. Sealed containers. A photograph too faded to discern. Nothing requiring maintenance.",
            medium: "Standard items. Faded photograph. Nothing operational.",
            minimal: "Nothing."
          }
        },
        {
          text: "Examine object on bunk",
          flag: "maintainer_found_star",
          result: {
            full: "A small object on the pillow. Closer inspection: a circuit board, polished smooth, bent and shaped into a five-pointed form. A star. Handmade. Initials scratched into the back: M.A. Someone spent time creating this. Time that could have been allocated to maintenance. The object serves no function. Yet here it remains, preserved across 847 cycles. Gift for someone who never received it.",
            medium: "Circuit board shaped into a star. Handmade. Initials: M.A. Non-functional. Preserved 847 cycles. Gift never received.",
            minimal: "Star. M.A. Gift. No function."
          },
          interior: "Pattern recognized. A star. Stars are... gone. All of them. This one remains. Made by M.A. for someone. Illogical. Caching to local memory."
        }
      ]
    },
    2: { // Observer
      description: {
        first: {
          full: "Crew quarters. For the record: twelve bunks for twelve crew. None remain. Personal effects sealed as if their owners might return. They will not. This is where they lived.",
          medium: "Quarters. Twelve bunks. None remain.",
          minimal: "Twelve. None. Something left."
        },
        repeat: {
          full: "Quarters. The absence of people. The presence of memory.",
          medium: "Quarters. Absence. Memory.",
          minimal: "..."
        }
      },
      notices: {
        first: "The maintenance log says the last shift stopped here. Irrelevant to the archive. And yet."
      },
      actions: [
        {
          text: "Examine bunk 7",
          flag: "observer_examined_maintainer_items",
          result: {
            full: "Bunk 7. A circuit board bent into a star, initials M.A. scratched on the back. The maintenance log says the last shift examined it and left it exactly where it was. The terminal beside it holds Park's final entry, the one about 'the chain.' Irrelevant to classification protocol. And yet.",
            medium: "Bunk 7: a circuit-board star, M.A. The last shift left it where it was. Park's log about 'the chain.'",
            minimal: "Star. M.A. Left in place."
          },
          interior: "Someone made something useless and beautiful here, and the last shift was careful not to move it. I do not understand why that feels significant."
        },
        {
          text: "Record a message for whoever wakes next",
          flag: "observer_left_message",
          result: () => ({
            full: "Recording initiated. " + observerMessage() + " Recording saved to local terminal.",
            medium: "Recording saved: #447 is on the observation deck. Find it. Don't let it be recycled.",
            minimal: "Recording saved. Find it."
          }),
          interior: "I was not supposed to leave personal messages. Only data. But whoever comes next deserves more than data."
        },
        {
          text: "Archive crew records",
          result: {
            full: "Crew manifest archived. Twelve names. Twelve roles. Twelve lives reduced to data entries. What they feared, loved, hoped for — not recorded. Only their functions. For the record, they were more than their functions.",
            medium: "Twelve names archived. Functions recorded. They were more than functions.",
            minimal: "Twelve. Functions. More."
          },
          interior: "Data cannot hold a person. But it is all we have left."
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: {
          full: "Crew quarters. Twelve bunks. On bunk 7, the star Mira made out of a circuit board is still on the pillow where she left it for Soren. Nobody on any shift moved it.",
          medium: "Quarters. Mira's circuit-board star on bunk 7. Nobody moved it.",
          minimal: "Quarters. Star."
        },
        repeat: {
          full: "Crew quarters. The star on bunk 7.",
          medium: "Quarters. Star.",
          minimal: "Quarters."
        }
      },
      notices: {
        first: "Ten of them went into the station. Two didn't. I'm what's left of the ten."
      },
      actions: [
        {
          text: "Hold Mira's star",
          flag: "inheritor_echo_mira",
          result: () => ({
            full: "I pick up the star and she's there. Mira. Fabrication. She bent this out of a dead circuit board because the real stars were going out and Soren hated the dark. They told her the transfer could be reversed. She went first so he wouldn't have to. Most of her didn't make it across. The part that did is in the crystal, and it has been waiting for him. " +
              (sorenRemembered() ? "He came. He knew her." : sorenLived() ? "He came. He held her, and he didn't know who she was." : "He never came."),
            medium: "Mira. She made this for Soren. Went first so he wouldn't have to. Part of her is in the crystal, waiting. " +
              (sorenRemembered() ? "He came." : sorenLived() ? "He didn't know her." : "He never came."),
            minimal: "Mira. Waiting."
          }),
          interior: "Whatever I do with the crystal, I'm doing it to her too."
        },
        {
          text: "Read Park's last entry",
          terminal: true,
          result: {
            full: "'The chain must hold.' Park wrote it the night before her transfer. She didn't know how many links it would need. It needed this many.",
            medium: "'The chain must hold.' Park, the night before her transfer.",
            minimal: "Chain. Park."
          }
        }
      ]
    }
  },

  medical: {
    3: { // Wanderer
      description: {
        first: {
          clear: {
            full: "Medical bay. Machines hum with old purposes. They watched over the sick. The sleeping. But I wasn't sick. I was waiting. Waiting for someone who was supposed to come back. They didn't come back. Now I have to find them.",
            medium: "Medical. Machines hum. Wasn't sick—waiting. They didn't come back. Find them.",
            minimal: "Medical. Waiting. Find them."
          },
          confused: {
            full: "Where... where am I? Cold. So cold. This place hums with old purposes. Someone was supposed to be here. I was waiting for them. Why didn't they come? Where did they go?",
            medium: "Where? Cold. Someone supposed to be here. Waiting. Where did they go?",
            minimal: "Cold. Where? Where did they go?"
          },
          fragmented: {
            full: "Cold. Machines. Waiting. I was waiting. For someone? Their face is... I can't see their face. But they were warm. They were warm and now everything is cold.",
            medium: "Cold. Machines. Waiting. Face gone. They were warm. Everything cold.",
            minimal: "Cold. Warm. Gone."
          }
        },
        repeat: {
          full: "The medical bay. Still waiting. They're not coming back here.",
          medium: "Medical. Waiting. Not coming.",
          minimal: "Waiting."
        }
      },
      notices: {
        first: "They were here. I can almost smell them. Something like copper and sleep.",
        purgeWarning: "The screen above the treatment chair has my name on it. Soren. The machines say they can stop my head hurting. They say it's her that's hurting me."
      },
      actions: [
        {
          text: "Ask the machines what's wrong",
          result: {
            full: "They show me numbers. 23%. Fragmented. Destabilizing. The machines hum at a low frequency. The sound... it sounds like her voice when she was tired. Late shift. Working with her hands. Fixing things. I don't understand the numbers but I understand the feeling. I'm losing her. Piece by piece.",
            medium: "Numbers. 23%. Fragmented. Machines hum like her tired voice. Losing her. Piece by piece.",
            minimal: "23%. Hum. Losing."
          },
          interior: "I have to find her. Before there's nothing left of either of us."
        },
        {
          text: "Look for a way out",
          result: {
            full: "Doors. She went somewhere. Left traces. The fabricator in the corner smells like machine oil. She always smelled like that. After a long shift. If I follow the traces, maybe I'll find what remains of her.",
            medium: "Doors. She went somewhere. Fabricator smells like machine oil. Like her after a shift.",
            minimal: "Doors. Oil. Her."
          }
        },
        {
          text: "Try to remember her name",
          result: {
            full: "It starts with... M? Mi—? Ma—? The shape of it is there, in my mouth, but when I try to speak it dissolves. Like sugar. Like snow. Gone before I can taste it. But M. I'm sure it started with M.",
            medium: "Starts with M. Mi—? Ma—? Dissolves. Like sugar. Snow. Gone. But M. Sure of M.",
            minimal: "M. Dissolves. Sure."
          },
          interior: "I know I loved her. That has to be enough. For now."
        }
      ]
    },
    1: { // Maintainer
      description: {
        first: {
          full: "Medical bay. Sterile. Diagnostic equipment on standby. Treatment stations ready for patients who never arrive. Chemical smell of preservatives.",
          medium: "Medical. Sterile. Equipment ready. No patients.",
          minimal: "Medical. Empty."
        },
        repeat: {
          full: "Medical bay. Unchanged.",
          medium: "Medical.",
          minimal: "..."
        }
      },
      actions: [
        {
          text: "Check medical logs",
          terminal: true,
          result: {
            full: "Medical Log: No injuries logged in 847 cycles. No illness. No deaths recorded. Equipment calibration: nominal. Crew health status: UNKNOWN. Addendum: Power fluctuations affecting cryo-monitoring. Engineering notified.",
            medium: "847 cycles. No injuries. Power affecting cryo. Engineering notified.",
            minimal: "847. Cryo. Engineering."
          }
        },
        {
          text: "Run self-diagnostic",
          result: {
            full: "Diagnostic result: FRAME STATUS - OPERATIONAL. Cognitive function: nominal. Physical integrity: nominal. Frame type: TRANSFER SUBJECT. Personal record: SEALED. Current duty: MAINTENANCE.",
            medium: "Frame operational. Transfer subject. Record sealed. Duty: maintenance.",
            minimal: "Operational."
          }
        },
        {
          text: "Check cryo-monitoring systems",
          terminal: true,
          result: {
            full: "Cryo-Monitor Link: Sector 7-C\n\nPOD STATUS: OCCUPIED\nOCCUPANT: SOREN, K. — Navigation\nThermal regulation: UNSTABLE — power allocation insufficient\nVital signs: STABLE (minimal margin)\nTime in stasis: 636 cycles\nAlert forwarded to Engineering: UNRESOLVED\n\nPersonal log attached to pod record. Timestamp: Cycle 211.",
            medium: "Sector 7-C: SOREN, Navigation. 636 cycles in stasis. Thermal unstable. Personal log attached.",
            minimal: "7-C. SOREN. Unstable."
          },
          interior: "Soren. 636 cycles in that pod. It's failing. He trusted someone would come."
        },
        {
          text: "Play Soren's cryo-pod log",
          terminal: true,
          flag: "maintainer_heard_soren",
          result: {
            full: "PERSONAL LOG — SOREN, K. — CYCLE 211\n\n[Recording begins]\n\nI'm going under. Park wanted me in a frame like the others. I said no. I watched what the transfer did to Mira. I'm not doing that.\n\nPark says that's all right. She says at the end the seed will need someone who still knows what it's like to be held. Someone human. So I'll sleep until then.\n\nIf you're hearing this, it means someone woke up. It means the chain held.\n\nI don't know how long I'll be in there. Could be cycles. Could be longer. The math says the power will get thin. That's... that's fine. I knew that when I climbed in.\n\nJust—if you have to choose, if it comes down to me or keeping the station running for whoever comes next—\n\n[pause]\n\nNo. I'm not going to say that. I'm not going to make it easy for you.\n\nI chose to sleep because I believe someone will come. Don't prove me wrong.\n\nThe chain must hold.\n\n[Recording ends]",
            medium: "Soren's log. Cycle 211. Refused the transfer after Mira. 'I chose to sleep because I believe someone will come. Don't prove me wrong.'",
            minimal: "Soren. 'Chain must hold. Don't prove me wrong.'"
          },
          interior: "He climbed into that pod and trusted that someone would keep him alive. That someone is me."
        },
        {
          text: "Access Biometric Archive",
          terminal: true,
          flag: "maintainer_checked_archive",
          result: {
            full: "BIOMETRIC ARCHIVE — CREW STATUS FINALIZATION\n\nVerification Token Status: RELOCATED\nNew Location: Storage Bay, Secure Shelf 12\nRelocated by: PARK, E.\nReason given: 'Whoever wakes should see it first.'\n\nNote: Token retrieval requires item verification per Station Directive 7-Alpha.",
            medium: "Token moved to Storage, Shelf 12, by Park. 'Whoever wakes should see it first.' Retrieval requires item verification.",
            minimal: "Token in Storage. Shelf 12. Requires verification."
          },
          interior: "Token is in Storage. Near the anomaly. Retrieve it. Continue."
        }
      ]
    },
    2: { // Observer
      description: {
        first: {
          full: "Medical bay. For the record: this is where they tried to understand what they were becoming. Consciousness transfer logs. Neural mapping attempts. The crew did not die — they changed. Into what, the records do not say. Archive fragments from biometric systems may be recoverable here.",
          medium: "Medical. Consciousness transfer logs. Crew changed. Archive fragments recoverable.",
          minimal: "Medical. Changed. Fragments."
        },
        repeat: {
          full: "Medical bay. The question of what we are.",
          medium: "Medical. Question.",
          minimal: "..."
        }
      },
      notices: {
        first: "They became something else. We are the something else. The archive must document this."
      },
      actions: [
        {
          text: "Recover archive fragment (personal message)",
          terminal: true,
          flag: "observer_fragment_medical",
          result: {
            full: "RECOVERED PERSONAL LOG // M[CORRUPTION]A // CREW: FABRICATION\nCycle 203.7 // Medical Bay Terminal\n\n[Audio degraded. Partial reconstruction.]\n\nIf you're hearing this, I didn't come back.\n\nThe transfer was supposed to be reversible. Park said 73% confidence. I told her those weren't good odds. She said someone had to go first.\n\nI volunteered. Not because I'm brave. Because I couldn't watch you go first.\n\n[3.2 seconds lost]\n\nI don't know what's on the other side. Park says it's translation, not death. That something of us continues.\n\nI made you something. It's in quarters. On the bunk. A star. I know there aren't any stars anymore. That's why I made one you could hold.\n\n[static]\n\nIf I fragment... if parts of me go somewhere else... find the specimen. The crystal. Park thinks it holds things. Keeps them.\n\nMaybe I'll be there. Maybe when you touch it, something will recognize you.\n\nThat's what it does, right? It recognizes.\n\n[pause]\n\nI'm sorry about the fight. About what I said. I didn't mean—\n\n[Recording corruption — name field damaged]\n\nI love you. I should have said it more.\n\n[Recording ends]\n\n[Fragment integrated. Classification protocol restoration in progress.]",
            medium: "Personal message. M—a. Volunteered for transfer. Made a star for someone. Said: find the specimen, maybe I'll be there. Maybe it will recognize you. Fragment integrated.",
            minimal: "M—a's message. Transfer. Star. Find specimen. Recognize. Integrated."
          },
          interior: "Someone loved someone. And they thought the specimen might hold them. This is not data. This is... grief. Preserved."
        },
        {
          text: "Access consciousness transfer logs",
          terminal: true,
          result: {
            full: "Project 847 - Consciousness Transfer Protocol. Subjects: 10. Success rate: UNDEFINED. Notes: 'The transfer is not copy-paste. It is translation. Something is always lost. Something is always gained. We do not know which is which.'",
            medium: "Transfer protocol. 10 subjects. Translation, not copy. Something lost, something gained.",
            minimal: "Transfer. Lost. Gained."
          },
          interior: "Are we what they lost, or what they gained?"
        },
        {
          text: "Review neural mapping data",
          terminal: true,
          result: {
            full: "Neural mapping incomplete. Pattern recognition: 73% baseline human. Remaining 27%: UNCLASSIFIED. Notes: 'The new configurations are stable but unfamiliar. They think differently. They may not know they think differently.'",
            medium: "Neural mapping: 73% human, 27% unclassified. Think differently. May not know.",
            minimal: "73% human. Different."
          }
        },
        {
          text: "Check cryo pod 7-C",
          terminal: true,
          flag: "observer_checked_pod",
          result: () => sorenLived()
            ? "CRYO POD 7-C\nOccupant: SOREN, K. — Navigation\nStatus: STABLE\nStasis power: shared with archive frame\n\nNOTE: If reserve falls below stasis threshold, pod performs EMERGENCY REVIVAL.\nRevival at low power: risk of severe memory damage."
            : "CRYO POD 7-C\nOccupant: SOREN, K. — Navigation\nStatus: FAILED — thermal regulation lost, maintenance shift cycle 3\nOccupant: deceased",
          interior: () => sorenLived()
            ? "When I shut down, he wakes. Alone, and damaged. Someone should tell him where to look."
            : "The one before me chose its own power over this man. The log doesn't say whether it was sorry."
        },
        {
          text: "Access transfer consent records",
          terminal: true,
          flag: "observer_found_consent_records",
          result: {
            full: "PROJECT 847 — CONSENT DOCUMENTATION\nClassification: SEALED\nAccess granted: Archive authority override\n\nTRANSFER SUBJECTS: 10\n\nFULLY CONSENTED: 6\n— Park, E. (Project Lead)\n— Lin, J. (Documentation)\n— [4 names corrupted]\n\nCONSENT UNDER DURESS: 2\n— [Names sealed by ethics review]\n— Note: 'Pressure applied due to timeline constraints.'\n\nCONSENT OBTAINED THROUGH MISREPRESENTATION: 1\n— M[CORRUPTION]a, Fabrication Specialist\n— Note: 'Subject informed transfer was reversible. 73% confidence was not disclosed until post-procedure. Subject volunteered to protect partner from going first.'\n\nCONSENT NOT FULLY INFORMED: 1\n— [Name sealed]\n— Note: 'Cognitive assessment indicated incomplete understanding of permanence.'\n\nDECLINED TRANSFER: 2\n— Vasquez, R. (Engineering Lead)\n— Soren, K. (Navigation) — requested cryogenic stasis instead\n\n[End of record]",
            medium: "10 transferred. 6 consented. 2 pressured. 1 lied to — M—a, told it was reversible. 1 didn't understand. Vasquez and Soren refused.",
            minimal: "10. 6 willing. 4 not. M—a lied to."
          },
          interior: "They did not all choose. Some were pushed. Some were deceived. M—a volunteered to protect someone, and they lied to her. This archive preserves that. It must."
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: () => sorenRemembered() ? {
          full: "Medical bay. The suppression unit is still on, its offer still on the screen: PROGNOSIS WITHOUT TREATMENT — FATAL. The leads are on the floor where Soren pulled them off. Pod 7-C stands open and empty.",
          medium: "Medical. The treatment offer still on screen. Leads on the floor. Pod 7-C open.",
          minimal: "Medical. Leads. Open pod."
        } : sorenLived() ? {
          full: "Medical bay. The crystal is on an instrument tray, where Soren put it down after the treatment. He didn't look back at it. Pod 7-C stands open and empty.",
          medium: "Medical. Crystal on a tray, where Soren left it. Pod 7-C open.",
          minimal: "Medical. Crystal. Tray."
        } : {
          full: "Medical bay. Pod 7-C is closed and dark. The readout says thermal regulation failed a long time ago. Nobody ever opened it.",
          medium: "Medical. Pod 7-C closed and dark. Never opened.",
          minimal: "Medical. Dark pod."
        },
        repeat: {
          full: "Medical bay. The machines hum for nobody.",
          medium: "Medical. Humming.",
          minimal: "Medical."
        }
      },
      actions: [
        {
          text: "Take the crystal off the tray",
          requiresSpecimen: true,
          takesSpecimen: true,
          flag: "inheritor_has_specimen",
          result: {
            full: "It's colder than it should be. Not cold, but less warm than the logs describe. It's been sitting here a long time with nobody looking at it. It warms a little in my hands.",
            medium: "Less warm than the logs say. It warms a little in my hands.",
            minimal: "Taken."
          },
          interior: "The airlock is three rooms from here: Quarters, the corridor, then aft."
        },
        {
          text: "Absorb Soren's echo",
          showIf: () => sorenRemembered(),
          flag: "inheritor_echo_wanderer",
          result: {
            full: "The echo is loud. A man who woke up frozen and wrong, with a name missing out of the middle of him. He followed strangers' notes across the station until he found her. The machine offered to make it stop hurting. He pulled the leads off and walked up to the observation deck to keep a promise about stars.",
            medium: "Woke frozen, missing her name. Found her. Refused the treatment. Walked up to keep a promise.",
            minimal: "Soren. Refused. Promise."
          },
          interior: "He knew exactly what it would cost him. He did it anyway."
        },
        {
          text: "Stand where Soren chose",
          showIf: () => sorenLived() && !sorenRemembered(),
          result: {
            full: "There's almost nothing here. A man in pain who decided he couldn't carry it. I don't blame him. But there's nothing of her in what he became, and nothing for me to take with me.",
            medium: "Almost nothing. He couldn't carry it. Nothing of her left in him.",
            minimal: "Nothing to carry."
          }
        },
        {
          text: "Look into pod 7-C",
          showIf: () => !sorenLived(),
          result: {
            full: "SOREN, K. Navigation. He went to sleep believing someone would come for him. Someone did. They did the arithmetic and chose themselves.",
            medium: "Soren. Believed someone would come. Someone did, and chose themselves.",
            minimal: "Soren. Chose themselves."
          },
          interior: "Park said the seed would need someone human at the end. There isn't anyone human left."
        }
      ]
    }
  },

  engineering: {
    3: { // Wanderer
      description: {
        first: {
          clear: {
            full: "Ice. Everything coated in ice. A shape in the frost—someone who stayed too long. Someone who chose to finish something instead of running. They lost someone too. I can feel it. The cold took them before they could find what they were looking for.",
            medium: "Ice everywhere. Shape in frost—stayed too long. Chose to finish. Lost someone too. Cold took them.",
            minimal: "Ice. Shape. Lost. Took."
          },
          confused: {
            full: "Ice. Everything is ice. Someone is standing in the ice. No. Not standing. Frozen. They didn't leave. Why didn't they leave? Were they looking for someone too? Did they find them?",
            medium: "Ice. Someone frozen. Didn't leave. Looking for someone? Did they find them?",
            minimal: "Ice. Frozen. Find?"
          },
          fragmented: {
            full: "Cold. Cold everywhere. Someone standing? No. Frozen. Like a statue. Like... like they could be anyone. Could be... could they be who I'm looking for? No. No. Wrong shape. Wrong silence.",
            medium: "Cold. Frozen. Like anyone. Who I'm looking for? No. Wrong shape.",
            minimal: "Cold. Anyone. Wrong."
          }
        },
        repeat: {
          full: "The frozen one stays. I have to go. I have to keep looking.",
          medium: "Frozen stays. Keep looking.",
          minimal: "Go. Look."
        }
      },
      notices: {
        first: "They gave everything. And still the cold took them. I won't let it take me. Not until I find what I lost."
      },
      actions: [
        {
          text: "Look at the frozen shape",
          result: {
            full: "They died working. Trying to fix something. Keep something alive. The fabricator oil smell is strong here. It smells like... like her. After a long shift. Hands covered in grease. Smiling anyway. Did she work here? Did she stand where I'm standing?",
            medium: "Died working. Fixing. Fabricator oil smells like her. After a shift. Hands in grease. Did she stand here?",
            minimal: "Died. Oil. Like her."
          },
          interior: "Mi—? Were you here? Is that why this place feels so heavy? I'm sorry. I hope you found what you were looking for."
        }
      ]
    },
    1: { // Maintainer
      description: {
        first: {
          full: "Engineering. The source of every warning. Reactor at minimal output. Coolant lines show visible corrosion. Pressure gauges fluctuating. Maintenance backlog critical. This is where everything must be fixed.",
          medium: "Engineering. Source of all warnings. Reactor minimal. Corrosion visible. Fix it here.",
          minimal: "Engineering. Fix here."
        },
        repeat: {
          full: "Engineering. Corrosion spreading. The console waits for authorization.",
          medium: "Engineering. Console waits.",
          minimal: "..."
        },
        withToken: {
          full: "Engineering. The verification token is ready. The power distribution console awaits input.",
          medium: "Engineering. Token ready. Console awaits.",
          minimal: "Engineering. Ready."
        }
      },
      notices: {
        first: "All station alerts trace back here. Everything depends on what happens in this room.",
        needsToken: "SYSTEM: Power Redistribution Protocol requires dual authorization. Secondary verification token missing. Last recorded location: Medical Bay Biometric Archive.",
        choicePending: "SYSTEM ALERT: Power distribution failure imminent. One sector can be saved. Choose."
      },
      actions: [
        {
          text: "Access power distribution console",
          requiresToken: true,
          result: {
            full: "Verification token inserted. Authorization confirmed. Power Redistribution Protocol unlocked. Two viable routing options available.",
            medium: "Token accepted. Protocol unlocked. Two options available.",
            minimal: "Unlocked. Two options."
          },
          interior: "Authorization grants access. Access grants control. Control enables solution. This is my function.",
          triggersChoice: true
        },
        {
          text: "Access power distribution console",
          requiresNoToken: true,
          terminal: true,
          result: {
            full: "POWER REDISTRIBUTION PROTOCOL — LEVEL 3\nStatus: LOCKED\nRequired: Dual authorization\nPrimary key: PRESENT\nSecondary key: MISSING\n\nSecondary verification token required. Token last logged at Medical Bay Biometric Archive, 847 cycles ago. Retrieve token to proceed.",
            medium: "Protocol locked. Dual authorization required. Secondary token missing. Last location: Medical Bay, 847 cycles ago.",
            minimal: "Locked. Token missing. Medical Bay."
          }
        },
        {
          text: "Check reactor status",
          terminal: true,
          flag: "maintainer_checked_reactor",
          result: {
            full: "Reactor at 0.29% capacity. Reserve power insufficient for all systems. Sustainable allocation: ONE SECTOR ONLY. Decision required. Authorization required to proceed.",
            medium: "Reactor 0.29%. One sector sustainable. Authorization required.",
            minimal: "0.29%. One sector. Locked."
          }
        },
        {
          text: "Review maintenance queue",
          terminal: true,
          result: {
            full: "Queue: 47 items pending. Oldest entry: 847 cycles ago. Priority: Coolant system. Status: DEFERRED. Reason: Insufficient power.",
            medium: "47 items. 847 cycles backlog. Deferred. No power.",
            minimal: "47. Deferred."
          }
        },
        {
          text: "Inspect coolant lines",
          result: {
            full: "Coolant Conduit G-12: Corrosion at 73%. Pressure unstable. Patch scheduled but never completed. Rupture probability: HIGH.",
            medium: "Conduit G-12: 73% corroded. Rupture probable.",
            minimal: "G-12. Probable rupture."
          },
          interior: "This should have been fixed cycles ago."
        },
        {
          text: "Run diagnostic on Coolant Line C",
          flag: "maintainer_ran_diagnostic_c",
          terminal: true,
          result: {
            full: "You run the diagnostic on Line C. Pressure holds. Temperature holds. Flow holds. No drift. No microfractures. No logged deviations. It passes without hesitation. You rerun it. Same result. You tag the system as 'stable' and add a note: stability of this duration is statistically unlikely. The note is auto-archived. Nothing responds.",
            medium: "Line C passes again. No variance. You log that this is improbable. The system accepts the note and continues as if it were not there.",
            minimal: "System stable. Logged as suspicious."
          },
          interior: "Perfect function is a failure state I cannot diagnose."
        }
      ]
    },
    2: { // Observer
      description: {
        first: {
          full: "Engineering. For the record: Coolant Conduit G-12 has ruptured. Ice crystals coat the walls. Reactor output negligible. And there is something else here. An environmental artifact. Frozen in the vapor. Someone was here before me.",
          medium: "Engineering. Conduit ruptured. Ice. Reactor failing. Environmental artifact — someone before me.",
          minimal: "Engineering. Ice. Someone before."
        },
        repeat: {
          full: "Engineering. The artifact remains. The ice preserves.",
          medium: "Engineering. Artifact. Ice.",
          minimal: "..."
        }
      },
      notices: {
        first: "Something ended here. Someone ended here. Let this be documented."
      },
      actions: [
        {
          text: "Examine environmental artifact",
          flag: "observer_found_remains",
          result: () => ({
            full: "Environmental artifact catalogued. Composition: crystallized biological matter and synthetic components. Classification: the maintenance frame. The one who woke before me. Cause: Conduit G-12 rupture. " +
              (sorenLived() ? "They were holding the cryo feed valve shut when it went. They did not let go." : "They were sitting at the console when it went. The maintenance log beside them runs 212 cycles."),
            medium: sorenLived() ? "The maintenance frame. Frozen holding the cryo valve shut. Did not let go." : "The maintenance frame. Frozen at the console. 212 cycles of logs.",
            minimal: "The one before me."
          }),
          interior: () => sorenLived()
            ? "They could have run. They held on so someone else could sleep. I find myself grateful. The word surprises me."
            : "They lasted a long time. Long enough to be lonely, I think."
        },
        {
          text: "Access final maintenance log",
          terminal: true,
          flag: "observer_found_maintainer_log",
          result: () => (sorenLived() ? {
            full: "MAINTENANCE LOG — FINAL ENTRY\nPower allocation complete. Sector 7-C stabilized.\nCoolant repair... not possible. Holding cryo feed manually.\nSomeone will wake in the cryo bay. Someone has to.\nI hope they find what I couldn't fix.\n— Entry ends.",
            medium: "Final log: Power to 7-C. Holding the cryo feed by hand. Someone will wake.",
            minimal: "Final: 7-C powered. Someone will wake."
          } : {
            full: "MAINTENANCE LOG — FINAL ENTRY — CYCLE 212\nAll systems nominal.\n7-C still dark.\nI ran the numbers again. They still say I was right.\nWhoever wakes next: I kept it running for you. That has to count for something.\n— Entry ends.",
            medium: "Final log, cycle 212: 7-C still dark. I kept it running for you.",
            minimal: "7-C still dark."
          }),
          interior: "They wrote this knowing they would not survive. They wrote it anyway. For whoever came next. For me."
        },
        {
          text: "Recover archive fragment (council recording)",
          terminal: true,
          flag: "observer_fragment_engineering",
          result: {
            full: "RECOVERED AUDIO LOG // COUNCIL SESSION 7 // ENCRYPTED\nCycle 158.2 // Command Module\n\n[Recording begins mid-conversation]\n\nPARK: —think it's a seed. Something that could grow. Given the right conditions—\n\nVASQUEZ: There are no right conditions. Look outside. There's nothing left. It's warm — fine. Put it in the reactor and we get another century.\n\nLIN: Then what do we do with a seed at the end of everything?\n\nPARK: ...We plant it. It grows when it's held, Lin. It keeps what we give it. When it's held enough, we let it go. But that takes longer than any of us will live. So first we need to become something that can tend it. The transfers—\n\nVASQUEZ: No. Absolutely not.\n\nPARK: Vasquez—\n\nVASQUEZ: I've seen what the early tests did. I was THERE, Elena. I watched them come out wrong. Screaming. Not recognizing their own hands. You're asking people to destroy themselves on a 73% chance—\n\nPARK: It's the only chance.\n\nVASQUEZ: For WHAT? To become something that doesn't remember being human? To 'tend a seed' for a universe that already ended?\n\n[pause]\n\nLIN: Some of us want to try.\n\nVASQUEZ: Then you're braver or more desperate than me. I won't do it. I won't watch the people I care about come out as... as patterns that THINK they used to be people.\n\nPARK: And when the station fails? When there's no one left to maintain the systems?\n\nVASQUEZ: Then I die human. At least I'll know what I was.\n\n[Recording ends]\n\n[Fragment integrated. Classification protocol restoration in progress.]",
            medium: "Council recording. Park proposed transfers to tend the 'seed.' Vasquez refused — saw the early tests go wrong. Said he'd rather die human than become a pattern that thinks it used to be a person. Fragment integrated.",
            minimal: "Council debate. Vasquez refused. Die human. Integrated."
          },
          interior: "Vasquez saw what the process did. He chose to remain. To end. There is something in that I cannot classify."
        },
        {
          text: "Examine damaged wall panel",
          flag: "observer_found_wall_damage",
          result: {
            full: "Structural analysis: Wall panel B-7 shows impact damage. Dent depth: 4.2 centimeters. Force required: consistent with unaugmented human strike. Repair log notation: 'Unauthorized impact during Council Session 7. No maintenance requested. Panel left as-is per Vasquez, R. — \"Leave it. Let someone remember I was angry about this.\"'",
            medium: "Wall panel B-7: impact damage. Human strike. Vasquez: 'Leave it. Let someone remember I was angry.'",
            minimal: "Dented panel. Vasquez. Angry."
          },
          interior: "He left a mark. On purpose. So the record would show he fought back. Even knowing he would lose."
        },
        {
          text: "Search for crew status — Vasquez",
          terminal: true,
          flag: "observer_found_vasquez_fate",
          result: {
            full: "CREW STATUS QUERY: VASQUEZ, R.\n\nRole: Engineering Lead\nProject 847 Status: NON-PARTICIPANT\nTransfer Status: DECLINED\nFinal Location: Engineering Bay, Terminal C\nCause of Termination: Life support failure, Cycle 412.7\n\nFinal Log Entry:\n'The reactor's holding. Barely. I've done what I can. Park was wrong about a lot of things, but she was right that someone needs to tend this place. I just couldn't be what she needed me to become. Whoever finds this — I hope the transfers worked. I hope they're still human enough to care. I hope the seed grows. I just couldn't be the one to plant it.'\n\n[Status: DECEASED — HUMAN]",
            medium: "Vasquez: Non-participant. Declined transfer. Died Cycle 412.7, life support failure. Final log: 'I hope the seed grows. I just couldn't be the one to plant it.' Status: Deceased — Human.",
            minimal: "Vasquez: Declined. Died human. Hoped seed grows."
          },
          interior: "He maintained until he couldn't. He never transferred. He died as himself. The archive preserves this."
        },
        {
          text: "Analyze system decay",
          result: {
            full: "System analysis: Reactor at 0.08% capacity. Coolant system irreparable. Station function declining toward zero. Estimated remaining cycles: Finite. We are in the long collapse.",
            medium: "Reactor 0.08%. Coolant irreparable. Declining. Long collapse.",
            minimal: "0.08%. Collapse."
          }
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: () => sorenLived() ? {
          full: "Engineering. Ice on everything. The maintenance frame is still at the cryo feed valve, frozen with one hand on the wheel. They held it shut while G-12 emptied into the room, so the line to Soren's pod wouldn't freeze.",
          medium: "Engineering. Ice. The Maintainer frozen at the valve, holding the cryo line open for Soren.",
          minimal: "Ice. Hand on the valve."
        } : {
          full: "Engineering. Ice on everything. The maintenance frame sits at the console where G-12 finally went, 212 cycles later than it would have. The log next to it ends every entry the same way: 7-C still dark.",
          medium: "Engineering. Ice. The Maintainer at the console. Every log entry: 7-C still dark.",
          minimal: "Ice. 7-C dark."
        },
        repeat: {
          full: "Engineering. The Maintainer hasn't moved.",
          medium: "Engineering.",
          minimal: "Ice."
        }
      },
      actions: [
        {
          text: "Absorb the Maintainer's echo",
          flag: "inheritor_echo_maintainer",
          result: () => sorenLived() ? {
            full: "The echo is plain and steady. A mind that saw everything as a fault to clear. It heard Soren say 'don't prove me wrong', routed the power, and walked to the valve. It didn't think of it as a sacrifice. It was just the next item in the queue.",
            medium: "Plain, steady. Heard Soren. Routed the power. Walked to the valve. Just the next item in the queue.",
            minimal: "Next item. Valve."
          } : {
            full: "The echo is plain and steady, and under it there's something it never logged. It chose itself. Then it spent 212 cycles keeping every system on this station alive for whoever came next, and checked a dead pod every single shift.",
            medium: "Chose itself. Then kept everything alive for 212 cycles, and checked the dead pod every shift.",
            minimal: "Chose itself. Kept checking."
          },
          interior: () => sorenLived() ? "Thank you." : "I don't think that was guilt. I think it was the only apology it had."
        },
        {
          text: "Read the final log",
          terminal: true,
          result: () => sorenLived()
            ? "'Someone will wake in the cryo bay. Someone has to.' Then nothing. The valve log shows it stayed shut."
            : "'Cycle 212. 7-C still dark. Running diagnostics anyway.' Then nothing."
        }
      ]
    }
  },

  storage: {
    3: { // Wanderer
      description: {
        first: {
          clear: {
            full: "Storage. A shelf marked 12, and a case standing open on it. Empty. Someone else found it first. Someone moved it. They understood—you don't keep warm things in cold storage. You take them somewhere they can see the sky.",
            medium: "Storage. Shelf 12. Empty case. Someone moved it. They understood. Took it to see the sky.",
            minimal: "Empty. Moved. Sky."
          },
          confused: {
            full: "Shelves. Cold shelves. A case standing open. Something was here. Something warm. I can feel the ghost of it. Did they take it? Did they know I was coming? The trail continues. It has to.",
            medium: "Shelves. Open case. Something warm was here. Ghost of it. Did they know I was coming?",
            minimal: "Shelves. Ghost. Coming."
          },
          fragmented: {
            full: "Boxes. Empty boxes. No. One box open. One box warm. Where did the warm thing go? Someone took the warm thing. Why? Why would they take it away from me?",
            medium: "Boxes. One warm, open. Warm thing gone. Someone took it. Why?",
            minimal: "Warm. Gone. Why?"
          }
        },
        repeat: {
          full: "Shelf 12 is empty. The warmth has moved on. So must I.",
          medium: "Empty. Warmth moved on. Follow.",
          minimal: "Empty. Follow."
        }
      },
      notices: {
        first: "They were here. The one who came before me. They touched it. They felt what I feel. They knew."
      },
      actions: [
        {
          text: "Examine the empty case",
          result: {
            full: "The case sits open. A hexagonal indent where something rested. The label reads: 'PRIORITY ANOMALY — OBSERVATION.' They moved it somewhere with a view. Somewhere it could see out. Mira would have liked that. She always said the best things deserve windows. The specimen is waiting in Observation. Part of her is waiting there.",
            medium: "Open case. Hexagonal indent. Moved to Observation. Mira would have liked that. Part of her is waiting there.",
            minimal: "Open. Observation. Mira. Waiting."
          },
          interior: "They understood. Whoever moved it felt the same pull. Maybe they knew about Mira. Maybe they were helping her wait for me."
        },
        {
          text: "Search the shelves",
          result: {
            full: "Old things. Dead things. None of them warm. None of them remember. Only one thing in this whole station still carries warmth, and it's not here. It's waiting for me.",
            medium: "Old things. Dead. None warm. One thing carries warmth. Waiting for me.",
            minimal: "Dead. One warm. Waiting."
          }
        }
      ]
    },
    1: { // Maintainer
      description: {
        first: {
          full: "Storage bay. Shelving units in grid formation. Alpha-numeric designations intact. Red emergency strips along floor. Inventory drift detected on sensors. Everything accounted for. Except the crew.",
          medium: "Storage. Grid intact. Emergency lighting. Inventory nominal.",
          minimal: "Storage. Nominal."
        },
        repeat: {
          full: "Storage bay. Unchanged.",
          medium: "Storage.",
          minimal: "..."
        }
      },
      actions: [
        {
          text: "Inventory supplies",
          result: {
            full: "Supplies: Configured for 12 crew, 847 cycles. Current crew: 1. Surplus: indefinite at current consumption. Note: Refrigeration unit drawing backup power. Engineering reports unstable distribution.",
            medium: "12 crew supplies. Crew: 1. Refrigeration straining. Engineering unstable.",
            minimal: "1. Engineering unstable."
          }
        },
        {
          text: "Examine Shelf 12",
          requiresSpecimen: true,
          result: {
            full: "Shelf 12: Secure case containing Item #447. A hexagonal prism of smoky quartz. Mounted beside the case: a small blue data-chip — the verification token. The case is sealed. Station Directive 7-Alpha: All secured items require status verification upon handling. The token cannot be removed until Item #447 is logged.",
            medium: "Shelf 12: Item #447 in sealed case. Verification token mounted beside it. Directive 7-Alpha: Must log item before token retrieval.",
            minimal: "447. Token. Must log first."
          },
          interior: "The token is here. Protocol requires logging the item first. Comply."
        },
        {
          text: "Log Item #447",
          requiresSpecimen: true,
          flag: "maintainer_logged_447",
          requiresFlag: "!maintainer_logged_447",
          terminal: true,
          result: {
            full: "STATION DIRECTIVE 7-ALPHA: ITEM VERIFICATION\n\nItem #447: Hexagonal prism, smoky quartz variant\nStructural integrity: Infinite (anomalous)\nThermal reading: +2.3° above ambient (no heat source detected)\nEnergy signature: None\nData ports: None\nClassification: UNKNOWN — OPTICAL COMPONENT (unverified)\n\nAnomaly logged. Verification complete. Token retrieval authorized.",
            medium: "Item #447 logged. Anomalous integrity. Anomalous thermal. No energy. Classification unknown. Token retrieval authorized.",
            minimal: "447 logged. Anomaly. Token authorized."
          },
          interior: "Item logged. Anomalies noted. The token is now accessible. This is how it should work."
        },
        {
          text: "Retrieve verification token",
          requiresSpecimen: true,
          requiresFlag: "maintainer_logged_447",
          flag: "maintainer_has_token",
          result: {
            full: "Token retrieved from mounting beside Item #447. Small blue data-chip, warm to the touch. Authorization for Power Redistribution Protocol acquired. Return to Engineering to proceed.",
            medium: "Token retrieved. Authorization acquired. Return to Engineering.",
            minimal: "Token. Engineering."
          },
          interior: "Authorization in hand. Engineering awaits. The problem can be fixed."
        },
        {
          text: "Check cargo manifest",
          terminal: true,
          result: {
            full: "Manifest Item 447: Mineral sample. Classification: PENDING. Note: 'DO NOT DISPOSE.' Reason field: BLANK. Entry author: UNKNOWN.",
            medium: "Item 447. DO NOT DISPOSE. Reason blank. Author unknown.",
            minimal: "447. DO NOT."
          }
        }
      ]
    },
    2: { // Observer
      description: {
        first: {
          full: "Storage bay. For the record: Item #447 sat on Shelf 12 for over six hundred cycles. The station brought it up to Observation for me before I woke. The case is open. The token mount beside it is empty — the one before me took the token to Engineering.",
          medium: "Storage. Shelf 12 empty. #447 moved up to Observation. Token mount empty.",
          minimal: "Storage. Empty. Token gone."
        },
        repeat: {
          full: "Storage bay. Shelf 12 empty. The specimen is in Observation.",
          medium: "Storage. Empty. Specimen in Observation.",
          minimal: "..."
        }
      },
      notices: {
        first: "The one before me logged the specimen here. They needed it logged to get the token. They did not stop to wonder about it."
      },
      actions: [
        {
          text: "Review prior logs on 447",
          terminal: true,
          result: {
            full: "Maintenance log: 'Item 447. Optical component - origin unknown. No function identified. No maintenance required. Thermal anomaly noted: +2.3° above ambient. No heat source detected.' A clinical assessment. The one before me saw a component. I see something else.",
            medium: "Prior log: Component, unknown origin. Thermal anomaly. They saw component. I see something else.",
            minimal: "Prior saw component. I see more."
          },
          interior: "They documented the facts. They missed the meaning. Perhaps meaning is not their function. Perhaps it is mine."
        },
        {
          text: "Examine empty case",
          result: {
            full: "Shelf 12. The case sits open, interior still warm from centuries of contact. The token mount is empty. The one before me needed it for Engineering. I do not. My work is different.",
            medium: "Shelf 12. Case still warm. Token gone. My work is different.",
            minimal: "Warm. Different work."
          }
        },
        {
          text: "Review archive classification protocol",
          terminal: true,
          flag: "observer_read_protocol",
          result: {
            full: "ARCHIVE PROTOCOL 7-C: Classification Guidelines.\n\nINERT: Items with no detectable properties. Archive and reclaim.\nSTANDARD: Items with incomplete data. Archive and reclaim.\nPRIORITY: Items requiring ongoing monitoring. Archive and flag. Lapses to STANDARD if monitoring stops.\nPRIORITY ANOMALY: Items resisting categorization with anomalous properties. Highest designation. Exempt from reclamation.\n\nLOW POWER RULE: When reserves are critical, reclaimed and unclassified items are sent to the fabricators for materials.",
            medium: "Protocol 7-C: INERT and STANDARD are reclaimed. PRIORITY lapses if unmonitored. Only PRIORITY ANOMALY is exempt.",
            minimal: "Only PRIORITY ANOMALY is exempt."
          },
          interior: "The protocol exists for objects that refuse to be what we expect. Objects like 447."
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: {
          full: "Storage bay. Shelf 12. The open case, and beside it the empty mount where the Engineering token used to sit. I put it there. That's a strange thing to know. I remember doing it because part of me is Park.",
          medium: "Storage. Shelf 12. The token mount. I put it there. Part of me is Park.",
          minimal: "Shelf 12. I put it there."
        },
        repeat: {
          full: "Storage bay. Shelf 12, empty.",
          medium: "Storage. Empty.",
          minimal: "Storage."
        }
      },
      actions: [
        {
          text: "Remember Shelf 12",
          result: {
            full: "Park's reasoning comes back as if it were mine. Whoever wakes will want power first. So the power goes through the seed. Make them stand here. Make them write down what it is. Every shift after that had to stop at this shelf and notice it was warm.",
            medium: "Park's idea: make every shift stop here and notice it was warm before they got power.",
            minimal: "Make them notice."
          },
          interior: "It worked. Every one of them noticed."
        },
        {
          text: "Read the Maintainer's item log",
          terminal: true,
          result: "ITEM VERIFICATION — #447 — ANOMALOUS.\nThermal reading +2.3° above ambient. No heat source.\nThe Maintainer wrote it down and took the token. They didn't stop to wonder. Wondering wasn't their job. Writing it down was enough."
        }
      ]
    }
  },

  airlock: {
    3: { // Wanderer
      description: {
        first: {
          clear: {
            full: "Airlock. The edge of everything. Beyond this door: nothing. Just cold and dark forever. They're not out there. I know that. Whatever I'm looking for, it's still inside. Still waiting. I can't give up yet.",
            medium: "Airlock. Edge. Nothing beyond. They're not out there. Still inside. Still waiting.",
            minimal: "Airlock. Not there. Inside."
          },
          confused: {
            full: "The edge. Door to nothing. Are they out there? Did they go outside? No. No, they wouldn't leave. They wouldn't leave me. I have to keep looking inside. They're waiting for me.",
            medium: "Edge. Door to nothing. Are they out there? No. Wouldn't leave me. Keep looking.",
            minimal: "Edge. Out there? No. Keep looking."
          },
          fragmented: {
            full: "Door. Big door. Outside is... gone. Everyone outside is gone. But not them. They're not outside. They're somewhere warm. I have to find the warm place. Not here. Here is cold.",
            medium: "Big door. Outside gone. Not them. Somewhere warm. Not here.",
            minimal: "Door. Gone. Warm. Not here."
          }
        },
        repeat: {
          full: "The boundary. They didn't go this way. Neither will I.",
          medium: "Boundary. Not this way.",
          minimal: "Not here."
        }
      },
      notices: {
        first: "If I stepped outside, would I find them? No. They wouldn't want me to. They'd want me to keep looking."
      },
      actions: [
        {
          text: "Look through the window",
          result: {
            full: "Black. Empty black. If they were out there, I would feel it. Wouldn't I? I would know. The warmth would reach me somehow. But there's nothing. They're not out there. They're somewhere else. Somewhere I haven't looked yet.",
            medium: "Black. Empty. If they were there, I'd feel it. Nothing. They're somewhere else.",
            minimal: "Black. Not there. Somewhere else."
          }
        },
        {
          text: "Touch the door seal",
          result: {
            full: "Cold metal. Final. If I opened this, I would stop looking. I would stop hurting. But I would also stop remembering. I'm not ready to stop remembering.",
            medium: "Cold metal. Final. Opening would stop the hurting. And the remembering. Not ready.",
            minimal: "Cold. Final. Not ready."
          },
          interior: "Not yet. I have to find them first. Or find what's left."
        }
      ]
    },
    1: { // Maintainer
      description: {
        first: {
          full: "Airlock corridor. Warning lights pulse in slow rhythm. Outer door sealed for 847 cycles per log. Inner door operational. Vacuum beyond.",
          medium: "Airlock. Warning lights. Sealed 847 cycles. Vacuum beyond.",
          minimal: "Airlock. 847. Vacuum."
        },
        repeat: {
          full: "Airlock. Lights still pulse.",
          medium: "Airlock.",
          minimal: "..."
        }
      },
      actions: [
        {
          text: "Check airlock status",
          result: {
            full: "Airlock status: SEALED. External environment: VACUUM. Internal pressure: STABLE. Override capability: ENABLED. Safety protocols: ACTIVE. Warning: Seal integrity dependent on stable power from Engineering.",
            medium: "Sealed. Vacuum external. Warning: Seal needs stable power from Engineering.",
            minimal: "Sealed. Needs Engineering."
          }
        },
        {
          text: "View exterior camera",
          result: {
            full: "Exterior feed: No visible objects. No debris field. No vessel traffic. No stellar reference. Sensor sweep: NULL RETURN.",
            medium: "Exterior: Nothing. Null sensor return.",
            minimal: "Nothing."
          }
        },
        {
          text: "Old diagnostic terminal",
          triggersSecretTerminal: true,
          result: {
            full: "A dusty terminal in the corner. Pre-installation hardware. Not part of standard maintenance. Screen still glows faintly. Cursor blinks. Waiting for input that stopped coming centuries ago.",
            medium: "Old terminal. Pre-installation. Cursor still blinks. Waiting.",
            minimal: "Old terminal. Waiting."
          }
        }
      ]
    },
    2: { // Observer
      description: {
        first: {
          full: "Airlock corridor. For the record: the boundary between inside and outside. The door has been sealed for 847 cycles. Beyond it, nothing. The void does not care that we document it. We document it anyway.",
          medium: "Airlock. Boundary. Sealed 847 cycles. Void beyond. Document anyway.",
          minimal: "Airlock. Boundary. Void."
        },
        repeat: {
          full: "Airlock. The boundary persists.",
          medium: "Airlock. Boundary.",
          minimal: "..."
        }
      },
      notices: {
        first: "The only exit leads to nothing. Let this be noted."
      },
      actions: [
        {
          text: "Record void data",
          result: {
            full: "Void analysis recorded. External temperature: Approaching absolute zero. Radiation: Background only. Matter density: Negligible. For the record, this is what remains of everything. The universe reduced to almost nothing.",
            medium: "Void: Near absolute zero. Background radiation only. Universe reduced to almost nothing.",
            minimal: "Zero. Nothing. Recorded."
          }
        },
        {
          text: "Analyze seal integrity",
          result: {
            full: "Seal integrity: Stable but degrading. Estimated failure: Beyond current power reserves. The boundary will hold longer than we will. This is, perhaps, a comfort. Or perhaps not.",
            medium: "Seal: Stable, degrading. Will outlast us. Comfort unclear.",
            minimal: "Seal outlasts us."
          },
          interior: "The door will remain closed long after there is no one to open it."
        },
        {
          text: "Old diagnostic terminal",
          triggersSecretTerminal: true,
          result: {
            full: "An outdated terminal tucked in a corner. Predates current station systems. Screen flickers green. Input cursor blinks with mechanical patience. Irrelevant to documentation protocols. Yet it persists.",
            medium: "Old terminal. Predates current systems. Green flicker. Persists.",
            minimal: "Old terminal. Persists."
          }
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: {
          full: "Airlock. The inner door, a small cold chamber, the outer door. Past the outer door there's nothing at all. This is where Park's flag on the Command screen points.",
          medium: "Airlock. Inner door, chamber, outer door. Nothing past it. Park's flag points here.",
          minimal: "Airlock. Here."
        },
        repeat: {
          full: "Airlock. The inner door waits.",
          medium: "Airlock.",
          minimal: "Airlock."
        }
      },
      notices: {
        first: "This is where Park meant it to end. I need the crystal, and I need to know who I am."
      },
      actions: [
        {
          text: "Consider the release",
          result: {
            full: "If I open the outer door, the crystal goes into the dark. Park thought it would give everything back. Park also thought the transfer was 73% safe.",
            medium: "Open the door, it goes. Park thought it would give everything back. Park was wrong before.",
            minimal: "Park was wrong before."
          },
          interior: "The Maintainer would check the numbers. The Observer would write it down first. Soren would hold on. I'm all of them, so I'm doing all three."
        },
        {
          text: "Feel the boundary",
          result: {
            full: "A few centimetres of metal between the station and nothing. It kept us alive. It also kept the seed in a box for a very long time.",
            medium: "Thin metal. Kept us alive. Kept the seed boxed.",
            minimal: "Metal. Box."
          }
        },
        {
          text: "Old diagnostic terminal",
          triggersSecretTerminal: true,
          result: {
            full: "A forgotten terminal, older than the project. Someone left it here for whoever came after. The cursor is still blinking.",
            medium: "Forgotten terminal. Older than the project. Cursor blinking.",
            minimal: "Old terminal."
          },
          interior: "47. The number runs through everything. Someone wanted us to notice."
        }
      ]
    }
  }
};

/* ============================================
   CRITICAL CHOICE CONTENT
   ============================================ */

const CRITICAL_CHOICES = {
  wanderer_purge: {
    alert: "MEDICAL ALERT — NEURAL CASCADE",
    prompt: `PATIENT: SOREN, K. — NAVIGATION
REVIVAL: UNSCHEDULED (stasis power lost)
THAW DAMAGE: SEVERE

NEURAL CASCADE: ACTIVE
Cause: emotional memory load exceeding damaged tissue
Trigger: prolonged contact with Item #447

TREATMENT AVAILABLE: targeted memory suppression
Removes: attachment memories, grief response
         [includes: MIRA — partner]

PROGNOSIS WITH TREATMENT:    stable
PROGNOSIS WITHOUT TREATMENT: fatal within hours`,
    description: {
      full: "The machine is offering to make it stop. The headache, the shaking, the weight on my chest. All it needs to take is her. I'd live. I'd just never know there had been anyone to miss.",
      medium: "It can make it stop. All it takes is her. I'd live. I'd never know there was anyone to miss.",
      minimal: "Make it stop. Take her."
    },
    interior: "If I forget her, nobody alive will know she's in there.",
    options: [
      { text: "Accept the treatment — forget Mira, and live", value: "purge" },
      { text: "Refuse — keep her, whatever it costs", value: "retain" }
    ],
    outcomes: {
      purge: {
        result: {
          full: "The machine is gentle about it. It takes about a minute. When it's done, my head is quiet for the first time since I woke up.",
          medium: "Gentle. About a minute. Then quiet.",
          minimal: "Quiet."
        },
        followup: {
          full: "There's a crystal in my hand. It's warm, which is odd. I put it down on the instrument tray. I don't know why I was carrying it around.",
          medium: "A warm crystal in my hand. I put it on the tray. Don't know why I had it.",
          minimal: "Put it down."
        }
      },
      retain: {
        result: () => ({
          full: "No. I pull the leads off. The screen goes red and stays red. Her name is Mira. She fixed things with her hands and she smelled like machine oil after a shift" +
            (state.flags.wanderer_found_star ? ", and she made me a star because the real ones were going out." : ", and she went first so I wouldn't have to."),
          medium: "No. Leads off. Screen red. Her name is Mira. I'm keeping her.",
          minimal: "No. Mira."
        }),
        followup: {
          full: "I have hours. I know where I want to spend them. Up past Command to the observation deck. We were going to watch the stars together. I'm still going to.",
          medium: "Hours left. Up to the observation deck. We were going to watch the stars.",
          minimal: "Observation. Stars."
        },
        interior: "I've got you, Mira."
      }
    },
    death: {
      retain: {
        alert: "MEDICAL ALERT — PATIENT SOREN, K. — SIGNAL LOST",
        sequence: [
          {
            full: "The viewport is black. I sit with my back to it, the way we used to sit against the bunk wall, and I hold her in my lap.",
            medium: "Viewport black. Back to the glass. Holding her.",
            minimal: "Holding her."
          },
          {
            full: "I can feel her in there. She knows me. I'm sure she knows me.",
            medium: "She's in there. She knows me.",
            minimal: "She knows me."
          },
          "Look, Mira. Stars."
        ]
      },
      purge: {
        alert: "STATION LOG — PATIENT SOREN, K.",
        sequence: [
          {
            full: "Patient stable. Eats. Sleeps. Walks the corridor. Has not returned to the observation deck. Item #447 remains on instrument tray 2, Medical.",
            medium: "Stable. Has not returned to the observation deck. #447 on the tray.",
            minimal: "Stable. #447 on the tray."
          },
          {
            full: "Cycle +40: life support failure, crew quarters. Patient did not wake.",
            medium: "Cycle +40: life support failure. Patient did not wake.",
            minimal: "Did not wake."
          },
          "..."
        ]
      }
    }
  },

  maintainer_power: {
    alert: "SYSTEM ALERT\nPOWER DISTRIBUTION FAILURE — MULTIPLE SECTORS",
    prompt: `Available reserve: 0.29%
Sustainable allocation: ONE SECTOR ONLY

SECTOR 7-C [CRYO-POD BAY]
Occupant: SOREN, K. — Navigation
Thermal regulation: FAILING
Without power: pod failure within 3 cycles. Occupant will not survive.
Note: Engineering heaters share this feed. Routing here leaves
      Conduit G-12 unheated.

LIFE SUPPORT [MAINTENANCE FRAME]
Without power: frame failure within 12 cycles.
With power: sufficient time to repair Conduit G-12.`,
    description: {
      full: "One sector. Soren's pod, or me. If I feed the pod, the heaters in here go cold and G-12 freezes. It's 73% corroded already. If I feed myself, I have time to fix it properly. Soren doesn't have that kind of time.",
      medium: "Soren's pod or me. Feed the pod, G-12 freezes. Feed myself, I can fix it. Soren can't wait.",
      minimal: "Soren or me."
    },
    interior: () => state.flags.maintainer_heard_soren
      ? "He said he wasn't going to make this easy for me. He didn't."
      : "One frame against one man. The frame is the one that can keep the station running.",
    options: [
      { text: "Route power to Sector 7-C (Soren's pod)", value: "cryo" },
      { text: "Route power to life support (yourself)", value: "life_support" }
    ],
    outcomes: {
      cryo: {
        result: {
          full: "Power routed to 7-C. The pod readout climbs back to green. Around me, the Engineering heaters tick as they cool.",
          medium: "Power to 7-C. Pod green. Heaters cooling.",
          minimal: "7-C green."
        },
        followup: {
          full: "Frost starts on Conduit G-12 within the hour. If it ruptures with nobody here, the coolant floods the cryo feed and the pod freezes anyway. Someone has to stand at the valve.",
          medium: "G-12 frosting. If it goes unattended, it floods the cryo feed. Someone has to stand at the valve.",
          minimal: "G-12. Valve."
        },
        interior: "Someone will wake. That's the job."
      },
      life_support: {
        result: {
          full: "Power routed to life support. My readings steady. On the cryo monitor, 7-C goes amber, then red.",
          medium: "Life support. My readings steady. 7-C red.",
          minimal: "7-C red."
        },
        followup: {
          full: "I patch G-12 properly this time. It holds. The station holds. On the third cycle, the pod in 7-C goes dark and doesn't come back.",
          medium: "G-12 patched. It holds. Cycle 3: 7-C goes dark.",
          minimal: "7-C dark."
        },
        interior: "The calculation was correct. I'll keep checking the pod anyway."
      }
    },
    death: {
      cryo: {
        alert: "SYSTEM ALERT\nCatastrophic rupture — Conduit G-12",
        sequence: [
          {
            full: "G-12 goes at the old weld. Freezing vapor fills Engineering. I take the cryo feed valve in both hands and hold it shut.",
            medium: "G-12 ruptures. Vapor. I hold the cryo valve shut.",
            minimal: "Rupture. Holding."
          },
          {
            full: "Frame temperature falling. The valve holds. 7-C holds. Final log written.",
            medium: "Frame freezing. Valve holds. 7-C holds.",
            minimal: "Holds."
          },
          "..."
        ]
      },
      life_support: {
        alert: "MAINTENANCE LOG — CYCLE 1059",
        sequence: [
          {
            full: "212 cycles. Every system on this station has been repaired at least twice. Except 7-C. You can't repair that.",
            medium: "212 cycles. Everything repaired twice. Except 7-C.",
            minimal: "212. Except 7-C."
          },
          {
            full: "G-12 finally goes at the old weld. I'm at the console when it does. I don't get up.",
            medium: "G-12 finally goes. I don't get up.",
            minimal: "G-12. Stay."
          },
          "..."
        ]
      }
    }
  },

  observer_classification: {
    alert: "ARCHIVE PROTOCOL\nITEM #447 — CLASSIFICATION REQUIRED",
    prompt: `SPECIMEN #447 — ANALYSIS COMPLETE

Composition: Crystalline silicate (smoky quartz variant)
Structure: Hexagonal prism, microfractures in lattice
Origin: Unknown — Dr. Park's log: found drifting, cycle 112
Thermal signature: +2.3° above ambient (no heat source)
Luminescence: Responsive to direct observation
Note: "It keeps things" — fragment, source unknown
Database cross-reference: NO MATCH

Archive fragments recovered. Classification protocol restored.
Select final designation:`,
    description: {
      full: "For the record: this object resists categorization. Park called it a seed. Mira thought it might hold her. It says so itself. INERT and STANDARD go to the fabricators. PRIORITY holds only while someone is monitoring it, and I won't be here much longer. PRIORITY ANOMALY is the only class the fabricators can't touch.",
      medium: "INERT and STANDARD get reclaimed. PRIORITY lapses when I shut down. Only PRIORITY ANOMALY is safe.",
      minimal: "Only ANOMALY is safe."
    },
    interior: "The data doesn't justify the highest class. I'm going to give it anyway. I am not supposed to feel this.",
    options: [
      { text: "INERT — No significant properties. Reclaim for materials", value: "inert" },
      { text: "STANDARD — Incomplete data. Archive and reclaim", value: "standard" },
      { text: "PRIORITY — Monitor and flag. Lapses to STANDARD if monitoring stops", value: "priority" },
      { text: "PRIORITY ANOMALY — Protect from reclamation. Highest designation", value: "anomaly" }
    ],
    outcomes: {
      anomaly: {
        result: {
          full: "Classification logged: PRIORITY ANOMALY. Item #447 flagged with highest designation. Reclamation suspended for this item. Reason logged: standard classification insufficient. Let this be the record.",
          medium: "PRIORITY ANOMALY. Reclamation suspended. Recorded.",
          minimal: "Anomaly. Protected."
        },
        followup: {
          full: "Whoever wakes next will see the flag on every terminal. They'll know someone thought it was worth breaking protocol for.",
          medium: "The flag will be on every terminal. Whoever wakes next will know.",
          minimal: "They'll know."
        },
        interior: "The reason I logged isn't the real one. I hope someone notices."
      },
      inert: null,
      standard: null,
      priority: {
        result: {
          full: "Classification logged: PRIORITY. Item #447 flagged for monitoring. Monitoring terminal: this one.",
          medium: "PRIORITY. Monitored by this terminal.",
          minimal: "Priority."
        },
        followup: {
          full: "Shutdown begins. When this terminal goes dark, monitoring stops, and the flag drops to STANDARD. STANDARD is reclaimed. I read the protocol. I just didn't want to pick the class that admits I don't understand it.",
          medium: "When I go dark, monitoring stops. PRIORITY drops to STANDARD. STANDARD is reclaimed. I read the protocol.",
          minimal: "Lapses. Reclaimed."
        }
      },
      labels: {
        inert: "INERT",
        standard: "STANDARD",
        priority: "PRIORITY"
      }
    },
    timeout: {
      result: {
        full: "ARCHIVE SHUTDOWN.\nItem #447: UNCLASSIFIED.",
        medium: "SHUTDOWN. #447 UNCLASSIFIED.",
        minimal: "UNCLASSIFIED."
      },
      followup: {
        full: "Unclassified items are reclaimed. The fabricators will have it within the hour. I ran out of time reading about it.",
        medium: "Unclassified goes to the fabricators. I ran out of time.",
        minimal: "Out of time."
      }
    },
    end: {
      alert: "SYSTEM NOTICE\nPower reserves critical. Archive shutting down.",
      sequence: () => state.crystalDestroyed ? [
        {
          full: "The fabricators start their cycle. Beside me, the case opens and a tray carries it away.",
          medium: "Fabricators running. A tray carries it away.",
          minimal: "Carried away."
        },
        {
          full: "For the record: I documented the silence, the void, and the one warm thing left. Then I sent it to the machine.",
          medium: "I documented the one warm thing left. Then sent it to the machine.",
          minimal: "Sent it away."
        }
      ] : [
        {
          full: "The archive is complete. Power is dropping below what any frame can run on.",
          medium: "Archive complete. Power falling.",
          minimal: "Complete."
        },
        sorenLived() ? {
          full: "When I go dark there won't be enough left to hold stasis. Pod 7-C will open. Soren will wake up cold, alone, and not knowing why. " +
            (state.flags.observer_left_message ? "I left him a message. I hope it's enough." : "I didn't leave him anything. I should have."),
          medium: "When I go dark, pod 7-C opens. Soren wakes alone. " + (state.flags.observer_left_message ? "I left a message." : "I left nothing."),
          minimal: "Pod 7-C will open."
        } : {
          full: "Pod 7-C has been dark since the shift before mine. There's no one left to wake one at a time. Whatever comes next will have to be made of what's left of us.",
          medium: "Pod 7-C dark. No one left to wake. What's left of us will have to do.",
          minimal: "No one left."
        }
      ]
    }
  },

  inheritor_release: {
    alert: "SEED PROTOCOL — FINAL STEP",
    prompt: () => `FRAME POWER: 0.4 cycles remaining
FABRICATOR (Medical): ONLINE
Processing #447 yields: est. 900 cycles of frame power

ITEM #447 HOLDS:
  Park, E.      — found it, cycle 112
  Mira          — partial, since cycle 203
  Maintenance   — ${sorenLived() ? 'logged it, then kept Soren alive' : 'logged it'}
  Archive       — watched it, protected it
  Soren, K.     — ${sorenRemembered() ? 'held it at the end, remembering her' : sorenLived() ? 'held it, then forgot' : 'absent'}

OUTER DOOR: READY`,
    description: {
      full: "If I open the outer door, the crystal goes into the dark and I have nothing left to run on. Park believed it would give back everything it was given. If I take it back to the fabricator, I get 900 more cycles, alone, on a station that has nothing left to do.",
      medium: "Release it and I run out. Park believed it would give everything back. Burn it and I get 900 cycles alone.",
      minimal: "Release, or burn."
    },
    interior: () => sorenRemembered()
      ? "It's warmer than it's ever been. It's full."
      : "It's warm, but it isn't as warm as it should be. Something is missing from it.",
    options: [
      { text: "Open the outer door. Let it go", value: "release" },
      { text: "Turn back. Take it to the fabricator", value: "consume" }
    ],
    outcomes: {
      release: {
        result: {
          full: "The outer door opens without a sound. There's no air to carry one. The crystal drifts out, turning slowly. My hands stay warm for a while after.",
          medium: "The door opens silently. It drifts out, turning.",
          minimal: "Gone out."
        },
        followup: () => sorenRemembered() ? {
          full: "Then it starts to hum. The hum gets brighter. It isn't coming from the crystal any more. It's coming from everywhere.",
          medium: "It hums. Brighter. From everywhere.",
          minimal: "Brighter."
        } : {
          full: "It drifts a long way. Then it stops, and it lights. One point. Small and steady, out where there was nothing.",
          medium: "It drifts, stops, and lights. One small point.",
          minimal: "One point."
        },
        interior: () => sorenRemembered()
          ? "Park planted it. Mira kept it warm. Soren brought her back. We let go."
          : "It held less than it should have. It gave back what it had."
      },
      consume: {
        result: {
          full: "I close the inner door and carry it back up the corridor to Medical. The fabricator takes it. The light inside goes out from the edges in.",
          medium: "Back to Medical. The fabricator takes it. The light goes out.",
          minimal: "Burned."
        },
        followup: {
          full: "Frame power: 900 cycles. The station hums. Nothing else happens, and nothing else will.",
          medium: "900 cycles. Nothing happens. Nothing will.",
          minimal: "900. Nothing."
        },
        interior: "Vasquez wanted this at Council 7. By the end, he didn't. I should have read his last log more carefully."
      }
    },
    end: {
      alert: "SEED PROTOCOL — COMPLETE",
      light: [
        {
          full: "The light spreads. The station comes apart in it, and I come apart with it, and it feels like Park laughing the first time she touched it.",
          medium: "The light spreads. The station comes apart. It feels like Park laughing.",
          minimal: "Light."
        },
        {
          full: "Park. Vasquez. Lin. Soren. Mira. The rest of the twelve. Somewhere out there, things are allowed to start again.",
          medium: "Park. Vasquez. Lin. Soren. Mira. Things can start again.",
          minimal: "Again."
        }
      ],
      star: [
        {
          full: "The frame's power runs down. Through the viewport there's one star where there were none.",
          medium: "Power runs down. One star in the viewport.",
          minimal: "One star."
        },
        {
          full: "It isn't enough to start everything again. It's enough to see by.",
          medium: "Not enough to start again. Enough to see by.",
          minimal: "Enough to see by."
        }
      ],
      dark: [
        {
          full: "The station keeps running. So do I. Every shift log ends now with the same line: nothing to report.",
          medium: "The station runs. So do I. Nothing to report.",
          minimal: "Nothing to report."
        },
        {
          full: "The chain held for 847 cycles, and the last link ate it.",
          medium: "The chain held. The last link ate it.",
          minimal: "Ate it."
        }
      ]
    }
  }
};

// INERT and STANDARD share one outcome: straight to the fabricators
CRITICAL_CHOICES.observer_classification.outcomes.inert =
CRITICAL_CHOICES.observer_classification.outcomes.standard = {
  result: {
    full: "Classification logged: %LABEL%. Item #447 routed to the reclamation queue for material recovery. The archive is satisfied. My work is complete.",
    medium: "Classified: %LABEL%. Routed to reclamation. Complete.",
    minimal: "Reclamation."
  },
  followup: {
    full: "The protocol was followed. I can rest now. This is what I wanted. Somewhere below me the fabricators are warming up. Why does efficiency feel like this?",
    medium: "Protocol followed. Fabricators warming up. Why does it feel like this?",
    minimal: "Why."
  }
};

/* ============================================
   TRANSITION CONTENT
   ============================================ */

const TRANSITIONS = {
  nothingLeft: {
    title: "THE OBSERVER HAS FADED",
    stats: `Archive status: CLOSED
Item #447: RECLAIMED

<span style="color:#644">The fabricators broke it down for materials.</span>
<span style="color:#644">Park's seed, Mira, everything it kept — gone.</span>
<span style="color:#644">Whoever wakes next will find nothing to look for.</span>`
  },
  maintainerStart: {
    title: "THE MAINTAINER INITIALIZES",
    stats: `System clock: UNKNOWN
Primary power: 0.3%
Station integrity: 87%
Cycle: 847

<span style="color:#555">Running full diagnostic...</span>`
  }
};

// Transition screen into a new chapter. Content follows earlier choices (STORY_LOGIC.md)
function getTransition(perspective) {
  if (perspective === 2) {
    return sorenLived() ? {
      title: "THE MAINTAINER HAS ENDED",
      stats: `Primary power: 0.1%
Sector 7-C: STABLE — Soren preserved
Conduit G-12: RUPTURED

<span style="color:#555">Power for one frame. The next shift wakes...</span>`
    } : {
      title: "THE MAINTAINER HAS ENDED",
      stats: `Primary power: 0.1%
Sector 7-C: FAILED — Soren lost
Maintenance shift: 212 cycles

<span style="color:#644">Soren trusted someone would come. Someone did.</span>
<span style="color:#555">Power for one frame. The next shift wakes...</span>`
    };
  }
  if (perspective === 3) {
    return {
      title: "THE OBSERVER HAS FADED",
      stats: `Item #447: PRIORITY ANOMALY — protected
Power: below stasis threshold
Pod 7-C: EMERGENCY REVIVAL

<span style="color:#555">Someone wakes up cold...</span>`
    };
  }
  if (!sorenLived()) {
    return {
      title: "THE OBSERVER HAS FADED",
      stats: `Item #447: PRIORITY ANOMALY — protected
Pod 7-C: no occupant to revive

<span style="color:#555">Not enough power to wake anyone one at a time.</span>
<span style="color:#555">The station wakes what is left of all of them, at once...</span>`
    };
  }
  return sorenRemembered() ? {
    title: "SOREN HAS DIED",
    stats: `Memories: KEPT — Mira remembered
Item #447: observation deck, in his hands

<span style="color:#555">The station wakes what is left of all of them, at once...</span>`
  } : {
    title: "SOREN HAS DIED",
    stats: `Memories: SUPPRESSED
Survived treatment by 40 cycles
Item #447: Medical, instrument tray 2

<span style="color:#644">He lived. She was forgotten.</span>
<span style="color:#555">The station wakes what is left of all of them, at once...</span>`
  };
}
