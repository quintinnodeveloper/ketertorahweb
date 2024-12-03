import { DOC_ASSOCIADO } from "../utility/localstorage.utility.js";
import { URL_API_KETER } from "../utility/api-rest.utility.js";
import { ENDPOINT_PESSOA } from "../utility/api-rest.utility.js";
import { ENDPOINT_TIPO_PESSOA } from "../utility/api-rest.utility.js";

function init() {
    getTipoPessoa();
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

        console.log(tipoPessoaArray);

        const tipoPessoaSelect = document.getElementById("tipoPessoa");

        tipoPessoaArray.forEach((tipoPessoaResult, index) => {
            const option = document.createElement("option");
            option.value = tipoPessoaResult;
            option.textContent = tipoPessoaResult;
            tipoPessoaSelect.appendChild(option);
        });
        

    } catch (error) {
        console.error("ERROR: ", error);
        
    }


}

init();