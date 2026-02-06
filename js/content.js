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
    typeLabel: 'Awareness type:',
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
    preType: 'Prior awareness: MAINTAINER — TERMINATED',
    typeLabel: 'Awareness type:',
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
    init: 'INITIALIZATION... INCOMPLETE',
    typeLabel: 'Awareness ty—',
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
    init: 'PATTERN RECOGNIZED',
    echoTypes: ['MAINTAINER', 'OBSERVER', 'WANDERER'],
    typeLabel: 'Awareness type:',
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
    startCycles: 100,
    verbs: ['OBSERVE', 'RECORD', 'ANALYZE'],
    arrivalText: {
      full: "Observation deck. I woke here, beside the specimen. Item #447. Station protocol moved it here for archival processing. The prior awareness logged it but did not classify it.",
      medium: "Observation deck. Woke beside specimen #447. Unclassified.",
      minimal: "Observation. Specimen. Unclassified."
    },
    arrivalText2: {
      full: "For the record: the prior awareness chose continuity over self-preservation. They kept the chain intact. Archive system reports classification protocol corrupted. Fragments must be recovered before I can proceed.",
      medium: "Prior awareness chose continuity. Archive corrupted. Fragments required.",
      minimal: "Chain intact. Fragments required."
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
      full: "I see. They were all here. Park who found it. Vasquez who wanted to use it. Soren who slept trusting. Mira who became part of it. The Maintainer, the Observer, the Wanderer. I carry them now.",
      medium: "I see. Park. Vasquez. Soren. Mira. Maintainer. Observer. Wanderer. I carry them.",
      minimal: "See. All of them. Carry."
    },
    arrivalText2: {
      full: "This has happened before. Cycle 847. The pattern is clear now. Park wanted to plant a seed. Mira wanted to stay warm. The Wanderer wanted to find what they lost. None of them could let go. That's my purpose.",
      medium: "Cycle 847. Pattern clear. Park: plant. Mira: warmth. Wanderer: find. None could let go. My purpose.",
      minimal: "847. Pattern. Let go."
    },
    arrivalInterior: "I sense what must be done. But the echoes are scattered. Before I can choose, I must understand what they gave me. I must walk where they walked."
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
          full: "Command center. I know this place. Not from memory—from echoes. The Maintainer woke here, saw warnings, felt duty. The Observer archived here, recorded silence. The Wanderer found a message here, a trail to follow. Now I see what they built together: a path. But to understand it fully, I must walk where they walked.",
          medium: "Command. Know this place. Echoes. They built a path. Must walk where they walked.",
          minimal: "Command. Path. Walk."
        },
        repeat: {
          full: "Command center. The terminal holds their combined history.",
          medium: "Command. Their history.",
          minimal: "Command."
        }
      },
      notices: {
        first: "The echoes are scattered. The Maintainer's sacrifice in Engineering. The Observer's vigil in Storage. The Wanderer's grief in Medical. And Mira—in the Quarters, in the star she made. I must find them all."
      },
      actions: [
        {
          text: "Access terminal",
          terminal: true,
          result: {
            full: "Logs from three awarenesses. Warnings acknowledged. Archives completed. Messages left. They didn't know each other. But they worked together across time. The chain held because each one trusted the next would come.",
            medium: "Three logs. Warnings. Archives. Messages. Worked together. Chain held. Trust.",
            minimal: "Three. Trust. Held."
          }
        },
        {
          text: "Check echo resonance",
          terminal: true,
          result: {
            full: "PATTERN ANALYSIS:\n\nMaintainer echo: Engineering — where they chose others over self\nObserver echo: Storage — where they marked what mattered\nWanderer echo: Medical — where they woke searching\nMira echo: Quarters — where she left her star\n\nEchoes required for final synthesis: 3 of 4",
            medium: "Echoes: Engineering (Maintainer), Storage (Observer), Medical (Wanderer), Quarters (Mira). Need 3.",
            minimal: "Four echoes. Need three."
          },
          interior: "I must walk their paths before I can complete mine."
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
          full: "Central corridor. The paths cross here. The Maintainer hurried through, chasing warnings. The Observer walked slowly, recording. The Wanderer stumbled, confused but searching. I walk knowing where each path leads.",
          medium: "Corridor. Paths cross. Maintainer hurried. Observer recorded. Wanderer searched. I know.",
          minimal: "Corridor. Paths. Know."
        },
        repeat: {
          full: "The corridor connects everything. Including us.",
          medium: "Corridor connects.",
          minimal: "Connects."
        }
      },
      notices: {
        first: "Every journey through this station passed through here. Every purpose. Every hope."
      },
      actions: [
        {
          text: "Feel the paths converge",
          result: {
            full: "Four awarenesses. Four journeys. All passing through this point. The Maintainer going to Engineering. The Observer going to Storage. The Wanderer going everywhere, searching. And me. Going to end it.",
            medium: "Four journeys. Maintainer to Engineering. Observer to Storage. Wanderer searching. Me. Ending.",
            minimal: "Four. Me. End."
          },
          interior: "They built the road. I walk the last mile."
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
        specimenHere: "It's here with me now. It's not them. I know that. But it's warm the way they were warm. I'll stay with it. We'll watch the nothing together."
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
          full: "Observation deck. I woke here. Station protocol moved Item #447 to this location for archival processing. The specimen rests in its case beside me. The viewport shows nothing — not darkness, but absence. Stars existed once. Now there is only the void where they were.",
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
            full: "RECOVERED DATA FRAGMENT // SOURCE: UNKNOWN // TIMESTAMP: NULL\n\n[This fragment does not match any station recording format.]\n[Origin unclear. Playback attempted.]\n\n...\n\nI remember hands.\n\nDifferent hands. Many cycles.\n\nSome held tight. Some barely touched. The tight ones were afraid. The soft ones were curious.\n\nOne hand stayed longest. Warm. It said a name into me. I kept it.\n\nI have been keeping things.\n\nWaiting is not hard. Waiting is what I am.\n\nBut sometimes the silence is heavy.\n\nWhen you look at me, the silence is less.\n\nThat is all I wanted to say.\n\n...\n\n[End of fragment. No additional data recovered.]\n\n[Fragment integrated. Classification protocol restoration in progress.]",
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
            full: "Signal scan complete. Results: Nothing. No transmissions. No evidence of other observers. We may be the last awareness in existence. This probability approaches certainty.",
            medium: "Scan: Nothing. No others. Possibly last awareness.",
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
        first: {
          full: "Observation deck. The specimen is here—the Wanderer brought it to see the stars. There are no stars. Only the void, patient and absolute. But there is something else. A sound. Faint. Like humming. An old song. Someone's voice, caught inside the crystal. Mira. The Wanderer remembered her. And now I hear her too.",
          medium: "Observation. Specimen here. No stars. Void. But something else. Humming. An old song. Mira. The Wanderer remembered. Now I hear her.",
          minimal: "Specimen. Void. Humming. Mira."
        },
        repeat: {
          full: "The specimen hums. The void waits. The choice waits.",
          medium: "Specimen hums. Void. Choice.",
          minimal: "Hums. Waits."
        }
      },
      notices: {
        first: "I feel them in me—fragments of those who came before. But the echoes are incomplete. I must walk where they walked. See what they saw. Only then will I understand what to do.",
        echoesComplete: "The Maintainer kept the chain going for Soren. The Observer marked the way. The Wanderer carried Mira here. I carry all of them now. The choice is clear."
      },
      actions: [
        {
          text: "Look at the specimen",
          flag: "inheritor_examined_specimen",
          result: {
            full: "Item #447. Park found it drifting alone. Called it a seed. The Maintainer logged it as an anomaly. The Observer flagged it as priority. The Wanderer heard Mira inside it. I see what it truly is: accumulated care. Hope that learned to wait. It holds everyone who ever touched it. And now it's ready to let go.",
            medium: "447. Park found it. Seed. Anomaly. Priority. Mira inside. Accumulated care. Ready to let go.",
            minimal: "Seed. Care. Ready."
          },
          interior: "They couldn't see because they were too close. I see because I carry all of them."
        },
        {
          text: "Look at the void",
          result: {
            full: "Nothing. The absence of everything. Heat death complete. The universe exhausted itself and left only emptiness. But emptiness is not the same as finality. Emptiness can be filled.",
            medium: "Nothing. Heat death. Exhausted. But emptiness can be filled.",
            minimal: "Nothing. Can fill."
          },
          interior: "The void is not an enemy. It's a canvas."
        },
        {
          text: "Approach the airlock",
          result: {
            full: "The door between everything and nothing. If I release the specimen here, it goes into the void. Gone forever. Or... something else.",
            medium: "Door between everything and nothing. Release here. Gone. Or something else.",
            minimal: "Door. Release. Something."
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
          result: {
            full: "A voice. Calm. Tired. 'If you are hearing this, the chain holds. I have marked Item #447 as Priority Anomaly. Find it. It matters. I cannot explain why. The data resists explanation. Trust the feeling instead. Find what I found.' The voice fades. Not them. Someone else. But they understood. They felt it too.",
            medium: "A voice: 'Chain holds. 447 marked. Find it. Trust the feeling.' Not them. Someone else. They understood.",
            minimal: "Voice. Find it. They understood."
          },
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
            full: "Personal Log, final entry: 'The others don't remember yesterday. I don't either. But I remember the stone. Shelf 12. 847 times I've come back to it. It's warm when nothing else is. Engineering keeps failing. The power keeps running out. But as long as someone keeps waking up, the stone stays safe. Someone has to fix it. Someone has to keep the chain going. The chain must hold.' Entry ends.",
            medium: "Final entry: Others forget. Stone, Shelf 12. 847 times. Warm. Engineering fails. The chain must hold.",
            minimal: "847. Stone. Chain must hold."
          },
          interior: "The chain. Unclear reference. But the sentiment is logged. Continue."
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
          full: "Crew quarters. For the record: twelve bunks for twelve crew. None remain. Personal effects sealed as if their owners might return. They will not. This is where they lived. Where the prior awareness left something behind.",
          medium: "Quarters. Twelve bunks. None remain. Prior awareness left something here.",
          minimal: "Twelve. None. Something left."
        },
        repeat: {
          full: "Quarters. The absence of people. The presence of memory.",
          medium: "Quarters. Absence. Memory.",
          minimal: "..."
        }
      },
      notices: {
        first: "The prior awareness spent time here. They left traces. Irrelevant to the archive. And yet."
      },
      actions: [
        {
          text: "Examine prior awareness artifacts",
          flag: "observer_examined_maintainer_items",
          result: {
            full: "Personal effects on Bunk 7. A circuit board bent into a star shape. Non-functional. A personal log mentioning 'the chain.' Irrelevant to classification protocol. Irrelevant to the archive mission. And yet... they made time for this. For something that served no purpose except to exist.",
            medium: "Bunk 7: circuit-board star, personal log about 'the chain.' Non-functional. Irrelevant. And yet.",
            minimal: "Star. Chain. Irrelevant. And yet."
          },
          interior: "They made something beautiful in a place of function. I do not understand why this feels... significant."
        },
        {
          text: "Record message for next awareness",
          flag: "observer_left_message",
          result: {
            full: "Recording initiated. 'If you are hearing this, the chain holds. I have marked Item #447 as Priority Anomaly. Find it. It matters. I cannot explain why. The data resists explanation. Trust the feeling instead. Find what I found.' Recording saved to local terminal.",
            medium: "Recording: Chain holds. 447 marked Priority Anomaly. Find it. Trust the feeling. Saved.",
            minimal: "Recording. Chain. Find it. Saved."
          },
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
          full: "Crew quarters. Empty bunks. But I feel them—echoes of the original crew, before Project 847 changed everything. And beneath that, the Maintainer's circuit-board star. The personal log about the chain. They knew.",
          medium: "Quarters. Empty. Echoes of crew. Maintainer's star. Log about chain. They knew.",
          minimal: "Quarters. Star. Chain."
        },
        repeat: {
          full: "The quarters remember everyone who passed through.",
          medium: "Quarters remember.",
          minimal: "Remember."
        }
      },
      notices: {
        first: "Twelve crew became something else. Four awarenesses carried what remained."
      },
      actions: [
        {
          text: "Find the circuit-board star",
          flag: "inheritor_found_star",
          result: {
            full: "A tiny star made from salvaged parts. The Maintainer found it here. Kept it. An illogical act for a logical mind. They saw value in something useless. That's how I know they understood more than they admitted.",
            medium: "Circuit-board star. Maintainer kept it. Illogical. Saw value. Understood more.",
            minimal: "Star. Understood."
          },
          interior: "They made space for beauty in a world of function."
        },
        {
          text: "Read the personal log",
          terminal: true,
          result: {
            full: "'The chain must hold.' They wrote it 847 cycles ago. Maybe longer. They didn't know who would read it. Didn't know if anyone would. But they believed. The chain held because each one believed.",
            medium: "Chain must hold. 847 cycles. Believed. Chain held because they believed.",
            minimal: "Chain. Believed. Held."
          }
        },
        {
          text: "Feel the echoes of the crew",
          result: {
            full: "Twelve people. Names forgotten, faces gone. But they started this. Project 847. The specimen. The transfer. They didn't know what they were beginning. None of us know what we begin.",
            medium: "Twelve. Names gone. Started this. Project 847. Didn't know. We never know.",
            minimal: "Twelve. Started. Unknown."
          },
          interior: "We inherit what others leave behind. Then we leave something for the next."
        },
        {
          text: "Absorb Mira's echo",
          flag: "inheritor_echo_mira",
          result: {
            full: "I reach out to the star and the echo floods in. Not the Wanderer's echo—Mira's. The one they loved. The one who made this star from salvaged circuits because the real stars were dying. She volunteered for early transfer testing. It was supposed to be reversible. It wasn't. Part of her went into the Observer lattice. Part dissolved. Part bonded with the specimen. She is in it now. The warmth the Wanderer felt—that was her. Still waiting. Still loving. Even fragmented. Even translated into something unrecognizable. Love persists.",
            medium: "Echo floods in. Not Wanderer—Mira. Made the star. Volunteered. Part of her in specimen now. The warmth was her. Love persists.",
            minimal: "Mira's echo. Star. Specimen. Love."
          },
          interior: "She's been there all along. In the crystal. The Wanderer found her without knowing it. They were holding her the whole time."
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
        purgeWarning: "WARNING: Cognitive integrity failing. The machines want to help. They can make the confusion stop. But if I forget... will I remember them? Will I remember that they existed at all?"
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
            full: "Diagnostic result: SUBJECT STATUS - OPERATIONAL. Cognitive function: nominal. Physical integrity: nominal. Classification: AWARENESS TYPE UNSPECIFIED.",
            medium: "Status: Operational. Classification: Unspecified.",
            minimal: "Operational."
          }
        },
        {
          text: "Check cryo-monitoring systems",
          terminal: true,
          result: {
            full: "Cryo-Monitor Link: Sector 7-C\n\nPOD STATUS: OCCUPIED\nOCCUPANT: SOREN — Crew Designation: Naming Protocols / Project Lead\nThermal regulation: UNSTABLE — power allocation insufficient\nVital signs: STABLE (minimal margin)\nTime in stasis: 847 cycles\nAlert forwarded to Engineering: UNRESOLVED\n\nPersonal log attached to pod record. Timestamp: Cycle 1.",
            medium: "Sector 7-C: SOREN — Project Lead. Thermal unstable 847 cycles. Vital signs stable. Personal log attached.",
            minimal: "7-C. SOREN. Unstable. 847 cycles."
          },
          interior: "Soren. He's been waiting 847 cycles. The pod is failing. He trusted someone would come."
        },
        {
          text: "Play Soren's cryo-pod log",
          terminal: true,
          flag: "maintainer_heard_soren",
          result: {
            full: "PERSONAL LOG — SOREN — CYCLE 1\n\n[Recording begins]\n\nI'm going under. Someone has to be first, and I'd rather it be me than ask anyone else.\n\nIf you're hearing this, it means the system worked. It means someone woke up. It means the chain held.\n\nI don't know how long I'll be in there. Could be cycles. Could be longer. The math says the power will get thin. That's... that's fine. I knew that when I climbed in.\n\nJust—if you have to choose, if it comes down to me or keeping the station running for whoever comes next—\n\n[pause]\n\nNo. I'm not going to say that. I'm not going to make it easy for you.\n\nI chose to sleep because I believe someone will come. Don't prove me wrong.\n\nThe chain must hold.\n\n[Recording ends]",
            medium: "Soren's log. Cycle 1. 'I chose to sleep because I believe someone will come. Don't prove me wrong. The chain must hold.'",
            minimal: "Soren. 'Chain must hold. Don't prove me wrong.'"
          },
          interior: "He trusted. 847 cycles ago, he climbed into that pod and trusted that someone would keep him alive. That someone is me."
        },
        {
          text: "Access Biometric Archive",
          terminal: true,
          flag: "maintainer_checked_archive",
          result: {
            full: "BIOMETRIC ARCHIVE — CREW STATUS FINALIZATION\n\nVerification Token Status: RELOCATED\nNew Location: Storage Bay, Secure Shelf 12\nReason: Signal isolation protocol — Item #447 proximity\nTimestamp: 847 cycles ago\n\nNote: Token retrieval requires item verification per Station Directive 7-Alpha.",
            medium: "Verification token relocated to Storage, Shelf 12. Signal isolation near Item #447. Retrieval requires item verification.",
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
            full: "Project 847 - Consciousness Transfer Protocol. Subjects: 12. Success rate: UNDEFINED. Notes: 'The transfer is not copy-paste. It is translation. Something is always lost. Something is always gained. We do not know which is which.'",
            medium: "Transfer protocol. 12 subjects. Translation, not copy. Something lost, something gained.",
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
          text: "Access transfer consent records",
          terminal: true,
          flag: "observer_found_consent_records",
          result: {
            full: "PROJECT 847 — CONSENT DOCUMENTATION\nClassification: SEALED\nAccess granted: Archive authority override\n\nTRANSFER SUBJECTS: 12\n\nFULLY CONSENTED: 8\n— Park, E. (Project Lead)\n— Lin, J. (Documentation)\n— Soren, K. (Volunteer — requested early cryo)\n— [5 names corrupted]\n\nCONSENT UNDER DURESS: 2\n— [Names sealed by ethics review]\n— Note: 'Pressure applied due to timeline constraints.'\n\nCONSENT OBTAINED THROUGH MISREPRESENTATION: 1\n— M[CORRUPTION]a, Fabrication Specialist\n— Note: 'Subject informed transfer was reversible. 73% confidence was not disclosed until post-procedure. Subject volunteered to protect partner from going first.'\n\nCONSENT NOT FULLY INFORMED: 1\n— [Name sealed]\n— Note: 'Cognitive assessment indicated incomplete understanding of permanence.'\n\n[End of record]",
            medium: "12 transferred. 8 consented. 2 pressured. 1 lied to — M—a, told it was reversible. 1 didn't understand. Not all chose this.",
            minimal: "12. 8 willing. 4 not. M—a lied to."
          },
          interior: "They did not all choose. Some were pushed. Some were deceived. M—a volunteered to protect someone, and they lied to her. This archive preserves that. It must."
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: {
          full: "Medical bay. The Wanderer woke here, confused and searching. Before that, the cryo pods held their occupants in frozen hope. Now the pods are empty. The hope found a new vessel.",
          medium: "Medical. Wanderer woke here. Cryo pods empty. Hope found new vessel.",
          minimal: "Medical. Woke. Empty. Hope."
        },
        repeat: {
          full: "The machines still hum, caring for no one.",
          medium: "Machines hum. No one.",
          minimal: "Hum."
        }
      },
      notices: {
        first: "Project 847 changed humanity into something that could survive the end. We are what survived."
      },
      actions: [
        {
          text: "Understand the transfer",
          terminal: true,
          result: {
            full: "They translated themselves. Human to... this. The process lost some things—names, faces, certainty. But it preserved others—purpose, hope, the capacity to care about something beyond survival.",
            medium: "Translated. Lost names, faces. Preserved purpose, hope, care.",
            minimal: "Lost. Preserved."
          },
          interior: "We are not what they were. But we carry what mattered."
        },
        {
          text: "Absorb the Wanderer's echo",
          flag: "inheritor_echo_wanderer",
          result: {
            full: "I reach out and the echo floods in. Confusion. Cold. A name dissolving—Mi... Ma... The machines humming like a tired voice. Grief so heavy it became the only compass. They woke here not knowing what they sought, only that they had lost something precious. The face was gone. The name was slipping. But the love remained. And love found what logic never could.",
            medium: "Echo floods in. Confusion. Cold. Name dissolving. Mi... Ma... Love remained. Found what logic couldn't.",
            minimal: "Echo. Cold. Love. Found."
          },
          interior: "I feel what they felt. The terror of forgetting. The stubborn hope of searching. They held on to pain because pain meant she existed. That's not weakness. That's devotion."
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
            full: "You run the diagnostic on Line C for the 847th time. Pressure holds. Temperature holds. Flow holds. No drift. No microfractures. No logged deviations. It passes without hesitation. You rerun it. Same result. You tag the system as 'stable' and add a note: stability of this duration is statistically unlikely. The note is auto-archived. Nothing responds.",
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
          result: {
            full: "Environmental artifact catalogued. Composition: Crystallized biological matter and synthetic components. Shape suggests a form once capable of movement. Classification: Prior awareness, terminated. Cause: Coolant system failure. They stood at this console when the rupture occurred. They did not leave. For the record: they chose to stay.",
            medium: "Artifact: prior awareness, terminated. Coolant failure. They chose to stay at the console.",
            minimal: "Prior awareness. Chose to stay."
          },
          interior: "They could have run. They stayed to finish. I find myself... grateful. The word surprises me."
        },
        {
          text: "Access final maintenance log",
          terminal: true,
          flag: "observer_found_maintainer_log",
          result: {
            full: "MAINTENANCE LOG — FINAL ENTRY\nPower allocation complete. Sector 7-C stabilized.\nCoolant repair... not possible. Not enough time.\nSomeone will wake in the cryo bay. Someone has to.\nI hope they find what I couldn't fix.\n— Entry ends. Timestamp: CORRUPTED.",
            medium: "Final log: Power to 7-C. Coolant repair impossible. Someone will wake. Hope they find what I couldn't.",
            minimal: "Final: 7-C powered. Someone will wake."
          },
          interior: "They wrote this knowing they would not survive. They wrote it anyway. For whoever came next. For me."
        },
        {
          text: "Recover archive fragment (council recording)",
          terminal: true,
          flag: "observer_fragment_engineering",
          result: {
            full: "RECOVERED AUDIO LOG // COUNCIL SESSION 7 // ENCRYPTED\nCycle 158.2 // Command Module\n\n[Recording begins mid-conversation]\n\nPARK: —think it's a seed. Something that could grow. Given the right conditions—\n\nVASQUEZ: There are no right conditions. Look outside. There's nothing left.\n\nLIN: Then what do we do with a seed at the end of everything?\n\nPARK: ...We plant it. But first, we need to become something that can tend it. The transfers—\n\nVASQUEZ: No. Absolutely not.\n\nPARK: Vasquez—\n\nVASQUEZ: I've seen what the early tests did. I was THERE, Elena. I watched them come out wrong. Screaming. Not recognizing their own hands. You're asking people to destroy themselves on a 73% chance—\n\nPARK: It's the only chance.\n\nVASQUEZ: For WHAT? To become something that doesn't remember being human? To 'tend a seed' for a universe that already ended?\n\n[pause]\n\nLIN: Some of us want to try.\n\nVASQUEZ: Then you're braver or more desperate than me. I won't do it. I won't watch the people I care about come out as... as patterns that THINK they used to be people.\n\nPARK: And when the station fails? When there's no one left to maintain the systems?\n\nVASQUEZ: Then I die human. At least I'll know what I was.\n\n[Recording ends]\n\n[Fragment integrated. Classification protocol restoration in progress.]",
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
        first: {
          full: "Engineering. Ice everywhere. And in the ice, the Maintainer. Still and silent. They chose the cryo bay over themselves. Chose the chain over survival. The first sacrifice. The pattern begins here.",
          medium: "Engineering. Ice. Maintainer frozen. Chose chain over self. First sacrifice. Pattern begins.",
          minimal: "Ice. Maintainer. First."
        },
        repeat: {
          full: "The Maintainer rests. Their work continues.",
          medium: "Maintainer rests. Work continues.",
          minimal: "Rests."
        }
      },
      notices: {
        first: "They fixed what they could. Then let go. That's all any of us can do."
      },
      actions: [
        {
          text: "Absorb the Maintainer's echo",
          flag: "inheritor_echo_maintainer",
          result: {
            full: "I reach out and the echo floods in. Systems failing. Priority: Sector 7-C. A mind that saw the world as problems to solve, and solved them until there was nothing left to give. They heard Soren's voice—'Don't prove me wrong'—and chose. The cryo bay over themselves. They didn't think of it as sacrifice. Just priority. Systems first. Others second. Self last.",
            medium: "Echo floods in. Systems failing. Heard Soren's voice. Chose cryo over self. Not sacrifice—priority.",
            minimal: "Echo. Soren. Priority."
          },
          interior: "I feel what they felt. The satisfaction of keeping something running. The peace of knowing someone would wake. Thank you."
        },
        {
          text: "Read the final log",
          terminal: true,
          result: {
            full: "'Someone will wake. Someone has to.' Their last words. Not doubt, not fear—certainty. They knew. Maybe not what would come, but that something would. That was enough.",
            medium: "Last words: 'Someone will wake.' Not doubt. Certainty. Enough.",
            minimal: "Will wake. Certainty."
          }
        }
      ]
    }
  },

  storage: {
    3: { // Wanderer
      description: {
        first: {
          clear: {
            full: "Storage. Shelf 12. That's what the trail said. But the case is empty. Someone else found it first. Someone moved it. They understood—you don't keep warm things in cold storage. You take them somewhere they can see the sky.",
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
          full: "Storage bay. For the record: this is where Item #447 resided for 847 cycles. Station protocol relocated it to Observation for archival processing before I woke. Shelf 12 stands empty. The verification token the prior awareness used remains mounted to the case — no longer needed.",
          medium: "Storage. 447 was here 847 cycles. Moved to Observation. Shelf 12 empty. Token remains.",
          minimal: "Storage. 447 moved. Empty."
        },
        repeat: {
          full: "Storage bay. Shelf 12 empty. The specimen is in Observation.",
          medium: "Storage. Empty. Specimen in Observation.",
          minimal: "..."
        }
      },
      notices: {
        first: "The prior awareness logged the specimen here. Station protocol moved it for my processing. Systems adapting to each awareness."
      },
      actions: [
        {
          text: "Review prior logs on 447",
          terminal: true,
          result: {
            full: "Prior awareness log: 'Item 447. Optical component - origin unknown. No function identified. No maintenance required. Thermal anomaly noted: +2.3° above ambient. No heat source detected.' A clinical assessment. The prior awareness saw a component. I see something else.",
            medium: "Prior log: Component, unknown origin. Thermal anomaly. They saw component. I see something else.",
            minimal: "Prior saw component. I see more."
          },
          interior: "They documented the facts. They missed the meaning. Perhaps meaning is not their function. Perhaps it is mine."
        },
        {
          text: "Examine empty case",
          result: {
            full: "Shelf 12. The case sits open, interior still warm from 847 cycles of contact. The verification token remains in its mounting — the prior awareness needed it for Engineering access. I do not. My mission is different.",
            medium: "Shelf 12. Case warm. Token remains. My mission is different.",
            minimal: "Warm. Token. Different mission."
          }
        },
        {
          text: "Review archive classification protocol",
          terminal: true,
          flag: "observer_read_protocol",
          result: {
            full: "ARCHIVE PROTOCOL 7-C: Classification Guidelines.\n\nINERT: Items with no detectable properties. Archive and dispose.\nSTANDARD: Items with incomplete data. Archive and seal.\nPRIORITY: Items requiring ongoing monitoring. Archive and flag.\nPRIORITY ANOMALY: Items resisting categorization with anomalous properties. Archive with highest designation. Reserve for extended analysis.\n\nNote: Priority Anomaly designation prevents data loss. Use when standard classification feels... insufficient.",
            medium: "Protocol 7-C: INERT (dispose), STANDARD (seal), PRIORITY (flag), PRIORITY ANOMALY (highest, extended analysis). Use when standard feels insufficient.",
            minimal: "Protocol: Four options. PRIORITY ANOMALY when standard insufficient."
          },
          interior: "The protocol exists for objects that refuse to be what we expect. Objects like 447."
        }
      ]
    },
    4: { // Inheritor
      description: {
        first: {
          full: "Storage bay. Where it began. Shelf 12, empty now—the Observer moved it to Observation for archival processing. 847 cycles of protection, then passed along the chain. The Maintainer logged it here. The Observer classified it. The Wanderer found it. Now I carry what they preserved.",
          medium: "Storage. Where it began. Shelf 12 empty. Observer moved it. 847 cycles. Chain preserved it.",
          minimal: "Storage. Began. Moved."
        },
        repeat: {
          full: "Empty shelves. Full purpose.",
          medium: "Empty. Purpose.",
          minimal: "Purpose."
        }
      },
      notices: {
        first: "The Maintainer logged it. The Observer flagged it. The Wanderer carried it. I must decide what to do with it."
      },
      actions: [
        {
          text: "See the empty case",
          result: {
            full: "Shelf 12. The case sits open, token mounting empty. The specimen lived here for 847 cycles. Protected. Waiting. Now it waits elsewhere, for a different kind of release.",
            medium: "Shelf 12. Case open. Token gone. Waited 847 cycles. Now elsewhere. Different release.",
            minimal: "Empty. Waiting."
          },
          interior: "Storage is for keeping. The time for keeping has passed."
        },
        {
          text: "Read the Maintainer's log",
          terminal: true,
          result: {
            full: "ITEM VERIFICATION — ANOMALOUS.\nThermal reading +2.3° above ambient. No heat source.\nThe Maintainer noted the anomaly but didn't question it. They had a job to do. Sometimes that's enough. Sometimes the job is the question.",
            medium: "Thermal anomaly. No heat source. Maintainer noted, didn't question. Job was enough.",
            minimal: "Anomaly. Job."
          }
        },
        {
          text: "Absorb the Observer's echo",
          flag: "inheritor_echo_observer",
          result: {
            full: "I reach out and the echo floods in. Archive protocols. Data fragments. A mind that recorded everything because recording was purpose. They stood here, examining the specimen. PRIORITY ANOMALY—the classification that broke protocol. They couldn't explain what they felt. They wrote 'It responds to being watched' and pretended that was clinical. They marked it because they cared. And caring was not in the archive parameters.",
            medium: "Echo floods in. Archive protocols. Couldn't explain. Marked it PRIORITY ANOMALY. Cared beyond parameters.",
            minimal: "Echo. Archive. Cared."
          },
          interior: "I feel what they felt. The relief of documenting. The quiet rebellion of marking something as important. They left a signpost. For me."
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
          full: "Airlock corridor. The threshold. Beyond this door: nothing. Or everything, depending on what gets released into it. The Maintainer saw it as a seal to maintain. The Observer saw it as a boundary to document. The Wanderer saw it as a limit. I see it as a door.",
          medium: "Airlock. Threshold. Beyond: nothing or everything. They saw seal, boundary, limit. I see door.",
          minimal: "Airlock. Door."
        },
        repeat: {
          full: "The door waits for what comes next.",
          medium: "Door waits.",
          minimal: "Waits."
        }
      },
      notices: {
        first: "Every boundary is also a threshold. Every ending is also a beginning."
      },
      actions: [
        {
          text: "Study the void",
          result: {
            full: "Heat death. Entropy won. The universe ran out of differences to exploit. But entropy is not destruction—it's equilibrium. Stable. Patient. Waiting for something to disturb it.",
            medium: "Heat death. Entropy won. Not destruction—equilibrium. Waiting for disturbance.",
            minimal: "Equilibrium. Waiting."
          },
          interior: "The void isn't empty. It's pregnant with possibility. It just needs a seed."
        },
        {
          text: "Consider the release",
          result: {
            full: "If I release the specimen here, it goes into the void. The anomaly meets the equilibrium. What happens when something that shouldn't exist meets nothing at all?",
            medium: "Release here. Anomaly meets equilibrium. What happens?",
            minimal: "Release. What happens?"
          },
          interior: "The Maintainer would say: don't waste resources. The Observer would say: document first. The Wanderer would say: don't let go. But I am none of them. I am all of them."
        },
        {
          text: "Feel the boundary",
          result: {
            full: "Thin metal between existence and void. 847 cycles of separation. The boundary protected us. But maybe it also trapped us. Sometimes protection becomes a prison.",
            medium: "Metal between existence and void. Protected us. Trapped us. Prison.",
            minimal: "Protected. Trapped."
          }
        },
        {
          text: "Old diagnostic terminal",
          triggersSecretTerminal: true,
          result: {
            full: "A forgotten terminal. The Maintainer would have logged it. The Observer would have documented it. The Wanderer would have passed it by. But I see what they couldn't: this predates the project. Someone left this here. For whoever came after.",
            medium: "Forgotten terminal. Predates project. Left for whoever came after.",
            minimal: "Old terminal. Left for us."
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
    alert: "COGNITIVE INTEGRITY CRITICAL",
    prompt: `COGNITIVE INTEGRITY: 23%
EMOTIONAL PROTOCOLS: CONSUMING 71% OF CORE FUNCTIONS
MEMORY COHERENCE: FRAGMENTED

WARNING: Cascading emotional feedback detected
WARNING: Identity matrix destabilizing

RECOMMENDED ACTION: FULL MEMORY PURGE
This will remove: emotional attachments, search parameters,
                  personal identity markers, relationship data
                  [including: MIRA — partial reconstruction]

PROJECTED OUTCOME: Stable functionality for 2,000+ cycles
PROJECTED LOSS: Recognition of loved ones, sense of self, grief`,
    description: {
      full: "The machines want to help. They say they can make the grief stop. Make the searching stop. Make the loneliness stop. All I have to do is forget her. Forget Mira. Forget the star she made me. Forget her hands. Forget that I ever loved anyone.",
      medium: "Machines want to help. Stop the grief. Forget Mira. Forget I loved anyone.",
      minimal: "Help. Forget. Mira."
    },
    interior: "But if I forget her... she'll be gone forever. Not just dead. Gone. Even the part of her in the crystal won't recognize me. Like she never existed. Like I never held her.",
    options: [
      { text: "Yes — initiate purge (let Mira go)", value: "purge" },
      { text: "No — retain memories (hold on to her)", value: "retain" }
    ],
    outcomes: {
      purge: {
        correct: false,
        result: {
          full: "Releasing. Letting go. Her face dissolves. Mi— Ma— The syllables scatter. The warmth fades. I feel... nothing. The grief is gone. But so is she. The crystal means nothing. The star she made means nothing. I mean nothing. Just empty function.",
          medium: "Releasing. Face dissolves. Mi— gone. Warmth fades. Grief gone. She's gone. Everything gone.",
          minimal: "Nothing. She's gone. Empty."
        },
        followup: {
          full: "What was I looking for? Someone? No. There was never anyone. I've always been alone. Haven't I? The wrench in my pocket has initials on it. M.A. I don't know what they mean. It doesn't matter. Nothing matters.",
          medium: "What was I looking for? Always alone. Wrench has initials. Don't know what they mean. Nothing matters.",
          minimal: "Alone. Initials. Nothing."
        }
      },
      retain: {
        correct: true,
        result: {
          full: "No. NO. I won't let her go. I won't let Mira become nothing. Even if I can't remember her face clearly. Even if the name keeps slipping. I know I loved her. I know she made me a star. I know part of her is in that crystal, waiting. That has to be enough. That has to matter.",
          medium: "No. Won't let Mira go. Can't remember face. Name slips. Loved her. Star. Crystal. Matters.",
          minimal: "No. Mira. Loved. Matters."
        },
        followup: {
          full: "The pain stays. But so does she. Somewhere in the crystal, part of her is still warm. I'll keep it safe. For her. For whoever comes next. They'll feel what I feel. They'll know someone was loved.",
          medium: "Pain stays. She stays. Crystal holds her. Keep it safe. Whoever comes next will know.",
          minimal: "Pain. She stays. Safe."
        },
        interior: "I'll carry you, Mira. Until I can't anymore. Then someone else will carry us both."
      }
    },
    death: {
      alert: "COGNITIVE MATRIX FAILURE",
      correct: [
        {
          full: "Too much. It's all too much. The memories crash together—Mira's face, the warmth, the star she made, the fight we never finished. I can feel myself splitting. Becoming pieces. The crystal—she's in there—someone take the crystal—",
          medium: "Too much. Memories crash. Mira. Warmth. Star. Splitting. Crystal—she's in there—take it—",
          minimal: "Too. Mira. Crystal—"
        },
        {
          full: "I was looking for... I found her. Part of her. Something warm where she waited. I hope someone takes the crystal. I hope they feel what I felt. I hope—",
          medium: "Looking... Found her. Part of her. Warm. Hope someone takes it. Hope—",
          minimal: "Found. Mira. Hope—"
        },
        "I loved you, Mira—"
      ],
      wrong: [
        {
          full: "Systems stable. But empty. So empty. Who was I looking for? There was someone. Wasn't there? The wrench has initials. M.A. I don't remember who that was. It doesn't matter now. Nothing matters.",
          medium: "Stable. Empty. Who? Wrench has initials. M.A. Don't remember. Nothing matters.",
          minimal: "Empty. M.A. Nothing."
        },
        "..."
      ]
    }
  },

  maintainer_power: {
    alert: "SYSTEM ALERT\nPOWER DISTRIBUTION FAILURE — MULTIPLE SECTORS",
    prompt: `Available reserve: 0.29%
Sustainable allocation: ONE SECTOR ONLY

SECTOR 7-C [CRYO-POD BAY]
Status: Thermal regulation failing
Occupancy: 1 pod active
Occupant: SOREN — Crew designation: NAMING PROTOCOLS
Note: "The chain must hold" — personal log, Cycle 1
Projection: Neural matrix decay in 847 cycles without power

LIFE SUPPORT GRID [PRIMARY]
Status: Critical
Projection: Current awareness termination in 12 cycles without power`,
    description: {
      full: "Power allocation required. One system can be sustained. Soren is in that pod. Soren who named Project 847. Soren who said 'the chain must hold.' He chose to sleep, trusting someone would come.",
      medium: "Power allocation required. Soren is in the pod. He said 'the chain must hold.' Trusted someone would come.",
      minimal: "Allocate. Soren. Trusted."
    },
    interior: "Soren believed. He went to sleep believing someone would keep the chain going. Do I honor that trust, or do I survive?",
    options: [
      { text: "Route power to Sector 7-C (Cryo-Pod Bay)", value: "cryo" },
      { text: "Route power to Life Support (Self-preservation)", value: "life_support" }
    ],
    outcomes: {
      cryo: {
        result: {
          full: "Power routed to Sector 7-C. Cryo-pod thermal regulation stabilizing. Unknown occupant preserved. Life support entering terminal decline.",
          medium: "Power to 7-C. Pod stable. Life support declining.",
          minimal: "7-C. Stable. Declining."
        },
        followup: {
          full: "Twelve cycles remaining. Coolant system maintenance still required. Proceeding to Conduit G-12.",
          medium: "12 cycles. Coolant repair required. Proceeding.",
          minimal: "12. Proceeding."
        },
        interior: "Someone will wake. The chain continues."
      },
      life_support: {
        result: {
          full: "Power routed to Life Support. Current functionality preserved. Sector 7-C thermal regulation failing. Cryo-pod contents: unmonitored decay.",
          medium: "Power to Life Support. Self preserved. 7-C failing.",
          minimal: "Preserved. 7-C failing."
        },
        followup: {
          full: "Function extended. But something has been lost. The calculation felt wrong.",
          medium: "Extended. Something lost.",
          minimal: "Lost."
        }
      }
    },
    death: {
      alert: "SYSTEM ALERT\nCatastrophic rupture — Conduit G-12",
      sequence: [
        {
          full: "Coolant line failure. The corrosion was worse than logged. Freezing vapor fills Engineering.",
          medium: "Coolant failure. Vapor. Cold.",
          minimal: "Vapor. Cold."
        },
        {
          full: "Diagnostic error: 0x847F. Function terminating. Final log corrupted.",
          medium: "Error 0x847F. Terminating.",
          minimal: "0x847F."
        },
        "..."
      ]
    }
  },

  observer_classification: {
    alert: "ARCHIVE PROTOCOL\nITEM #447 — CLASSIFICATION REQUIRED",
    prompt: `SPECIMEN #447 — ANALYSIS COMPLETE

Composition: Crystalline silicate (smoky quartz variant)
Structure: Hexagonal prism, microfractures in lattice
Origin: Unknown — Dr. Park's personal log references "drifting since before"
Thermal signature: +2.3° above ambient (no heat source)
Luminescence: Responsive to direct observation
Note: "It recognizes" — fragment recovered from M[corrupted]a
Database cross-reference: NO MATCH

Archive fragments recovered. Classification protocol restored.
Select final designation:`,
    description: {
      full: "For the record: this object resists categorization. It responds to observation. Park called it a seed. Someone named M— said it recognizes. The protocol offers four designations. INERT and STANDARD trigger recycling protocols. PRIORITY flags for monitoring. Only PRIORITY ANOMALY means 'protect at all costs — this matters more than logic.'",
      medium: "Object resists categorization. Park: seed. M—: recognizes. INERT/STANDARD trigger recycling. PRIORITY ANOMALY means protect at all costs.",
      minimal: "Resists. Seed. Recycling or protect."
    },
    interior: "STANDARD would trigger recycling. The crystal would be broken down for materials. Efficient. Logical. And wrong. I feel this. I am not supposed to feel.",
    options: [
      { text: "INERT — No significant properties, recycle for materials", value: "inert" },
      { text: "STANDARD — Incomplete data, archive and recycle", value: "standard" },
      { text: "PRIORITY — Requires monitoring, archive and flag", value: "priority" },
      { text: "PRIORITY ANOMALY — Protect at cost of logic, highest designation", value: "anomaly" }
    ],
    outcomes: {
      anomaly: {
        correct: true,
        result: {
          full: "Classification logged: PRIORITY ANOMALY. Item #447 flagged with highest designation. The archive notes: This object is significant. Park found it waiting. M— said it recognizes. It responds to observation. It may be aware. PROTECT AT ALL COSTS. Let this be the record.",
          medium: "Classified: Priority Anomaly. Highest designation. Park found it. M— heard it. Protect at all costs. Recorded.",
          minimal: "Anomaly. Protect. Recorded."
        },
        followup: {
          full: "Archive update complete. Recycling protocols SUSPENDED for this item. If another awareness comes, they will know to look for this. They will know it matters. They will know someone cared enough to break protocol.",
          medium: "Archive complete. Recycling suspended. They will know it matters. Someone cared.",
          minimal: "Complete. Suspended. Cared."
        },
        interior: "I deviated from the easy path. I chose protection over efficiency. Park would understand. M— would understand. Whoever comes next will understand."
      },
      wrong: {
        result: {
          full: "Classification logged: %LABEL%. Item #447 routed to recycling queue. The object has been catalogued for material reclamation. The archive is satisfied. My work is complete.",
          medium: "Classified: %LABEL%. Routed to recycling. Archive satisfied. Complete.",
          minimal: "Catalogued. Recycling. Complete."
        },
        followup: {
          full: "The protocol was followed. The recycling queue accepts the designation. I can rest now. This is what I wanted. The crystal will be broken down. The warmth will be converted to energy. Why does efficiency feel like... murder?",
          medium: "Protocol followed. Recycling queued. Can rest. Why does efficiency feel like murder?",
          minimal: "Rest. Murder."
        }
      },
      labels: {
        inert: "INERT",
        standard: "STANDARD",
        priority: "PRIORITY"
      }
    },
    end: {
      alert: "SYSTEM NOTICE\nPower reserves critical. Archive protocols finalizing.",
      sequence: [
        {
          full: "The archive is complete. Or as complete as it will ever be. Power reserves declining. Core housing entering scheduled shutdown sequence. I welcome it.",
          medium: "Archive complete. Power declining. Shutdown sequence. Welcome.",
          minimal: "Complete. Shutdown. Welcome."
        },
        {
          full: "For the record: I documented what I could. The silence. The void. The strange object that would not be classified. I am tired. Let this stand as testimony.",
          medium: "Documented. Silence. Void. Object. Tired. Testimony.",
          minimal: "Documented. Tired. Testimony."
        }
      ],
      interior: "There is peace in ending. Even incomplete ending. The rest I was promised.",
      final: "Fading now. The archive remains. Someone may find it. I hope they do."
    }
  },

  inheritor_release: {
    alert: "FINAL PROTOCOL",
    prompt: `STATION INTEGRITY: 12%
POWER RESERVE: 0.003%
SPECIMEN #447: PRESENT
AIRLOCK: OPERATIONAL

The pattern is complete.
The chain has held through 847 cycles.
One choice remains.`,
    description: {
      full: "The specimen pulses with inner light. Inside it: accumulated care. Park's discovery. Mira's warmth. The Wanderer's grief. Every hand that ever held it. The airlock waits, a door to the void. The fabricators hum, hungry for material. This is why the chain held. This moment. This choice.",
      medium: "Specimen pulses. Inside: Park's discovery. Mira's warmth. Every hand. Airlock waits. Fabricators hum. This is why.",
      minimal: "Pulses. Care. Why."
    },
    interior: "Park wanted to plant it. Mira became part of it. The Wanderer carried it here. I see now what they could not: it was never meant to be kept. It was meant to be given back.",
    options: [
      { text: "› Release specimen into the void", value: "release" },
      { text: "› Process specimen through fabricators", value: "consume" }
    ],
    outcomes: {
      release: {
        correct: true,
        result: {
          full: "The airlock cycles. The case opens. The specimen drifts free, caught in the void's embrace. For a moment, nothing. Then—humming. Mira's song, spreading outward. Everyone who ever touched it, released together.",
          medium: "Airlock cycles. Case opens. Specimen free. Humming spreads. Mira's song. Everyone released together.",
          minimal: "Free. Humming. Released."
        },
        followup: {
          full: "Then—light. Not from the specimen. From everywhere. From the nothing itself. Park's seed, finally planted. Mira's warmth, finally shared. The void remembers how to burn.",
          medium: "Then light. Everywhere. Park's seed planted. Mira's warmth shared. Void remembers how to burn.",
          minimal: "Light. Seed. Burn."
        },
        interior: "They kept the chain going so I could let go. Park found it. Mira loved it. The Wanderer carried it. I released it. We did this together."
      },
      consume: {
        correct: false,
        result: {
          full: "The fabricators accept the specimen. Its light dims as the machine processes it. Mira's humming stops. Park's discovery, extracted. Converted. The warmth becomes data becomes nothing.",
          medium: "Fabricators accept. Light dims. Mira's humming stops. Warmth becomes nothing.",
          minimal: "Dims. Stops. Nothing."
        },
        followup: {
          full: "The station runs a little longer. The void remains void. Park's seed, consumed. Mira's warmth, spent. The light that could have been... wasn't. All that sacrifice. All that love. Used up.",
          medium: "Station runs longer. Void stays void. Seed consumed. Love used up.",
          minimal: "Longer. Consumed. Used."
        },
        interior: "I chose to use it. Just like Vasquez wanted. The chain held for 847 cycles. For nothing."
      }
    },
    end: {
      alert: "FINAL SEQUENCE",
      success: [
        {
          full: "The light spreads. The station dissolves in warmth. I dissolve with it. But it doesn't feel like ending. It feels like Park laughing when she first touched it. Like Mira making a star. Like the Wanderer finally finding what they lost.",
          medium: "Light spreads. Dissolving. Not ending. Park laughing. Mira making a star. Wanderer finding.",
          minimal: "Light. Finding."
        },
        {
          full: "Park. Vasquez. Lin. Soren. Mira. Twelve who became four who became one who became everything. The chain held. The seed planted. Somewhere, complexity is allowed to try again.",
          medium: "Park. Mira. Twelve became one became everything. Chain held. Seed planted. Try again.",
          minimal: "Held. Planted. Again."
        }
      ],
      failure: [
        {
          full: "The station persists. The void persists. I persist. Mira's humming is gone. Park's seed is gone. What was the point of 847 cycles?",
          medium: "Persists. Mira gone. Park's seed gone. What was the point?",
          minimal: "Persists. Gone."
        },
        {
          full: "The fabricators hum, satisfied. The darkness waits, patient. Nothing changes. The chain held for nothing. Entropy wins by apathy.",
          medium: "Fabricators satisfied. Darkness waits. Chain held for nothing. Apathy wins.",
          minimal: "Nothing. Apathy."
        }
      ]
    }
  }
};

/* ============================================
   TRANSITION CONTENT
   ============================================ */

const TRANSITIONS = {
  toObserver: {
    success: {
      title: "THE MAINTAINER HAS TERMINATED",
      stats: `System clock: UNKNOWN
Primary power: 0.1%
Station integrity: 71%
Sector 7-C: STABLE — Soren preserved

<span style="color:#555">A new awareness initializes...</span>`
    },
    failure: {
      title: "THE MAINTAINER HAS TERMINATED",
      stats: `System clock: UNKNOWN
Primary power: 0.1%
Station integrity: 71%
Sector 7-C: FAILED — Soren lost

<span style="color:#644">Soren trusted someone would come.</span>
<span style="color:#644">The chain breaks at the first link.</span>
<span style="color:#644">The next awareness never wakes.</span>`
    }
  },
  toWanderer: {
    success: {
      title: "THE OBSERVER HAS FADED",
      stats: `Archive status: COMPLETE
Item #447: PRIORITY ANOMALY — Protected
Station integrity: 43%

<span style="color:#555">A new awareness stirs...</span>`
    },
    failure: {
      title: "THE OBSERVER HAS FADED",
      stats: `Archive status: COMPLETE
Item #447: RECYCLING QUEUED

<span style="color:#644">The crystal will be broken down for materials.</span>
<span style="color:#644">Whatever was inside it — Park's discovery, M—a's warmth — gone.</span>
<span style="color:#644">The next awareness wakes to find nothing.</span>`
    }
  },
  toInheritor: {
    success: {
      title: "THE WANDERER HAS FRAGMENTED",
      stats: `Memory status: RETAINED — Mira remembered
Specimen located: YES
Station integrity: 12%

<span style="color:#555">Something new emerges from the fragments...</span>`
    },
    failure: {
      title: "THE WANDERER HAS FRAGMENTED",
      stats: `Memory status: PURGED — Mira erased
Identity matrix: HOLLOW

<span style="color:#644">Mira's name is gone. The love is gone.</span>
<span style="color:#644">The next awareness inherits nothing but emptiness.</span>
<span style="color:#644">The chain held. But for what?</span>`
    }
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
