const fs = require('fs');
const path = require('path');
const readline = require('readline');

const dataFilePath = path.join('F:/Geekster/Module 6/Day2_Creating task', 'tasks.txt');

// Function to read tasks from file
function readTasksFromFile() {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return data.split('\n').filter(task => task.trim() !== '');
    } catch (err) {
        return [];
    }
}

// Function to write tasks to file
function writeTasksToFile(tasks) {
    fs.writeFileSync(dataFilePath, tasks.join('\n'), 'utf8');
}

// Function to add a new task
function addTask(task) {
    const tasks = readTasksFromFile();
    tasks.push(task);
    writeTasksToFile(tasks);
    console.log('Task added successfully!');
}

// Function to view list of tasks
function viewTasks() {
    const tasks = readTasksFromFile();
    if (tasks.length === 0) {
        console.log('No tasks available.');
    } else {
        console.log('Tasks:');
        tasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task}`);
        });
    }
}

// Function to mark a task as complete
function markTaskComplete(taskIndex) {
    const tasks = readTasksFromFile();
    if (taskIndex >= 1 && taskIndex <= tasks.length) {
        tasks[taskIndex - 1] = '[X] ' + tasks[taskIndex - 1];
        writeTasksToFile(tasks);
        console.log('Task marked as complete.');
    } else {
        console.log('Invalid task index.');
    }
}

// Function to remove a task
function removeTask(taskIndex) {
    const tasks = readTasksFromFile();
    if (taskIndex >= 1 && taskIndex <= tasks.length) {
        tasks.splice(taskIndex - 1, 1);
        writeTasksToFile(tasks);
        console.log('Task removed successfully.');
    } else {
        console.log('Invalid task index.');
    }
}

// Interface for interacting with the user
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function start() {
    console.log('Welcome to the Task Manager!');

    function showMenu() {
        console.log('\nChoose an operation:');
        console.log('1. Add a new task');
        console.log('2. View tasks');
        console.log('3. Mark a task as complete');
        console.log('4. Remove a task');
        console.log('5. Exit');
    }

    function promptOperation() {
        showMenu();
        rl.question('\nEnter your choice: ', choice => {
            switch (choice) {
                case '1':
                    rl.question('Enter task description: ', task => {
                        addTask(task);
                        promptOperation();
                    });
                    break;
                case '2':
                    viewTasks();
                    promptOperation();
                    break;
                case '3':
                    rl.question('Enter task index to mark as complete: ', index => {
                        markTaskComplete(parseInt(index));
                        promptOperation();
                    });
                    break;
                case '4':
                    rl.question('Enter task index to remove: ', index => {
                        removeTask(parseInt(index));
                        promptOperation();
                    });
                    break;
                case '5':
                    console.log('Exiting Task Manager.');
                    rl.close();
                    break;
                default:
                    console.log('Invalid choice. Please try again.');
                    promptOperation();
                    break;
            }
        });
    }

    promptOperation();
}

start();
