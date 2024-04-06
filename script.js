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
let tempoDecorridoEmSegundos = timerFoco;
let intervaloId = null;
mostrarTempo();

/* Sons do site */
const somFoco = new Audio('/sons/luna-rise-part-one.mp3');
somFoco.loop = true;
const pause = new Audio('/sons/pause.mp3');
const play = new Audio('/sons/play.wav');
const beep = new Audio('/sons/beep.mp3');
beep.currentTime = 4;


/**
 * Modifica o contexto e atualiza o HTML e banner de acordo com o parâmetro.
 * @param {string} contexto - O novo contexto a ser modificado.
 */
function alterarContexto(contexto) {
    botoes.forEach(botao => {botao.classList.remove('active');});
    mostrarTempo();

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
    tempoDecorridoEmSegundos = timerDescansoCurto;
    alterarContexto('descanso-curto');
}); 

btnDescansoLongo.addEventListener('click', () => {
    tempoDecorridoEmSegundos = timerDescansoLongo;
    alterarContexto('descanso-longo');
});

btnFoco.addEventListener('click', () => {
    tempoDecorridoEmSegundos = timerFoco;
    alterarContexto('foco');
});

btnComecar.addEventListener('click', () => {
    iniciarOuPausar();
    btnComecar.innerHTML = btnComecar.innerText === 'Começar' ? 
    `<img class="app__card-primary-butto-icon" src="/imagens/pause.png" alt=""><span>Pausar</span>` : 
    `<img class="app__card-primary-butto-icon" src="/imagens/play_arrow.png" alt=""><span>Começar</span>`;


});

btnMusica.addEventListener('click', () => {
    somFoco.paused ? somFoco.play() : somFoco.pause();
});

/** 
 * Mostra o tempo no formato MM:SS.
 */
function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${tempoFormatado}`;
}

/**
 * Executa a função de contagem regressiva a cada 1 segundo (1000 milissegundos).
 */
function iniciarOuPausar() {
    if (intervaloId) {
        pause.play();
        parar();
        return;
    }
    play.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
}

/**
 * Faz a conta regressiva do tempo e para quando chegar a 0.
 */
const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        beep.play();
        parar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

/**
 * Para a contagem regressiva.
 */
function parar() {
    clearInterval(intervaloId);
    intervaloId = null;
}
