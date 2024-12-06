import { exibirTabela } from "../associado/associado.page.js";
import {
    ENDPOINT_PAIS,
    ENDPOINT_PESSOA,
    ENDPOINT_TIPO_COR,
    ENDPOINT_TIPO_ESTADO_CIVIL,
    ENDPOINT_TIPO_GENERO,
    ENDPOINT_TIPO_PESSOA,
    ENDPOINT_TIPO_SANGUINEO,
    URL_API_KETER
} from "../utility/api-rest.utility.js";
import { DOC_ASSOCIADO } from "../utility/localstorage.utility.js";

function init() {
    getTipoPessoa();
    getPaisNascimento();
    getTipoCor();
    getTipoEstadoCivil();
    getTipoSanguineo();
    getTipoGenero();
}

export async function createLocalstorage(associado) {
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
            option.textContent = formatarTipoSelect(tipoPessoaResult);
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
            option.textContent = formatarTipoSelect(tipoCorResult);
            tipoCorSelect.appendChild(option);
        });
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

function formatarTipoSelect(descricao) {
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
            option.textContent = formatarTipoSelect(estadoCivilResult);
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
            option.textContent = formatarTipoSelect(tipoSanguineoResult);
            tipoSanguineoSelect.appendChild(option);
        });
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

export async function getTipoGenero() {
    try {
        const tipoGeneroResponse = await fetch(URL_API_KETER.concat(ENDPOINT_TIPO_GENERO));
        const tipoGeneroArray = await tipoGeneroResponse.json();
        const tipoGeneroSelect = document.getElementById("tipoGeneroPessoa");
        tipoGeneroArray.forEach(tipoGeneroResult => {
            const option = document.createElement("option");
            option.value = tipoGeneroResult;
            option.textContent = formatarTipoSelect(tipoGeneroResult);
            tipoGeneroSelect.appendChild(option);
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

export async function createAssociado(associado) {
    try {
        const response = await fetch(URL_API_KETER.concat(ENDPOINT_PESSOA), {
            method: "POST",
            body: JSON.stringify(associado),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if(!response.ok) {
            throw new Error("Erro na requisição! ", response.statusText, response.text);
        }
        const responseData = await response.json();
        exibirTabela();
        return responseData;
    } catch (error) {
        console.error("ERROR: ", error);
    }
}

export async function getAssociados() {
    const associadoResponse = await fetch(URL_API_KETER.concat(ENDPOINT_PESSOA));
    return await associadoResponse.json();
}

init();