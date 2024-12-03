import {DOC_ASSOCIADO} from "../utility/localstorage.utility.js";
import {ENDPOINT_PAIS, ENDPOINT_TIPO_PESSOA, URL_API_KETER} from "../utility/api-rest.utility.js";

function init() {
    getTipoPessoa();
    getPaisNascimento();
}

export async function create(associado) {
    let associadoArray = JSON.parse(localStorage.getItem(DOC_ASSOCIADO)) || [];
    associadoArray.push(associado);
    localStorage.setItem(DOC_ASSOCIADO, JSON.stringify(associadoArray));
}

export async function getTipoPessoa() {
    try {
        const tipoPessoaResponse = await fetch(URL_API_KETER.concat(ENDPOINT_TIPO_PESSOA));
        const tipoPessoaArray = await tipoPessoaResponse.json();
        const tipoPessoaSelect = document.getElementById("tipoPessoa");
        tipoPessoaArray.forEach(tipoPessoaResult => {
            const option = document.createElement("option");
            option.value = tipoPessoaResult;
            option.textContent = formatarDescricaoTipoPessoa(tipoPessoaResult);
            tipoPessoaSelect.appendChild(option);
        });
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

function formatarDescricaoTipoPessoa(descricao) {
    return descricao.replace('_', ' ').toLowerCase().replace(/(^|\s)\S/g, letra => letra.toUpperCase());
}

export async function getPaisNascimento() {
    try {
        const paisResponse = await fetch(URL_API_KETER.concat(ENDPOINT_PAIS));
        const paisArray = await paisResponse.json();
        createComponentSelect(paisArray, document.getElementById("paisNascimento"));
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

init();

function createComponentSelect(arrayParameter, selectParameter) {
    arrayParameter.forEach((paisResult) => {
        const option = document.createElement("option");
        option.value = paisResult.code;
        option.textContent = paisResult.nome;
        selectParameter.appendChild(option);
    });
}
