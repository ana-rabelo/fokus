/* Todos os botões */
const botoes = document.querySelectorAll('.app__card-button');
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

/* Sons do site */
const somFoco = new Audio('/sons/luna-rise-part-one.mp3');
somFoco.loop = true;
const pause = new Audio('/sons/pause.mp3');
const play = new Audio('/sons/play.wav');
const beep = new Audio('/sons/beep.mp3');

/**
 * Modifica o contexto e atualiza o HTML e banner de acordo com o parâmetro.
 * @param {string} contexto - O novo contexto a ser modificado.
 */
function alterarContexto(contexto) {
    botoes.forEach(botao => {botao.classList.remove('active');});

    htmlContexto.setAttribute('data-contexto', contexto)
    bannerImg.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case "foco":
            bannerTitulo.innerHTML = `
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `
            btnFoco.classList.add('active');
            break;
        case "descanso-curto":
            bannerTitulo.innerHTML = `
            Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>
            ` 
            
            btnDescansoCurto.classList.add('active');
            break;
        case "descanso-longo":
            bannerTitulo.innerHTML = `
            Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>
            `
            btnDescansoLongo.classList.add('active');
        default:
            break;
    }
}

btnDescansoCurto.addEventListener('click', () => {
    alterarContexto('descanso-curto');
}); 

btnDescansoLongo.addEventListener('click', () => {
    alterarContexto('descanso-longo');
});

btnFoco.addEventListener('click', () => {
    alterarContexto('foco');
});

btnComecar.addEventListener('click', () => {

    btnComecar.innerHTML = btnComecar.innerText === 'Começar' ? 
    `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""><span>Pausar</span>` : 
    `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Começar</span>`;
});

btnMusica.addEventListener('change', () => {
    somFoco.paused ? somFoco.play() : somFoco.pause();
});