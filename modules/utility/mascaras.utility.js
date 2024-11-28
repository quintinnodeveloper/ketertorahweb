export function aplicarMascaraCEP(cep) {
    let valor = cep.replace(/\D/g, '');
    if (valor.length > 2 && valor.length <= 5) {
        valor = valor.slice(0, 2) + '.' + valor.slice(2);
    } else if (valor.length > 5) {
        valor = valor.slice(0, 2) + '.' + valor.slice(2, 5) + '-' + valor.slice(5, 8);
    }
    return valor;
}

export function aplicarMascaraTelefone(telefoneParameter) {
    let telefone = telefoneParameter.value.replace(/\D/g, '');
    if (telefone.length <= 10) {
        telefone = telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2-$3-$4');
    } 
    else {
        telefone = telefone.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2-$3-$4');
    }
    telefoneParameter.value = telefone;
    return telefone;
}
