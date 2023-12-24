document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    const taskForm = document.getElementById('taskForm');
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the default form submission
        addTask();
    });
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');

    const taskList = document.getElementById('taskList');
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const taskDetails = document.createElement('span');
    taskDetails.textContent = taskInput.value;

    const formattedDate = formatDate(dateInput.value);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        taskDiv.remove();
        saveTasks();
    };

    taskDiv.appendChild(taskDetails);
    if (formattedDate) {
        taskDiv.innerHTML += ` - ${formattedDate}`;
    }
    taskDiv.appendChild(deleteButton);

    taskList.appendChild(taskDiv);

    saveTasks();

    // Clear input fields
    taskInput.value = '';
    dateInput.value = '';
}

function formatDate(inputDate) {
    if (!inputDate) {
        return '';
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
    return formattedDate;
}

function deleteAllTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    const taskElements = document.getElementsByClassName('task');

    for (const taskElement of taskElements) {
        const taskDetails = taskElement.querySelector('span').textContent;
        tasks.push(taskDetails);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    for (const taskDetails of tasks) {
        const [task, date] = taskDetails.split(' - ');

        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const taskDetailsSpan = document.createElement('span');
        taskDetailsSpan.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function() {
            taskDiv.remove();
            saveTasks();
        };

        taskDiv.appendChild(taskDetailsSpan);
        taskDiv.innerHTML += date ? ` - ${date}` : '';
        taskDiv.appendChild(deleteButton);

        taskList.appendChild(taskDiv);
    }
}
