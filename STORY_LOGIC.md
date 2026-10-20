# Story Logic

How the story fits together: what causes what, and why. Every choice in the game
should be traceable through this file. If a scene can't be explained by the rules
and the backstory below, it's a bug.

---

## 1. Backstory (what happened before the game starts)

| Cycle | Event | Why it matters later |
|---|---|---|
| 0 | Station launches. Crew of 12. Universe already near heat death. | |
| 112 | **Park** finds Item #447 drifting: a crystal that is warm when nothing else is. It reacts to touch and to being looked at. | The thing everyone protects. |
| ~150 | Park's theory: it's a **seed**. It grows by *keeping* what people give it. When it holds enough, you let it go and it gives everything back as light. It needs tending for longer than a human lifetime. | Explains the transfers, the chain, and the final release. |
| 158 | **Council 7.** Park proposes moving the crew's minds into station frames so they can tend it for centuries. **Vasquez** wants to burn it in the reactor and stay human. Vasquez punches the wall. | Sets up the final "release or burn" choice. |
| 203 | **Mira** is told the transfer is reversible (it's a 73% guess). She goes first so **Soren** won't have to. It goes wrong: part of her ends up inside the crystal. | The warmth in the crystal is partly Mira. |
| 211 | Soren refuses to transfer after losing Mira. Park tells him the seed will need *someone human at the end, someone who remembers being held*. He goes into cryo. | Why Soren matters, and why saving his pod matters. |
| ~215 | Park sets up **the chain**: there's only power to run one frame at a time, so they will wake one at a time. She puts the Engineering token on Shelf 12 next to the crystal, so nobody gets power without looking at it first. She writes *"The chain must hold."* | Explains the token quest and the order of wakings. |
| 412 | Vasquez dies, still human, after keeping the reactor running alone for 200 cycles. His last log softens: *"I hope the seed grows. I just couldn't be the one to plant it."* | |
| 847 | The first waking. **The game starts.** | |

## 2. The rules of the world

Each consequence in the game has to follow from one of these. They are all stated
in-game before the player needs them.

- **R1. One frame at a time.** There's only power to run one mind at once. The next one wakes when the current one ends. *(Park's log, Quarters, Maintainer)*
- **R2. The crystal keeps what it's given.** Who held it, who looked at it, who loved someone inside it. If it's destroyed, everything in it is gone. *(Park's log, the crystal's own fragment)*
- **R3. At low power the station recycles unclassified items.** Nothing gets wasted. *(Observer arrival notice, Archive Protocol 7-C)*
- **R4. The cryo pod opens on its own when the power can't hold stasis any more.** So Soren wakes *after* the Observer goes dark, and a late, under-powered thaw damages his memory. *(Observer: Check cryo pod 7-C)*
- **R5. The last frame runs on fabricated power.** The crystal is the last material on board worth burning. Releasing it means the final mind runs out. *(Final prompt)*

## 3. The four chapters: if this, then this, because of this

