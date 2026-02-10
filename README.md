# Study Planner

This is a simple productivity tool that helps students organise subjects, manage schedules, track progress, and improve productivity.

---

## Tech Stack
- **HTML:** Semantic structure
- **CSS:** Responsive, modern UI with light/dark themes
- **Vanilla JavaScript:** App logic
- **localStorage:** Persistent data storage in the browser

> No signups & logins required.

---

## Application Sections

- **Dashboard:**
    - Overview of subjects
    - Study slots preview
    - Upcoming deadlines
- **Subject Management:**
    - Add subjects with priority
    - Delete subjects with confirmation
- **Schedule Planner:**
    - Create and delete study time slots
    - Subject selection via dropdown (prevents mismatches)
    - Start/end time validation
    - Auto-rendered timetable
- **Task Manager:**
    - Add tasks with deadlines
    - Mark tasks as completed
    - Auto-sorted upcoming deadlines
    - Overdue task highlighting
- **Progress Analytics:**
    - Total tasks
    - Completed, pending, and overdue tasks
    - Completion percentage
    - Visual progress bar
- **Settings:**
    - Theme toggle
    - Clear all data

---

## Project Goals
- Practice clean semantic HTML
- Build a complete UI using plain CSS
- Implement state management without frameworks/libraries
- Create a realistic, usable productivity tool

---

## Current Status

The Study Planner is fully functional as a client-side web app built with HTML, CSS, and vanilla JavaScript with localStorage data persistence.

### What’s Implemented

- Semantic, multi-section layout
- Modern UI with:
    - Card-based sections
    - Light/Dark mode with CSS variables
- **Subjects**
    - Add subjects with priority
    - View subjects in both dashboard and management section
    - Delete subjects with confirmation
- **Schedule Planner**
    - Study slots tied directly to existing subjects (dropdown-based)
    - Time validation
    - Auto-render timetable
    - Dashboard preview of study slots
- **Tasks**
    - Add tasks with deadlines
    - Mark tasks as completed
    - Auto-sorting of upcoming deadlines using pure JavaScript logic
    - Highlight overdue tasks
- **Progress Analytics**
    - Task statistics (total, completed, pending, overdue)
    - Completion percentage with progress bar
- **Persistence**
    - All data stored in localStorage
    - Theme preference persists across reloads
- **UX details**
    - Empty sections auto-hide
    - Destructive actions require confirmation
    - Smooth scrolling navigation

**This is intentionally a pure fundamentals project.**

## Future Improvements

Planned and potential enhancements (in roughly increasing complexity):

- Modularize app logic
- UI polish
- Animations for add/delete actions
- Mobile-first refinements (touch targets, spacing)
- Edit subjects, tasks, and study slots
- Weekly / daily schedule view in the dashboard
- Progress Analytics Section -> data visualisation through charts
- Import/export data as JSON
- Undo support for deletes

---

## Author

© 2026 [Saptaparno Chakraborty](https://github.com/schak04/).  
All rights reserved.

---
