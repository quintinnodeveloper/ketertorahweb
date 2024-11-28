export function aplicarMascaraCep(cep) {
    let valor = cep.replace(/\D/g, '');
    if (valor.length > 5) {
        valor = valor.slice(0, 5) + '-' + valor.slice(5, 8);
    }
    return valor;
}
