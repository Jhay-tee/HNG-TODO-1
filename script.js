// Get all DOM elements
const checkbox = document.getElementById("completeToggle");
const statusBadge = document.getElementById("statusBadge");
const statusControl = document.getElementById("statusControl");
const titleElem = document.getElementById("todoTitle");
const descriptionElem = document.getElementById("todoDescription");
const priorityBadge = document.getElementById("priorityBadge");
const priorityIndicator = document.getElementById("priorityIndicator");
const dueDateDisplay = document.getElementById("dueDateDisplay");
const timeRemainingElem = document.getElementById("timeRemaining");
const overdueIndicator = document.getElementById("overdueIndicator");
const expandToggle = document.getElementById("expandToggle");
const collapsibleSection = document.getElementById("collapsibleSection");
const editBtn = document.getElementById("editButton");
const deleteBtn = document.getElementById("deleteButton");
const editForm = document.getElementById("editForm");
const editTitle = document.getElementById("editTitleInput");
const editDesc = document.getElementById("editDescInput");
const editPriority = document.getElementById("editPrioritySelect");
const editDue = document.getElementById("editDueDateInput");
const saveBtn = document.getElementById("saveButton");
const cancelBtn = document.getElementById("cancelButton");

// Simple state
let todo = {
  title: "Complete HNG Stage 1 Task",
  description: "Build a fully accessible, responsive, and interactive Todo Card.",
  priority: "High",
  status: "Pending",
  due: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days from now
};

// Update all UI
function updateUI() {
  titleElem.textContent = todo.title;
  descriptionElem.textContent = todo.description;
  priorityBadge.textContent = todo.priority;
  priorityBadge.className = `badge priority ${todo.priority.toLowerCase()}`;
  priorityIndicator.className = `priority-indicator ${todo.priority.toLowerCase()}`;
  statusBadge.textContent = todo.status;
  statusBadge.className = `badge status ${todo.status.toLowerCase().replace(' ', '-')}`;
  statusControl.value = todo.status;
  checkbox.checked = (todo.status === "Done");
  if (todo.status === "Done") titleElem.classList.add("done-strike");
  else titleElem.classList.remove("done-strike");
  dueDateDisplay.textContent = `Due: ${todo.due.toLocaleString()}`;
  updateTime();
}

// Time remaining & overdue
function updateTime() {
  if (todo.status === "Done") {
    timeRemainingElem.textContent = "Completed";
    overdueIndicator.classList.add("hidden");
    return;
  }
  const now = new Date();
  const diff = todo.due - now;
  if (diff <= 0) {
    overdueIndicator.classList.remove("hidden");
    const hours = Math.floor(-diff / (1000 * 60 * 60));
    timeRemainingElem.textContent = `Overdue by ${hours} hour${hours !== 1 ? 's' : ''}`;
  } else {
    overdueIndicator.classList.add("hidden");
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor(diff / (1000 * 60));
    if (days > 0) timeRemainingElem.textContent = `Due in ${days} day${days !== 1 ? 's' : ''}`;
    else if (hours > 0) timeRemainingElem.textContent = `Due in ${hours} hour${hours !== 1 ? 's' : ''}`;
    else timeRemainingElem.textContent = `Due in ${mins} minute${mins !== 1 ? 's' : ''}`;
  }
}

// Sync status from any control
function setStatus(newStatus) {
  todo.status = newStatus;
  updateUI();
}

// Event listeners
checkbox.addEventListener("change", () => setStatus(checkbox.checked ? "Done" : "Pending"));
statusControl.addEventListener("change", (e) => setStatus(e.target.value));

// Expand/Collapse
expandToggle.addEventListener("click", () => {
  const expanded = expandToggle.getAttribute("aria-expanded") === "true";
  if (expanded) {
    collapsibleSection.classList.add("collapsed");
    expandToggle.setAttribute("aria-expanded", "false");
    expandToggle.textContent = "Expand";
  } else {
    collapsibleSection.classList.remove("collapsed");
    expandToggle.setAttribute("aria-expanded", "true");
    expandToggle.textContent = "Collapse";
  }
});

// Edit mode
editBtn.addEventListener("click", () => {
  editTitle.value = todo.title;
  editDesc.value = todo.description;
  editPriority.value = todo.priority;
  editDue.value = todo.due.toISOString().slice(0, 16);
  editForm.classList.remove("hidden");
  editTitle.focus();
});
saveBtn.addEventListener("click", () => {
  todo.title = editTitle.value.trim() || todo.title;
  todo.description = editDesc.value.trim() || todo.description;
  todo.priority = editPriority.value;
  const newDue = new Date(editDue.value);
  if (!isNaN(newDue.getTime())) todo.due = newDue;
  editForm.classList.add("hidden");
  updateUI();
  editBtn.focus();
});
cancelBtn.addEventListener("click", () => {
  editForm.classList.add("hidden");
  editBtn.focus();
});

// Delete resets to default
deleteBtn.addEventListener("click", () => {
  if (confirm("Reset todo?")) {
    todo = {
      title: "Complete HNG Stage 1 Task",
      description: "Build a fully accessible, responsive, and interactive Todo Card.",
      priority: "High",
      status: "Pending",
      due: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
    };
    updateUI();
    if (expandToggle.getAttribute("aria-expanded") === "true") expandToggle.click();
  }
});

// Auto time update every 30 seconds
setInterval(updateTime, 30000);
updateUI();
// Ensure collapsible starts collapsed
collapsibleSection.classList.add("collapsed");