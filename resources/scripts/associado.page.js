const abrirModal = document.getElementById("abrir-modal");
const dialog = document.getElementById("dialog");
const sombreamento = document.getElementById("sombreamento");

let indexPaginaAtual = 1;

abrirModal.addEventListener("click", function() {
    sombreamento.style.display = "block";
    dialog.show();
    console.log(indexPaginaAtual);
    moverAreaEtapa();
});

const botaoAnterior = document.getElementById("botao-anterior");
const botaoProximo = document.getElementById("botao-proximo");

botaoAnterior.addEventListener("click", function() {
    indexPaginaAtual -= 1;
    moverAreaEtapa();
    console.log(indexPaginaAtual);
});

botaoProximo.addEventListener("click", function() {
    indexPaginaAtual += 1;
    moverAreaEtapa();
    console.log(indexPaginaAtual);
});

function moverAreaEtapa() {

    if (indexPaginaAtual <= 1) {
        botaoAnterior.style.visibility = "hidden";
    }

    if (indexPaginaAtual > 1) {
        botaoAnterior.style.visibility = "visible";
    }

    const etapaAtual = document.querySelectorAll(".dialog-content .etapas .etapa");
    const largura = etapaAtual[0].offsetwidth;
    const larguraCalculada = (indexPaginaAtual - 1) * largura * (-1) + "px";

    console.log(larguraCalculada);
    

}

