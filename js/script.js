{
    const welcome = () => {
        console.log("Hello everyone! Nice to see you :)");
    }

    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent }
        ];

        renderTasks();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1)
        ];

        renderTasks();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: !tasks[index].done },
            ...tasks.slice(index + 1)
        ];

        renderTasks();
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class=\"list__item${hideDoneTasks && task.done ? " list__item--hidden\"" : "\""}\"
            >
            <button class="button__taskDone js-done">${task.done ? "✓" : ""}</button>
            <span class="list__content${task.done ? " list__content--done" : ""}">${task.content}</span>
            <button class="button__removeTask js-remove">🗑</button>
            
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    }

    const renderButtons = () => {
        if (tasks.length > 0) {
            document.querySelector(".js-buttons").innerHTML = `
            <button class="button__list js-hideDoneTasksButton">
            ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="button__list js-toggleAllTaskDoneButton"${tasks.every(({ done }) => done === true) ? "disabled" : ""}>
            Ukończ wszystkie
            </button>
            `;
        }
    }

    const bindButtonsEvents = () => {
        const hideDoneTasksButton = document.querySelector(".js-hideDoneTasksButton");

        if (hideDoneTasksButton) {
            hideDoneTasksButton.addEventListener("click", () => {
                hideDoneTasks = !hideDoneTasks;

                render();
            });
        }

        const toggleAllTaskDoneButton = document.querySelector(".js-toggleAllTaskDoneButton");
        if (toggleAllTaskDoneButton) {
            toggleAllTaskDoneButton.addEventListener("click", () => {
                tasks = tasks.map(task => ({ ...task, done: true }));

                render();
            });
        }
    }

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    }

    const render = () => {
        renderTasks();
        bindEvents();

        renderButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();

        render();
    };

    const init = () => {
        renderTasks();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
    welcome();
}