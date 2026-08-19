import type { SimpleIcon as SimpleIconType } from "simple-icons";
import { siTodoist } from "simple-icons";

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
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  icon: SimpleIconType;
  image?: string;
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
    tags: ["Flutter", "Dart", "Hive"],
    icon: siTodoist,
    caseStudy: {
      overview:
        "RemindLy is a personal task and reminder app designed to help people remember what needs to be done and when it needs to happen.\n\nThe Tasks area is one of the main parts of RemindLy, alongside the home view, Spaces, and Profile. It brings together task creation, planning, notes, categories, and reminders in one place.\n\nThe feature is designed to keep working with information saved on the device. A person can create a task, choose when it should happen, receive reminders, and respond to an alarm without relying on an online account or internet connection.",
      problem:
        "People do not organize every task in the same way. Some tasks do not need a time. Others have one clear deadline. Some take place over a period with a beginning and an end.\n\nThe app needed to support all three situations without making task creation confusing. It also needed to keep reminders accurate when a task was changed, completed, removed, or opened again after the app had been closed.\n\nA due task also needs to get a person's attention when the app is not currently open. That means the reminder needs to be clear, noticeable, and easy to act on.",
      solution:
        "RemindLy uses a simple journey:\n- The person creates a task from the task list or calendar.\n- The task is checked and saved on the device.\n- The app prepares the right reminders for that task.\n- The person receives early reminders and a final due alert.\n- The alert shows the task details and offers a clear way to stop or delay it.\n\nThe feature supports three timing choices:\n- No Time: The task is saved without reminders.\n- Due Time: The person receives reminders 10 minutes and 5 minutes before the deadline, followed by an alert at the deadline.\n- Time Range: The person receives a reminder 5 minutes before the start, another 5 minutes before the end, and an alert when the time period ends.\n\nWhen a task changes, RemindLy removes its old reminders before preparing new ones. When a task is completed or removed, its reminders are stopped as well.\n\nWhen the app is opened again, it checks the saved tasks and restores the reminders that are still needed. If several unfinished tasks are due at the same time, the alert can show them together.",
      role: "- Shaping task details that can hold titles, descriptions, notes, categories, priorities, dates, times, whether a task is finished, and attachments.\n- Creating clear task-list, calendar, creation, editing, and detail views.\n- Supporting both quick task entry and more detailed task planning.\n- Keeping task changes and reminders aligned.\n- Handling early reminders, due alerts, stopping an alert, and delaying an alert for five minutes.\n- Making the alarm noticeable through sound, vibration, and a screen that stays visible.\n- Restoring useful reminders after the app has been closed or placed in the background.\n- Checking the main task, reminder, saved-information, creation, and alarm experiences with repeatable checks.\n\nThese responsibilities are based on the completed feature. The project does not identify individual authorship or team ownership.",
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
    },
  },
];
