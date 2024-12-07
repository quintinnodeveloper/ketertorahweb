let timeoutId;
let timerIntervalId;
let tempoDeInatividade = 0;
let bloqueioAtivo = false;

document.addEventListener('DOMContentLoaded', function () {
    onBloquearTelaInatividade();
    monitorarInatividade();
});

function onBloquearTelaInatividade() {
    if (!bloqueioAtivo) {
        tempoDeInatividade = 0;
        timerIntervalId = setInterval(() => {
            tempoDeInatividade++;
            console.log(`Tempo de inatividade: ${tempoDeInatividade} segundos`);
            if (tempoDeInatividade >= 180000) {
                clearInterval(timerIntervalId);
                window.location.href = "http://127.0.0.1:5501/component/bloqueio-component/bloqueio.page.html";
            }
        }, 2000);

        timeoutId = setTimeout(() => {
            document.body.classList.add('fade-out');
            window.location.href = "http://127.0.0.1:5501/component/bloqueio-component/bloqueio.page.html";
        }, 180000);
    }
}

function monitorarInatividade() {
    if (!bloqueioAtivo) {
        document.addEventListener('mousemove', limparParametrosInatividade);
        document.addEventListener('keydown', limparParametrosInatividade);
        document.addEventListener('click', limparParametrosInatividade);
        document.addEventListener('scroll', limparParametrosInatividade);
    }
}

function limparParametrosInatividade() {
    if (!bloqueioAtivo) {
        clearTimeout(timeoutId);
        clearInterval(timerIntervalId);
        tempoDeInatividade = 0;
        onBloquearTelaInatividade();
    }
}

function desbloquearTelaInatividade() {
    clearTimeout(timeoutId);
    clearInterval(timerIntervalId);
    window.history.back();
}

function ativarTelaDeBloqueio() {
    bloqueioAtivo = true;
    clearTimeout(timeoutId);
    clearInterval(timerIntervalId);
}

function desativarTelaDeBloqueio() {
    bloqueioAtivo = false;
    onBloquearTelaInatividade();
}
