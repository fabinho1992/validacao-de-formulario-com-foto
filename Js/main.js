import ehUmCpf from './validacaoCpf.js';
import ehMaiorDeIdade from './validacaoIdade.js';

const camposSelect = document.querySelectorAll('[required]');

const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const listaCadastro = {
        nome: event.target.elements['nome'].value,
        email: event.target.elements['email'].value,
        rg: event.target.elements['rg'].value,
        cpf: event.target.elements['cpf'].value,
        aniversario: event.target.elements['aniversario'].value
    }

    localStorage.setItem('cadastro', JSON.stringify(listaCadastro));

    window.location.href = './pages/abrir-conta-form-2.html';
})

camposSelect.forEach((campo) => {
    campo.addEventListener('blur', () => verificaCampo(campo)); // ESSE EVENTO SERVE PARA VALIDAR OS CAMPOS, QUANDO CLICAMOS FORA DELES, O EVENTO SERÁ ATIVADO
    //campo.addEventListener('invalid', evento => evento.preventDefault());//TIRO O EVENTO DE ERRO PADRÃO QUE APARECE NA TELA, AGORA POSSO CUSTOMIZAR OS ERROS
})

const tiposDeErro = [
    'valueMissing', // ocorre quando deixamos o campo vazio
    'typeMismatch',// ocorre quando erramos o tipo de input no campo, como por exemplo, na inserção de um e-mail sem o símbolo @
    'patternMismatch', // ocorre especialmente no campo de CPF que possui um padrão de expressão regular. Se o input não segui-lo, este erro será ativado
    'tooShort', //está relacionado aos atributos minlength e maxLength, ou seja , quantidade de caracteres que inserimos em diversos pontos do código. Ele serve para acusar quando os padrões de comprimento do input não forem atendidos
    'customError' // se refere a erros customizados, como nos casos em que inserimos as lógicas de validação ehUmCPF e ehMaiorDeIdade
]

// MENSAGENS CUSTUMIZADAS PARA OS ERROS
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity('');
    if (campo.name == 'cpf' && campo.value.length >= 11) {
        ehUmCpf(campo);

    }
    if (campo.name == "aniversario" && campo.value != "") {
        ehMaiorDeIdade(campo);
    }

    tiposDeErro.forEach(erro => {
        
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            
            console.log(mensagem);
        }
        const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
        const validaInput = campo.checkValidity();

        if(!validaInput) {
            mensagemErro.innerHTML = mensagem;
        }else{
            mensagemErro.innerHTML = "";
        }
        
    })
    

}
