const botaoAnterior = document.querySelectorAll(".botao-anterior");
const botaoProximo = document.querySelectorAll(".botao-proximo");
const etapas = document.querySelectorAll(".etapas");

let indiceEtapaAtual = 0;

botaoAnterior.forEach( botao => {
    botao.addEventListener("click", function() {
        indiceEtapaAtual--;
        movimentarEtapa();
    });
});

botaoProximo.forEach( botao => {
    botao.addEventListener("click", function() {
        indiceEtapaAtual++;
        movimentarEtapa();
    });
});

function movimentarEtapa() {
    etapas.forEach(element => {
        element.classList.contains("active") &&
        element.classList.remove("active")
    });
    etapas[indiceEtapaAtual].classList.add("active");
}

const botaoCadastrar = document.getElementById("botaoCadastrar");

botaoCadastrar.addEventListener("click", function() {
    // window.location.reload();
    sombreamento.style.display = "none";
    dialog.close();
});

const botaoCancelar = document.getElementById("botaoCancelar");

botaoCancelar.addEventListener("click", function() {
    sombreamento.style.display = "none";
    dialog.close();
});
