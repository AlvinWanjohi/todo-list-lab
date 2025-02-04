// Select the form and task list elements
const form = document.getElementById('create-task-form');
const taskList = document.getElementById('tasks');
const sortButton = document.getElementById('sort-tasks');

// Function to create a new task
function createTask(event) {
    event.preventDefault(); // Prevent the default form submission

    const taskDescription = document.getElementById('new-task-description').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due-date').value; // Get the due date

    // Create a new list item
    const listItem = document.createElement('li');
    listItem.textContent = `${taskDescription} (Due: ${dueDate})`; // Include due date in the text

    // Set the color based on priority
    if (priority === 'high') {
        listItem.style.color = 'red';
    } else if (priority === 'medium') {
        listItem.style.color = 'yellow';
    } else {
        listItem.style.color = 'green';
    }

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => {
        taskList.removeChild(listItem); // Remove the task when clicked
    };

    // Create an edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        const newTaskDescription = prompt('Edit Task:', taskDescription);
        if (newTaskDescription) {
            listItem.firstChild.textContent = `${newTaskDescription} (Due: ${dueDate})`; // Update task description
        }
    };

    // Append buttons to the list item
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem); // Add the list item to the task list

    // Clear the input fields
    form.reset();
}

// Function to sort tasks by priority
function sortTasks() {
    const tasksArray = Array.from(taskList.children); // Convert the NodeList to an array
    tasksArray.sort((a, b) => {
        const priorityA = a.querySelector('select').value; // Get priority from select
        const priorityB = b.querySelector('select').value;
        return (priorityA === 'high' ? 3 : priorityA === 'medium' ? 2 : 1) - 
               (priorityB === 'high' ? 3 : priorityB === 'medium' ? 2 : 1);
    });
    
    tasksArray.forEach(task => taskList.appendChild(task)); // Re-append tasks in sorted order
}

// Attach the createTask function to the form's submit event
form.addEventListener('submit', createTask);

// Attach the sort function to the button
sortButton.addEventListener('click', sortTasks);
