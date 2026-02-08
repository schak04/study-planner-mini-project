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