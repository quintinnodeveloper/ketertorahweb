import { apresentarToastDanger, apresentarToastSuccess } from "../../component/toast-component/toast.component.js";
import { fecharDialog, getIndiceEtapaAtual, zerarIndiceEtapaAtual } from "../../resources/scripts/dialog.component.js";
import { AssociadoModel } from "../model/associado.model.js";
import { create } from "../services/associado.service.js";
import { getAssociados, isVerificarDuplicidade } from "../utility/localstorage.utility.js";
import { aplicarMascaraCEP, aplicarMascaraTelefone } from "../utility/mascaras.utility.js";
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

    zerarIndiceEtapaAtual();

    try {

        const tipoPessoaID = Number(document.getElementById("tipoPessoa").value);
        const nomeCompleto = document.getElementById("nomeCompleto").value.trim();
        const dataNascimento = document.getElementById("dataNascimento").value;
        const paisNascimentoID = Number(document.getElementById("paisNascimento").value);
        const corRacaID = Number(document.getElementById("corRaca").value);
        const tipoSanguineoID = Number(document.getElementById("tipoSanguineo").value);
        const estadoCivilID = Number(document.getElementById("estadoCivil").value);
        const generoPessoa = Number(document.getElementById("tipoGeneroPessoa").value);

        const cepEndereco = document.getElementById("cepEndereco").value.trim();
        const descricaoEndereco = document.getElementById("descricaoEndereco").value;
        const numeroEndereco = document.getElementById("numeroEndereco").value;
        const cidadeEnderecoID = Number(document.getElementById("cidadeEndereco").value);
        const bairroEnderecoID = Number(document.getElementById("bairroEndereco").value);
        const estadoEnderecoID = Number(document.getElementById("estadoEndereco").value);

        const emailContato = document.getElementById("emailContato").value.trim();
        const telefoneContato = document.getElementById("telefoneContato").value;

        const carteiraIdentidadeDocumento = document.getElementById("carteiraIdentidadeDocumento").value;
        const orgaoExpeditorDocumento = document.getElementById("orgaoExpeditorDocumento").value;
        const dataExpedicaoDocumento = document.getElementById("dataExpedicaoDocumento").value;

        const associado = new AssociadoModel(
            Math.random(), tipoPessoaID, nomeCompleto, dataNascimento, paisNascimentoID, corRacaID, tipoSanguineoID, estadoCivilID,
            cepEndereco, descricaoEndereco, numeroEndereco, cidadeEnderecoID, bairroEnderecoID, estadoEnderecoID,
            emailContato, telefoneContato,
            carteiraIdentidadeDocumento, orgaoExpeditorDocumento, dataExpedicaoDocumento
        );

        const file = document.getElementById("fotoPerfilUsuario").files[0]; 

        if (file) {
            try {
                const base64Image = lerImagem(file);
                associado.imagemPerfil = base64Image;
            } catch (error) {
                console.error("Erro ao carregar imagem:", error);
            }
        } else {
            console.log("Nenhuma imagem foi selecionada.");
        }

        console.log("ASSOCIADO: ", associado);

        if (!isVerificarDuplicidade(associado.nomeCompleto)) {
            create(associado);
            apresentarToastSuccess();
            fecharDialog();
            exibirTabela();
            limparDadosFormulario();
        } else {
            throw new Error("Associado já cadastrado no sistema!");
        }

    } catch (error) {
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
    const generoPessoa = Number(document.getElementById("tipoGeneroPessoa").value);
    const nomeCompleto = document.getElementById("nomeCompleto").value.trim();
    const dataNascimento = document.getElementById("dataNascimento").value;
    const paisNascimentoID = Number(document.getElementById("paisNascimento").value);
    const cepEndereco = document.getElementById("cepEndereco").value.trim();
    const descricaoEndereco = document.getElementById("descricaoEndereco").value;
    const numeroEndereco = document.getElementById("numeroEndereco").value;
    const cidadeEndereco = Number(document.getElementById("cidadeEndereco").value);
    const bairroEndereco = Number(document.getElementById("bairroEndereco").value);
    const estadoEndereco = Number(document.getElementById("estadoEndereco").value);
    const emailContato = document.getElementById("emailContato").value.trim();
    const telefoneContato = document.getElementById("telefoneContato").value;
    const carteiraIdentidadeDocumento = document.getElementById("carteiraIdentidadeDocumento").value;
    const orgaoExpeditorDocumento = document.getElementById("orgaoExpeditorDocumento").value;
    const dataExpedicaoDocumento = document.getElementById("dataExpedicaoDocumento").value;

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
    document.getElementById("emailContato").classList.remove("invalid");
    document.getElementById("telefoneContato").classList.remove("invalid");
    document.getElementById("carteiraIdentidadeDocumento").classList.remove("invalid");
    document.getElementById("orgaoExpeditorDocumento").classList.remove("invalid");
    document.getElementById("dataExpedicaoDocumento").classList.remove("invalid");
    document.getElementById("tipoGeneroPessoa").classList.remove("invalid");

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

            if (generoPessoa === 0) {
                document.getElementById("tipoGeneroPessoa").classList.add("invalid");
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
        case 2: // INFO: Contatos
            if (emailContato === "") {
                document.getElementById("emailContato").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            if (telefoneContato === "") {
                document.getElementById("telefoneContato").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            break;
        case 3: // INFO: Documentos
            if (carteiraIdentidadeDocumento === "") {
                document.getElementById("carteiraIdentidadeDocumento").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            if (orgaoExpeditorDocumento === "") {
                document.getElementById("orgaoExpeditorDocumento").classList.add("invalid");
                apresentarToastDanger("Preencha todos os campos obrigatórios!");
                return false;
            }
            if (dataExpedicaoDocumento === "") {
                document.getElementById("dataExpedicaoDocumento").classList.add("invalid");
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
document.getElementById("nomeCompleto").value = gerarUUID();
document.getElementById("dataNascimento").value = new Date("2024-01-01").toISOString().split('T')[0];
document.getElementById("paisNascimento").value = "1";
document.getElementById("corRaca").value = "3";
document.getElementById("estadoCivil").value = "2";
document.getElementById("tipoSanguineo").value = "4";
document.getElementById("cepEndereco").value = "71.880-631";
document.getElementById("descricaoEndereco").value = "Rua Neromi José Scrins";
document.getElementById("numeroEndereco").value = "897";
document.getElementById("cidadeEndereco").value = "1";
document.getElementById("bairroEndereco").value = "1";
document.getElementById("estadoEndereco").value = "2";
document.getElementById("emailContato").value = "email.email@email.com.br";
document.getElementById("telefoneContato").value = "(61) 9-9658-9658";

document.getElementById("carteiraIdentidadeDocumento").value = "24587451";
document.getElementById("orgaoExpeditorDocumento").value = "SSP-SP";
document.getElementById("dataExpedicaoDocumento").value = new Date("2000-12-01").toISOString().split('T')[0];

function aplicarMascaraCamposFormulario() {
    document.getElementById("cepEndereco").addEventListener("input", function (event) {
        event.target.value = aplicarMascaraCEP(event.target.value);
    });
    document.getElementById("telefoneContato").addEventListener("input", function (event) {
        event.target.value = aplicarMascaraTelefone(event.target);
    });
}

document.querySelector("#fotoPerfilUsuario").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        const imgElement = document.querySelector("#imagemUsuarioPerfil");
        const fotoPerfilUsuarioLabel = document.getElementById("fotoPerfilUsuarioLabel");
        imgElement.src = imageUrl;
        fotoPerfilUsuarioLabel.style.backgroundImage = `url(${imageUrl})`;
    } else {
        throw new Error("Erro ao tentar carregar a imagem!");
    }
});

function lerImagem(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result);
        };
        reader.onerror = function () {
            reject("Erro ao tentar ler o arquivo.");
        };
        reader.readAsDataURL(file);
    });
}

document.getElementById("iconeFecharPesquisa").addEventListener("click", function() {
    document.getElementById("filtrarAssociado").value = "";
});

init();