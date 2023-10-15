document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addButton = document.getElementById('add-button');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(function(task, index) {
            const taskItem = document.createElement('div');
            taskItem.classList.add('task');
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
                <button class="toggle-button">${task.completed ? 'Uncomplete' : 'Complete'}</button>
            `;

            taskItem.querySelector('.edit-button').addEventListener('click', () => {
                const updatedText = prompt('Edit task:', task.text);
                if (updatedText !== null) {
                    tasks[index].text = updatedText;
                    updateLocalStorage();
                    renderTasks();
                }
            });

            taskItem.querySelector('.delete-button').addEventListener('click', () => {
                tasks.splice(index, 1);
                updateLocalStorage();
                renderTasks();
            });

            taskItem.querySelector('.toggle-button').addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                updateLocalStorage();
                renderTasks();
            });

            taskList.appendChild(taskItem);
        });
    }

    renderTasks();

    addButton.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText === '') return;

        tasks.push({ text: taskText, completed: false });
        updateLocalStorage();
        renderTasks();
        newTaskInput.value = '';
    });
});
