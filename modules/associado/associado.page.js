import { AssociadoModel } from "../model/associado.model.js";
import { create } from "../services/associado.service.js";
import { isVerificarDuplicidade, getAssociados } from "../utility/localstorage.utility.js";
import { fecharDialog } from "../../resources/scripts/dialog.component.js";

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
            console.log("Associado cadastrado com sucesso!");
            fecharDialog();
            exibir();
        } else {
            throw new Error("Associado já cadastrado no sistema!");
        }

    } catch (error) {
        console.log("Falha ao tentar cadastrar o Associado!");
        console.error(error);
    }

});

function exibir() {

    let associadoArray = getAssociados();

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

document.addEventListener('DOMContentLoaded', exibir);
