export const DOC_ASSOCIADO = "doc_associado";

export function isVerificarDuplicidade(nome) {
    let associadoArray = JSON.parse(localStorage.getItem(DOC_ASSOCIADO)) || [];
    return associadoArray.some(associado => associado.nomeCompleto === nome);
}