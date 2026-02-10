// subjects

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
const subjectForm = document.getElementById("subjectForm");
const subjectName = document.getElementById("subjectName");
const subjectPriority = document.getElementById("subjectPriority");
const subjectList = document.getElementById("subjectList");
const dashboardSubjectsList = document.getElementById("dashboardSubjectsList");

renderSubjects();

function saveSubjects() {
    localStorage.setItem("subjects", JSON.stringify(subjects));
}

function renderSubjects() {
    dashboardSubjectsList.innerHTML = ""; // dashboard -> "Subjects"
    subjectList.innerHTML = ""; // subject management section
    const subjectsSection = document.getElementById("subjectArticles");
    const dashboardSubjectsArticle = document.getElementById("dashboardSubjectsArticle");
    if (subjects.length === 0) {
        subjectsSection.style.display = "none";
        dashboardSubjectsArticle.style.display = "none";
    } else {
        subjectsSection.style.display = "block";
        dashboardSubjectsArticle.style.display = "block";
        subjects.forEach((subj, idx) => {
            const li1 = document.createElement("li");
            li1.textContent = `${subj.name} (Priority: ${subj.priority}) `;
            const delBtn = document.createElement("button");
            delBtn.className = "delBtns";
            delBtn.type = "button";
            delBtn.textContent = "Delete";
            delBtn.onclick = () => {
                if (confirm("Are you sure you want to delete this subject?")) {
                    subjects.splice(idx, 1);
                    saveSubjects();
                    renderSubjects();
                }
            };
            li1.appendChild(delBtn);
            subjectList.appendChild(li1);
            const li2 = document.createElement("li");
            li2.textContent = `${subj.name} (Priority: ${subj.priority}) `;
            dashboardSubjectsList.appendChild(li2);
        });
    }
    populateStudySlotSubjects(document.getElementById("studySlotSubject"));
}

function populateStudySlotSubjects(selectEl) {
    selectEl.innerHTML = `<option value="">Select a subject</option>`;
    subjects.forEach(subj => {
        const option = document.createElement("option");
        option.value = subj.name;
        option.textContent = subj.name;
        selectEl.appendChild(option);
    });
    selectEl.disabled = subjects.length === 0;
}

subjectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = subjectName.value.trim();
    const priority = subjectPriority.value;
    if (name === "") return;
    subjects.push({ name, priority });
    saveSubjects();
    renderSubjects();
    subjectName.value = "";
});

// schedule

let studySlots = JSON.parse(localStorage.getItem("studySlots")) || [];
const studySlotForm = document.getElementById("studySlotForm");
const studySlotSubject = document.getElementById("studySlotSubject");
const studySlotStart = document.getElementById("studySlotStart");
const studySlotEnd = document.getElementById("studySlotEnd");
const dashboardStudySlots = document.getElementById("dashboardStudySlots");
const timetable = document.getElementById("timetable");

renderStudySlots();

function saveStudySlots() {
    localStorage.setItem("studySlots", JSON.stringify(studySlots));
}

