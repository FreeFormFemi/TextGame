---
name: station-layout
description: Spatial design rules for the TextGame station. Use whenever writing or editing a room description, an exit, a movement line, the side-panel map, ROOM_CONNECTIONS, or any text that says where something is ("aft of here", "past Command"). Covers the station's geography and what each direction means, room specs, how each character describes space, how the station changes chapter by chapter, and a checklist that keeps text and map in agreement.
---

# Station Layout

The station is a place the player should be able to picture with their eyes closed.
Every line of text that mentions space has to agree with one map, and every part of
that map means something in the story.

The canonical map, room specs and chapter states live in
[`references/LAYOUT.md`](references/LAYOUT.md). Read it before writing any room text.
This file holds the rules.

## 1. What the geography means

The station is a long hull drifting nose-first into nothing. Directions follow ship
convention and are fixed to the hull, never to the player.

| Direction | Side of the ship | What it stands for | Rooms |
|---|---|---|---|
| **FORE** (bow) | The nose, facing the dark ahead | The future, looking out, letting go, light | Observation, Command, Airlock |
| **AFT** (stern) | The tail, the reactor | The past, power, upkeep, the cold spreading forward | Engineering, the aft spine |
| **PORT** | Left side facing fore | People: where the crew lived, healed and slept | Quarters, Medical |
| **STARBOARD** | Right side facing fore | Things and the outside: kept, stored, released | Storage, Airlock |

The story moves fore. That's the spatial version of the intro line "we look… toward
the birth… of the light":
- The crystal goes from Storage (starboard, aft), to Observation (the bow), to the Airlock (starboard, fore).
- Soren goes from Medical (port, aft) to the observation deck.
- The Maintainer goes aft and never comes back.
- Burning the crystal means carrying it back aft to the Medical fabricator. Going backward is the wrong way.

Use this when deciding where a new thing goes. A memory belongs port. An object
belongs starboard. Anything about the end belongs fore.

## 2. Rules for every room

1. **Place it.** The first-visit description says where the room sits in the hull, in a phrase rather than a coordinate: "at the very nose", "port side, just aft of Quarters".
2. **Give it a body.** One or two of: size, shape, light, temperature, sound, smell. Take them from the room spec, not from imagination, so they stay the same across chapters.
3. **Name the exits in the world.** The first-visit description ends with the exits, described in the speaker's voice (section 3). Every exit is mentioned by its direction or a sensory equivalent. Never mention an exit that doesn't exist.
4. **Landmarks stay put.** Each room has fixed landmarks (LAYOUT.md). Text may change their *state* (iced, dark, open) but never their position.
5. **No teleporting.** Moving shows one passage line (section 5) before the new room.
6. **Only adjacent rooms are "here".** "Just aft", "through that hatch", "next door" only refer to rooms connected in `ROOM_CONNECTIONS`. Anything further away uses a route: "past Command", "two hatches aft".
7. **Repeat visits are short.** One line: the room, plus whatever changed. Exits appear in the nav labels.

## 3. How each character describes space

The nav labels always show compass directions to the player. Prose uses the character's own sense of direction.

| Character | Sense of space | Exits sound like |
|---|---|---|
| **Maintainer** | Bearings, specs, hatch numbers. Trusts the ship's labels. | "Hatch fore: Command. Hatch aft: spine junction. Both seal on power loss." |
| **Observer** | Measured and archival. Distances, durations, what used to be here. | "Twenty metres aft, the junction. The frost line has reached its second rib." |
| **Wanderer** | No compass. Soren doesn't remember the ship. Body, temperature, light, smell. Warmth is his only bearing. | "Cold comes from behind me. Ahead, a little light. The door on my left smells of oil." |
| **Inheritor** | Memory of other people's routes. Knows the ship through how the others moved through it. | "Soren went fore from here, barefoot. The Maintainer only ever went aft." |

Never give the Wanderer the words fore, aft, port or starboard in his own voice. He
can read them on a sign ("a stencil on the hatch says FORE"), which is how he starts
to learn the ship.

**No left or right, for anyone.** Left and right depend on which way you came in:
walking aft, port is on your *right*. Room text is shown no matter which hatch the
player used, so "the door on my left" will be wrong half the time. Use ship
directions, or for the Wanderer, the door's own character: "the door that smells of
oil", "where the cold comes from", "back toward the light".

## 4. The station changes between chapters

Power falls and cold moves forward with every chapter. The same room must read
differently in each chapter, and the change must follow the story:

- **Frost line.** The rupture of Conduit G-12 happens aft, at the end of chapter 1. From then on, frost moves one band forward per chapter. The spine floor carries a visible frost line that the Observer can measure.
- **Light.** Working light in chapter 1, then the aft half on emergency strips, then emergency strips only, then darkness. In the last chapter the only lights are Park's flag in Command, the red pulse at the Airlock, and the crystal.
- **Sound.** The reactor hum aft is loud in chapter 1, thin in chapter 2 and gone by chapter 3. In chapter 4 the only sound is the crystal humming.
- **Warmth is a compass.** The crystal is the only warm thing. The room it's in never has frost. Rooms next to it read "less cold". The Wanderer and the Inheritor can find it by temperature.

Chapter-by-chapter values are in LAYOUT.md, section 4. Use those, not new ones.

## 5. Movement lines

Moving between rooms shows one short line for that hatch, before the new room
appears. Each line comes from the table in LAYOUT.md, section 5, and changes with the
chapter (light, frost). Rules:
- At most 15 words.
- Say direction and one sense: "Aft down the spine. Your breath shows by the second rib."
- Write the Wanderer's lines in his voice, with no compass words.

## 6. The side-panel map

- The map is drawn with fore at the top and is marked `▲ FORE` and `▼ AFT`.
- The current room shows as `[CMD]`. Rooms reachable from here are bright. Rooms already visited are dim. Unknown rooms show as `···` until visited or next to the current room.
- The Inheritor sees the whole map from the start, because they carry the others' memories.
- Frost is shaded on the map in the chapter's frost band.
- The map is generated from `ROOM_LAYOUT` (grid positions) and `ROOM_CONNECTIONS`, never hand-drawn, so it can't disagree with the game.

## 7. Checklist before committing room text

- [ ] Every exit mentioned in prose exists in `ROOM_CONNECTIONS`, in that direction.
- [ ] Every exit in `ROOM_CONNECTIONS` is mentioned in the first-visit description, or deliberately hidden with a note in LAYOUT.md.
- [ ] Every direction word (fore/aft/port/starboard, "behind", "ahead") matches LAYOUT.md for the room it's spoken in.
- [ ] Every multi-room reference ("past Command") is a real shortest route.
- [ ] Frost, light and sound match the chapter table.
- [ ] Landmarks are where LAYOUT.md puts them.
- [ ] The Wanderer never uses a compass word in his own voice.
- [ ] Nobody says left or right about a door.
- [ ] Run `node tools/check-layout.js`. It checks connections are symmetric, every room has a unique direction per exit, and every direction word in room text agrees with the map.
