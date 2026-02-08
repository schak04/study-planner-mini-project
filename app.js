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
    subjects.forEach((subj, idx) => {
        const li1 = document.createElement("li");
        li1.textContent = `${subj.name} (Priority: ${subj.priority}) `;
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.textContent = "Delete";
        delBtn.onclick = () => {
            subjects.splice(idx, 1);
            saveSubjects();
            renderSubjects();
        };
        li1.appendChild(delBtn);
        subjectList.appendChild(li1);
        const li2 = document.createElement("li");
        li2.textContent = `${subj.name} (Priority: ${subj.priority}) `;
        dashboardSubjectsList.appendChild(li2);
    });
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
const todaySchedule = document.getElementById("todaySchedule");
const dailyTimetable = document.getElementById("dailyTimetable");

renderStudySlots();

function saveStudySlots() {
    localStorage.setItem("studySlots", JSON.stringify(studySlots));
}

function renderStudySlots() {
    // dashboard -> "Today's Schedule"
    todaySchedule.innerHTML = "";
    studySlots.forEach((slot, idx) => {
        const li = document.createElement("li");
        li.textContent = `${slot.subject} - ${slot.start} to ${slot.end}`;
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.textContent = "Delete";
        delBtn.onclick = () => {
            studySlots.splice(idx, 1);
            saveStudySlots();
            renderStudySlots();
        }
        li.appendChild(delBtn);
        todaySchedule.appendChild(li);
    })
    // schedule planner section -> daily timetable
    dailyTimetable.innerHTML = `<thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>`;
    const tbody = dailyTimetable.querySelector("tbody");
    studySlots.forEach((slot) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${slot.subject}</td>
                        <td>${slot.start}</td>
                        <td>${slot.end}</td>`;
        tbody.appendChild(tr);
    });
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
        delBtn.type = "button";
        delBtn.textContent = "Delete";
        delBtn.onclick = () => {
            tasks.splice(idx, 1);
            saveTasks();
            renderTasks();
        };
        li1.appendChild(delBtn);
        taskList.appendChild(li1);
        const li2 = document.createElement("li");
        li2.textContent = `${task.title} (Due: ${task.deadline})`
        upcomingDeadlines.appendChild(li2);
    });
    completedTasksCount.textContent = completed;
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

// clear all data
const clearData = document.getElementById("clearData");
clearData.addEventListener("click", () => {
    localStorage.clear();
    subjects = [];
    studySlots = [];
    tasks = [];
    renderSubjects();
    renderStudySlots();
    renderTasks();
})