
export interface Direcao {
    cep: string;
    logradouro: string;
    cidade: Date;
    bairro: string;
    complemento: string;
    referencia: string;
    uf: string;
}

export interface Pessoa {
    nome: string;
    sobrenome: string;
    nascimento: Date;
    cpf: string;
    rg: string;
    profissao: string;
}

export interface Cadastro {
    pessoa: Pessoa;
    direcao: Direcao;
}
