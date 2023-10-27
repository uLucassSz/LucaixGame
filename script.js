const niveis = [
    { pergunta: '2 + 2', resposta: 4 },
    { pergunta: '3 + 5', resposta: 8 },
    { pergunta: '7 + 3', resposta: 10 },
    { pergunta: '1 + 9', resposta: 10 },
    { pergunta: '18 + 4', resposta: 22 },
    { pergunta: '14 - 9', resposta: 5 },
    { pergunta: '22 - 14', resposta: 8 },
    { pergunta: '40 - 27', resposta: 13 },
    { pergunta: '63 - 48', resposta: 15 },
    { pergunta: '32 - 18', resposta: 14 },
    { pergunta: '3 * 4', resposta: 12 },
    { pergunta: '5 * 7', resposta: 35 },
    { pergunta: '8 * 6', resposta: 48 },
    { pergunta: '9 * 5', resposta: 45 },
    { pergunta: '12 * 2', resposta: 24 },
    { pergunta: '10 ÷ 2', resposta: 5 },
    { pergunta: '18 ÷ 3', resposta: 6 },
    { pergunta: '36 ÷ 6', resposta: 6 },
    { pergunta: '63 ÷ 9', resposta: 7 },
    { pergunta: '49 ÷ 7', resposta: 7 }
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