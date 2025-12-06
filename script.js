const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

const ding = new Audio("ding.wav");
ding.preload = "auto";

// Load saved tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
render();

addBtn.addEventListener("click", addTask);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  save();
  render();
  input.value = "";
}

function render() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = task.text;

    // ✅ Done button
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "✅";
    doneBtn.className = "done-btn";
    doneBtn.disabled = task.done;

    doneBtn.addEventListener("click", () => {
      if (task.done) return;

      task.done = true;
      save();

      // Sound + animation
      ding.currentTime = 0;
      ding.play();

      li.classList.add("pop");
      setTimeout(() => li.classList.remove("pop"), 250);

      render();
    });

    // ❌ Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      save();
      render();
    });

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