function renderStudySlots() {
    // dashboard -> "Study Slots"
    dashboardStudySlots.innerHTML = "";
    timetable.innerHTML = "";
    const studySlotsArticle = document.getElementById("studySlotsArticle");
    const timetableArticle = document.getElementById("timetableArticle");
    if (studySlots.length === 0) {
        studySlotsArticle.style.display = "none";
        timetableArticle.style.display = "none";
    } else {
        studySlotsArticle.style.display = "block";
        timetableArticle.style.display = "block";
        studySlots.forEach((slot, idx) => {
            const li = document.createElement("li");
            li.textContent = `${slot.subject} - ${slot.start} to ${slot.end}`;
            const delBtn = document.createElement("button");
            delBtn.className = "delBtns";
            delBtn.type = "button";
            delBtn.textContent = "Delete";
            delBtn.onclick = () => {
                if (confirm("Are you sure you want to delete this study slot?")) {
                    studySlots.splice(idx, 1);
                    saveStudySlots();
                    renderStudySlots();
                }
            };
            li.appendChild(delBtn);
            dashboardStudySlots.appendChild(li);
        });
        timetable.innerHTML = `<thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>`;
        const tbody = timetable.querySelector("tbody");
        studySlots.forEach((slot) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${slot.subject}</td>
                            <td>${slot.start}</td>
                            <td>${slot.end}</td>`;
            tbody.appendChild(tr);
        });
    }
}

studySlotForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const subject = studySlotSubject.value.trim();
    const start = studySlotStart.value;
    const end = studySlotEnd.value;
    if (subject === "" || start === "" || end === "") return;
    if (end <= start) {
        alert("Wait, what? How can the start time be before the end time?");
        return;
    }
    studySlots.push({ subject, start, end });
    saveStudySlots();
    renderStudySlots();
    studySlotSubject.value = "";
    studySlotStart.value = "";
    studySlotEnd.value = "";
});

// tasks

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const addTaskForm = document.getElementById("addTaskForm");
const taskTitle = document.getElementById("taskTitle");
const taskDeadline = document.getElementById("taskDeadline");
const taskList = document.getElementById("taskList");
const upcomingDeadlines = document.getElementById("upcomingDeadlines"); // dashboard
const completedTasksCount = document.getElementById("completedTasksCount"); // progress analytics section

renderTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    upcomingDeadlines.innerHTML = ""; // dashboard -> "Upcoming Deadlines"
    taskList.innerHTML = ""; // task manager section
    const upcomingDeadlinesArticle = document.getElementById("upcomingDeadlinesArticle");
    const taskListArticle = document.getElementById("taskListArticle");
    if (tasks.length === 0) {
        upcomingDeadlinesArticle.style.display = "none";
        taskListArticle.style.display = "none";
    } else {
        upcomingDeadlinesArticle.style.display = "block";
        taskListArticle.style.display = "block";
        let completed = 0;
        tasks.forEach((task, idx) => {
            const li1 = document.createElement("li");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.done;
            checkbox.onchange = () => {
                task.done = checkbox.checked;
                saveTasks();
                renderTasks();
            };
            if (task.done) completed++;
            li1.appendChild(checkbox);
            li1.appendChild(document.createTextNode(` ${task.title} (Due: ${task.deadline}) `));
            const delBtn = document.createElement("button");
            delBtn.className = "delBtns";
            delBtn.type = "button";
            delBtn.textContent = "Delete";
            delBtn.onclick = () => {
                if (confirm("Are you sure you want to delete this task?")) {
                    tasks.splice(idx, 1);
                    saveTasks();
                    renderTasks();
                }
            };
            li1.appendChild(delBtn);
            taskList.appendChild(li1);
        });
        const incompleteTasks = tasks.filter(task => !task.done);
        incompleteTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        const topTasks = incompleteTasks.slice(0, 5);
        topTasks.forEach(task => {
            const li2 = document.createElement("li");
            li2.textContent = `${task.title} (Due: ${task.deadline})`;
            if (new Date(task.deadline) < new Date()) {
                li2.style.color = "red";
            }
            upcomingDeadlines.appendChild(li2);
        });
        completedTasksCount.textContent = completed;
    }
}

addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskTitle.value.trim();
    const deadline = taskDeadline.value;
    if (title === "" || deadline === "") return;
    tasks.push({ title, deadline, done: false });
    saveTasks();
    renderTasks();
    taskTitle.value = "";
    taskDeadline.value = "";
});

// settings

// dark mode toggle
const themeSelect = document.getElementById("themeSelect");
const savedTheme = localStorage.getItem("theme") || "light";
document.body.classList.toggle("dark", savedTheme === "dark");
themeSelect.value = savedTheme;
themeSelect.addEventListener("change", () => {
    const theme = themeSelect.value;
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
});

// clear all data
const clearData = document.getElementById("clearData");
clearData.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
        localStorage.clear();
        location.reload();
    }
});