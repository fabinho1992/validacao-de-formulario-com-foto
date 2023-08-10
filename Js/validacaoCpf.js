export default function ehUmCpf(campo) {// função será exportada como padrão
    const cpf = campo.value.replace(/\.|-/g, '');// metodo replace, primeiro é o que vai ser substituído, segundo é o que vai no lugar,
    //no caso , estou tirando os caracteres especiais do cpf
    if(verificaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
      campo.setCustomValidity('CPF inválido');// verificamos se o cpf tem algum número repetido ou outro erro, SE SIM, retorna true,SE NÃO, retorna false e a menssagem personalizada é mostrada na tela
      // isso nos da acesso ao customError 
    }
    

}

function verificaNumerosRepetidos(cpf) {
    const numerosRepetidos = [
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999'
    ];
    return numerosRepetidos.includes(cpf);// INCLUDES verifica se o cpf tem algum número repetido, SE SIM, retorna true,SE NÃO, retorna false
}

function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for (let i = 0; i < 9; i++) {
        soma += cpf[i] * multiplicador;   // ESSA VERIFICAÇÃO DE PRIMEIRO DIGITO SERVE PARA QUALQUER CPF, USAR SMP!!!!!!!!! !!!!! !!!!
        multiplicador--;
    }
    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[9];
}

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let i = 0; i < 10; i++) {
        soma += cpf[i] * multiplicador;   
        multiplicador--;
    }
    soma = (soma * 10) % 11;

    if (soma == 10 || soma == 11) {
        soma = 0;
    }

    return soma != cpf[10];
}