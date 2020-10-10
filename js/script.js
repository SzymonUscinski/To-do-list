{
    const welcome = () => {
        console.log("Hello everyone! Nice to see you :)");
    }

    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li
               ${task.done ? " style=\"text-decoration: line-through\" " : ""}
            >
               ${task.content}
            </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const formElement = document.querySelector(".js-form");

        formElement.addEventListener("submit", onFormSubmit);
    };

    init();
    welcome();
}