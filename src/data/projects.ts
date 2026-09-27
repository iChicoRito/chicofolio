import type { SimpleIcon as SimpleIconType } from "simple-icons";
import { siExpo, siLaravel, siMarkdown, siRocket, siTauri, siTodoist } from "simple-icons";

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
  repositoryUrl?: string;
  liveUrl?: string;
  image?: string;
  /** Icon for dark mode, when `image` is too dark on a dark background. */
  imageDark?: string;
  coverImage?: string;
  banner?: string;
  bannerDark?: string;
  bannerLight?: string;
  caseStudy?: CaseStudy;
}

export const placeholderCaseStudy: CaseStudy = {
  overview: "A short look at the project, what it set out to do, and who it is for.",
  problem: "The problem or missing piece that made this project worth building.",
  solution: "How the project solves that problem, and the main choices behind it.",
  role: "What I worked on, from the first idea and design to building and launching it.",
  designProcess: "How the screens grew from early sketches into the finished design.",
  keyFeatures: "The main things the product can do.",
  techStack: "The languages, frameworks, and tools used to build it.",
  challenges: "The hardest problems along the way, and how I solved them.",
  finalProduct: "What the finished product looks like and how people use it.",
  results: "What happened after launch, including feedback and results.",
  lessons: "What I would do differently, and what I took into later work.",
};

