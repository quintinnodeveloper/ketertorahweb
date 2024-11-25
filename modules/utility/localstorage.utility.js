export const DOC_ASSOCIADO = "doc_associado";

export function isVerificarDuplicidade(nome) {
    let associadoArray = getAssociados();
    return associadoArray.some(associado => associado.nomeCompleto === nome);
}

export function getAssociados() {
    return JSON.parse(localStorage.getItem(DOC_ASSOCIADO)) || [];
}