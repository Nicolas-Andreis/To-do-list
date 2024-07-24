document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.input input');
    const addButton = document.querySelector('.input button');
    const taskContainer = document.querySelector('.task-container');

    // Cargar las tareas desde el localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const renderTasks = () => {
        taskContainer.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskCard = document.createElement('div');
            taskCard.className = 'card';

            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.className = 'radio';
            radio.checked = task.completed;
            radio.addEventListener('click', () => toggleComplete(index));

            const taskText = document.createElement('p');
            taskText.textContent = task.text;
            if (task.completed) {
                taskCard.classList.add('completed');
            }
            
            const editButton = document.createElement('button');
            const editImg = document.createElement('img');
            editImg.src = './images/edit.png';
            editImg.alt = 'editar';
            editButton.appendChild(editImg);
            editButton.addEventListener('click', () => editTask(index));

            const deleteButton = document.createElement('button');
            const deleteImg = document.createElement('img');
            deleteImg.src = './images/trash.png';
            deleteImg.alt = 'borrar';
            deleteButton.appendChild(deleteImg);
            deleteButton.addEventListener('click', () => deleteTask(index));

            const buttonContainer = document.createElement('div');
            buttonContainer.appendChild(editButton);
            buttonContainer.appendChild(deleteButton);
            buttonContainer.className = 'container-buttons'

            taskCard.appendChild(radio);
            taskCard.appendChild(taskText);
            taskCard.appendChild(buttonContainer);

            taskContainer.appendChild(taskCard);
        });
    };

    const addTask = () => {
        const taskText = input.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            input.value = '';
            saveTasks();
            renderTasks();
        }
    };

    const editTask = (index) => {
        const newTaskText = prompt('Edita tu tarea', tasks[index].text);
        if (newTaskText !== null) {
            tasks[index].text = newTaskText.trim();
            saveTasks();
            renderTasks();
        }
    };

    const deleteTask = (index) => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addButton.addEventListener('click', addTask);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
