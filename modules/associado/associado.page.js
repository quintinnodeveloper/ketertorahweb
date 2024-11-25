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

        const tipoPessoaID = document.getElementById("tipoPessoa").value;
        const nomeCompleto = document.getElementById("nomeCompleto").value;
        const dataNascimento = document.getElementById("tipoPessoa").value;
        const paisNascimentoID = document.getElementById("tipoPessoa").value;

        const associado = new AssociadoModel(
            tipoPessoaID, nomeCompleto, dataNascimento, paisNascimentoID
        );

        if (!isVerificarDuplicidade(associado.nomeCompleto)) {
            create(associado);
            console.log("Associado cadastrado com sucesso!");
            fecharDialog();
        } else {
            throw new Error("Associado já cadastrado no sistema!");
        }

    } catch (error) {
        console.log("Falha ao tentar cadastrar o Associado!");
        console.error(error);
    }

});

function exibir() {

    let associadoArray = [
        { id: 1, nome: 'Agatha Agatha Amanda da Mata', telefone: '(63) 99232-3355', dataAssociacao: '01/01/2024', situacaoFinanceira: 'Em Dia' },
        { id: 2, nome: 'José da Silva', telefone: '(63) 99322-4455', dataAssociacao: '05/02/2024', situacaoFinanceira: 'Em Atraso' },
        { id: 3, nome: 'Maria Oliveira', telefone: '(63) 99433-5566', dataAssociacao: '12/03/2024', situacaoFinanceira: 'Em Dia' }
      ];

    const tbody = document.querySelector("table tbody");

    tbody.innerHTML = "";

    associadoArray.forEach(associado => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${associado.id}</td>
        <td>${associado.nome}</td>
        <td>${associado.telefone}</td>
        <td>${associado.dataAssociacao}</td>
        <td>${associado.situacaoFinanceira}</td>
        <td>
            <img src="../../resources/images/icons/external-link.svg" alt="Detalhes" />
        </td>
    `;
        tbody.appendChild(tr);
    });

}

document.addEventListener('DOMContentLoaded', exibir);
