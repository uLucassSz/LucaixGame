const niveis = [
    { pergunta: '2 + 2', resposta: 4 },
    { pergunta: '4 * 5', resposta: 15 },
    { pergunta: '3 * 5', resposta: 15 },
    { pergunta: '3 * 5', resposta: 15 },
    { pergunta: '3 * 5', resposta: 15 },
    { pergunta: '3 * 5', resposta: 15 },
];

let nivelAtual = 0;
let erros = 0;
let acertos = 0;
const maxErros = 5;

const nivelElement = document.getElementById('nivel');
const totalErrosElement = document.getElementById('totalErros');
const questionElement = document.querySelector('.question');
const answerInput = document.getElementById('answer');
const verifyBtn = document.getElementById('verify');
const statusElement = document.querySelector('.status');
const finishText = document.getElementById('finishText')
const finishAcertos = document.getElementById('acertos')
const finishErros = document.getElementById('erros')

function iniciarJogo() {
    nivelElement.textContent = nivelAtual + 1;
    totalErrosElement.textContent = erros;
    questionElement.textContent = niveis[nivelAtual].pergunta;
    answerInput.value = '';
    statusElement.textContent = '';
    statusElement.classList.remove('incorrect', 'correct');
    verifyBtn.disabled = false;
}

function proximaPergunta() {
    nivelAtual++;
    if (nivelAtual < niveis.length) {
        statusElement.classList.remove('active')
        iniciarJogo();
    } else {
        mostrarResultadoFinal();
    }
}

function verificarResposta() {
    const respostaCorreta = niveis[nivelAtual].resposta;
    const respostaUsuario = parseInt(answerInput.value);

    if (respostaUsuario === respostaCorreta) {
        acertos++;
        statusElement.classList.add('active');
        statusElement.textContent = 'Resposta correta!';
        statusElement.classList.add('correct');
    } else {
        erros++;
        statusElement.classList.add('active');
        statusElement.textContent = 'Resposta incorreta!';
        statusElement.classList.add('incorrect');

        if (erros >= maxErros) {
            mostrarResultadoFinal();
        }
    }

    verifyBtn.disabled = true;
    setTimeout(proximaPergunta, 1000); 
}

function mostrarResultadoFinal() {
    gameStarted.classList.remove('active')
    finishGame.classList.add('active')
    
    if (erros >= maxErros) {
        finishText.textContent = 'Você perdeu! Tente novamente.';
    } else {
        finishText.textContent = 'Parabéns! Você ganhou!';
    }

    finishAcertos.textContent = acertos;
    finishErros.textContent = erros;
}

function restartGame() {
    nivelAtual = 0;
    acertos = 0;
    erros = 0;

    finishGame.classList.remove('active')
    statusElement.classList.remove('active');
    gameStarted.classList.add('active')

    iniciarJogo();  
}

verifyBtn.addEventListener('click', verificarResposta);

iniciarJogo();

const infoGame = document.querySelector('.infoGame-wrapper');
const gameStarted = document.querySelector('.gameStarted-wrapper');
const finishGame = document.querySelector('.finishGame-wrapper')

function startGame() {
    infoGame.classList.remove('active')
    gameStarted.classList.add('active')
}