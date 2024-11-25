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

let associadoArray = getAssociados();

console.log(associadoArray);