### Chapter 1: Maintainer
**Goal:** fix the power failure.
**Path:** Command → Engineering (locked: needs the token) → Medical (the archive says the token is on Shelf 12) → Storage (Directive 7-Alpha: log #447 before taking the token) → Engineering.

**Choice: route power to Soren's pod, or to your own life support.**

| If | Then | Because |
|---|---|---|
| Cryo | Soren lives. The Engineering heaters lose power, Conduit G-12 freezes and ruptures, and you stay to seal it so the cryo line holds. **You die.** | The heaters and the pod share the one remaining sector of power. |
| Life support | You patch G-12 and keep the station running alone for 212 more cycles. Soren's pod fails on the third. You die at the console anyway, later. | You had the time to fix the conduit. He didn't have the power to survive. |

In both cases the Observer wakes next (R1). Nothing is game over.

### Chapter 2: Observer
**Goal:** classify #447 before the archive shuts down. There's a visible countdown.
**Why it matters:** anything left unclassified, or classified low, gets recycled (R3).
**Needs:** 3 of 4 archive fragments: Park (Command), the crystal itself (Observation), Mira (Medical), Council 7 (Engineering).

| If | Then | Because |
|---|---|---|
| PRIORITY ANOMALY | The crystal is protected. | It's the only class exempt from recycling. |
| PRIORITY | Recycled once the Observer goes dark. | PRIORITY needs active monitoring and lapses back to STANDARD. The protocol text says so. |
| INERT / STANDARD | Recycled. | Those are the recycle classes. |
| Countdown runs out | Recycled. | It was never classified. |
| Recycled (any of the above) | **Ending: Nothing Left.** You get the option to go back to the Observer's waking. | R2: the crystal is the story. Without it nothing can happen. |

When the Observer goes dark the station's power drops below stasis level, and Soren's pod opens (R4). If Soren is dead, nobody wakes. The station skips straight to the Inheritor.

### Chapter 3: Wanderer (Soren, revived), only if his pod was saved
**Goal:** find what he lost. The damaged thaw took his memories.
**Path:** Medical → follow the Observer's trail (Command screen, the message in Quarters) → Observation → find the crystal → take it.
Taking it triggers the Medical bay paging *"SOREN, K."* That's how he learns his own name. The page sends him back to Medical.

**Choice: let Medical suppress the memories that are killing him, or keep them.**

| If | Then | Because |
|---|---|---|
| Keep them | He carries the crystal up to the viewport (*"we were going to watch the stars"*) and dies there remembering her. The crystal holds him and Mira together. | The cascade is fatal without treatment. |
| Purge | He lives, stable and empty. He leaves the crystal on a Medical tray. 40 cycles later the failing station kills him anyway. | The treatment works. The station doesn't. |

### Chapter 4: Inheritor
**Who:** what's left of the other transferred crew, loaded into the last frame together because there's no longer power to wake them one by one (R1).
**Goal:** collect at least 3 echoes (Maintainer in Engineering, Observer in Observation, Mira in Quarters, Soren in Medical if he kept his memories). Pick up the crystal. Take it to the **airlock**.

**Choice: release it into the void, or take it back to the fabricator.**

| If | Then | Because |
|---|---|---|
| Release, Soren kept Mira | **Ending: Let there be light.** | It held enough (R2 + Park's "someone human at the end"). |
| Release, Soren lost or purged | **Ending: One star.** A single point of light, like the one Mira made. | It held less, so it gives back less. |
| Fabricate | **Ending: The long dark.** The frame runs another 900 cycles alone. | R5. It's what Vasquez wanted at Council 7. |

## 4. Endings matrix

| Soren's pod | Classification | Soren's memories | Final act | Ending |
|---|---|---|---|---|
| saved | anomaly | kept | release | **Let there be light** |
| saved | anomaly | purged | release | One star |
| lost | anomaly | — | release | One star |
| any | anomaly | any | fabricate | The long dark |
| any | not anomaly / timeout | — | — | Nothing left (Observer retry) |

## 5. Dead ends and loose threads found, and what was done

| Problem | Fix |
|---|---|
| Every "wrong" choice was an instant full-game restart. Nothing carried forward. | Wrong choices now change the rest of the story (see matrix). Only destroying the crystal ends the run, with a retry from the Observer. |
| Choosing life support skipped every later chapter, but logically the Observer still wakes. | The Observer wakes either way. Soren's pod reflects the choice. |
| The Maintainer died of a rupture unrelated to the choice. | The rupture is caused by the power choice (heaters lose power) and both prompts say so beforehand. |
| Soren had no role after Chapter 1. | Soren *is* the Wanderer. Mira's partner, revived by R4. |
| Soren's log said he went first, but Mira's log says *she* went first for him. | Soren's log rewritten: he went into cryo after losing her. |
| Soren was "Project Lead". Park is also Project Lead. | Soren is Navigation. Park leads. |
| Consent records list 12 transfers, but Vasquez declined and Soren is in cryo. | 10 transferred; Vasquez and Soren declined. |
| A "personal log" in Quarters hinted at a time loop ("847 times I've come back"). It was never resolved. | Now Park's final entry. It explains R1, the token placement, and where "the chain must hold" comes from. |
| Why was the Engineering token sitting next to the crystal? | Park put it there so every waker has to look at the seed. |
| The Observer's message claimed "I have marked it Priority Anomaly", but it can only be recorded *before* classifying. | The message is now accurate when recorded: "Don't let them recycle it." |
| The Observer saw the token "still mounted" after the Maintainer took it. | The mount is empty. |
| The power choice text said "unknown occupant preserved" right after Soren's log played. | Names Soren. |
| The Observer's cycle counter did nothing. | It's the archive shutdown clock: hitting 0 means the crystal is recycled. |
| Wanderer softlock: the purge choice needed decay ≥ 7 *and* a return to Medical, with no signpost. | Taking the crystal triggers the Medical page. The choice opens on arrival. |
| The Inheritor was offered "Approach the airlock" while standing in Observation, three rooms away. | The final choice happens *at* the airlock, carrying the crystal. |
| Why does releasing it make light? Never set up. | Set up in Park's log and the crystal's own fragment ("when I am full I will give it all back"). |
| "Consume" ending said "just like Vasquez wanted", but his last log hoped the seed would grow. | Council 7 now shows him wanting to burn it. The final line notes that he changed his mind. |
| Long logs collapsed to one-liners once decay set in. The story was hidden from players who explored. | Terminal logs always show in full. Decay now only affects descriptions. |
| The side map drew Observation off the Corridor; the code connects it to Command. | Map fixed. |
| "Awareness" used 35 times. | Removed. Replaced with shifts, "whoever woke before me", "the one before". |
