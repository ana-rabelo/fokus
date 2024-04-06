/* Botão para escolher o temporizador de “Foco” */
const btnFoco = document.querySelector('.app__card-button--foco');
/* Botão para escolher o temporizador de “Descanso Curto” */
const btnDescansoCurto = document.querySelector('.app__card-button--curto');
/* Botão para escolher o temporizador de “Descanso Longo” */
const btnDescansoLongo = document.querySelector('.app__card-button--longo');

/* O documento HTML */
const htmlContexto = document.querySelector('html');

/* Botão que irá iniciar e pausar o temporizador */
const btnComecar = document.getElementById('start-pause');
/* Botão para ligar e desligar a música */
const btnMusica = document.getElementById('alternar-musica');
/* Botão para selecionar a imagem do banner */
const bannerImg = document.querySelector('.app__image');
/* Botão para selecionar o título do banner */
const bannerTitulo = document.querySelector('.app__title');

/* Elemento HTML que irá aparecer o temporizador */
const timer = document.getElementById('timer');
const timerFoco = 1500;
const timerDescansoCurto = 300;
const timerDescansoLongo = 900;

btnDescansoCurto.addEventListener('click', () => {
    htmlContexto.setAttribute('data-contexto', 'descanso-curto');
    bannerImg.setAttribute('src', './imagens/descanso-curto.png');
    /* OU 
    bannerImg.src = './imagens/descanso-curto.png'; */
}); 

btnDescansoLongo.addEventListener('click', () => {
    htmlContexto.setAttribute('data-contexto', 'descanso-longo');
    bannerImg.setAttribute('src', './imagens/descanso-longo.png');
});

btnFoco.addEventListener('click', () => {
    htmlContexto.setAttribute('data-contexto', 'foco');
    bannerImg.setAttribute('src', './imagens/foco.png');
});

btnComecar.addEventListener('click', () => {
    btnComecar.innerHTML = btnComecar.innerText === 'Começar' ? 
    `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""><span>Pausar</span>` : 
    `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Começar</span>`;
});