const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const formLabel = document.querySelector('.app__form-label');
const btnCancelTask = document.querySelector('.app__form-footer__button--cancel');
const btnsaveTask = document.querySelector('.app__form-footer__button--confirm');
const textarea = document.querySelector('.app__form-textarea');
const ulTasks = document.querySelector('.app__section-task-list');
const pDescriptionTask = document.querySelector('.app__section-active-task-description');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let selectedTask = null;
let liSelectedTask = null;

function updateTasks () {
    tasks.sort((a, b) => {
        if (a.completed && !b.completed) {
            return 1;
        } else if (!a.completed && b.completed) {
            return -1;
        } else {
            return 0;
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
    ulTasks.innerHTML = '';
    tasks.forEach(task => createTask(task)); 
}

function setCompleted(taskId) {
    const task = tasks.find(task => task.id === taskId);
    task.completed = true;
    updateTasks();
}

function setId(taskId) {
    if (document.getElementById('id')) {
        id.setAttribute('value', taskId);
    } else {
        const id = document.createElement('input');
        id.setAttribute('type', 'hidden');
        id.setAttribute('id', 'id');
        id.setAttribute('value', taskId);
        formAddTask.appendChild(id);  
    }
}

function clearForm() {
    formAddTask.classList.add('hidden');
    textarea.value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    updateTasks();
});

function createTask(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');    
    
    const svg = document.createElement('svg');
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>`;

    const p = document.createElement('p');
    p.textContent = task.description;
    p.classList.add('app__section-task-list-item-description'); 
         
    const textareaEdit = document.createElement('textarea');
    textareaEdit.classList.add('app__form-textarea');

    const button = document.createElement('button');
    const imageBtn = document.createElement('img');
    imageBtn.setAttribute('src', './imagens/edit.png');
    button.appendChild(imageBtn);
    button.classList.add('app_button-edit');

    button.onclick = () => {
        formLabel.textContent = 'Editando tarefa';
        textarea.value = task.description;
        
        setId(task.id);

        formAddTask.classList.remove('hidden');
    };

    li.append(svg);
    li.append(p);
    li.append(button);

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
        .forEach(elemento => {
            elemento.classList.remove('app__section-task-list-item-active')
        })

        // Se a tarefa clicada for a mesma que já está selecionada, deseleciona
        if (selectedTask == task) {
            pDescriptionTask.textContent = '';
            selectedTask = null;
            liSelectedTask = null;
            return;
        }

        selectedTask = task;
        liSelectedTask = li;
        pDescriptionTask.textContent = task.description;
        li.classList.add('app__section-task-list-item-active');
    }
        
    ulTasks.append(li);
}

document.addEventListener('focoFinalizado', () => {
    if (selectedTask && liSelectedTask){
        liSelectedTask.classList.remove('app__section-task-list-item-active');
        liSelectedTask.classList.add('app__section-task-list-item-complete');
        liSelectedTask.querySelector('button').setAttribute('disabled', 'disabled');
        setCompleted(selectedTask.id);
    }
});

btnAddTask.addEventListener('click', () => {
    formLabel.textContent = 'Adicionando tarefa';
    textarea.value = '';
    formAddTask.classList.remove('hidden');

    setId(null);
});

btnCancelTask.addEventListener('click', clearForm);

formAddTask.addEventListener('submit', (event) => {
    event.preventDefault();

    const taskId = document.getElementById('id');

    if (taskId.value === "null") {
        const task = {
            id: tasks.length + 1,
            description: textarea.value,
            completed: false
        };
        
        tasks.push(task);
        
        /* Para persistir os dados entre sessões */
        localStorage.setItem('tasks', JSON.stringify(tasks));
        /* O localStorage é similar ao sessionStorage, com a diferença de que enquanto os dados do localStorage 
        não têm tempo de expiração, os dados do sessionStorage são apagados quando a sessão da página termina */
            
        createTask(task);
        clearForm();
        
    } else {
        const task = tasks.find(task => task.id === parseInt(taskId.value));
        task.description = textarea.value;
        
        updateTasks();
        clearForm();         
    }
});

