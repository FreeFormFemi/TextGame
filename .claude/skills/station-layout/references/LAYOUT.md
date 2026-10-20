# Station Layout Reference

## 1. The map

Fore is at the top. The hull is about 90 metres from nose to reactor.

```
              ▲ FORE
                OBS            Observation — the nose
                 │
                CMD            Command
                 │
       QTR ──── SPF ──── AIR   spine fore junction
        │        │        │
       MED ──── SPA ──── STO   spine aft junction
                 │        │
                ENG ──────┘    Engineering — the stern
              ▼ AFT
     PORT ◄                 ► STARBOARD
```

Nine rooms. The two spine junctions replace the old single "Central Corridor", so the
hull has a readable length and a midpoint.

## 2. Connections and directions

Every exit has exactly one direction, and no room has two exits the same way.

| From | Fore | Aft | Port | Starboard |
|---|---|---|---|---|
| **Observation** | — | Command | — | — |
| **Command** | Observation | Spine fore | — | — |
| **Spine fore** | Command | Spine aft | Quarters | Airlock |
| **Quarters** | — | Medical (crew hatch) | — | Spine fore |
| **Airlock** | — | Storage (cargo passage) | Spine fore | — |
| **Spine aft** | Spine fore | Engineering | Medical | Storage |
| **Medical** | Quarters (crew hatch) | — | — | Spine aft |
| **Storage** | Airlock (cargo passage) | Engineering (freight lift) | Spine aft | — |
| **Engineering** | Spine aft | — | — | Storage (freight lift) |

```js
const ROOM_LAYOUT = {            // grid [col, row]; col 0 = port, row 0 = fore
  observation: [1, 0], command: [1, 1],
  quarters: [0, 2], spine_fore: [1, 2], airlock: [2, 2],
  medical: [0, 3], spine_aft: [1, 3], storage: [2, 3],
  engineering: [1, 4]
};
const ROOM_EXITS = {
  observation: { aft: 'command' },
  command:     { fore: 'observation', aft: 'spine_fore' },
  spine_fore:  { fore: 'command', aft: 'spine_aft', port: 'quarters', starboard: 'airlock' },
  quarters:    { aft: 'medical', starboard: 'spine_fore' },
  airlock:     { aft: 'storage', port: 'spine_fore' },
  spine_aft:   { fore: 'spine_fore', aft: 'engineering', port: 'medical', starboard: 'storage' },
  medical:     { fore: 'quarters', starboard: 'spine_aft' },
  storage:     { fore: 'airlock', aft: 'engineering', port: 'spine_aft' },
  engineering: { fore: 'spine_aft', starboard: 'storage' }
};
// ROOM_CONNECTIONS is derived from ROOM_EXITS
```

### Key routes the story depends on

| Who | Route | Moves |
|---|---|---|
| Maintainer: token quest | CMD → SPF → SPA → ENG → SPA → MED → SPA → STO → ENG | 8 |
| Observer: three fragments | OBS → CMD → SPF → QTR → MED → SPA → ENG → SPA → SPF → CMD → OBS | 10 |
| Soren: wakes, finds her | MED → QTR → SPF → CMD → OBS | 4 |
| Soren: paged back | OBS → CMD → SPF → QTR → MED | 4 |
| Soren: "up to the observation deck" | MED → QTR → SPF → CMD → OBS | 4 |
| Inheritor: crystal to airlock | OBS → CMD → SPF → AIR | 3 |
| Inheritor: burn it | AIR → SPF → SPA → MED | 3, all aft or port: back the way they came |

## 3. Room specs

Size, light source, sound, smell and landmarks are fixed. Text may change a
landmark's state but never its position.

| Room | Where | Size and shape | Landmarks |
|---|---|---|---|
| **Observation** | The very nose | 8 m dome, a single curved viewport | The viewport; the archive console; #447's case on a pedestal |
| **Command** | Behind the nose | Low, wide, three stations facing fore | Main screen with Park's flag *SEED PROTOCOL — PENDING*; the auxiliary power panel |
| **Spine fore** | Mid-hull, forward junction | 4-way hatch junction, ribbed ceiling | Hatch stencils FORE / AFT / PORT / STBD; the red airlock pulse visible to starboard |
| **Quarters** | Port, forward | 12 bunks in two rows, lockers | Bunk 7 with Mira's star; Park's terminal; the crew hatch aft to Medical |
| **Airlock** | Starboard, forward | Inner door, 3 m chamber, outer door | Red warning light; the old diagnostic terminal; the cargo passage aft |
| **Spine aft** | Mid-hull, aft junction | 4-way junction, floor grating | **The frost line**: a painted rib count on the floor, so frost can be measured |
| **Medical** | Port, aft | Long room: treatment chair, pod bay at the far end | Cryo pod 7-C; the treatment chair and its screen; the fabricator in the corner |
| **Storage** | Starboard, aft | Grid of shelving, red floor strips | Shelf 12, the open case and the token mount; freight lift aft |
| **Engineering** | The stern | Two levels around the reactor column | Reactor; Conduit G-12; the cryo feed valve; console C; wall panel B-7 (Vasquez's dent) |

## 4. Chapter states

| | Ch 1 Maintainer | Ch 2 Observer | Ch 3 Wanderer | Ch 4 Inheritor |
|---|---|---|---|---|
| **Frost reaches** | nowhere | Engineering, Spine aft | + Medical, Storage, Spine fore | Everywhere except where the crystal is |
| **Light** | Working light; aft flickers | Aft half on red emergency strips | Emergency strips only | Dark. Park's flag, the airlock pulse and the crystal |
| **Sound** | Reactor hum, loud aft | Hum thin, ice ticking | Silence, your own breathing | The crystal humming |
| **Warmest room** | Engineering (reactor) | Observation (crystal) | wherever the crystal is | wherever the crystal is |

Frost line on the spine-aft floor: none, then rib 2, then rib 6, then past the junction.

## 5. Movement lines

One line per hatch, chosen by chapter. Wanderer lines are written separately in his
voice. Examples:

| Hatch | Ch 1 | Ch 2 | Ch 3 (Wanderer) | Ch 4 |
|---|---|---|---|---|
| CMD → SPF (aft) | "Aft through the pressure door. The hum gets louder." | "Aft. Emergency strips start at the hatch." | "Away from the light. It gets colder." | "Aft. The others' footprints go both ways here." |
| SPF → SPA (aft) | "Down the spine. Twenty metres of ribs." | "Down the spine. Frost at rib 2." | "The floor turns to ice under my feet." | "Down the spine, through the frost." |
| SPF → AIR (starboard) | "Starboard, toward the red light." | "Starboard. The red light is the only colour." | "Toward the red light. It doesn't feel warm." | "Starboard to the red light. Park's flag pointed here." |
| SPA → ENG (aft) | "Aft into the heat of the reactor deck." | "Aft. The hatch is iced open." | "It's so cold my teeth hurt." | "Aft, to where the Maintainer is." |
| MED → QTR (fore) | "Through the crew hatch." | "Through the crew hatch. Warmer." | "Through the small door. A little warmer." | "Through the crew hatch, the way Soren went." |
