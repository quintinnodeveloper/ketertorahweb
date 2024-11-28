import { isFormularioAssociadoValido, limparDadosFormulario } from "../../modules/associado/associado.page.js";

const botaoAnterior = document.querySelectorAll(".botao-anterior");
const botaoProximo = document.querySelectorAll(".botao-proximo");
const etapas = document.querySelectorAll(".etapas");

const subtituloCadastroAssociado = document.getElementById("subtituloCadastroAssociado");

let indiceEtapaAtual = 0;

function init() {
    definirSubtituloCadastroAssociado();
}

botaoAnterior.forEach(botao => {
    botao.addEventListener("click", function () {
        if (isFormularioAssociadoValido()) {
            indiceEtapaAtual--;
            movimentarEtapa();
            definirSubtituloCadastroAssociado();
        }
    });
});

botaoProximo.forEach(botao => {
    botao.addEventListener("click", function () {
        if (isFormularioAssociadoValido()) {
            indiceEtapaAtual++;
            movimentarEtapa();
            definirSubtituloCadastroAssociado();
        }
        console.log(indiceEtapaAtual);
    });
});

function definirSubtituloCadastroAssociado() {
    switch (indiceEtapaAtual) {
        case 0:
            subtituloCadastroAssociado.textContent = "Dados Básicos";
            break;
        case 1:
            subtituloCadastroAssociado.textContent = "Endereço";
            break;
        case 2:
            subtituloCadastroAssociado.textContent = "Contatos";
            break;
        case 3:
            subtituloCadastroAssociado.textContent = "Documentos";
            break;
        case 4:
            subtituloCadastroAssociado.textContent = "Dependentes";
            break;
        case 5:
            subtituloCadastroAssociado.textContent = "Arquivos";
            break;
        case 6:
            subtituloCadastroAssociado.textContent = "Perfil de Usuário";
            break;
        default:
            break;
    }
}

function movimentarEtapa() {
    etapas.forEach(element => {
        element.classList.contains("active") &&
            element.classList.remove("active")
    });
    etapas[indiceEtapaAtual].classList.add("active");
}

// const botaoCadastrar = document.getElementById("botaoCadastrar");

// botaoCadastrar.addEventListener("click", function() {
//     window.location.reload();
//     sombreamento.style.display = "none";
//     dialog.close();
// });

const botaoCancelar = document.getElementById("botaoCancelar");

botaoCancelar.addEventListener("click", function () {
    limparDadosFormulario();
    sombreamento.style.display = "none";
    dialog.close();
});

export async function fecharDialog() {
    sombreamento.style.display = "none";
    dialog.close();
    limparDadosFormulario();
}

// Apresentar sombreamento para testes
// sombreamento.style.display = "block";

document.getElementById("iconeFecharDialog").addEventListener("click", function () {
    fecharDialog();
});

export function getIndiceEtapaAtual() {
    return indiceEtapaAtual;
}

init();