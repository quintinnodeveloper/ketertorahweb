import { apresentarToastDanger, apresentarToastSuccess } from "../../component/toast-component/toast.component.js";
import { fecharDialog, getIndiceEtapaAtual } from "../../resources/scripts/dialog.component.js";
import { AssociadoModel } from "../model/associado.model.js";
import { create } from "../services/associado.service.js";
import { getAssociados, isVerificarDuplicidade } from "../utility/localstorage.utility.js";
import { aplicarMascaraCEP } from "../utility/mascaras.utility.js";
import { gerarUUID } from "../utility/uuid.utility.js";

const abrirModal = document.getElementById("abrir-modal");
const dialog = document.getElementById("dialog");
const sombreamento = document.getElementById("sombreamento");

function init() {
    aplicarMascaraCamposFormulario();
}

abrirModal.addEventListener("click", function () {
    sombreamento.style.display = "block";
    dialog.show();
});

document.getElementById("botaoCadastrar").addEventListener("click", function () {

    try {

        const tipoPessoaID = document.getElementById("tipoPessoa").value;
        const nomeCompleto = document.getElementById("nomeCompleto").value;
        const dataNascimento = document.getElementById("tipoPessoa").value;
        const paisNascimentoID = document.getElementById("tipoPessoa").value;

        const associado = new AssociadoModel(
            Math.random(), tipoPessoaID, nomeCompleto, dataNascimento, paisNascimentoID
        );

        if (!isVerificarDuplicidade(associado.nomeCompleto)) {
            create(associado);
            apresentarToastSuccess();
            console.log("Associado cadastrado com sucesso!");
            fecharDialog();
            exibirTabela();
            limparDadosFormulario();
        } else {
            throw new Error("Associado já cadastrado no sistema!");
        }

    } catch (error) {
        console.log("Falha ao tentar cadastrar o Associado!");
        console.error(error);
    }

});

function exibirTabela() {

    let associadoArray = getAssociados();

    associadoArray.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));

    const tbody = document.querySelector("table tbody");

    tbody.innerHTML = "";

    associadoArray.forEach((associado, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${associado.nomeCompleto}</td>
        <td>
            <img src="../../resources/images/icons/external-link.svg" alt="Detalhes" />
        </td>
    `;
        tbody.appendChild(tr);
    });

}

document.addEventListener('DOMContentLoaded', exibirTabela);

document.getElementById("filtrarAssociado").addEventListener("input", function () {
    let pesquisa = this.value.toLowerCase();
    let associadoArray = getAssociados();
    let associadosFiltrados = associadoArray.filter(associado =>
        associado.nomeCompleto.toLowerCase().includes(pesquisa)
    );
    exibirTabelaFiltro(associadosFiltrados);
});

function exibirTabelaFiltro(associados) {
    const tbody = document.querySelector("table tbody");
    tbody.innerHTML = "";

    if (associados.length === 0) {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td colspan="3" style="text-align: center; color: red;">Associado Não Encontrado!</td>`;
        tbody.appendChild(tr);
        return;
    }

    associados.forEach((associado, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${associado.nomeCompleto}</td>
            <td>
                <img src="../../resources/images/icons/external-link.svg" alt="Detalhes" />
            </td>
        `;
        tbody.appendChild(tr);
    });
}

export function isFormularioAssociadoValido() {

    const tipoPessoaID = Number(document.getElementById("tipoPessoa").value);
    const nomeCompleto = document.getElementById("nomeCompleto").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const paisNascimentoID = Number(document.getElementById("paisNascimento").value);
    const cepEndereco = document.getElementById("cepEndereco").value.trim();
    const descricaoEndereco = document.getElementById("descricaoEndereco").value;
    const numeroEndereco = document.getElementById("numeroEndereco").value;
    const cidadeEndereco = Number(document.getElementById("cidadeEndereco").value);
    const bairroEndereco = Number(document.getElementById("bairroEndereco").value);
    const estadoEndereco = Number(document.getElementById("estadoEndereco").value);

    document.getElementById("tipoPessoa").classList.remove("invalid");
    document.getElementById("nomeCompleto").classList.remove("invalid");
    document.getElementById("dataNascimento").classList.remove("invalid");
    document.getElementById("paisNascimento").classList.remove("invalid");
    document.getElementById("cepEndereco").classList.remove("invalid");
    document.getElementById("descricaoEndereco").classList.remove("invalid");
    document.getElementById("numeroEndereco").classList.remove("invalid");
    document.getElementById("cidadeEndereco").classList.remove("invalid");
    document.getElementById("bairroEndereco").classList.remove("invalid");
    document.getElementById("estadoEndereco").classList.remove("invalid");

    switch (getIndiceEtapaAtual()) {
        case 0: // INFO: Dados Básicos
            if (tipoPessoaID === 0) {
                document.getElementById("tipoPessoa").classList.add("invalid");
                return false;
            }

            if (nomeCompleto === "") {
                document.getElementById("nomeCompleto").classList.add("invalid");
                return false;
            }

            if (dataNascimento === "") {
                document.getElementById("dataNascimento").classList.add("invalid");
                return false;
            }

            if (paisNascimentoID === 0) {
                document.getElementById("paisNascimento").classList.add("invalid");
                return false;
            }
            break;
        case 1: // INFO: Endereços
            if (cepEndereco === "") {
                document.getElementById("cepEndereco").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            if (descricaoEndereco === "") {
                document.getElementById("descricaoEndereco").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            if (numeroEndereco === "") {
                document.getElementById("numeroEndereco").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            if (cidadeEndereco === 0) {
                document.getElementById("cidadeEndereco").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            if (bairroEndereco === 0) {
                document.getElementById("bairroEndereco").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            if (estadoEndereco === 0) {
                document.getElementById("estadoEndereco").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            break;
        default:
            break;
    }

    return true;
}

export function limparDadosFormulario() {
    document.getElementById("tipoPessoa").value = "0";
    document.getElementById("nomeCompleto").value = "";
    document.getElementById("dataNascimento").value = "";
    document.getElementById("paisNascimento").value = "0";
    document.getElementById("corRaca").value = "0";
    document.getElementById("estadoCivil").value = "0";
    document.getElementById("tipoSanguineo").value = "0";
}

// FIXME: Modo teste de epapas
// document.getElementById("tipoPessoa").value = "1";
// document.getElementById("nomeCompleto").value = gerarUUID();
// document.getElementById("dataNascimento").value = new Date("2024-01-01").toISOString().split('T')[0];
// document.getElementById("paisNascimento").value = "1";
// document.getElementById("corRaca").value = "3";
// document.getElementById("estadoCivil").value = "2";
// document.getElementById("tipoSanguineo").value = "4";
// document.getElementById("cepEndereco").value = "71.880-631";
// document.getElementById("descricaoEndereco").value = "Rua Neromi José Scrins";
// document.getElementById("numeroEndereco").value = "897";
// document.getElementById("cidadeEndereco").value = "1";
// document.getElementById("bairroEndereco").value = "1";
// document.getElementById("estadoEndereco").value = "2";

function aplicarMascaraCamposFormulario() {
    document.getElementById("cepEndereco").addEventListener("input", function (event) {
        event.target.value = aplicarMascaraCEP(event.target.value);
    });
}

init();