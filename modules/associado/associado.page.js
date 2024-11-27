import { AssociadoModel } from "../model/associado.model.js";
import { create } from "../services/associado.service.js";
import { isVerificarDuplicidade, getAssociados } from "../utility/localstorage.utility.js";
import { fecharDialog } from "../../resources/scripts/dialog.component.js";
import { apresentarToastSuccess } from "../../component/toast-component/toast.component.js";

const abrirModal = document.getElementById("abrir-modal");
const dialog = document.getElementById("dialog");
const sombreamento = document.getElementById("sombreamento");

abrirModal.addEventListener("click", function () {
    sombreamento.style.display = "block";
    dialog.show();
});

document.getElementById("botaoCadastrar").addEventListener("click", function () {

    try {

        const codigo = crypto.randomUUID();;
        const tipoPessoaID = document.getElementById("tipoPessoa").value;
        const nomeCompleto = document.getElementById("nomeCompleto").value;
        const dataNascimento = document.getElementById("tipoPessoa").value;
        const paisNascimentoID = document.getElementById("tipoPessoa").value;

        const associado = new AssociadoModel(
            codigo, tipoPessoaID, nomeCompleto, dataNascimento, paisNascimentoID
        );

        if (!isVerificarDuplicidade(associado.nomeCompleto)) {
            create(associado);
            apresentarToastSuccess();
            console.log("Associado cadastrado com sucesso!");
            fecharDialog();
            exibirTabela();
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

    associadoArray.forEach( (associado, index) => {
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

    document.getElementById("tipoPessoa").classList.remove("invalid");
    document.getElementById("nomeCompleto").classList.remove("invalid");
    document.getElementById("dataNascimento").classList.remove("invalid");
    document.getElementById("paisNascimento").classList.remove("invalid");

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
