document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  saveTaskToStorage(task);
  renderTask(task);

  taskInput.value = "";
  taskInput.focus();
}

function renderTask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-id", task.id);
  li.className = task.completed ? "completed" : "";

  const span = document.createElement("span");
  span.textContent = task.text;
  span.style.flex = "1";
  li.appendChild(span);

  span.addEventListener("click", () => toggleTaskCompletion(task.id));

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Excluir";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  });

  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);
}

function toggleTaskCompletion(taskId) {
  const tasks = getTasksFromStorage();
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      task.completed = !task.completed;
    }
    return task;
  });

  saveTasksToStorage(updatedTasks);
  refreshTaskList();
}

function deleteTask(taskId) {
  const tasks = getTasksFromStorage();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToStorage(updatedTasks);
  refreshTaskList();
}

function refreshTaskList() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";
  const tasks = getTasksFromStorage();
  tasks.forEach(renderTask);
}

function saveTaskToStorage(task) {
  const tasks = getTasksFromStorage();
  tasks.push(task);
  saveTasksToStorage(tasks);
}

function saveTasksToStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromStorage() {
  const stored = localStorage.getItem("tasks");
  return stored ? JSON.parse(stored) : [];
}

function loadTasks() {
  const tasks = getTasksFromStorage();
  tasks.forEach(renderTask);
}