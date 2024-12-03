import { 
    ENDPOINT_PAIS, 
    ENDPOINT_TIPO_PESSOA, 
    URL_API_KETER, 
    ENDPOINT_TIPO_COR, 
    ENDPOINT_TIPO_ESTADO_CIVIL,
    ENDPOINT_TIPO_SANGUINEO } from "../utility/api-rest.utility.js";
import { DOC_ASSOCIADO } from "../utility/localstorage.utility.js";

function init() {
    getTipoPessoa();
    getPaisNascimento();
    getTipoCor();
    getTipoEstadoCivil();
    getTipoSanguineo();
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

export async function getTipoCor() {
    try {
        const tipoCorResponse = await fetch(URL_API_KETER.concat(ENDPOINT_TIPO_COR));
        const tipoCorArray = await tipoCorResponse.json();
        const tipoCorSelect = document.getElementById("corRaca");
        tipoCorArray.forEach(tipoCorResult => {
            const option = document.createElement("option");
            option.value = tipoCorResult;
            option.textContent = formatarDescricaoTipoPessoa(tipoCorResult);
            tipoCorSelect.appendChild(option);
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

export async function getTipoEstadoCivil() {
    try {
        const estadoCivilResponse = await fetch(URL_API_KETER.concat(ENDPOINT_TIPO_ESTADO_CIVIL));
        const estadoCivilArray = await estadoCivilResponse.json();
        const estadoCivilSelect = document.getElementById("estadoCivil");
        estadoCivilArray.forEach(estadoCivilResult => {
            const option = document.createElement("option");
            option.value = estadoCivilResult;
            option.textContent = formatarDescricaoTipoPessoa(estadoCivilResult);
            estadoCivilSelect.appendChild(option);
        });
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

export async function getTipoSanguineo() {
    try {
        const tipoSanguineoResponse = await fetch(URL_API_KETER.concat(ENDPOINT_TIPO_SANGUINEO));
        const tipoSanguineoArray = await tipoSanguineoResponse.json();
        const tipoSanguineoSelect = document.getElementById("tipoSanguineo");
        tipoSanguineoArray.forEach(tipoSanguineoResult => {
            const option = document.createElement("option");
            option.value = tipoSanguineoResult;
            option.textContent = formatarDescricaoTipoPessoa(tipoSanguineoResult);
            tipoSanguineoSelect.appendChild(option);
        });
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

function createComponentSelect(arrayParameter, selectParameter) {
    arrayParameter.forEach((paisResult) => {
        const option = document.createElement("option");
        option.value = paisResult.code;
        option.textContent = paisResult.nome;
        selectParameter.appendChild(option);
    });
}

init();