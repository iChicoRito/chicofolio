import type { SimpleIcon as SimpleIconType } from "simple-icons";
import { siExpo, siLaravel, siMarkdown, siRocket, siTodoist } from "simple-icons";

export interface CaseStudyNote {
  title: string;
  detail: string;
}

export interface DesignPrinciple {
  title: string;
  detail: string;
  badge: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  solution: string;
  role: string;
  designProcess: string;
  keyFeatures: string;
  techStack: string;
  challenges: string;
  finalProduct: string;
  results: string;
  lessons: string;
  problemNotes?: CaseStudyNote[];
  solutionNotes?: CaseStudyNote[];
  designPrinciples?: DesignPrinciple[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  role: string;
  outcome: string;
  tags: string[];
  icon: SimpleIconType;
  repositoryUrl: string;
  liveUrl?: string;
  image?: string;
  coverImage?: string;
  banner?: string;
  bannerDark?: string;
  bannerLight?: string;
  caseStudy?: CaseStudy;
}

export const placeholderCaseStudy: CaseStudy = {
  overview: "A high-level overview of the project, its goals, and the problem it set out to solve.",
  problem: "The friction, inefficiency, or missing capability that motivated the build.",
  solution: "The approach taken to address the problem, including key architectural and product decisions.",
  role: "My scope of work, from discovery and design through implementation and launch.",
  designProcess: "How the interface evolved from research and wireframes to polished, final screens.",
  keyFeatures: "The core functionality that defines the product and sets it apart.",
  techStack: "The languages, frameworks, and tools used to ship the product.",
  challenges: "The hardest technical and product problems encountered, and how they were resolved.",
  finalProduct: "What shipped in the end and how it fits into the larger product landscape.",
  results: "Measurable outcomes, feedback, and impact observed after launch.",
  lessons: "What I would do differently, and what carried forward to later work.",
};

export const projects: Project[] = [
  {
    id: 7,
    title: "RemindLy",
    description:
      "RemindLy is a personal task and reminder app designed to help people remember what needs to be done and when it needs to happen.",
    role: "Product design + mobile development",
    outcome: "Offline reminders that stay accurate after tasks change.",
    tags: ["Flutter", "Dart", "Hive"],
    icon: siTodoist,
    repositoryUrl: "https://github.com/iChicoRito/RemindLy-Flutter",
    image: "/assets/icons/remindly.webp",
    coverImage:
      "https://opengraph.githubassets.com/11eb2d675aa8987a7710b3920a90f6396f0ca8281fc2412d2cf893527f4a653c/iChicoRito/RemindLy-Flutter",
    banner: "/assets/banner/Banner - RemindLy.png",
    caseStudy: {
      overview:
        "RemindLy is a personal task and reminder app designed to help people remember what needs to be done and when it needs to happen.\n\nThe Tasks area is one of the main parts of RemindLy, alongside the home view, Spaces, and Profile. It brings together task creation, planning, notes, categories, and reminders in one place.\n\nThe feature is designed to keep working with information saved on the device. A person can create a task, choose when it should happen, receive reminders, and respond to an alarm without relying on an online account or internet connection.",
      problem:
        "People do not organize every task in the same way. Some tasks do not need a time. Others have one clear deadline. Some take place over a period with a beginning and an end.\n\nThe app needed to support all three situations without making task creation confusing. It also needed to keep reminders accurate when a task was changed, completed, removed, or opened again after the app had been closed.\n\nA due task also needs to get a person's attention when the app is not currently open. That means the reminder needs to be clear, noticeable, and easy to act on.",
      solution:
        "RemindLy uses a simple journey:\n- The person creates a task from the task list or calendar.\n- The task is checked and saved on the device.\n- The app prepares the right reminders for that task.\n- The person receives early reminders and a final due alert.\n- The alert shows the task details and offers a clear way to stop or delay it.\n\nThe feature supports three timing choices:\n- No Time: The task is saved without reminders.\n- Due Time: The person receives reminders 10 minutes and 5 minutes before the deadline, followed by an alert at the deadline.\n- Time Range: The person receives a reminder 5 minutes before the start, another 5 minutes before the end, and an alert when the time period ends.\n\nWhen a task changes, RemindLy removes its old reminders before preparing new ones. When a task is completed or removed, its reminders are stopped as well.\n\nWhen the app is opened again, it checks the saved tasks and restores the reminders that are still needed. If several unfinished tasks are due at the same time, the alert can show them together.",
      role: "- Shaping task details that can hold titles, descriptions, notes, categories, priorities, dates, times, whether a task is finished, and attachments.\n- Creating clear task-list, calendar, creation, editing, and detail views.\n- Supporting both quick task entry and more detailed task planning.\n- Keeping task changes and reminders aligned.\n- Handling early reminders, due alerts, stopping an alert, and delaying an alert for five minutes.\n- Making the alarm noticeable through sound, vibration, and a screen that stays visible.\n- Restoring useful reminders after the app has been closed or placed in the background.\n- Checking the main task, reminder, saved-information, creation, and alarm experiences with repeatable checks.",
      designProcess:
        "Make time choices easy to understand\nInstead of asking people to build a reminder from many separate settings, the task form offers three clear choices: No Time, Due Time, and Time Range. Each choice reveals only the date and time information it needs.\n\nKeep one clear rule for changes\nWhenever a task is saved, RemindLy replaces that task's old reminders with reminders based on the latest information. This prevents an earlier deadline from continuing to alert the person after the task has changed.\n\nKeep the task and the alert connected\nThe due alert loads the latest task information saved on the device. It can show the task title, category, description, and notes instead of displaying only a generic message.\n\nPlan for interruptions\nThe app can remember an active due alert while it closes, sits in the background, or opens again. When the person returns, the alert can be shown again instead of being silently lost.\n\nUse stronger phone behavior for urgent alerts\nRegular reminders use the phone's alerts. A final due alert can use the phone's stronger alarm behavior, including a full-screen alert, sound, vibration, and quick actions.",
      keyFeatures:
        "Task creation and editing\nThe person can enter a title, short description, category, priority, date, time, and optional space. The form checks required information before saving. The detailed task view also supports notes, attachments, completion, pinning, archiving, and deletion.\n\nTask list and calendar\nTasks can be viewed in a list or on a calendar. The list can be narrowed by search, category, priority, progress, or protection status. The calendar shows tasks that have a scheduled time and lets the person create or update them from the selected date.\n\nEarly reminders\nDue-time tasks receive two early reminders. Time-range tasks receive one reminder before they begin and another before they end. Tasks without a time do not create reminders.\n\nDue alerts\nAt the due time, the app can show a high-priority alarm with the task title and helpful details. If more than one unfinished task is due at the same minute, the alert keeps those tasks together in one scrollable view.\n\nStop or delay an alert\nThe full-screen alarm provides a Dismiss Alarm action. The phone alert also provides Dismiss and Snooze 5 min actions, allowing the person to delay the alert without opening the full task view first.\n\nReminder recovery\nWhen the app starts, it checks saved tasks and restores future reminders. It also checks for tasks that became due while the app was open, helping the person see an alert even when the app was not actively being used.",
      techStack:
        "The case study remains human-readable, while this section records the actual technologies used:\n- Flutter and Dart — the app screens, forms, lists, calendar, task handling, and alarm view.\n- Hive and Hive Flutter — saved tasks, categories, and spaces on the device.\n- Shared Preferences — saved display-name information and the alarm return state.\n- Flutter Local Notifications — scheduled reminders, notification actions, and alert messages.\n- Timezone and Flutter Timezone — reminder timing based on the person's local time.\n- Kotlin and Android AlarmManager — Android due alarms that can wake the phone and show an urgent alert.\n- MethodChannel — the connection between the Flutter app and the Android alarm behavior.\n- Flutter Ringtone Player, Vibration, and Wakelock Plus — alarm sound, vibration, and keeping the alert visible.\n\nNo online account, internet backup, or online task-sharing feature is part of this feature.",
      challenges:
        "Keeping reminders accurate after changes\nChanging a date, time, title, or whether a task is finished can make an earlier reminder incorrect. RemindLy stops the old reminders first and then prepares a new set from the latest task information.\n\nSupporting different kinds of schedules\nOne deadline and a start-to-end time period need different reminders. The three schedule choices keep these differences clear for the person and consistent throughout the task list, calendar, and alert experience.\n\nGetting attention at the right moment\nA normal notification can be missed. For final due alerts, the app can use a more noticeable alarm with sound, vibration, a visible alert screen, and quick actions.\n\nHandling several tasks due together\nShowing one task and hiding the others would make the alert incomplete. The alarm view finds unfinished tasks due at the same minute and presents them together in a scrollable list.\n\nWorking across device types\nPhone alarms are stronger than browser alerts. The browser version does not start reminder alerts, and the Apple-device alert approval experience needs a clearer user-facing step. These are current limits, not claims of equal behavior everywhere.",
      finalProduct:
        "After the initial welcome experience, the person opens Tasks from the main screen or starts from a calendar date. They select Add Task or Schedule, enter the task information, choose No Time, Due Time, or Time Range, and save.\n\nThe task appears in the list or calendar and remains available after the app is closed and opened again. RemindLy prepares the appropriate early reminders and final alert based on the chosen schedule.\n\nWhen the time arrives, the person sees the task title and available details in the alarm. They can dismiss the alert or snooze it for five minutes. Completing or deleting the task stops future alerts. Archiving also stops alerts, while restoring the task prepares them again when appropriate.",
      results:
        "- Tasks, categories, spaces, dates, times, notes, and completion information remain available on the device.\n- No-time tasks remain quiet, while timed tasks receive the correct early reminders and final alert.\n- Editing a task replaces outdated reminders instead of leaving old alerts active.\n- Completing, deleting, or archiving a task stops its reminders.\n- A due alert can show several tasks together and provide useful task details.\n- A person can dismiss an alarm or delay it for five minutes.\n- On August 17, 2026, 46 focused checks covering task timing, task saving, reminder behavior, task creation, and alarm presentation passed.\n\nNo user-growth, productivity, or speed claims are made because the project does not provide those measurements. A real phone alarm was not run during this review; phone behavior was checked against the completed product work.",
      lessons:
        "What worked\n- Saving information on the device keeps the main task experience available without an online connection.\n- Three simple schedule choices make different kinds of tasks easier to plan.\n- Replacing old reminders whenever a task changes keeps the experience predictable.\n- Showing the latest task details inside the alarm makes the alert more useful than a generic message.\n- Sound, vibration, and a visible alarm screen make urgent alerts easier to notice.\n\nWhat could improve\n- Add a clearer reminder-approval step for Apple devices.\n- Test the alarm on real phones and in common locked-screen situations.\n- Check whether reminders should be restored immediately after a phone restart, before the app is opened.\n\nFuture considerations\nOnline backup, sharing between devices, repeating tasks, and online reminder delivery would be separate product decisions. They are not part of the completed Tasks & Reminders feature.",
      problemNotes: [
        { title: "Different ways to organize tasks", detail: "No time, due time, or time range" },
        { title: "Task creation should stay clear", detail: "Support each schedule without adding confusion" },
        { title: "Reminders must stay accurate", detail: "Changes, completion, removal, and reopening" },
        { title: "Due tasks need attention", detail: "Clear, noticeable, and easy to act on" },
      ],
      solutionNotes: [
        { title: "Simple task journey", detail: "Create, save, prepare reminders, receive alerts" },
        { title: "Three timing choices", detail: "No Time, Due Time, or Time Range" },
        { title: "Reminders stay accurate", detail: "Old reminders replaced whenever a task changes" },
        { title: "Recovery after reopening", detail: "Restores needed reminders and shows due tasks together" },
      ],
      designPrinciples: [
        {
          title: "Make time choices easy to understand",
          detail: "No Time, Due Time, and Time Range — each reveals only what it needs",
          badge: "Timing",
        },
        {
          title: "Keep one clear rule for changes",
          detail: "Old reminders replaced on every save with the latest information",
          badge: "Reliability",
        },
        {
          title: "Keep the task and the alert connected",
          detail: "Due alert loads the latest saved task title, category, description, and notes",
          badge: "Context",
        },
        {
          title: "Plan for interruptions",
          detail: "Active due alert remembered across close, background, and reopen",
          badge: "Resilience",
        },
        {
          title: "Use stronger phone behavior for urgent alerts",
          detail: "Full-screen alarm with sound, vibration, and quick actions",
          badge: "Attention",
        },
      ],
    },
  },
  {
    id: 8,
    title: "Spillr",
    description:
      "Spillr is a mobile conversation card game that turns choosing a deck, playing a timed round, and seeing the result into one connected experience.",
    role: "Product design + mobile development",
    outcome: "A connected deck-to-result play loop with local progress.",
    tags: ["TypeScript", "React Native", "Expo"],
    icon: siExpo,
    repositoryUrl: "https://github.com/iChicoRito/Spillr",
    image: "/assets/icons/spillr.webp",
    coverImage:
      "https://opengraph.githubassets.com/2036349ca693829a22084b1bd667c211079aa648b22cd2bac5c364bff05774d1/iChicoRito/Spillr-Expo",
    banner: "/assets/banner/Banner - Spillr.png",
    caseStudy: {
      overview:
        "Spillr is a mobile conversation card game. This case study covers the completed journey from choosing a deck to playing a timed round, seeing the result, and returning to personal progress.\n\nThe implemented flow includes deck selection, preparation, card play, results, streak feedback, saved statistics, play history, sound, and local notifications. It is a local-first experience, so the core round does not depend on a server or an online account.\n\nThe product is designed to make a casual group activity feel quick to start, expressive while playing, and rewarding after each round.",
      problem:
        "The experience needed more than a card list. Players needed a clear way to choose a topic, understand when a round was ready, act on each card, and see what their choices meant at the end.\n\nThe product also needed to connect the round to the player's wider progress, including streaks, statistics, and play history, without making the main activity depend on an online account.",
      solution:
        "The solution connects those moments into one guided journey. A deck carousel leads to a short animated preparation screen. The game then gives each card a simple choice: answer it, pass it, or end the round. A two-minute timer keeps the pace moving, while the result screen turns the final combination of answers and passes into a distinct outcome.\n\nThe round also feeds the surrounding experience. Completed sessions update the player’s streak, statistics, and play history. Music, sound effects, and optional local reminders extend the feeling beyond the card itself.",
      role: "- Translating the supplied mobile screen direction into a connected play journey.\n- Building the interaction states for preparation, card flipping, answering, passing, timing out, ending a round, and leaving safely.\n- Connecting gameplay outcomes to streaks, statistics, and play history stored on the device.\n- Coordinating background music, sound effects, animated feedback, and local notification behavior across screens.\n- Handling incomplete states such as an empty deck, expired streak, denied notification permission, or a player leaving before finishing.",
      designProcess:
        "The implementation began with supplied visual references and an audit of the full user journey. Shared visual values and reusable interface pieces were kept consistent across the play, game, result, profile, and history screens.\n\nSeveral decisions shaped the final flow:\n- A single completion path records every finished round, whether the player reaches the last card, ends early, or lets a card time out.\n- One outcome rule is used for both the result screen and the history timeline, so the story shown at the end remains the story saved for later.\n- Screen focus controls background music, while one-time guards prevent result sounds from repeating when a screen refreshes.\n- Exit confirmations protect an active round, while an empty-deck message gives an invalid or incomplete journey a safe way home.\n\nThese choices prioritize a predictable, emotionally coherent experience over adding more modes or settings than the round needs.",
      keyFeatures:
        "Deck selection\nA snapping carousel presents available decks and keeps the selected deck visually prominent.\n\nAnimated preparation\nThe chosen deck is introduced with progressive text, a themed animation, and a clear start action.\n\nTimed card play\nPlayers reveal one card at a time, answer it, pass it, or end the round. A two-minute countdown automatically treats an unanswered card as passed when time expires.\n\nProtected navigation\nBack actions are handled deliberately. Leaving an active round asks for confirmation, while the play screen offers an exit confirmation before closing the app.\n\nOutcome feedback\nResults distinguish an all-passed round, a round with no answers, a partial round, and a fully answered round. Each state has its own message and animation.\n\nDaily streaks\nA completed round updates the current streak, identifies the first play of the day, and shows a dedicated streak celebration when appropriate.\n\nProgress memory\nCards played, cards answered, cards passed, and session history remain available on the profile and history screens.\n\nSound and motion\nLobby music, in-game music, result sounds, button feedback, Lottie animations, and confetti reinforce important moments.\n\nLocal reminders\nOptional notifications are scheduled on the device, including reminders tied to the streak’s warning and expiry window.",
      techStack:
        "The case study records the technologies used:\n- TypeScript — Defines the app behavior and data rules.\n- React and React Native — Build the component-based mobile interface.\n- Expo SDK 54 — Provides the mobile runtime and native integrations.\n- Expo Router — Handles the screen-to-screen journey.\n- React Native Reanimated — Drives responsive motion and transitions.\n- Lottie and React Native Confetti Cannon — Provide animated preparation, result, streak, and celebration feedback.\n- Expo AV — Loads and controls music and sound effects.\n- Expo Notifications — Schedules and cancels local device reminders.\n- AsyncStorage and Expo SecureStore — Keep gameplay data and the player name on the device.\n- React Native SVG and HugeIcons — Support custom visual elements and interface icons.\n- Figma references — Guide the visual treatment of the mobile screens.\n- Android and Expo build tooling — Package the app for Android builds.\n- Groq API — Supports question generation elsewhere in the app; it is not part of the gameplay and results flow.\n\nThe gameplay and results flow has no gameplay server, remote database, cloud backup, account system, or multiplayer service. Question generation is a separate online capability and is not required to play existing decks.",
      challenges:
        "Keeping outcomes consistent\nThe result screen and the history timeline need to describe the same round in the same way. A shared outcome rule keeps the title, supporting message, animation choice, and timeline marker aligned.\n\nPreserving progress without a backend\nThe app combines device storage for profile data, statistics, history, audio preferences, and streak state with secure device storage for the player name. Missing or partial saved data falls back to safe defaults.\n\nManaging media across navigation\nMusic starts or lowers according to the current screen, and in-game music is stopped before result feedback begins. Sound effects use the saved volume levels and are guarded against accidental repetition.\n\nHandling real-world interruptions\nThe flow covers timeouts, empty decks, hardware back actions, early exits, notification permission denial, and stale streaks instead of assuming every round reaches the ideal path.",
      finalProduct:
        "The completed experience lets a player open Spillr, choose a deck, move through a short preparation moment, play cards at a steady pace, and receive a result that reflects what happened.\n\nThe same round then becomes part of the player’s streak, statistics, and history, with optional audio and reminders supporting future sessions.\n\nThe gameplay flow has no gameplay server, remote database, cloud backup, account system, or multiplayer service. Question generation is a separate online capability and is not required to play existing decks.\n\nVerification note: the available Android preview build targets ARM architectures and could not launch on the connected x86_64 emulator. The journey was therefore not physically verified in this environment. iOS, physical Android hardware, notification delivery timing, and every alternate result branch remain unverified.",
      results:
        "- Confirmed: the implementation delivers a complete local play loop with clear player actions, a fixed round time, distinct result states, streak handling, saved progress, history, audio feedback, and optional device reminders.\n- The repository does not provide adoption, usability, performance, or business metrics, so no numerical outcome is claimed.\n- As a product interpretation, the connected feedback loop should make each round feel more complete and give players a reason to return, but that effect still needs user testing.\n- Verification note: the available Android preview build targets ARM architectures and could not launch on the connected x86_64 emulator.\n- Known limitation: the history screen’s “Passed” and “No Spilled” filters use the same incomplete-session category, so they do not yet distinguish those outcomes in the saved view.",
      lessons:
        "Lessons learned\n- A short game benefits from one clear journey more than many disconnected screens.\n- Shared outcome rules prevent the result screen and saved history from telling different stories.\n- Local-first storage can support a meaningful personal experience without requiring an account, but it also limits recovery and sharing.\n- Audio and animation need the same lifecycle planning as navigation and data.\n- Build architecture must match the device used for verification; a successful package build is not proof of runtime behavior on every platform.",
      problemNotes: [
        {
          title: "More than a card list",
          detail: "Players need a clear topic, ready state, card action, and meaningful result",
        },
        {
          title: "A round should connect to progress",
          detail: "Streaks, statistics, and history should carry the session forward",
        },
        {
          title: "The core activity should stay local",
          detail: "A server or online account should not be required to play",
        },
      ],
      solutionNotes: [
        {
          title: "Deck-to-result journey",
          detail: "Choose a deck, prepare, play cards, and receive a distinct outcome",
        },
        { title: "Clear card choices", detail: "Answer, pass, or end the round from each card" },
        { title: "Two-minute pace", detail: "Unanswered cards become passed when the timer expires" },
        { title: "Progress after play", detail: "Completed sessions update streaks, statistics, and history" },
        { title: "Local feedback", detail: "Sound, motion, and optional reminders support future sessions" },
      ],
      designPrinciples: [
        {
          title: "Start with the full user journey",
          detail:
            "Supplied visual references and a journey audit shaped consistent play, game, result, profile, and history screens",
          badge: "Consistency",
        },
        {
          title: "Record every completion path",
          detail: "The last card, an early end, and a timed-out card all use one completion path",
          badge: "Flow",
        },
        {
          title: "Keep outcomes consistent",
          detail: "The result screen and history timeline use the same outcome rule and story",
          badge: "Clarity",
        },
        {
          title: "Coordinate sound with screen focus",
          detail: "Music follows the active screen and one-time guards prevent repeated result sounds",
          badge: "Media",
        },
        {
          title: "Protect incomplete journeys",
          detail: "Exit confirmations and empty-deck feedback provide a safe way through interruptions",
          badge: "Resilience",
        },
        {
          title: "Prefer predictable, emotionally coherent feedback",
          detail: "The round stays focused instead of adding more modes or settings than it needs",
          badge: "Experience",
        },
      ],
    },
  },
  {
    id: 9,
    title: "CosmicX",
    description:
      "A browser-based space experience that turns the scale of the universe into something people can explore, shape, and understand.",
    role: "Product design + frontend development",
    outcome: "An interactive space experience with three learning modes.",
    tags: ["JavaScript", "Three.js", "Vite"],
    icon: siRocket,
    repositoryUrl: "https://github.com/iChicoRito/Cosmic-X",
    liveUrl: "https://cosmicx-sim.vercel.app",
    image: "/assets/icons/cosmicx.webp",
    coverImage:
      "https://opengraph.githubassets.com/026f5f960aa9fcb86b012bc79f794320d2fbe31c589e0ee3b697521732d5b379/iChicoRito/Cosmic-X",
    banner: "/assets/banner/Banner - CosmicX.png",
    caseStudy: {
      overview:
        "CosmicX is a browser-based space experience that turns the scale of the universe into something people can explore, shape, and understand. It brings together three connected modes: a Solar Simulator for hands-on experimentation, a Galaxy Creator for building a personal galaxy, and a Big Bang Timeline for moving through cosmic history.\n\nThe product is designed for people who are curious about space, including learners, visual thinkers, and visitors who want more than a static explanation. The completed implementation combines guided entry points with open-ended interaction, so a person can follow a structured story or spend time experimenting at their own pace.\n\nThis case study covers the completed journey from the title screen through each mode, including mode selection, guided tours, controls, responsive layouts, local saves, and visual scenes. It is a local-first experience with no backend, account system, or external service.",
      problem:
        "Space is difficult to understand when it is presented only as numbers, diagrams, or long explanations. The challenge was to make very large ideas feel immediate without reducing the experience to a passive animation. A solution needed to let people move, experiment, and see consequences rather than watch a fixed sequence.\n\nThe experience also needed to connect three different ways of learning — discovery through a modeled system, creation of a personal galaxy, and narrative travel through cosmic history — without letting any one mode feel like a separate product. Controls, saves, and visual scenes had to remain coherent across the whole application.",
      solution:
        "CosmicX brings the three modes together as complementary ways to learn. The Solar Simulator lets people move around a modeled solar system, inspect bodies, change time, adjust the view, create events, and observe the results. The Galaxy Creator turns the visitor into an author who chooses a galaxy type, shapes its structure, seeds its population, tunes its physics, and explores the generated systems. The Big Bang Timeline presents eleven chronological stages with scrubbing, reverse playback, camera movement, and explanatory information.\n\nThe completed implementation includes the modes, controls, local saves, onboarding tours, settings, and visual scenes in the current application. The three-mode structure is intended to support discovery, creation, and narrative learning as different but connected forms of engagement, with a shared title screen that previews available modes before dense controls appear.",
      role: "- Defining the interaction model for the title screen, mode selection, guided tours, and in-app navigation.\n- Building the Solar, Creator, and Big Bang experiences as connected parts of one application.\n- Creating the control panels, timelines, inspectors, dossiers, settings, music controls, and responsive layouts.\n- Implementing browser-local preferences and save workflows, including scene saves, Creator save slots, JSON export/import, shareable Solar scenes, and screenshots.\n- Adding accessible names, keyboard-friendly controls, mobile panel behavior, and lifecycle cleanup as the user moves between modes.\n- Verifying the completed work with automated tests, production builds, and live browser inspection.\n\nNo claim is made about team size, formal user research, adoption, or business ownership because those details are not established by the implementation.",
      designProcess:
        "The work evolved from a single interactive concept into a modular application with clearly separated experiences. The shared title screen establishes the tone, previews the available modes, and gives users a simple choice before the denser controls appear.\n\nThe design then introduces complexity gradually. Solar and Creator each begin with a focused onboarding tour. Panels group related actions into World, Simulate, Tools, Scene, Build, Place, Events, Stats, Codex, Save, and FX areas. The Big Bang mode uses a chronological timeline so the visitor can move through the story without losing the current chapter or its explanation.\n\nThe interface was refined for both large screens and narrow layouts. Panels can collapse, timeline details can be disclosed, labels and controls have accessible names, and the application can recommend fullscreen without making it mandatory.\n\nThis progression reflects a deliberate preference for guided discovery first, then deeper control for visitors who want to continue exploring. Task-driven refinements for routing, onboarding, responsive controls, music, authoring, experimentation, wormhole travel, and Big Bang presentation shaped the final flow.",
      keyFeatures:
        "Solar Simulator — environments and inspection\nFive explorable environments including the Milky Way, Andromeda, Messier 87, Triangulum, and a fictional Wormhole Galaxy with eight modeled planets, an asteroid belt, distant galaxies, object labels, selectable targets, dossiers, and six camera styles.\n\nSolar Simulator — time and experimentation\nForward and reverse time, adjustable speed, timeline scrubbing, reset and present-time controls, reversible user events, and impact warnings with spawn, impact, laser, cursor-laser, zodiac, and wormhole interactions.\n\nGalaxy Creator — guided authoring\nSix galaxy types and a four-step setup flow for type, structure, population, and physics with controls for galaxy name, diameter, arms, core, thickness, density, dust, clusters, mass, dark matter, rotation, and star formation.\n\nGalaxy Creator — procedural universe and inspection\nProcedurally generated stars, nebulae, systems, planets, moons, atmospheres, dusty orbits, events, statistics, and encyclopedia entries with a dedicated stellar-system view, simulation speeds up to one million times, and inspection controls.\n\nBig Bang Timeline — chronological journey\nEleven chronological stages from the beginning of the universe through the distant future with play, pause, reverse, speed controls, direct chapter selection, timeline scrubbing, expansion-rate control, continuous camera movement, chapter dossiers, compact badges, and a hide-UI option.\n\nShared experience and persistence\nBundled scene-specific music, settings for display, graphics, camera, interface, and audio, mobile-collapsed panels, named local saves with presets, shareable Solar scene links, Creator JSON export/import with save slots, and downloadable screenshots.",
      techStack:
        "The case study remains human-readable, while this section records the actual technologies used:\n- JavaScript with native modules — the application behavior, simulation rules, navigation, and interaction logic.\n- HTML — semantic structure for buttons, dialogs, tabs, sliders, labels, and information panels.\n- CSS — the visual system, glass panels, transitions, responsive layouts, and narrow-screen behavior.\n- Three.js 0.170.0 and WebGL — 3D scenes, cameras, lighting, particles, procedural environments, and visual effects.\n- Vite 8.1.5 — local development, module loading, asset handling, and production bundling.\n- Browser APIs — local storage for preferences and saves, file, Blob, URL, and canvas APIs for export and screenshots, fullscreen and device-orientation support, audio playback, and hash-based navigation.\n- Bundled MP3 audio — scene-specific music included with the application rather than loaded from an online service.\n- Node.js built-in test runner — automated checks for simulation rules, persistence, routing, accessibility contracts, responsive behavior, and shared helpers.\n\nThere is no backend, external API, online service, account system, cloud synchronization, collaboration layer, or database. Preferences and saves remain in the browser that created them, and Creator JSON export is the available portable backup path.",
      challenges:
        "Keeping three demanding experiences inside one application\nThe shared navigation flow destroys inactive simulations, cancels their browser work, and removes their visual resources before another mode takes over. This prevents old scenes from continuing to run in the background.\n\nKeeping controls usable while the 3D scene stays visible\nActions are grouped into focused panels with collapse and disclosure controls, and the layout adapts for narrow screens instead of shrinking every control indefinitely.\n\nSurviving a reload without a server\nThe application sanitizes stored data, keeps separate onboarding completion for Solar and Creator, and degrades to safe defaults when storage is unavailable. A remaining limitation is that Creator save feedback does not yet clearly surface every storage-write failure.\n\nMixing established references with fictional content\nThe fictional Wormhole Galaxy lives inside the same visual language as ordinary black-hole behavior while remaining distinct. Scientific simplifications and speculative material should still be identified more explicitly in a future pass.",
      finalProduct:
        "The finished journey begins at a title screen with a live cosmic backdrop, music, a Start action, settings, and a mode-selection path. Visitors can preview the other experiences and choose the level of structure they want.\n\nIn Solar, a short tour explains navigation and inspection before the visitor reaches the full control surface. They can choose an environment, select a body or galaxy, move the camera, adjust time, open information panels, trigger experiments, and preserve a scene locally.\n\nIn Creator, the visitor moves through four setup steps before entering a generated galaxy. From there, they can inspect statistics, place systems and objects, evolve the galaxy, read Codex entries, enter a stellar system, change visual effects, save their work, export it, or capture a cinematic image.\n\nIn Big Bang, the visitor begins a guided presentation and moves through eleven cosmic stages. They can scrub or reverse the timeline, change the expansion rate and camera, read the current chapter details, and reach a replayable ending.\n\nThe result is a single experience that can feel like a simulation, a creation tool, or an interactive lesson depending on the path a visitor chooses. The three modes stay connected through shared navigation and lifecycle handling that cleans up inactive scenes before switching.",

      results:
        "- The current implementation passed 200 automated tests with no failures and the production build completed successfully.\n- Live browser inspection confirmed the title and mode-selection flow, the Creator setup and workspace, the Big Bang title and active timeline, and Solar controls with shared settings and narrow-screen presentation.\n- The build still reports an advisory that one generated JavaScript chunk is larger than the recommended size.\n- The inspected browser emitted a non-fatal WebGL shader warning with no application error observed during the pass.\n- Gyroscope behavior on a real phone, complete download-and-reimport round trips, browser-storage quota or write failures, and full-length sessions through every timeline ending remain not physically exercised in this review and are covered by automated tests and source inspection.",
      lessons:
        "What worked\n- A visually rich experience still needs a clear first step with mode selection and short tours.\n- Keeping state local and explicit with separate saves, settings, route cleanup, and onboarding keys makes the application predictable.\n- Guided discovery first, then deeper control for visitors who want to continue exploring.\n- Automated checks protect rules and structure while real browser sessions reveal layout and lifecycle issues.\n\nWhat could improve\n- Surface Creator storage-write failures more clearly in save feedback.\n- Identify scientific simplifications and fictional content such as the Wormhole Galaxy more explicitly.\n- Reduce the large generated JavaScript chunk below the recommended size.\n- Verify gyroscope, export/import round trips, storage quota, and full timeline sessions on real devices.\n\nFuture considerations\n- Adding explicit labels for reference material, simplified models, and speculative content to strengthen trust without removing imagination.\n- Considering truthful feedback for every persistence failure and a clearer quota strategy.\n- Exploring further responsive refinements and lifecycle cleanup as the experience grows.",
      problemNotes: [
        { title: "Scale is hard to grasp", detail: "Numbers and diagrams alone feel distant" },
        { title: "Need for immediacy", detail: "Large ideas must be explorable, not passive animation" },
        { title: "Three learning modes", detail: "Discovery, creation, and narrative as one product" },
        { title: "Controls must stay coherent", detail: "Local persistence without a server or account" },
      ],
      solutionNotes: [
        { title: "Solar Simulator", detail: "Move, inspect, change time, and create events" },
        { title: "Galaxy Creator", detail: "Choose type, shape structure, seed population, tune physics" },
        { title: "Big Bang Timeline", detail: "Eleven stages with scrubbing, reverse, and camera control" },
        { title: "Shared entry and saves", detail: "Guided tours, responsive panels, and local persistence" },
      ],
      designPrinciples: [
        {
          title: "Establish tone before density",
          detail: "Shared title screen previews modes before dense controls appear",
          badge: "Entry",
        },
        {
          title: "Introduce complexity gradually",
          detail: "Mode-specific tours and grouped panels reveal depth over time",
          badge: "Progression",
        },
        {
          title: "Keep dense controls usable",
          detail: "Collapsible panels and disclosure keep the 3D scene visible",
          badge: "Layout",
        },
        {
          title: "Support multiple screen sizes",
          detail: "Responsive behavior with accessible names and optional fullscreen",
          badge: "Responsive",
        },
        {
          title: "Treat modes as one journey",
          detail: "Routing and lifecycle cleanup keep experiences connected",
          badge: "Cohesion",
        },
      ],
    },
  },
  {
    id: 10,
    title: "Qyzen Learning Platform",
    description:
      "Role-based learning platform for academic institutions — administrators, educators, and students share one academic record system.",
    role: "Product design + full-stack development",
    outcome: "Role-scoped academic workflows in one shared record system.",
    tags: ["Laravel", "PHP", "MySQL"],
    icon: siLaravel,
    repositoryUrl: "https://github.com/iChicoRito/Qyzen-Laravel",
    liveUrl: "https://qyzen.space/",
    coverImage:
      "https://opengraph.githubassets.com/29762ca625490081d1d9dd88f88b7ce813328964abb4362d779307d86902679c/iChicoRito/Qyzen-Laravel",
    banner: "/assets/banner/Banner - Qyzen - Dark.png",
    bannerDark: "/assets/banner/Banner - Qyzen - Dark.png",
    bannerLight: "/assets/banner/Banner - Qyzen - Light.png",
    caseStudy: {
      overview:
        "Qyzen Learning Platform is a role-based learning workspace that brings administrators, educators, and students into one shared academic record system.\n\nAdministrators prepare the institutional structure and accounts, educators organize classes, assessments, scores, materials and announcements, and students study, complete server-graded assessments, and review their records. Each role opens a different home and navigation that matches its daily work, yet all operate on the same years, terms, sections, subjects, enrollment, assessments and scores.\n\nShared calendars, notifications, profiles and one-to-one conversations keep planning and communication connected without splitting the experience across separate tools.",
      problem:
        "Academic operations were typically scattered across separate admin screens, class lists, assessment tools, spreadsheets, file storage and messaging. That separation made it difficult to keep enrollment, visibility, scoring and content aligned and forced repeated manual reconciliation whenever a student, class or assessment changed.\n\nWithout role-specific workspaces, institutions risked exposing the wrong data to the wrong audience, allowing grading to be bypassed on the client, and losing continuity when imports, exports or archives were handled outside a single durable system.",
      solution:
        "Qyzen organizes the product around the academic lifecycle. Years and terms contain sections and subjects, enrollment links students to classes, and assessments move from question banks to assignments, submissions, server-side grading and records.\n\nEach role receives a dedicated workspace with clear boundaries. Administrators manage users, roles, years, terms, permissions and settings. Educators manage sections, subjects, enrollment, question banks, assessments, scores, materials and announcements. Students see only enrolled classes, complete assessments that are graded on the server, and receive scores, records and messages, while calendars, notifications and conversations remain shared with role-scoped visibility.",
      role: "- Defining separate journeys for administrators, educators and students from onboarding to daily academic work.\n- Connecting interface actions to server workflows for accounts, classes, assessments, scores, content, notifications and conversations.\n- Protecting each role with route areas, policies, ownership checks and enrollment-scoped visibility.\n- Preserving records through spreadsheet imports and exports, archives with restore, durable file storage and backup tools.\n- Verifying behavior with 374 PHPUnit tests covering 1801 assertions and a successful Vite production build.\n\nWork covered product definition, Laravel implementation, consistent interface patterns with Tailwind and Metronic KTUI, and validation that every view reflects the viewer’s permissions, enrollment and timing.",
      designProcess:
        "The design started lifecycle-first before refining individual screens. Years and terms contain sections and subjects, enrollment follows, then question banks, assessments, submissions, grading and records, so the data model matches how institutions actually plan a term.\n\nShared interface patterns keep the product predictable across roles. Tables, filters, modals, toasts, date pickers, calendars and rich-text editors behave the same whether the viewer is an administrator, educator or student, while the server chooses whether to return a full page or an internal JSON or HTML fragment.\n\nSecurity and preservation shape the interaction model. Route areas, policies and query scopes enforce visibility, grading runs only on the server, files are served through authenticated checks, and archive with restore keeps academic history durable without leaving orphaned records.",
      keyFeatures:
        "Administration and onboarding\nAdministrators create and manage users and roles, configure years, terms, permissions and settings, and onboard accounts with validated spreadsheet templates and bulk import feedback that surfaces row-level errors.\n\nEducator workspace\nEducators create and manage sections and subjects, handle enrollment, build question banks, assemble assessments, assign work to classes, grade submissions and publish scores and feedback within the enrolled context.\n\nStudent assessment journey\nStudents see only enrolled classes and assigned work, complete assessments in an authenticated session, submit once for server-side grading, and review scores, records and related messages.\n\nAcademic records\nScores, enrollment history and assessment results remain tied to years, terms, sections and subjects, with Excel exports for reporting and archives that can be restored when terms roll over.\n\nLearning content and announcements\nMaterials and announcements are scoped to sections and subjects, stored through private authenticated file access, and surfaced consistently across role-specific timelines.\n\nShared planning and communication\nCalendars, notifications and one-to-one conversations are available to all roles with role-scoped visibility, keeping planning and messaging connected to the academic record rather than isolated in separate tools.",
      techStack:
        "The case study remains human-readable, while this section records the actual technologies used:\n- PHP 8.3 & Laravel 13 — backend framework, routing, policies and domain logic for role-based workflows.\n- Blade, HTML, CSS & JavaScript — server-rendered pages with progressive enhancement and shared interface patterns.\n- Tailwind CSS 4 & Metronic KTUI — utility styling and reusable components for tables, modals and calendars.\n- Vite — development server and production bundling for frontend assets.\n- SQLite & MySQL — relational persistence with migrations, factories and seeders across environments.\n- Laravel Fortify & Socialite with Google OAuth — credential authentication and Google sign-in flows.\n- Laravel Mail with Gmail SMTP, Maatwebsite Excel, PhpSpreadsheet, Quill, Flatpickr & FullCalendar — transactional mail, spreadsheet imports and exports, rich editing, date picking and calendars.\n- PHPUnit & Echo with Pusher and Reverb — 374 tests with 1801 assertions and optional real-time with polling fallback.\n\nNo public API is exposed; the server drives pages and internal JSON and HTML fragments for web use, with Google, mail and WebSocket features dependent on configuration.",
      challenges:
        "Keeping role data separate\nRoute areas, policies, ownership checks and enrollment-scoped queries prevent cross-role leakage, while distinct homes and navigation reduce accidental exposure at the interface level.\n\nProtecting assessment integrity\nGrading runs only on the server, submissions are validated and scoped to enrollment and timing, and question and answer visibility is limited so client tampering cannot alter results.\n\nSupporting real academic operations\nValidated spreadsheet templates, import error feedback, Excel exports for assessments and scores, durable storage for materials, and archive with restore and backup tooling reflect how institutions actually onboard and preserve data.\n\nWorking across hosting constraints\nPrivate file storage avoids public disk exposure, and real-time features through Echo with Pusher or Reverb gracefully fall back to dormant polling when configuration or hosting does not provide WebSockets.",
      finalProduct:
        "Every role opens a distinct home and navigation that matches its daily work. Administrators start from user, role and term management, educators from sections and assessments, and students from enrolled classes and pending work, all within one academic record system.\n\nLearning flows through a shared lifecycle from years and terms to enrollment and assessment. Years and terms contain sections and subjects, enrollment links students to classes, question banks feed assessments, submissions are server-graded, and scores remain visible to enrolled participants.\n\nThe server keeps each workspace visible only to its audience. Route areas, policies and query scopes restrict data, server-side grading prevents client tampering, and private files are served only after authentication and authorization checks.\n\nAcademic records remain preservable across imports, exports, archives and backups. Spreadsheet templates with validation support bulk onboarding, Excel exports carry assessments and scores, archives can be restored, and durable storage with backup tools protects uploaded content and materials.\n\nThe experience is a web workspace backed by Laravel and a relational database. No public API is exposed, the server returns full pages or internal JSON and HTML fragments, and Google OAuth, mail delivery and WebSocket presence through Echo with Pusher or Reverb remain configuration-dependent rather than guaranteed.",
      results:
        "- Administration, educator and student workflows operate end-to-end within one shared record system.\n- 374 PHPUnit tests with 1801 assertions passed, covering permissions, enrollment visibility, grading and content workflows.\n- Vite production build completed successfully for frontend assets.\n- No adoption, usability or business metrics are claimed because none were measured for this implementation.\n- Browser coverage, deployment and Google, mail and WebSocket integrations remain configuration-dependent and were not physically exercised beyond automated checks.",
      lessons:
        "What worked\n- Treating permissions, ownership, timing and preservation as interface concerns keeps each role’s view honest and predictable.\n- Designing around years, terms, sections, subjects, enrollment and assessments before polishing individual screens kept the lifecycle coherent.\n- Reusing tables, modals, toasts, date pickers, calendars and editors across roles maintained visual and behavioral consistency.\n- Validated imports and exports with durable storage, archives and backup tooling matched real operational needs.\n\nWhat could improve\n- Surface import validation, storage write and archive feedback more explicitly so failures are never silent.\n- Document hosting-dependent configuration for Google OAuth, mail and WebSocket presence more clearly for deployers.\n- Add deeper accessibility and mobile verification for calendar, editor and announcement flows.\n- Exercise full enrollment to grading to record round trips on non-local hosting to confirm private file and polling behavior.\n\nFuture considerations\n- Consider explicit labeling for configuration-dependent features versus always-available academic operations.\n- Evaluate stronger quota, retention and recovery guidance for files, exports and archives.\n- Explore further real-time presence refinements that degrade cleanly when WebSockets are unavailable.\n- Keep lifecycle-first planning as the anchor when extending the product to new academic structures.",
      problemNotes: [
        {
          title: "Work split across tools",
          detail: "Admin screens, class lists, assessment tools, spreadsheets and storage stayed disconnected",
        },
        {
          title: "Visibility and integrity risk",
          detail: "Wrong data reaching the wrong role and client-side grading paths",
        },
        {
          title: "Records without continuity",
          detail: "Imports, exports, archives and backups lacked one durable path",
        },
      ],
      solutionNotes: [
        {
          title: "Lifecycle as backbone",
          detail: "Years and terms contain sections, subjects and enrollment before assessments and scores",
        },
        {
          title: "Role-specific workspaces",
          detail: "Admins, educators and students share one record system with scoped homes",
        },
        {
          title: "Server-enforced boundaries",
          detail: "Route areas, policies, scopes, server grading and private files",
        },
        {
          title: "Preserved academic data",
          detail: "Validated templates, exports, archives, restores and durable storage",
        },
      ],
      designPrinciples: [
        {
          title: "Lead with the academic lifecycle",
          detail: "Years and terms contain sections and subjects before enrollment, banks and assessments follow",
          badge: "Lifecycle",
        },
        {
          title: "Reuse consistent interaction patterns",
          detail: "Tables, modals, toasts, date pickers, calendars and editors behave the same across roles",
          badge: "Consistency",
        },
        {
          title: "Let the server choose the response shape",
          detail: "Routes return full pages or internal JSON and HTML fragments without a public API",
          badge: "Flexibility",
        },
        {
          title: "Protect each role at the server",
          detail:
            "Route areas, policies and query scopes enforce visibility with server-side grading and private files",
          badge: "Security",
        },
        {
          title: "Make records preservable and restorable",
          detail: "Validated imports, exports, archive and restore flows keep academic data durable",
          badge: "Preservation",
        },
      ],
    },
  },
  {
    id: 11,
    title: "Minto",
    description:
      "Minto is a deterministic, browser-local prompt enhancement workspace that turns rough instructions into structured Markdown prompts without a backend.",
    role: "Product design + frontend development",
    outcome: "Deterministic prompt enhancement that works offline.",
    tags: ["TypeScript", "Next.js", "Dexie"],
    icon: siMarkdown,
    repositoryUrl: "https://github.com/iChicoRito/minto",
    image: "/assets/icons/minto-icon-v1.png",
    coverImage:
      "https://opengraph.githubassets.com/51e3ac0d9befa03c5a568b6ca8e5ef5e978bf4ac09d21ba4670211991b1e6743/iChicoRito/minto",
    banner: "/assets/banner/Banner - Minto.png",
    caseStudy: {
      overview:
        "Minto is a web application that turns rough, informal instructions into clear, structured prompts formatted in Markdown. The Prompt Enhancement Engine is its core capability — a deterministic, browser-local system that analyzes a user's raw text and generates a well-organized prompt without requiring a backend service.\n\nThe engine is built as a pure TypeScript module with no framework or storage dependencies. It runs entirely in the browser, supports 13 distinct task types across four categories, and offers three enhancement strengths. It is complemented by a simple web workspace where users can paste a prompt, choose options, and immediately view, edit, copy, and save the result. An optional AI enhancement path can be enabled when a secure enhancement endpoint is configured, but the deterministic engine works fully offline and is the default privacy-preserving path.",
      problem:
        "Vague or unstructured prompts lead to inconsistent results when working with language models and collaborators. Many users know what they want but struggle to express requirements, constraints, and verification steps in a consistent format. Cloud-only tools raise privacy concerns and fail when offline.\n\nInformal instructions mix goals, omit constraints, and vary widely in phrasing and punctuation. Teams need a predictable way to impose structure without sending sensitive content off-device or depending on network availability.",
      solution:
        "A local-first engine that imposes structure predictably. It extracts the actionable parts of a prompt, infers the type of work being requested, selects an appropriate template of sections, and renders consistent Markdown. Because the same input always produces the same output with no network call, users get fast, private, reproducible results.\n\nFor cases where more creative rewriting is desired, the same workspace can route the request to an optional AI service through a single, validated HTTPS endpoint with timeout, abort, and schema checks. Deterministic and AI paths stay separate, so privacy is the default and creativity is opt-in.",
      role: "- Inspected the completed engine implementation across parsing, classification, templating, rule selection, and Markdown generation.\n- Traced the engine's integration with the workspace, state management, preferences, and local persistence.\n- Verified the absence of backend, API, database, and external service usage for the core deterministic flow.\n- Distinguished confirmed implementation facts from reasonable product interpretations.\n- Authored a portfolio-ready narrative that follows the required structure and avoids unsupported claims.",
      designProcess:
        "The analysis followed the implementation rather than a design proposal. It started from the engine's public contract — a single synchronous function that takes raw text and options and returns analysis, classification, and Markdown — and traced each pipeline stage.\n\nRaw text is normalized for whitespace and casing while vocabulary allow-lists extract an action verb, subject, technologies, constraints, and requirements. The classifier applies weighted-signal scoring with iterative suffix stripping for word variations, then derives confidence from both the strength of the top match and its distance from the next best match. Templates own structure as data: 13 task templates define light, standard, and detailed section orders as validated subsets. The workspace flow was followed from Enhance and Result tabs through state, validation, error handling, and local saving, and the optional AI contract was cross-checked against local preferences that control defaults without affecting engine purity.",
      keyFeatures:
        "Structured Slot Extraction\nIdentifies an opening action, a subject phrase, mentioned technologies from an explicit allow-list, preservation constraints, and bulleted or implied requirements from raw text.\n\nWeighted Classification with Confidence Gating\nScores text against curated signal tables for each task type, computes a 0–100 confidence score from top margin and absolute strength, falls back to the general category when evidence is weak or contested, and surfaces guidance when multiple types matched closely.\n\n13 Task Templates Across 4 Categories\nCovers development tasks like bug fixes, features, code review, refactoring, testing, and documentation; writing tasks like rewriting and summarization; research tasks like investigation and comparison; and design tasks like interface review and image prompts.\n\n24 Reusable Sections with Three Strengths\nLight returns a single polished sentence, standard adds requirements and verification, and detailed expands to a full structured document. The exact section order is owned by the template and validated as order-preserving subsets.\n\nSmart Section Selection\nDrops list-based sections when the corresponding extracted slot is empty, so a prompt without constraints does not generate an empty heading, while narrative sections receive default content downstream.\n\nLight Polish and Grammar Correction\nRewrites a prompt into a single clear sentence that honors constraints and preserves intent, with a separate grammar-only mode when no sections are selected.\n\nAuto-Detect or Manual Control\nUsers can let the engine infer the task type or choose it explicitly, toggle which of the five user-facing sections to include, and pick from 17 presets that preconfigure type, level, and sections.\n\nIntegrated Workspace\nA two-tab Enhance and Result experience with live character count, stale-state notice when controls change, progress indication with cancel, copy, export, and save actions, plus retry handling and dirty-state confirmation for edits.\n\nValidation and Safety Limits\nRejects empty prompts and enforces a 15,000-character maximum before enhancement begins, preventing oversized or empty submissions.\n\nLocal History and Library\nSuccessful results can be kept in on-device history and promoted to a personal library with folders and tags, both stored in IndexedDB and capped by a history-size preference.",
      techStack:
        "The case study remains human-readable, while this section records the actual technologies used:\n- TypeScript (strict) — Primary language for the engine and application, providing shared types for analysis results and templates and keeping the engine pure and predictable.\n- Next.js 16 (App Router) with React 19 — Hosts the workspace UI, static export for hosting, and a local development API route; the engine itself does not depend on either.\n- Prompt Engine module (pure TypeScript) — Self-contained pipeline of parser, classifier, templates, rules, and generator with no imports from React, Next.js, browser storage, or network code, which guarantees offline and testable behavior.\n- Zod — Validates enhancement requests and responses when the optional AI path is used, ensuring shape and size limits are enforced.\n- Zustand (with preferences provider) — Stores user preferences such as default enhancement level, default prompt type, included sections, and history limits, and persists them to cookies or local storage.\n- Dexie (IndexedDB wrapper) — Persists history, saved prompts, and folders entirely in the browser with no server database involved.\n- Tailwind CSS v4, shadcn/ui, Radix UI — Provide styling and accessible interface components for the workspace panels and controls.\n- Verification scripts (Node.js) — Hand-rolled harnesses that check parser, classifier, template, rules, generator, and full-pipeline behavior, including that the same input always yields byte-identical output.\n- PWA and static export tooling — Generate an installable offline build that excludes server-only routes, so the engine remains usable without a network.\n\nNo backend, database, or external service is required for the core deterministic flow. The optional AI path uses a single validated HTTPS endpoint with timeout, abort, and schema checks, and never runs unless explicitly configured.",
      challenges:
        "Ambiguity in natural language\nFree-form prompts vary widely in phrasing and punctuation. The solution normalizes whitespace and casing, uses allow-lists for verbs, technologies, and constraint phrases, and applies simple word-boundary matching rather than attempting full language understanding.\n\nOverconfident misclassification\nThin evidence or near ties could lead to the wrong specialization. The engine computes both the margin between the top two scores and the absolute evidence strength, rounds to a confidence value, maps it to high, medium, or low bands, falls back to the general template on low confidence, and surfaces guidance to choose manually.\n\nStemming trade-offs\nTo match variations like failing and fails without a full natural-language library, the classifier strips a small set of suffixes iteratively. This is intentionally limited and documented, so some irregular forms remain unmatched rather than guessed.\n\nAvoiding empty headings\nGenerating a heading with no content confuses users. The rule layer drops list-based sections when their extracted slot is empty while keeping narrative sections that receive default content downstream.\n\nKeeping templates consistent\nWith 13 templates each defining three levels, ordering mistakes would be hard to spot. Invariants are enforced: every level opens with Objective, contains no duplicates, and lighter levels are order-preserving subsets of stronger levels, checked by a validation routine across the registry.\n\nReproducibility vs. creativity\nUsers expect the same prompt to give the same result locally, but may also want AI creativity. The architecture separates the two: the deterministic path is synchronous and pure, while the AI path goes through a single validated HTTPS endpoint with timeout, abort, and schema checks.",
      finalProduct:
        "The user opens the home page and lands on the Enhance tab, which shows a greeting and a rounded input card. The workspace is ready immediately with no authentication required.\n\nThey paste a rough instruction, see the live character count toward the 15,000 limit, and optionally choose a task type, an enhancement level of light, standard, or detailed, and which sections to include. A preset can apply these choices in one click, and changing controls after enhancement marks the result as stale.\n\nSelecting Enhance runs the deterministic engine immediately or, when configured, calls the enhancement service with the chosen options. A progress indicator appears and the request can be canceled, with validation rejecting empty or oversized prompts before work begins.\n\nOn success the view switches to the Result tab. The generated Markdown appears in three interchangeable views: raw result, rendered preview, and editable Markdown; a badge indicates whether the result came from local rules or AI, and classification notes appear when confidence was low or multiple types matched.\n\nFrom the result the user can copy to clipboard, export as a Markdown file, re-enhance with updated input, or save to the local library. Saving and history pruning respect the history-size preference, edits are tracked as dirty state and confirmed before being replaced, and all history and library data stays on device.",
      results:
        "- Fully offline, private enhancement with no backend, database, or external service required for the core flow; engine isolation from framework, storage, and network imports confirms this.\n- Deterministic output: repeated calls with the same prompt and options produce byte-identical Markdown, verified by a dual-run byte-equality harness across parser, classifier, template, rules, generator, and full pipeline.\n- Real usage coverage with 13 task types, 24 sections, 17 presets, three levels, and five user-selectable sections, plus validation that rejects empty submissions and enforces the 15,000-character limit.\n- Local-first storage via IndexedDB keeps history and library available across sessions without a server, capped by a user preference.\n- No adoption numbers, performance benchmarks, or business impact figures are reported because none are established by the codebase itself.\n- Cross-browser offline behavior, accessibility beyond the component library defaults, and performance under the maximum character limit remain not physically tested.",
      lessons:
        "What worked\n- Strict separation between a pure engine and the surrounding application keeps behavior easy to reason about and verify.\n- Letting templates own structure as data and reserving rules for dropping empty list sections avoids reordering bugs and makes subset invariants straightforward.\n- An explicit allow-list approach is more maintainable than guessing intent and makes unsupported technologies visibly ignored.\n- Confidence gating with fallback to the general template builds trust compared to confidently choosing the wrong specialization.\n- A thorough harness with dual-run byte-equality checks catches subtle non-determinism that unit assertions alone miss.\n\nWhat could improve\n- Grow the technology and constraint allow-lists intentionally as new domains appear rather than hallucinating support.\n- Surface low-confidence and near-tie guidance more prominently in the workspace to encourage manual type selection.\n- Verify offline behavior, accessibility, and performance at the 15,000-character limit across browsers and devices.\n- Add clearer feedback when list-based sections are dropped due to empty slots so users understand why headings are absent.\n\nFuture considerations\n- Keep the deterministic path synchronous and pure while the optional AI path remains a single validated HTTPS endpoint with timeout and abort.\n- Consider PWA installability and static export as the default offline distribution, excluding server-only routes.\n- Preserve local-first history and library with user-capped preferences and portable export where appropriate.\n- Maintain template subset invariants with automated validation as new task types or sections are added.",
      problemNotes: [
        {
          title: "Vague prompts, inconsistent results",
          detail: "Unstructured instructions lead to unpredictable outputs",
        },
        {
          title: "Hard to express completely",
          detail: "Requirements, constraints, and verification steps are often missing",
        },
        {
          title: "Privacy and offline risk",
          detail: "Cloud-only tools expose content and fail without a network",
        },
        {
          title: "No consistent format",
          detail: "Teams lack a reproducible structure for prompts",
        },
      ],
      solutionNotes: [
        {
          title: "Local-first deterministic engine",
          detail: "Same input always produces same Markdown with no network call",
        },
        {
          title: "Extract and infer structure",
          detail: "Action, subject, technologies, constraints, and requirements",
        },
        {
          title: "Template-driven Markdown",
          detail: "13 types and 24 sections with light, standard, and detailed strengths",
        },
        {
          title: "Validated optional AI path",
          detail: "Single HTTPS endpoint with timeout, abort, and Zod checks when configured",
        },
      ],
      designPrinciples: [
        {
          title: "Start from the public contract",
          detail: "One synchronous function text plus options returns analysis and Markdown",
          badge: "Contract",
        },
        {
          title: "Normalize and allow-list",
          detail: "Whitespace and casing normalized with explicit verb, tech, and constraint lists",
          badge: "Parsing",
        },
        {
          title: "Score with confidence gating",
          detail: "Weighted signals and suffix stripping with margin and strength mapped to bands",
          badge: "Classification",
        },
        {
          title: "Templates own structure",
          detail: "13 templates define light, standard, and detailed orders as validated subsets",
          badge: "Structure",
        },
        {
          title: "Rules handle only emptiness",
          detail: "Drops list-based sections when slots are empty to avoid hollow headings",
          badge: "Clarity",
        },
      ],
    },
  },
];
