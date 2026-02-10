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

    // Sort slots by start time
    studySlots.sort((a, b) => a.start.localeCompare(b.start));

    if (studySlots.length === 0) {
        studySlotsArticle.style.display = "none";
        timetableArticle.style.display = "none";
    } else {
        studySlotsArticle.style.display = "block";
        timetableArticle.style.display = "block";
        studySlots.forEach((slot, idx) => {
            const li = document.createElement("li");
            li.textContent = `${slot.subject} - ${slot.start} to ${slot.end}`;

            const editBtn = document.createElement("button");
            editBtn.className = "editBtn";
            editBtn.type = "button";
            editBtn.textContent = "Edit";
            editBtn.onclick = () => openEditSlotModal(idx);

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
            li.appendChild(editBtn);
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
    const errorMsg = document.getElementById("slotError");

    // Reset error
    errorMsg.style.display = "none";
    errorMsg.textContent = "";

    if (subject === "" || start === "" || end === "") return;

    if (end <= start) {
        errorMsg.textContent = "End time must be after start time.";
        errorMsg.style.display = "block";
        return;
    }

    // Check for overlap
    const isOverlap = studySlots.some(slot => {
        return (start < slot.end && end > slot.start);
    });

    if (isOverlap) {
        errorMsg.textContent = "Time slot overlaps with an existing session.";
        errorMsg.style.display = "block";
        return;
    }

    studySlots.push({ subject, start, end });
    saveStudySlots();
    renderStudySlots();

    // Success, clear form
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
const totalTasksCount = document.getElementById("totalTasksCount");
const pendingTasksCount = document.getElementById("pendingTasksCount");
const overdueTasksCount = document.getElementById("overdueTasksCount");
const completionPercent = document.getElementById("completionPercent");
const completionBar = document.getElementById("completionBar");

renderTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function isOverdue(deadlineStr) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const d = new Date(deadlineStr);
    d.setHours(0, 0, 0, 0);
    return d < today;
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

            const editBtn = document.createElement("button");
            editBtn.className = "editBtn";
            editBtn.type = "button";
            editBtn.textContent = "Edit";
            editBtn.onclick = () => openEditTaskModal(idx);

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
            li1.appendChild(editBtn);
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
        const total = tasks.length;
        const pending = total - completed;
        const overdue = tasks.filter(t => !t.done && isOverdue(t.deadline)).length;
        const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
        totalTasksCount.textContent = total;
        completedTasksCount.textContent = completed;
        pendingTasksCount.textContent = pending;
        overdueTasksCount.textContent = overdue;
        completionPercent.textContent = `${pct}%`;
        completionBar.style.width = `${pct}%`;
        // Render charts
        updateCharts(completed, pending, overdue);
    }
}

function updateCharts(completed, pending, overdue) {
    const chartsContainer = document.getElementById("chartsContainer");
    const chartLegend = document.getElementById("chartLegend");

    if (completed === 0 && pending === 0 && overdue === 0) {
        chartsContainer.style.display = "none";
        chartLegend.style.display = "none";
        return;
    }

    chartsContainer.style.display = "flex";
    chartLegend.style.display = "flex";

    // Get theme colors
    const style = getComputedStyle(document.body);
    const completedColor = style.getPropertyValue('--accent').trim();
    const pendingColor = style.getPropertyValue('--muted').trim();
    const overdueColor = "hsl(0, 80%, 60%)"; // Red for overdue

    const pieCtx = document.getElementById("pieChart").getContext("2d");
    const barCtx = document.getElementById("barChart").getContext("2d");

    const data = [completed, pending, overdue];
    const labels = ["Completed", "Pending", "Overdue"];
    const colors = [completedColor, pendingColor, overdueColor];

    drawPieChart(pieCtx, data, colors);
    drawBarChart(barCtx, data, colors, labels);
    drawLegend(chartLegend, labels, colors);
}

function drawPieChart(ctx, data, colors) {
    const total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;
    const canvas = ctx.canvas;
    // Handle high DPI
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.width * dpr; // Square aspect ratio
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.width}px`;

    const centerX = rect.width / 2;
    const centerY = rect.width / 2;
    const radius = (rect.width / 2) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (total === 0) return;

    data.forEach((value, idx) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[idx];
        ctx.fill();
        startAngle += sliceAngle;
    });
}

function drawBarChart(ctx, data, colors, labels) {
    const canvas = ctx.canvas;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    // Maintain aspect ratio or fixed height
    const height = 200;
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${height}px`;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxVal = Math.max(...data);
    if (maxVal === 0) return;

    const barWidth = (rect.width / data.length) - 20;
    const chartHeight = height - 20;

    data.forEach((value, idx) => {
        const barHeight = (value / maxVal) * chartHeight;
        const x = idx * (rect.width / data.length) + 10;
        const y = chartHeight - barHeight;

        ctx.fillStyle = colors[idx];
        ctx.fillRect(x, y, barWidth, barHeight);

        // Count text
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text').trim();
        ctx.font = "bold 12px system-ui";
        ctx.textAlign = "center";
        ctx.fillText(value, x + barWidth / 2, y - 5);
    });
}

function drawLegend(container, labels, colors) {
    container.innerHTML = "";
    labels.forEach((label, idx) => {
        const item = document.createElement("div");
        item.className = "legend-item";
        item.innerHTML = `<div class="legend-color" style="background: ${colors[idx]}"></div> ${label}`;
        container.appendChild(item);
    });
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
    renderTasks(); // Re-render to update charts with new theme colors
});

