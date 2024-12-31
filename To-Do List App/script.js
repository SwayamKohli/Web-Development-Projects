// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Function to add a new task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task'); // Alert for empty input
        return; // Prevent adding empty tasks
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-button">Delete</button>
    `;

    // Add event listener for marking task as completed
    li.querySelector('span').addEventListener('click', () => {
        li.classList.toggle('completed');
    });

    // Add event listener for deleting the task
    li.querySelector('.delete-button').addEventListener('click', () => {
        taskList.removeChild(li);
    });

    taskList.appendChild(li);
    taskInput.value = ''; // Clear input field
};

// Event listener for the Add Task button
addTaskButton.addEventListener('click', addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});