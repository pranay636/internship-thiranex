const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {

        if(currentFilter === "active") {
            return !task.completed;
        }

        if(currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    filteredTasks.forEach(task => {

        const li = document.createElement("li");

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-actions">

                <button class="toggle-btn">
                    ${task.completed ? "Undo" : "Done"}
                </button>

                <button class="edit-btn">
                    Edit
                </button>

                <button class="delete-btn">
                    Delete
                </button>

            </div>
        `;

        li.querySelector(".toggle-btn").addEventListener("click", () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        li.querySelector(".edit-btn").addEventListener("click", () => {

            const newText = prompt("Edit Task", task.text);

            if(newText){
                task.text = newText;
                saveTasks();
                renderTasks();
            }
        });

        li.querySelector(".delete-btn").addEventListener("click", () => {

            tasks = tasks.filter(t => t !== task);

            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

addTaskBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text:text,
        completed:false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
});

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        document
        .querySelector(".filter-btn.active")
        .classList.remove("active");

        button.classList.add("active");

        currentFilter = button.dataset.filter;

        renderTasks();
    });
});

renderTasks();