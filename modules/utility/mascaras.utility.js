export function aplicarMascaraCEP(cep) {
    let valor = cep.replace(/\D/g, '');
    if (valor.length > 2 && valor.length <= 5) {
        valor = valor.slice(0, 2) + '.' + valor.slice(2);
    } else if (valor.length > 5) {
        valor = valor.slice(0, 2) + '.' + valor.slice(2, 5) + '-' + valor.slice(5, 8);
    }
    return valor;
}