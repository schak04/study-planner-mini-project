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
    - Overlap detection (prevents conflicts)
    - Auto-rendered, time-sorted timetable
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
    - Visual charts (Pie & Bar) for task status
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
    - Time validation with conflict detection
    - Auto-sorted Timetable
    - Dashboard preview of study slots
- **Tasks**
    - Add tasks with deadlines
    - Mark tasks as completed
    - Auto-sorting of upcoming deadlines using pure JavaScript logic
    - Highlight overdue tasks
- **Progress Analytics**
    - Task statistics (total, completed, pending, overdue)
    - Completion percentage with progress bar
    - Visual charts (Pie & Bar) for task status
- **Persistence**
    - All data stored in localStorage
    - Theme preference persists across reloads
- **UX details**
    - Empty sections auto-hide
    - Destructive actions require confirmation
    - Smooth scrolling navigation
    - Inline editing with modal UI for subjects, tasks, and study slots
    - Duplicate prevention and conflict detection during edits
    - Import/export data as JSON with validation

**This is intentionally a pure fundamentals project.**

## Future Improvements

Planned and potential enhancements (in roughly increasing complexity):

- Modularize app logic
- UI polishing
- Animations for add/delete/edit actions
- Mobile-first refinements (touch targets, spacing)
- Weekly / daily schedule view in the dashboard
- Undo support for deletes

---

## Author

© 2026 [Saptaparno Chakraborty](https://github.com/schak04/).  
All rights reserved.

---
