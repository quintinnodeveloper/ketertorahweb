export class AssociadoModel {

    constructor(codigo, tipoGeneroPessoa, tipoPessoaID, nomeCompleto, dataNascimento, paisNascimentoID, corRacaID, tipoSanguineoID, estadoCivilID,
        cepEndereco, descricaoEndereco, numeroEndereco, cidadeEnderecoID, bairroEnderecoID, estadoEnderecoID,
        emailContato, telefoneContato,
        carteiraIdentidadeDocumento, orgaoExpeditorDocumento, dataExpedicaoDocumento, imagemPerfil
    ) {
        this.codigo = codigo;
        this.tipoPessoaID = tipoPessoaID;
        this.nomeCompleto = nomeCompleto;
        this.dataNascimento = dataNascimento;
        this.paisNascimentoID = paisNascimentoID;
        this.corRacaID = corRacaID;
        this.tipoSanguineoID = tipoSanguineoID;
        this.estadoCivilID = estadoCivilID;
        this.cepEndereco = cepEndereco;
        this.descricaoEndereco = descricaoEndereco;
        this.numeroEndereco = numeroEndereco;
        this.cidadeEnderecoID = cidadeEnderecoID;
        this.bairroEnderecoID = bairroEnderecoID;
        this.estadoEnderecoID = estadoEnderecoID;
        this.emailContato = emailContato;
        this.telefoneContato = telefoneContato;
        this.carteiraIdentidadeDocumento = carteiraIdentidadeDocumento;
        this.orgaoExpeditorDocumento = orgaoExpeditorDocumento;
        this.dataExpedicaoDocumento = dataExpedicaoDocumento;
        this.imagemPerfil = imagemPerfil;
        this.tipoGeneroPessoa = tipoGeneroPessoa;
    }

}