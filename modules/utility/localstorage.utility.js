export const DOC_ASSOCIADO = "doc_associado";

export function isVerificarDuplicidade(nome) {
    let associadoArray = getAssociados();
    return associadoArray.some(associado => associado.nomeCompleto === nome);
}

export function getAssociados() {
    const associadoArray = JSON.parse(localStorage.getItem(DOC_ASSOCIADO)) || [];
    return associadoArray.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));
}