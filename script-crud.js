const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const btnCancelTask = document.querySelector('.app__form-footer__button--cancel');
const btnsaveTask = document.querySelector('.app__form-footer__button--confirm');
const textarea = document.querySelector('.app__form-textarea');
const ulTasks = document.querySelector('.app__section-task-list');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(task => createTask(task));

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

    const button = document.createElement('button');
    const imageBtn = document.createElement('img');
    imageBtn.setAttribute('src', './imagens/edit.png');
    button.appendChild(imageBtn);
    button.classList.add('app_button-edit');

    li.appendChild(svg);
    li.appendChild(p);
    li.appendChild(button);
    
    ulTasks.appendChild(li);
}

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');
});

formAddTask.addEventListener('submit', (event) => {
    event.preventDefault();
    const task = {
        id: Date.now(),
        description: textarea.value,
        completed: false
    };

    tasks.push(task);
    
    /* Para persistir os dados entre sessões */
    localStorage.setItem('tasks', JSON.stringify(tasks));
    /* O localStorage é similar ao sessionStorage, com a diferença de que enquanto os dados do localStorage 
    não têm tempo de expiração, os dados do sessionStorage são apagados quando a sessão da página termina */
    
    createTask(task);

    textarea.value = '';
});

