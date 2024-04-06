const btnAddTask = document.querySelector('.app__button--add-task');
const formAddTask = document.querySelector('.app__form-add-task');

btnAddTask.addEventListener('click', () => {
    formAddTask.classList.toggle('hidden');
});