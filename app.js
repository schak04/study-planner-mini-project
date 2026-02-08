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
    subjectList.innerHTML = "";
    dashboardSubjectsList.innerHTML = "";
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

function saveStudySlots() {
    localStorage.setItem("studySlots", JSON.stringify(studySlots));
}

function renderStudySlots() {
    // dashboard -> "Today's Schedule"
    todaySchedule.innerHTML = "";
    studySlots.forEach((slot, idx) => {
        const li = document.createElement("li");
        li.textContent = `${slot.subject} - ${slot.start} ${slot.end}`;
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