// clear all data
const clearData = document.getElementById("clearData");
clearData.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
        localStorage.clear();
        location.reload();
    }
});

// Edit Modal Logic
const editModal = document.getElementById("editModal");
const modalTitle = document.getElementById("modalTitle");
const modalFields = document.getElementById("modalFields");
const modalError = document.getElementById("modalError");
const editForm = document.getElementById("editForm");
const cancelEdit = document.getElementById("cancelEdit");

let currentEditType = null;
let currentEditIndex = null;

function closeModal() {
    editModal.style.display = "none";
    modalError.style.display = "none";
    modalError.textContent = "";
    currentEditType = null;
    currentEditIndex = null;
}

cancelEdit.addEventListener("click", closeModal);

// Close modal when clicking outside
editModal.addEventListener("click", (e) => {
    if (e.target === editModal) closeModal();
});

// Subject Edit
function openEditSubjectModal(idx) {
    const subj = subjects[idx];
    currentEditType = "subject";
    currentEditIndex = idx;

    modalTitle.textContent = "Edit Subject";
    modalFields.innerHTML = `
        <label>
            Subject Name
            <input type="text" id="editSubjectName" value="${subj.name}" required />
        </label>
        <label>
            Priority
            <select id="editSubjectPriority">
                <option value="High" ${subj.priority === "High" ? "selected" : ""}>High</option>
                <option value="Medium" ${subj.priority === "Medium" ? "selected" : ""}>Medium</option>
                <option value="Low" ${subj.priority === "Low" ? "selected" : ""}>Low</option>
            </select>
        </label>
    `;

    editModal.style.display = "block";
}

// Study Slot Edit
function openEditSlotModal(idx) {
    const slot = studySlots[idx];
    currentEditType = "slot";
    currentEditIndex = idx;

    modalTitle.textContent = "Edit Study Slot";

    const subjectOptions = subjects.map(s =>
        `<option value="${s.name}" ${s.name === slot.subject ? "selected" : ""}>${s.name}</option>`
    ).join("");

    modalFields.innerHTML = `
        <label>
            Subject
            <select id="editSlotSubject" required>
                ${subjectOptions}
            </select>
        </label>
        <label>
            Start Time
            <input type="time" id="editSlotStart" value="${slot.start}" required />
        </label>
        <label>
            End Time
            <input type="time" id="editSlotEnd" value="${slot.end}" required />
        </label>
    `;

    editModal.style.display = "block";
}

// Task Edit
function openEditTaskModal(idx) {
    const task = tasks[idx];
    currentEditType = "task";
    currentEditIndex = idx;

    modalTitle.textContent = "Edit Task";
    modalFields.innerHTML = `
        <label>
            Task Title
            <input type="text" id="editTaskTitle" value="${task.title}" required />
        </label>
        <label>
            Deadline
            <input type="date" id="editTaskDeadline" value="${task.deadline}" required />
        </label>
    `;

    editModal.style.display = "block";
}

// Save Edit
editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    modalError.style.display = "none";
    modalError.textContent = "";

    if (currentEditType === "subject") {
        const newName = document.getElementById("editSubjectName").value.trim();
        const newPriority = document.getElementById("editSubjectPriority").value;

        if (newName === "") return;

        // Check for duplicates (case-insensitive), excluding current subject
        const isDuplicate = subjects.some((s, i) =>
            i !== currentEditIndex && s.name.toLowerCase() === newName.toLowerCase()
        );

        if (isDuplicate) {
            modalError.textContent = "A subject with this name already exists.";
            modalError.style.display = "block";
            return;
        }

        const oldName = subjects[currentEditIndex].name;
        subjects[currentEditIndex] = { name: newName, priority: newPriority };

        // Update all study slots that reference the old subject name
        studySlots.forEach(slot => {
            if (slot.subject === oldName) {
                slot.subject = newName;
            }
        });

        saveSubjects();
        saveStudySlots();
        renderSubjects();
        renderStudySlots();
        closeModal();

    } else if (currentEditType === "slot") {
        const subject = document.getElementById("editSlotSubject").value;
        const start = document.getElementById("editSlotStart").value;
        const end = document.getElementById("editSlotEnd").value;

        if (subject === "" || start === "" || end === "") return;

        if (end <= start) {
            modalError.textContent = "End time must be after start time.";
            modalError.style.display = "block";
            return;
        }

        // Check for overlap, excluding the slot being edited
        const isOverlap = studySlots.some((slot, i) => {
            if (i === currentEditIndex) return false;
            return (start < slot.end && end > slot.start);
        });

        if (isOverlap) {
            modalError.textContent = "Time slot overlaps with an existing session.";
            modalError.style.display = "block";
            return;
        }

        studySlots[currentEditIndex] = { subject, start, end };
        saveStudySlots();
        renderStudySlots();
        closeModal();

    } else if (currentEditType === "task") {
        const title = document.getElementById("editTaskTitle").value.trim();
        const deadline = document.getElementById("editTaskDeadline").value;

        if (title === "" || deadline === "") return;

        // Preserve done state
        tasks[currentEditIndex].title = title;
        tasks[currentEditIndex].deadline = deadline;

        saveTasks();
        renderTasks();
        closeModal();
    }
});