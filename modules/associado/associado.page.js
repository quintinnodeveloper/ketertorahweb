import { AssociadoModel } from "../model/associado.model.js";
import { create } from "../services/associado.service.js";

const abrirModal = document.getElementById("abrir-modal");
const dialog = document.getElementById("dialog");
const sombreamento = document.getElementById("sombreamento");

abrirModal.addEventListener("click", function() {
    sombreamento.style.display = "block";
    dialog.show();
});

document.getElementById("botaoCadastrar").addEventListener("click", function() {

    const tipoPessoaID = document.getElementById("tipoPessoa").value;
    const nomeCompleto = document.getElementById("nomeCompleto").value;
    const dataNascimento = document.getElementById("tipoPessoa").value;
    const paisNascimentoID = document.getElementById("tipoPessoa").value;

    const associado = new AssociadoModel(
        tipoPessoaID, nomeCompleto, dataNascimento, paisNascimentoID
    );

    create(associado);

    console.log("Associado cadastrado com sucesso!");

});