export const projects: Project[] = [
  {
    id: 7,
    title: "RemindLy",
    description:
      "RemindLy is a personal task and reminder app that helps people remember what needs to be done and when.",
    role: "Product design + mobile development",
    outcome: "Reminders that work without internet and stay correct when tasks change.",
    tags: ["Flutter", "Dart", "Hive"],
    icon: siTodoist,
    repositoryUrl: "https://github.com/iChicoRito/RemindLy-Flutter",
    image: "/assets/icons/remindly.webp",
    coverImage:
      "https://opengraph.githubassets.com/11eb2d675aa8987a7710b3920a90f6396f0ca8281fc2412d2cf893527f4a653c/iChicoRito/RemindLy-Flutter",
    banner: "/assets/banner/Banner - RemindLy.png",
    caseStudy: {
      overview:
        "RemindLy is a personal task and reminder app that helps people remember what needs to be done and when.\n\nTasks is one of the main parts of the app, next to Home, Spaces, and Profile. It brings together adding tasks, planning, notes, categories, and reminders in one place.\n\nEverything is saved on the phone. A person can add a task, pick when it should happen, get reminders, and respond to an alarm without an account or an internet connection.",
      problem:
        "People do not plan every task the same way. Some tasks have no set time. Some have one deadline. Others run from a start time to an end time.\n\nThe app had to handle all three without making it confusing to add a task. Reminders also had to stay correct when a task was changed, finished, deleted, or opened again after the app was closed.\n\nWhen a task is due, the app has to get the person's attention even if it is not open. The reminder needs to be clear, easy to notice, and easy to act on.",
      solution:
        "RemindLy follows a simple path:\n- The person adds a task from the task list or the calendar.\n- The task is checked and saved on the phone.\n- The app sets up the right reminders for that task.\n- The person gets early reminders and a final alert when the task is due.\n- The alert shows the task details and offers a clear way to stop or snooze it.\n\nThere are three timing choices:\n- No Time: the task is saved with no reminders.\n- Due Time: the person gets reminders 10 minutes and 5 minutes before the deadline, then an alert at the deadline.\n- Time Range: the person gets a reminder 5 minutes before the start, another 5 minutes before the end, and an alert when the time is up.\n\nWhen a task changes, RemindLy clears its old reminders before setting new ones. When a task is finished or deleted, its reminders stop too.\n\nWhen the app opens again, it looks through saved tasks and brings back any reminders that are still needed. If several unfinished tasks are due at the same time, one alert shows them all.",
      role: "- Deciding what a task holds: title, description, notes, category, priority, date, time, done or not done, and attachments.\n- Designing clear screens for the task list, calendar, adding, editing, and task details.\n- Supporting both quick task entry and more detailed planning.\n- Keeping reminders in step with every task change.\n- Handling early reminders, due alerts, stopping an alert, and snoozing it for five minutes.\n- Making the alarm hard to miss with sound, vibration, and a screen that stays on.\n- Bringing back needed reminders after the app was closed or sent to the background.\n- Testing the main task, reminder, saving, adding, and alarm features with repeatable checks.",
      designProcess:
        "Make time choices easy to understand\nInstead of asking people to build a reminder from many separate settings, the task form offers three clear choices: No Time, Due Time, and Time Range. Each choice only shows the date and time fields it needs.\n\nUse one simple rule for changes\nEvery time a task is saved, RemindLy replaces its old reminders with new ones based on the latest details. This stops an old deadline from still sending alerts after the task has changed.\n\nKeep the task and the alert connected\nThe due alert loads the latest saved task details. It can show the task title, category, description, and notes instead of a generic message.\n\nPlan for interruptions\nThe app remembers an active alert while it closes, sits in the background, or opens again. When the person comes back, the alert shows again instead of quietly disappearing.\n\nUse stronger phone alerts for urgent tasks\nNormal reminders use regular phone notifications. The final due alert can use the phone's stronger alarm features: a full-screen alert, sound, vibration, and quick action buttons.",
      keyFeatures:
        "Adding and editing tasks\nThe person can enter a title, short description, category, priority, date, time, and an optional space. The form checks for missing details before saving. The task details screen also supports notes, attachments, marking as done, pinning, archiving, and deleting.\n\nTask list and calendar\nTasks can be viewed as a list or on a calendar. The list can be filtered by search, category, priority, progress, or whether a task is protected. The calendar shows tasks with a set time and lets the person add or change tasks from the selected date.\n\nEarly reminders\nDue Time tasks get two early reminders. Time Range tasks get one reminder before they start and another before they end. Tasks with no time get no reminders.\n\nDue alerts\nWhen a task is due, the app can show a high-priority alarm with the task title and useful details. If more than one unfinished task is due in the same minute, the alert shows them together in one scrolling list.\n\nStop or snooze an alert\nThe full-screen alarm has a Dismiss Alarm button. The phone notification also has Dismiss and Snooze 5 min buttons, so the person can put off the alert without opening the task first.\n\nBringing reminders back\nWhen the app starts, it looks through saved tasks and sets up future reminders again. It also checks for tasks that became due while the app was open, so the person still sees the alert even if they were not using the app.",
      techStack:
        "The story above is written for everyone. This section lists the actual technologies used:\n- Flutter and Dart — the app screens, forms, lists, calendar, task handling, and alarm screen.\n- Hive and Hive Flutter — saving tasks, categories, and spaces on the phone.\n- Shared Preferences — saving the display name and whether an alarm needs to be shown again.\n- Flutter Local Notifications — scheduled reminders, notification buttons, and alert messages.\n- Timezone and Flutter Timezone — reminder timing based on the person's local time.\n- Kotlin and Android AlarmManager — Android alarms that can wake the phone and show an urgent alert.\n- MethodChannel — the link between the Flutter app and Android's alarm features.\n- Flutter Ringtone Player, Vibration, and Wakelock Plus — alarm sound, vibration, and keeping the screen on.\n\nThere is no online account, internet backup, or task sharing in this feature.",
      challenges:
        "Keeping reminders correct after changes\nChanging a date, time, title, or whether a task is done can make an old reminder wrong. RemindLy clears the old reminders first, then sets new ones from the latest task details.\n\nSupporting different kinds of schedules\nA single deadline and a start-to-end time need different reminders. The three timing choices keep this clear for the person and the same across the task list, calendar, and alerts.\n\nGetting attention at the right moment\nA normal notification is easy to miss. For the final due alert, the app can use a louder alarm with sound, vibration, a full-screen alert, and quick buttons.\n\nHandling several tasks due at once\nShowing one task and hiding the rest would leave the alert incomplete. The alarm screen finds all unfinished tasks due in the same minute and lists them together.\n\nWorking on different devices\nPhone alarms are stronger than browser alerts. The browser version does not show reminder alerts, and asking for alert permission on Apple devices needs a clearer step. These are current limits, not claims that it works the same everywhere.",
      finalProduct:
        "After the welcome screens, the person opens Tasks from the main screen or starts from a date on the calendar. They tap Add Task or Schedule, fill in the details, choose No Time, Due Time, or Time Range, and save.\n\nThe task shows up in the list or calendar and is still there after the app is closed and opened again. RemindLy sets up the right early reminders and final alert based on the timing choice.\n\nWhen the time comes, the person sees the task title and details in the alarm. They can dismiss it or snooze it for five minutes. Finishing or deleting the task stops future alerts. Archiving also stops alerts, and restoring the task sets them up again when needed.",
      results:
        "- Tasks, categories, spaces, dates, times, notes, and done status stay saved on the phone.\n- Tasks with no time stay quiet, while timed tasks get the right early reminders and final alert.\n- Editing a task replaces old reminders instead of leaving outdated alerts behind.\n- Finishing, deleting, or archiving a task stops its reminders.\n- A due alert can show several tasks together, with useful details.\n- A person can dismiss an alarm or snooze it for five minutes.\n- On August 17, 2026, 46 focused checks covering task timing, saving, reminders, adding tasks, and the alarm screen all passed.\n\nNo claims are made about user numbers, productivity, or speed, because the project did not measure them. A real phone alarm was not tested during this review; phone behavior was checked against the finished code.",
      lessons:
        "What worked\n- Saving everything on the phone keeps the main features working without internet.\n- Three simple timing choices make different kinds of tasks easier to plan.\n- Replacing old reminders every time a task changes keeps things predictable.\n- Showing the latest task details in the alarm makes it more useful than a generic message.\n- Sound, vibration, and a full-screen alarm make urgent alerts easier to notice.\n\nWhat could improve\n- Add a clearer step for allowing reminders on Apple devices.\n- Test the alarm on real phones, including when the screen is locked.\n- Decide whether reminders should come back right after a phone restart, before the app is opened.\n\nFuture ideas\nOnline backup, syncing between devices, repeating tasks, and reminders sent from a server would each be separate product decisions. They are not part of the finished Tasks & Reminders feature.",
      problemNotes: [
        { title: "People plan tasks differently", detail: "No time, one deadline, or a start and end time" },
        { title: "Adding a task should stay simple", detail: "Handle each kind of schedule without confusion" },
        { title: "Reminders must stay correct", detail: "After edits, finishing, deleting, and reopening" },
        { title: "Due tasks need attention", detail: "Clear, easy to notice, and easy to act on" },
      ],
      solutionNotes: [
        { title: "A simple task path", detail: "Add, save, set reminders, get alerts" },
        { title: "Three timing choices", detail: "No Time, Due Time, or Time Range" },
        { title: "Reminders stay correct", detail: "Old reminders replaced whenever a task changes" },
        { title: "Nothing lost on reopen", detail: "Needed reminders come back and due tasks show together" },
      ],
      designPrinciples: [
        {
          title: "Make time choices easy to understand",
          detail: "No Time, Due Time, and Time Range — each shows only what it needs",
          badge: "Timing",
        },
        {
          title: "Use one simple rule for changes",
          detail: "Old reminders are replaced on every save with the latest details",
          badge: "Reliability",
        },
        {
          title: "Keep the task and the alert connected",
          detail: "The alert shows the latest task title, category, description, and notes",
          badge: "Context",
        },
        {
          title: "Plan for interruptions",
          detail: "An active alert is remembered when the app closes, goes to the background, or reopens",
          badge: "Recovery",
        },
        {
          title: "Use stronger phone alerts for urgent tasks",
          detail: "Full-screen alarm with sound, vibration, and quick buttons",
          badge: "Attention",
        },
      ],
    },
  },
  {
    id: 8,
    title: "Spillr",
    description:
      "Spillr is a mobile conversation card game. You pick a deck, play a timed round, and see your result, all in one smooth flow.",
    role: "Product design + mobile development",
    outcome: "A smooth path from picking a deck to seeing your result, with progress saved on the phone.",
    tags: ["TypeScript", "React Native", "Expo"],
    icon: siExpo,
    repositoryUrl: "https://github.com/iChicoRito/Spillr",
    image: "/assets/icons/spillr.webp",
    coverImage:
      "https://opengraph.githubassets.com/2036349ca693829a22084b1bd667c211079aa648b22cd2bac5c364bff05774d1/iChicoRito/Spillr-Expo",
    banner: "/assets/banner/Banner - Spillr.png",
    caseStudy: {
      overview:
        "Spillr is a mobile conversation card game. This story covers the full path from picking a deck to playing a timed round, seeing the result, and checking your progress.\n\nThe finished game includes picking a deck, a short intro, playing cards, results, daily streaks, saved stats, play history, sound, and phone reminders. Everything is saved on the phone, so a round never needs a server or an online account.\n\nThe goal is a casual group game that is quick to start, fun while playing, and rewarding after each round.",
      problem:
        "The game needed more than a list of cards. Players needed an easy way to pick a topic, know when a round was ready, act on each card, and understand what their choices meant at the end.\n\nThe game also needed to link each round to the player's bigger picture, like streaks, stats, and history, without needing an online account.",
      solution:
        "The game links these moments into one guided path. A swipeable row of decks leads to a short animated intro. Then each card gives a simple choice: answer it, pass it, or end the round. A two-minute timer keeps things moving, and the result screen turns the mix of answers and passes into its own ending.\n\nEach round also feeds the rest of the app. Finished rounds update the player’s streak, stats, and play history. Music, sound effects, and optional phone reminders carry the fun beyond the cards.",
      role: "- Turning the provided screen designs into one connected game flow.\n- Building every in-game moment: the intro, flipping cards, answering, passing, running out of time, ending a round, and leaving safely.\n- Linking game results to streaks, stats, and play history saved on the phone.\n- Managing background music, sound effects, animations, and phone reminders across screens.\n- Handling unfinished cases like an empty deck, a lost streak, reminders being turned off, or a player leaving early.",
      designProcess:
        "The work started from the provided screen designs and a walk-through of the whole player journey. Colors, spacing, and building blocks were kept the same across the play, game, result, profile, and history screens.\n\nA few choices shaped the final flow:\n- Every finished round is saved the same way, whether the player reaches the last card, ends early, or runs out of time.\n- One rule decides the result for both the result screen and the history list, so the ending you see is the ending that gets saved.\n- Music follows whichever screen is open, and result sounds are set to play only once, even if the screen refreshes.\n- A confirm step protects a round in progress, and an empty-deck message gives a safe way back home.\n\nThese choices favor a predictable, satisfying game over extra modes or settings the round does not need.",
      keyFeatures:
        "Picking a deck\nA swipeable row shows the available decks and keeps the chosen one front and center.\n\nAnimated intro\nThe chosen deck is introduced with text that appears step by step, a themed animation, and a clear start button.\n\nTimed card play\nPlayers flip one card at a time, then answer it, pass it, or end the round. A two-minute timer counts down, and a card left unanswered when time runs out counts as passed.\n\nSafe back button\nThe back button is handled with care. Leaving a round in progress asks you to confirm, and the home screen asks before closing the app.\n\nResult screens\nResults tell apart a round where everything was passed, a round with no answers, a partly answered round, and a fully answered round. Each has its own message and animation.\n\nDaily streaks\nA finished round updates your streak, spots your first game of the day, and shows a streak celebration when it fits.\n\nSaved progress\nCards played, answered, and passed, plus your game history, stay available on the profile and history screens.\n\nSound and animation\nMenu music, in-game music, result sounds, button sounds, Lottie animations, and confetti mark the big moments.\n\nPhone reminders\nOptional reminders are set up on the phone, including warnings before your streak is about to run out.",
      techStack:
        "The story above is written for everyone. This section lists the actual technologies used:\n- TypeScript — defines how the app behaves and the rules for its data.\n- React and React Native — build the mobile screens from reusable pieces.\n- Expo SDK 54 — runs the app on phones and connects to phone features.\n- Expo Router — moves the player from screen to screen.\n- React Native Reanimated — powers smooth motion and screen changes.\n- Lottie and React Native Confetti Cannon — play the intro, result, streak, and celebration animations.\n- Expo AV — loads and controls music and sound effects.\n- Expo Notifications — schedules and cancels phone reminders.\n- AsyncStorage and Expo SecureStore — save game data and the player's name on the phone.\n- React Native SVG and HugeIcons — draw custom graphics and icons.\n- Figma references — guide how the mobile screens look.\n- Android and Expo build tooling — package the app for Android.\n- Groq API — writes new questions in another part of the app; it is not part of playing a round or seeing results.\n\nPlaying a round and seeing results needs no game server, online database, cloud backup, account, or multiplayer service. Writing new questions is a separate online feature and is not needed to play the existing decks.",
      challenges:
        "Keeping results consistent\nThe result screen and the history list need to describe the same round the same way. One shared rule keeps the title, message, animation, and history marker in step.\n\nSaving progress without a server\nThe app saves profile data, stats, history, sound settings, and streaks on the phone, and keeps the player's name in the phone's secure storage. If saved data is missing or broken, the app falls back to safe starting values.\n\nManaging sound across screens\nMusic starts or fades depending on the open screen, and in-game music stops before the result sound plays. Sound effects follow the saved volume and are guarded so they do not repeat by accident.\n\nHandling real-life interruptions\nThe game handles running out of time, empty decks, the phone's back button, leaving early, reminders being turned off, and lost streaks, instead of assuming every round goes perfectly.",
      finalProduct:
        "The finished game lets a player open Spillr, pick a deck, watch a short intro, play cards at a steady pace, and get a result that matches what happened.\n\nThat same round then counts toward the player’s streak, stats, and history, with optional sound and reminders to bring them back.\n\nPlaying needs no game server, online database, cloud backup, account, or multiplayer service. Writing new questions is a separate online feature and is not needed to play the existing decks.\n\nTesting note: the available Android test build only runs on ARM phones and would not start on the connected x86_64 emulator. So the full flow was not tried on a device here. iOS, real Android phones, reminder timing, and every possible result have not been tested yet.",
      results:
        "- Confirmed: the game offers a complete play loop that runs on the phone, with clear player choices, a fixed round time, different result screens, streaks, saved progress, history, sound, and optional reminders.\n- The project has no numbers on downloads, ease of use, speed, or business results, so none are claimed.\n- Our reading: linking each round to streaks and history should make rounds feel complete and give players a reason to come back, but this still needs testing with real players.\n- Testing note: the available Android test build only runs on ARM phones and would not start on the connected x86_64 emulator.\n- Known issue: the history screen’s “Passed” and “No Spilled” filters use the same unfinished-round group, so they do not show different results yet.",
      lessons:
        "What I learned\n- A short game works better as one clear path than as many separate screens.\n- One shared result rule stops the result screen and saved history from telling different stories.\n- Saving everything on the phone gives a personal experience without an account, but it makes recovery and sharing harder.\n- Sound and animation need the same careful planning as screens and data.\n- The test build has to match the test device; an app that builds is not proof it runs on every phone.",
      problemNotes: [
        {
          title: "More than a list of cards",
          detail: "Players need a clear topic, a ready moment, simple card choices, and a result that means something",
        },
        {
          title: "Each round should count",
          detail: "Streaks, stats, and history should carry the game forward",
        },
        {
          title: "Playing should work offline",
          detail: "No server or online account should be needed to play",
        },
      ],
      solutionNotes: [
        {
          title: "One path from deck to result",
          detail: "Pick a deck, watch the intro, play cards, and get your own ending",
        },
        { title: "Simple card choices", detail: "Answer, pass, or end the round on every card" },
        { title: "Two-minute pace", detail: "Unanswered cards count as passed when time runs out" },
        { title: "Progress after each game", detail: "Finished rounds update streaks, stats, and history" },
        { title: "Sound and reminders", detail: "Sound, animation, and optional reminders bring players back" },
      ],
      designPrinciples: [
        {
          title: "Start with the whole player journey",
          detail: "The provided designs and a full walk-through kept every screen looking and feeling the same",
          badge: "Consistency",
        },
        {
          title: "Save every finished round the same way",
          detail: "The last card, ending early, and running out of time all end the same way",
          badge: "Flow",
        },
        {
          title: "Keep results consistent",
          detail: "The result screen and history list use the same rule and tell the same story",
          badge: "Clarity",
        },
        {
          title: "Match sound to the open screen",
          detail: "Music follows the current screen, and result sounds play only once",
          badge: "Sound",
        },
        {
          title: "Protect unfinished rounds",
          detail: "Confirm steps and an empty-deck message give a safe way out",
          badge: "Safety",
        },
        {
          title: "Choose a predictable, satisfying game",
          detail: "The round stays focused instead of adding modes or settings it does not need",
          badge: "Experience",
        },
      ],
    },
  },
  {
    id: 9,
    title: "CosmicX",
    description:
      "A space experience in your browser that makes the size of the universe something you can explore, shape, and understand.",
    role: "Product design + frontend development",
    outcome: "A hands-on space experience with three ways to learn.",
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
        "CosmicX is a space experience in your browser that makes the size of the universe something you can explore, shape, and understand. It has three connected modes: a Solar Simulator for hands-on experiments, a Galaxy Creator for building your own galaxy, and a Big Bang Timeline for traveling through the history of the universe.\n\nIt is made for anyone curious about space: students, people who learn by seeing, and visitors who want more than a page of text. You can follow a guided story or explore freely at your own pace.\n\nThis story covers the full journey from the title screen through each mode, including choosing a mode, guided tours, controls, layouts for every screen size, saving, and the 3D scenes. Everything runs in the browser, with no server, account, or outside service.",
      problem:
        "Space is hard to understand when it is shown only as numbers, diagrams, or long text. The challenge was to make huge ideas feel close and real without turning the experience into a video you just watch. People needed to move around, try things, and see what happens.\n\nThe experience also had to connect three ways of learning: discovering a real system, creating your own galaxy, and following a story through time. None of the modes should feel like a separate product. Controls, saves, and visuals had to feel the same across the whole app.",
      solution:
        "CosmicX brings the three modes together as different ways to learn. The Solar Simulator lets people fly around a model of the solar system, look closely at planets and moons, speed up or rewind time, change the view, trigger events, and watch what happens. The Galaxy Creator lets visitors build their own galaxy: pick a type, shape it, fill it with stars, adjust its physics, and explore the systems it creates. The Big Bang Timeline walks through eleven stages in order, with a slider to jump around, rewind, move the camera, and read about each stage.\n\nThe finished app includes all three modes, their controls, saving, guided tours, settings, and 3D scenes. One shared title screen previews the modes before any detailed controls appear, so discovering, creating, and following the story feel like parts of one experience.",
      role: "- Designing how people move through the title screen, mode choice, guided tours, and in-app navigation.\n- Building the Solar, Creator, and Big Bang experiences as parts of one app.\n- Creating the control panels, timelines, info panels, settings, music controls, and layouts for phones and computers.\n- Adding saving in the browser, including scene saves, Creator save slots, JSON export and import, shareable Solar scene links, and screenshots.\n- Adding screen-reader labels, keyboard-friendly controls, a phone-friendly panel layout, and proper cleanup when switching modes.\n- Checking the finished work with automated tests, production builds, and hands-on testing in the browser.\n\nNo claims are made about team size, formal user research, user numbers, or business results, because the project does not show them.",
      designProcess:
        "The work grew from one interactive idea into an app with three clearly separate experiences. The shared title screen sets the mood, previews each mode, and gives people a simple choice before the more detailed controls show up.\n\nFrom there, the design adds detail step by step. Solar and Creator each start with a short guided tour. Panels group related actions into World, Simulate, Tools, Scene, Build, Place, Events, Stats, Codex, Save, and FX. The Big Bang mode uses a timeline so visitors can move through the story without losing their place or the explanation.\n\nThe layout was tuned for both large and small screens. Panels can fold away, timeline details can be opened when wanted, labels and controls have screen-reader names, and the app can suggest fullscreen without forcing it.\n\nThis reflects a clear choice: guide people first, then offer deeper controls to those who want to keep exploring. Smaller rounds of work on navigation, tours, phone controls, music, building, experiments, wormhole travel, and the Big Bang presentation shaped the final flow.",
      keyFeatures:
        "Solar Simulator — places to explore and look closer\nFive places to explore, including the Milky Way, Andromeda, Messier 87, Triangulum, and a made-up Wormhole Galaxy. They include eight planets, an asteroid belt, distant galaxies, labels, objects you can select, info cards, and six camera styles.\n\nSolar Simulator — time and experiments\nMove time forward or backward, change the speed, drag through the timeline, reset, or jump back to now. You can also trigger events you can undo, like impacts with warnings, lasers, zodiac effects, and wormholes.\n\nGalaxy Creator — guided building\nSix galaxy types and a four-step setup for type, shape, stars, and physics. Controls cover the galaxy's name, size, arms, core, thickness, density, dust, star clusters, mass, dark matter, spin, and how fast new stars form.\n\nGalaxy Creator — a universe built for you\nStars, nebulae, star systems, planets, moons, atmospheres, dusty orbits, events, stats, and encyclopedia entries are created automatically. There is a close-up view for each star system, and time can run up to one million times faster.\n\nBig Bang Timeline — a trip through time\nEleven stages from the start of the universe to its far future. You can play, pause, rewind, change speed, jump to any chapter, drag through the timeline, change how fast the universe expands, and hide the controls. The camera moves the whole way, with info cards for each chapter.\n\nShared features and saving\nMusic for each scene, settings for display, graphics, camera, controls, and sound, panels that fold away on phones, named saves with presets, shareable Solar scene links, Creator JSON export and import with save slots, and downloadable screenshots.",
      techStack:
        "The story above is written for everyone. This section lists the actual technologies used:\n- JavaScript with native modules — how the app behaves, the simulation rules, navigation, and interactions.\n- HTML — the page structure for buttons, dialogs, tabs, sliders, labels, and info panels.\n- CSS — the look of the app, frosted-glass panels, transitions, and layouts for every screen size.\n- Three.js 0.170.0 and WebGL — 3D scenes, cameras, lighting, particles, generated environments, and visual effects.\n- Vite 8.1.5 — local development, loading files, and building the final version.\n- Browser APIs — local storage for settings and saves; file, Blob, URL, and canvas APIs for export and screenshots; fullscreen and device-tilt support; audio; and link-based navigation.\n- Bundled MP3 audio — music for each scene, included with the app instead of loaded from the internet.\n- Node.js built-in test runner — automated checks for simulation rules, saving, navigation, accessibility, screen sizes, and shared helpers.\n\nThere is no server, outside API, online service, account, cloud sync, collaboration, or database. Settings and saves stay in the browser that made them, and Creator JSON export is the way to back them up.",
      challenges:
        "Fitting three heavy experiences into one app\nWhen you switch modes, the app shuts down the old scene, stops its background work, and frees its graphics before the new mode starts. This stops old scenes from running in the background.\n\nKeeping controls usable while the 3D scene stays visible\nActions are grouped into focused panels that can fold or expand, and the layout changes for small screens instead of shrinking every control.\n\nKeeping saves after a page reload without a server\nThe app checks saved data before using it, remembers the Solar and Creator tours separately, and falls back to safe defaults if storage is not available. One gap remains: Creator does not yet clearly tell you every time a save fails.\n\nMixing real science with made-up content\nThe made-up Wormhole Galaxy uses the same look as real black-hole behavior while still standing apart. A future update should label simplified science and made-up material more clearly.",
      finalProduct:
        "The journey starts at a title screen with a live space background, music, a Start button, settings, and a way to choose a mode. Visitors can preview the other experiences and pick how guided they want to be.\n\nIn Solar, a short tour explains how to move around and look at things before the full controls appear. Visitors can choose a place, select a planet or galaxy, move the camera, change time, open info panels, run experiments, and save a scene.\n\nIn Creator, the visitor goes through four setup steps before entering their new galaxy. From there, they can check stats, place star systems and objects, let the galaxy grow, read encyclopedia entries, fly into a star system, change visual effects, save, export, or take a screenshot.\n\nIn Big Bang, the visitor starts a guided show and moves through eleven stages of the universe. They can drag or rewind the timeline, change the expansion speed and camera, read about each chapter, and reach an ending they can replay.\n\nThe result is one experience that can feel like a simulator, a building tool, or an interactive lesson, depending on the path each visitor takes. The three modes stay connected through shared navigation that cleans up the old scene before switching.",
      results:
        "- The finished app passed 200 automated tests with no failures, and the production build finished successfully.\n- Hands-on browser testing confirmed the title screen and mode choice, the Creator setup and workspace, the Big Bang title and timeline, and the Solar controls with shared settings on small screens.\n- The build still warns that one JavaScript file is bigger than recommended.\n- The browser showed a harmless WebGL graphics warning, with no app errors during testing.\n- Phone tilt on a real phone, full download-and-reload of saves, running out of browser storage, and watching every timeline all the way to the end were not tried by hand in this review; automated tests and code review cover them.",
      lessons:
        "What worked\n- Even a rich visual experience needs a clear first step, like choosing a mode and taking a short tour.\n- Keeping saves, settings, cleanup, and tour progress separate and clear makes the app predictable.\n- Guide people first, then offer deeper controls to those who want to keep exploring.\n- Automated tests protect the rules and structure, while real browser testing finds layout and cleanup problems.\n\nWhat could improve\n- Tell people clearly when a Creator save fails.\n- Label simplified science and made-up content, like the Wormhole Galaxy, more clearly.\n- Shrink the large JavaScript file below the recommended size.\n- Test phone tilt, save export and import, storage limits, and full timelines on real devices.\n\nFuture ideas\n- Add clear labels for real science, simplified models, and made-up content to build trust without losing the fun.\n- Tell people honestly whenever saving fails, and plan better for storage limits.\n- Keep improving layouts for different screens and cleanup as the app grows.",
      problemNotes: [
        { title: "Space is hard to picture", detail: "Numbers and diagrams alone feel far away" },
        { title: "Ideas should feel close", detail: "Huge ideas must be explored, not just watched" },
        { title: "Three ways to learn", detail: "Discover, create, and follow a story in one product" },
        { title: "Everything should feel the same", detail: "Saving in the browser, with no server or account" },
      ],
      solutionNotes: [
        { title: "Solar Simulator", detail: "Fly around, look closer, change time, and trigger events" },
        { title: "Galaxy Creator", detail: "Pick a type, shape it, fill it with stars, adjust its physics" },
        { title: "Big Bang Timeline", detail: "Eleven stages you can drag, rewind, and view from any angle" },
        { title: "Shared start and saves", detail: "Guided tours, panels for any screen, and saves in the browser" },
      ],
      designPrinciples: [
        {
          title: "Set the mood before the details",
          detail: "A shared title screen previews each mode before the detailed controls appear",
          badge: "First look",
        },
        {
          title: "Add detail step by step",
          detail: "Short tours and grouped panels reveal more over time",
          badge: "Pacing",
        },
        {
          title: "Keep busy controls easy to use",
          detail: "Panels fold away so the 3D scene stays in view",
          badge: "Layout",
        },
        {
          title: "Work on every screen size",
          detail: "Layouts that adapt, screen-reader labels, and optional fullscreen",
          badge: "Screens",
        },
        {
          title: "Treat all modes as one journey",
          detail: "Shared navigation and cleanup keep the experiences connected",
          badge: "Unity",
        },
      ],
    },
  },
  {
    id: 10,
    title: "Qyzen Learning Platform",
    description:
      "A learning website for schools where admins, teachers, and students share one place for classes, tests, and grades.",
    role: "Product design + full-stack development",
    outcome: "Each person sees only their own school work, all kept in one shared place.",
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
        "Qyzen Learning Platform is a learning website for schools. Admins, teachers, and students all work in one shared place for school records.\n\nAdmins set up the school structure and user accounts. Teachers organize classes, tests, grades, learning materials, and announcements. Students study, take tests that are graded automatically on the server, and check their records. Each role gets its own home page and menu for its daily work, but everyone works from the same school years, terms, sections, subjects, enrollments, tests, and grades.\n\nShared calendars, notifications, profiles, and private messages keep planning and communication together, instead of spread across separate tools.",
      problem:
        "School work was often spread across separate admin screens, class lists, testing tools, spreadsheets, file storage, and chat apps. Because of this, it was hard to keep enrollments, who can see what, grading, and learning materials in step. Every time a student, class, or test changed, someone had to fix the records by hand.\n\nWithout separate spaces for each role, schools risked showing the wrong information to the wrong people, letting students get around grading on their own device, and losing records when imports, exports, or archives were handled outside one reliable system.",
      solution:
        "Qyzen is organized around the school year. School years and terms hold sections and subjects, enrollment places students in classes, and tests move from question banks to assignments, submissions, grading on the server, and records.\n\nEach role gets its own space with clear limits. Admins manage users, roles, school years, terms, permissions, and settings. Teachers manage sections, subjects, enrollment, question banks, tests, grades, materials, and announcements. Students see only the classes they are enrolled in, take tests that are graded on the server, and get their grades, records, and messages. Calendars, notifications, and messages are shared, but each person only sees what their role allows.",
      role: "- Planning a separate path for admins, teachers, and students, from first sign-in to daily school work.\n- Connecting every button and form to the server for accounts, classes, tests, grades, materials, notifications, and messages.\n- Protecting each role so people only reach their own pages and data, and students only see classes they are enrolled in.\n- Keeping records safe with spreadsheet import and export, archives that can be restored, reliable file storage, and backup tools.\n- Checking the work with 374 PHPUnit tests covering 1801 checks, plus a successful Vite production build.\n\nThe work covered planning the product, building it with Laravel, keeping the screens consistent with Tailwind and Metronic KTUI, and making sure every page shows only what the viewer is allowed to see, for their classes and at the right time.",
      designProcess:
        "The design started with how a school year works, before any single screen was polished. School years and terms hold sections and subjects, then enrollment, question banks, tests, submissions, grading, and records follow. This way the data matches how schools really plan a term.\n\nShared screen patterns keep the site predictable for every role. Tables, filters, pop-up windows, small alerts, date pickers, calendars, and text editors work the same for admins, teachers, and students. Behind the scenes, the server decides whether to send a full page or just the small piece of the page that changed.\n\nSecurity and record keeping shaped how things work. The server checks every request so people only see what they should, grading happens only on the server, files are only shared after sign-in checks, and archives can be restored so school history is never lost or left half-deleted.",
      keyFeatures:
        "Setup and new accounts\nAdmins add and manage users and roles, set up school years, terms, permissions, and settings, and add many accounts at once from spreadsheet templates. If a row has a mistake, the import points it out.\n\nTeacher workspace\nTeachers create sections and subjects, manage enrollment, build question banks, put together tests, assign work to classes, grade submissions, and share grades and feedback with their enrolled students.\n\nTaking tests as a student\nStudents see only the classes they are enrolled in and the work assigned to them. They take tests while signed in, submit once for grading on the server, and then check their grades, records, and related messages.\n\nSchool records\nGrades, enrollment history, and test results stay linked to school years, terms, sections, and subjects. Records can be exported to Excel, and archives can be restored when a new term starts.\n\nMaterials and announcements\nLearning materials and announcements belong to specific sections and subjects, are stored privately behind sign-in, and show up the same way for every role.\n\nShared planning and messages\nCalendars, notifications, and private messages are available to every role, and each person only sees what their role allows. This keeps planning and messages linked to school records instead of scattered across other tools.",
      techStack:
        "The story above is written for everyone. This section lists the actual technologies used:\n- PHP 8.3 & Laravel 13 — the backend: pages, access rules, and the logic for each role.\n- Blade, HTML, CSS & JavaScript — pages built on the server, with extra features added in the browser and shared screen patterns.\n- Tailwind CSS 4 & Metronic KTUI — styling and ready-made building blocks for tables, pop-ups, and calendars.\n- Vite — the development server and building the final frontend files.\n- SQLite & MySQL — the databases, with migrations, factories, and seeders for each setup.\n- Laravel Fortify & Socialite with Google OAuth — email and password sign-in, plus Sign in with Google.\n- Laravel Mail with Gmail SMTP, Maatwebsite Excel, PhpSpreadsheet, Quill, Flatpickr & FullCalendar — emails, spreadsheet import and export, rich text editing, date picking, and calendars.\n- PHPUnit & Echo with Pusher and Reverb — 374 tests with 1801 checks, plus optional live updates that fall back to regular checking.\n\nThere is no public API. The server sends pages, plus small internal JSON and HTML updates for the website. Google sign-in, email, and live updates only work when they are set up.",
      challenges:
        "Keeping each role's data separate\nAccess rules, ownership checks, and enrollment checks on the server stop one role from seeing another's data. Separate home pages and menus also make it harder to open the wrong thing by accident.\n\nKeeping tests fair\nGrading happens only on the server. Submissions are checked against enrollment and deadlines, and questions and answers are only shown when allowed, so nobody can change their results from their own device.\n\nSupporting real school work\nSpreadsheet templates that are checked on import, clear import error messages, Excel exports for tests and grades, reliable storage for materials, and archives with restore and backup tools all match how schools really add and keep their data.\n\nWorking on different hosting setups\nFiles are kept private instead of on a public folder. Live updates through Echo with Pusher or Reverb quietly switch to checking for updates every so often when the host does not support them.",
      finalProduct:
        "Every role opens its own home page and menu for its daily work. Admins start with users, roles, and terms, teachers with sections and tests, and students with their classes and pending work, all inside one shared record system.\n\nLearning follows the school year from start to finish. School years and terms hold sections and subjects, enrollment places students in classes, question banks feed tests, submissions are graded on the server, and grades stay visible to enrolled students.\n\nThe server makes sure each person only sees their own space. Access rules limit the data, grading on the server stops cheating from a student's device, and private files are only shared after sign-in and permission checks.\n\nSchool records stay safe through imports, exports, archives, and backups. Checked spreadsheet templates allow adding many accounts at once, Excel exports include tests and grades, archives can be restored, and reliable storage with backup tools protects uploaded files and materials.\n\nIt is a website powered by Laravel and a database. There is no public API; the server sends full pages or small internal JSON and HTML updates, and Google OAuth, email, and live updates through Echo with Pusher or Reverb only work when they are set up.",
      results:
        "- Admin, teacher, and student tasks work from start to finish inside one shared record system.\n- 374 PHPUnit tests with 1801 checks passed, covering permissions, who can see which classes, grading, and learning materials.\n- The Vite production build finished successfully.\n- No numbers on users, ease of use, or business results are claimed, because none were measured.\n- Browser support, going live on a host, and the Google, email, and live-update features depend on setup and were only checked by automated tests.",
      lessons:
        "What worked\n- Treating permissions, ownership, deadlines, and record keeping as part of the design keeps each role's view honest and predictable.\n- Planning around school years, terms, sections, subjects, enrollment, and tests before polishing screens kept everything connected.\n- Reusing the same tables, pop-ups, alerts, date pickers, calendars, and editors for every role kept the look and feel consistent.\n- Checked imports and exports, reliable storage, archives, and backups matched what schools really need.\n\nWhat could improve\n- Show clearer messages when an import, a file save, or an archive fails, so problems are never silent.\n- Explain more clearly how to set up Google OAuth, email, and live updates for whoever hosts the site.\n- Test the calendar, editor, and announcements more with screen readers and on phones.\n- Try the full path from enrollment to grading to records on a real host to confirm private files and update checks work.\n\nFuture ideas\n- Clearly mark which features depend on setup and which always work.\n- Give better guidance on storage limits, how long to keep files, and how to recover exports and archives.\n- Keep improving live updates so they switch off smoothly when the host does not support them.\n- Keep planning around the school year when adding new kinds of school structures.",
      problemNotes: [
        {
          title: "Work spread across many tools",
          detail: "Admin screens, class lists, test tools, spreadsheets, and file storage were not connected",
        },
        {
          title: "Privacy and fairness risks",
          detail: "The wrong people could see data, and grading could be tampered with on a student's device",
        },
        {
          title: "Records could get lost",
          detail: "Imports, exports, archives, and backups had no single reliable home",
        },
      ],
      solutionNotes: [
        {
          title: "Built around the school year",
          detail: "School years and terms hold sections, subjects, and enrollment before tests and grades",
        },
        {
          title: "A space for each role",
          detail: "Admins, teachers, and students share one system but each has their own home",
        },
        {
          title: "The server checks everything",
          detail: "Access rules, grading on the server, and private files",
        },
        {
          title: "School records kept safe",
          detail: "Checked templates, exports, archives that can be restored, and reliable storage",
        },
      ],
      designPrinciples: [
        {
          title: "Start with the school year",
          detail:
            "School years and terms hold sections and subjects, then enrollment, question banks, and tests follow",
          badge: "School year",
        },
        {
          title: "Reuse the same screen patterns",
          detail: "Tables, pop-ups, alerts, date pickers, calendars, and editors work the same for every role",
          badge: "Consistency",
        },
        {
          title: "Send only what the page needs",
          detail: "The server sends a full page or just the part that changed, with no public API",
          badge: "Speed",
        },
        {
          title: "Protect each role on the server",
          detail: "The server controls who sees what, grades every test, and keeps files private",
          badge: "Security",
        },
        {
          title: "Make records safe and restorable",
          detail: "Checked imports, exports, archives, and restores keep school records safe",
          badge: "Records",
        },
      ],
    },
  },
  {
    id: 11,
    title: "Minto",
    description:
      "Minto turns rough instructions into clear, well-organized prompts written in Markdown. It runs in your browser and needs no server.",
    role: "Product design + frontend development",
    outcome: "Clear, well-organized prompts that come out the same every time, even offline.",
    tags: ["TypeScript", "Next.js", "Dexie"],
    icon: siMarkdown,
    repositoryUrl: "https://github.com/iChicoRito/minto",
    liveUrl: "https://minto-enhancer.vercel.app",
    image: "/assets/icons/minto-icon-v1.png",
    coverImage:
      "https://opengraph.githubassets.com/51e3ac0d9befa03c5a568b6ca8e5ef5e978bf4ac09d21ba4670211991b1e6743/iChicoRito/minto",
    banner: "/assets/banner/Banner - Minto.png",
    caseStudy: {
      overview:
        "Minto is a web app that turns rough, casual instructions into clear, organized prompts written in Markdown. Its heart is the prompt improver: it reads what you typed and builds a well-organized prompt, right in your browser, with no server needed. The same text always gives the same result.\n\nThe improver is plain TypeScript code that does not depend on any framework or storage. It runs fully in the browser, knows 13 kinds of tasks across four groups, and has three levels of detail. Around it is a simple workspace where you paste a prompt, pick options, and then view, edit, copy, and save the result. An optional AI rewrite can be turned on when a secure AI connection is set up, but the built-in improver works fully offline and is the default, private choice.",
      problem:
        "Vague or messy prompts lead to uneven results when working with AI tools or with other people. Many people know what they want but struggle to write down the requirements, limits, and ways to check the result in a consistent format. Online-only tools raise privacy worries and stop working without internet.\n\nCasual instructions mix up goals, leave out limits, and vary a lot in wording and punctuation. Teams need a reliable way to add structure without sending private text off their device or needing an internet connection.",
      solution:
        "Minto uses a built-in improver that runs on your device and adds structure the same way every time. It picks out the useful parts of a prompt, figures out what kind of task is being asked for, chooses a matching set of sections, and writes clean Markdown. Because the same input always gives the same output with no internet call, results are fast, private, and repeatable.\n\nFor more creative rewriting, the same workspace can send the request to an optional AI service through one secure, checked HTTPS connection with a time limit, a cancel option, and checks on what comes back. The built-in improver and the AI rewrite stay separate, so privacy is the default and creativity is your choice.",
      role: "- Studied the finished improver: how it reads text, sorts tasks, picks templates, chooses sections, and writes Markdown.\n- Followed how the improver connects to the workspace, app settings, preferences, and saving on the device.\n- Confirmed that the main flow uses no server, API, database, or outside service.\n- Kept confirmed facts separate from reasonable guesses about the product.\n- Wrote this portfolio story in the required structure without any unsupported claims.",
      designProcess:
        "The review followed the finished code rather than a design proposal. It started from the improver's single entry point, which takes your text and options and returns what it found, what kind of task it is, and the Markdown, and then traced each step.\n\nFirst, extra spaces and capital letters are tidied up, and word lists pick out the main action, the topic, any technologies, limits, and requirements. Next, the sorting step scores the text against each task type, trims word endings so different forms of a word still match, and works out how sure it is based on how strong the top match is and how far ahead it is of the next one. Templates hold the structure as data: 13 task templates set the order of sections for the light, standard, and detailed levels, and are checked to stay consistent. Finally, the review followed the workspace from the Enhance and Result tabs through settings, input checks, error handling, and saving, and confirmed that the optional AI connection and personal settings never change how the built-in improver works.",
      keyFeatures:
        "Picking out the key parts\nFinds the main action, the topic, any technologies from a fixed list, limits to respect, and requirements, whether they are written as a list or only hinted at.\n\nSorting tasks with a confidence check\nScores the text against word lists for each task type and gives a confidence score from 0 to 100. When the evidence is weak or two types are close, it falls back to a general template and suggests choosing the type by hand.\n\n13 task templates in 4 groups\nCovers coding tasks like bug fixes, new features, code review, cleanup, testing, and documentation; writing tasks like rewriting and summarizing; research tasks like investigating and comparing; and design tasks like reviewing a screen and writing image prompts.\n\n24 reusable sections at three levels\nLight gives one polished sentence, standard adds requirements and ways to check the result, and detailed builds a full structured document. Each template sets the section order, and lighter levels always follow the same order as the fuller ones.\n\nSmart section choice\nSkips list sections when there is nothing to put in them, so a prompt with no limits does not get an empty heading. Written sections get default text later on.\n\nQuick polish and grammar fixes\nRewrites a prompt as one clear sentence that keeps your limits and meaning, with a separate grammar-only mode when no sections are chosen.\n\nAutomatic or manual control\nLet Minto guess the task type or choose it yourself, turn any of the five visible sections on or off, and pick from 17 presets that set the type, level, and sections in one click.\n\nOne simple workspace\nTwo tabs, Enhance and Result, with a live character count, a notice when the result is out of date, a progress bar with a cancel button, and copy, export, and save buttons. It can retry after errors and asks before throwing away your edits.\n\nInput checks and limits\nRejects empty prompts and allows up to 15,000 characters, so empty or oversized text never gets processed.\n\nHistory and personal library\nGood results can be kept in your history and moved into a personal library with folders and tags. Both are stored in IndexedDB on your device, with a history size limit you can set.",
      techStack:
        "The story above is written for everyone. This section lists the actual technologies used:\n- TypeScript (strict) — the main language for the improver and the app, with shared types that keep the improver simple and predictable.\n- Next.js 16 (App Router) with React 19 — runs the workspace, exports a static site for hosting, and provides a local test API route; the improver itself does not need either.\n- Prompt Engine module (pure TypeScript) — the self-contained improver: reader, sorter, templates, rules, and writer, with no React, Next.js, browser storage, or network code, so it always works offline and is easy to test.\n- Zod — checks what goes out and comes back when the optional AI rewrite is used, including size limits.\n- Zustand (with preferences provider) — stores your preferences, like default level, default task type, chosen sections, and history size, in cookies or local storage.\n- Dexie (IndexedDB wrapper) — saves history, saved prompts, and folders in your browser, with no server database.\n- Tailwind CSS v4, shadcn/ui, Radix UI — styling and accessible building blocks for the workspace panels and controls.\n- Verification scripts (Node.js) — hand-written test scripts that check every step of the improver and confirm the same input always gives the exact same output.\n- PWA and static export tooling — builds an installable offline version without server-only parts, so the improver works without internet.\n\nThe main flow needs no server, database, or outside service. The optional AI rewrite uses one secure, checked HTTPS connection with a time limit, a cancel option, and response checks, and only runs when it is set up.",
      challenges:
        "People write in many different ways\nPrompts vary a lot in wording and punctuation. Minto tidies up spaces and capital letters, uses fixed word lists for actions, technologies, and limits, and matches whole words instead of trying to fully understand language.\n\nGuessing the wrong task type with too much confidence\nWith little evidence or two close matches, Minto could pick the wrong template. It measures both how far ahead the top match is and how strong it is, turns that into a high, medium, or low confidence level, uses the general template when confidence is low, and suggests choosing the type by hand.\n\nMatching different forms of a word\nTo match words like failing and fails without a large language library, Minto trims a small set of word endings. This is kept simple on purpose and written down, so some unusual word forms are left unmatched instead of guessed.\n\nAvoiding empty headings\nA heading with nothing under it is confusing. Minto skips list sections when there is nothing to put in them, while written sections still get default text.\n\nKeeping templates consistent\nWith 13 templates and three levels each, a mistake in section order would be easy to miss. Automatic checks make sure every level starts with Objective, has no repeated sections, and that lighter levels keep the same order as fuller ones.\n\nSame results versus creative results\nPeople expect the same prompt to give the same result, but may also want AI creativity. Minto keeps the two apart: the built-in improver runs instantly and predictably, while the AI rewrite goes through one secure, checked HTTPS connection with a time limit, a cancel option, and response checks.",
      finalProduct:
        "You open the home page and land on the Enhance tab, with a greeting and a rounded text box. The workspace is ready right away, with no sign-in needed.\n\nYou paste a rough instruction, watch the live character count toward the 15,000 limit, and can choose a task type, a detail level of light, standard, or detailed, and which sections to include. A preset can set all of these in one click, and changing options after a result marks it as out of date.\n\nPressing Enhance runs the built-in improver instantly or, if set up, calls the AI service with your chosen options. A progress bar appears and you can cancel, and empty or oversized prompts are rejected before any work starts.\n\nWhen it succeeds, the view switches to the Result tab. The Markdown shows in three views you can switch between: raw text, a formatted preview, and an editable version. A badge shows whether the result came from the built-in rules or from AI, and notes appear when Minto was unsure or two task types were close.\n\nFrom there you can copy the result, export it as a Markdown file, improve it again with new input, or save it to your library. Saving and history follow your history size setting, edits are tracked and confirmed before being replaced, and all history and library data stays on your device.",
      results:
        "- Works fully offline and privately, with no server, database, or outside service in the main flow; the improver's code has no links to frameworks, storage, or the network.\n- Same results every time: running the same prompt and options again gives the exact same Markdown, confirmed by test scripts that run every step twice and compare the output byte for byte.\n- Covers real use with 13 task types, 24 sections, 17 presets, three detail levels, and five sections you can turn on or off, plus checks that reject empty prompts and enforce the 15,000-character limit.\n- IndexedDB saves history and your library on the device between visits, with no server and a size limit you control.\n- No user numbers, speed tests, or business results are reported, because the code does not measure them.\n- Offline use in different browsers, accessibility beyond the built-in components, and speed at the maximum character limit have not been tested by hand.",
      lessons:
        "What worked\n- Keeping the improver fully separate from the rest of the app makes it easy to understand and test.\n- Letting templates hold the structure, and using rules only to skip empty list sections, avoids ordering bugs and keeps the checks simple.\n- Fixed word lists are easier to maintain than guessing, and make it obvious which technologies are not supported.\n- Falling back to a general template when unsure builds more trust than confidently picking the wrong one.\n- Test scripts that run everything twice and compare the output catch small inconsistencies that normal tests miss.\n\nWhat could improve\n- Grow the technology and limit word lists on purpose as new topics come up, instead of pretending to support them.\n- Show low-confidence and close-match hints more clearly so people choose the task type themselves.\n- Test offline use, accessibility, and speed at the 15,000-character limit across browsers and devices.\n- Explain when list sections are skipped because they are empty, so people understand why a heading is missing.\n\nFuture ideas\n- Keep the built-in improver instant and self-contained, and the optional AI rewrite as one secure HTTPS connection with a time limit and cancel option.\n- Make the installable offline app and static export the default way to ship Minto, without server-only parts.\n- Keep history and the library on the device, with size limits you control and easy export where it helps.\n- Keep checking template order automatically as new task types or sections are added.",
      problemNotes: [
        {
          title: "Vague prompts, uneven results",
          detail: "Messy instructions lead to unpredictable answers",
        },
        {
          title: "Hard to say everything",
          detail: "Requirements, limits, and ways to check the result often get left out",
        },
        {
          title: "Privacy and offline worries",
          detail: "Online-only tools see your text and stop working without internet",
        },
        {
          title: "No shared format",
          detail: "Teams have no repeatable structure for prompts",
        },
      ],
      solutionNotes: [
        {
          title: "Runs on your device, same result every time",
          detail: "The same input always gives the same Markdown, with no internet call",
        },
        {
          title: "Picks out what matters",
          detail: "The action, topic, technologies, limits, and requirements",
        },
        {
          title: "Markdown from templates",
          detail: "13 task types and 24 sections at light, standard, and detailed levels",
        },
        {
          title: "Optional, checked AI rewrite",
          detail: "One secure HTTPS connection with a time limit, cancel option, and Zod checks when set up",
        },
      ],
      designPrinciples: [
        {
          title: "Start from the single entry point",
          detail: "One function takes your text and options and returns what it found plus the Markdown",
          badge: "Entry point",
        },
        {
          title: "Tidy up, then use word lists",
          detail: "Spaces and capital letters are tidied, then fixed lists find actions, tech, and limits",
          badge: "Reading",
        },
        {
          title: "Score it, and admit when unsure",
          detail: "Word scores and trimmed endings give high, medium, or low confidence",
          badge: "Sorting",
        },
        {
          title: "Let templates hold the structure",
          detail: "13 templates set the section order for light, standard, and detailed levels",
          badge: "Structure",
        },
        {
          title: "Only skip what is empty",
          detail: "List sections with nothing in them are dropped, so there are no empty headings",
          badge: "Clarity",
        },
      ],
    },
  },
  {
    id: 12,
    title: "Kivo",
    description:
      "Kivo is a local-first desktop app for keeping notes, files, useful links, and personal information in one place.",
    role: "Product design + full-stack development",
    outcome: "One private vault on your own device for notes, files, links, and passwords.",
    tags: ["Tauri", "React", "Rust"],
    icon: siTauri,
    repositoryUrl: "https://github.com/iChicoRito/Kivo-Vault",
    liveUrl: "https://kivo-vault.vercel.app/",
    image: "/assets/kivo/Logo - Blue.png",
    imageDark: "/assets/kivo/Logo - White.png",
    banner: "/assets/banner/Banner - Kivo.png",
    caseStudy: {
      overview:
        "Kivo is a local-first desktop app for keeping notes, files, useful links, and personal information in one place. It is made for people who want to organize their digital things with their own device as the main place they are stored.\n\nThis case study covers the desktop app, including organizing content, search, the Password Manager, and backup tools.",
      problem:
        "Notes, documents, and saved links tend to end up scattered, with no common place to store and find them again. This is the problem the project set out to solve; it is not based on user research.",
      solution:
        "Kivo brings these things into one local vault. Collections and tags keep things organized, while Favorites and search make them quicker to find. Backup, restore, and export tools give people ways to keep their information safe or move it elsewhere.\n\nCloud sync is outside the core scope.",
      role: "- Interface design for setup, content pages, search, and settings.\n- Frontend development with React 19 and TypeScript.\n- Rust backend for storage, file handling, search, protection, and recovery.\n- Database migrations and automated tests.",
      designProcess: "The design aims for a simple, easy-to-navigate personal vault.",
      keyFeatures:
        "Notes\nRich-text editing, automatic saving, and version history you can restore from.\n\nSources and files\nSave useful links, import files into managed local storage, and preview supported file types.\n\nOrganization\nGroup items into collections, add tags, mark favorites, and recover items from the trash.\n\nSearch\nFind items by their details and indexed content, including text pulled from PDFs. Encryption limits what content can be indexed.\n\nPassword Manager\nStore logins behind a separate password and lock.\n\nProtection and recovery\nOptional field encryption, local backups, checked restores, and Markdown or JSON export tools.\n\nLocal discovery tools\nOptional related-item matching, tag suggestions, and short summaries use text processing on your device, not a cloud language model.",
      techStack:
        "The story above is written for everyone. This section lists the actual technologies used:\n- Tauri 2 — connects the desktop interface to native operations.\n- React 19 and TypeScript — build the screens, interactions, and frontend data contracts.\n- Vite — supports frontend development and builds.\n- Tailwind CSS 4 and HeroUI 3 — provide styling and interface components.\n- React Router — handles navigation between app screens.\n- Tiptap — powers rich-text note editing.\n- Rust — handles storage, files, search, protection, and recovery.\n- SQLite through rusqlite — stores structured app data; managed local storage holds imported files.\n- Argon2 and AES-256-GCM — support password-based key creation and authenticated encryption.\n- Vitest, Testing Library, and Rust tests — cover frontend and backend behavior.\n\nThese technologies are confirmed by the project files and source code. Their presence alone does not mean the app is ready for release.",
      challenges:
        "Keeping search consistent with encryption\nSearch indexes can keep information taken from protected content. Kivo clears saved content-search and related-search data when encryption is turned on, and limits indexing while protection is active.\n\nRestoring a vault without losing the current copy\nA restore replaces both the database and managed files. Kivo checks the backup before replacing anything and makes a safety copy to roll back to. Tests cover broken backups; checks for real desktop interruptions are still open.\n\nKeeping app lock separate from data protection\nHiding the screen is different from encrypting stored content. Kivo keeps app lock and the Password Manager separate, with optional encryption for selected content fields, note versions, and managed files. Titles, tags, file names, and other details stay readable, and an independent security review is still pending.\n\nAdding discovery without the cloud\nRelated search, suggestions, and summaries use text processing on the device. This fits the local-first goal, but it is not generative AI or proven understanding of meaning.",
      finalProduct:
        "Set up the vault. Enter profile details, choose starter collections, and optionally turn on app lock.\n\nAdd something worth keeping. Create a note, save a source, or import a file from the right page or with Quick Add.\n\nOrganize the item. Add it to a collection or tag it, and mark often-used items as favorites.\n\nFind it again. Browse content pages, use search, or open the command palette. What search can find depends on indexing and encryption settings.\n\nLook after the vault. Review storage, recover items from the trash, restore earlier note versions, and use Settings for protection, backup, and export.",
      results:
        "- Reviewing the source confirms connected screens and backend commands for the core vault and supporting tools.\n- Recorded checks report 543 frontend tests passing across 47 files, successful type checks and builds, and passing Rust test suites. These are earlier recorded results, not checks rerun for this write-up.\n- Windows desktop checks are still open, including protection, backup and restore, and advanced features.\n- An independent security review is still pending. Encryption covers selected data, not the whole database or every outside copy.\n- No user numbers, usability results, speed tests, or time savings are reported.",
      lessons:
        "What I learned\n- Local storage still needs recovery planning: keeping data on the device makes checked backups, restores, and exports an important part of the product.\n- Protection affects more than the original content: search indexes, note versions, temporary files, and backups all need clear protection rules.\n- Automated tests and desktop checks answer different questions: passing tests support specific behavior, while native file dialogs, previews, interruption recovery, and full user journeys still need checks on a real desktop.",
      designPrinciples: [
        {
          title: "Guided setup",
          detail: "Setup splits profile details, starter collections, and optional app lock into steps",
          badge: "Setup",
        },
        {
          title: "Navigation by content type",
          detail: "Notes, Sources, Files, and Collections each have a page, with All Items showing everything",
          badge: "Navigation",
        },
        {
          title: "Quick access to common actions",
          detail: "Quick Add, search, and the command palette support everyday saving and finding",
          badge: "Speed",
        },
        {
          title: "Advanced tools stay optional",
          detail: "Related search, tag suggestions, and summaries are off by default",
          badge: "Choice",
        },
      ],
    },
  },
];
