const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');
const btnCancelTask = document.querySelector('.app__form-footer__button--cancel');
const btnsaveTask = document.querySelector('.app__form-footer__button--confirm')
const textarea = document.querySelector('.app__form-textarea')

const tarefas = [];

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
    tarefas.push(task);

    
    /* Para persistir os dados entre sessões */
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    /* O localStorage é similar ao sessionStorage, com a diferença de que enquanto os dados do localStorage 
    não têm tempo de expiração, os dados do sessionStorage são apagados quando a sessão da página termina */
    
    JSON.parse(localStorage.getItem('tarefas'));

    
    formAddTask.classList.add('hidden');
    textarea.value = '';
});

