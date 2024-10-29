const camposDoFormularios = document.querySelectorAll("[required]");
const formulario = document.querySelector(".formulario-cadastro");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const listaRespostas = {
        "nome": e.target.elements['nome'].value,
        "email": e.target.elements['email'].value,
        "senha": e.target.elements['senha'].value,
        "usuario": e.target.elements['usuario'].value,
        "aniversario": e.target.elements['aniversario'].value,
    }
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
    alert("Cadastro concluido com sucesso!");
    window.location.href="./login.html";
});

camposDoFormularios.forEach(campo => {
    campo.addEventListener('blur', () => {
        verificarCampo(campo);
    });
    campo.addEventListener('invalid', evento => {
        evento.preventDefault();
    })

});

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError',
]

function verificarCampo(campo) {
    let mensagem = '';
    campo.setCustomValidity("");
    switch (campo.name) {
        case "senha":
            mensagem = verificadorSenha();
            break;
            case "repetirsenha":
            mensagem = verificadorSenha();
            break;
    }
    campo.setCustomValidity(mensagem);
    verificadorSenha();
    tiposDeErro.forEach(tipo => {
        if (campo.validity[tipo] && mensagem == '') {
            mensagem = mensagens[campo.name][tipo];
        }
    });
    const elementoErro = campo.parentNode.querySelector(".mensagem-erro");
    if (!campo.checkValidity()) {
        elementoErro.textContent = mensagem;
    } else {
        elementoErro.textContent = '';
        if(campo.name == 'repetirsenha' || campo.name == 'senha'){
            const campoSenha = document.querySelector("#campoSenha");
            const campoRepetirSenha = document.querySelector("#campoRepetirSenha");
            const elementoErroSenha = campoSenha.parentNode.querySelector(".mensagem-erro");
            elementoErroSenha.textContent = '';
            const elementoErroRepetirSenha = campoRepetirSenha.parentNode.querySelector(".mensagem-erro");
            elementoErroRepetirSenha.textContent = '';
        }
    }

}

function verificadorSenha() {
    const campoSenha = document.querySelector("#campoSenha");
    const campoRepetirSenha = document.querySelector("#campoRepetirSenha");
    let mensagem = '';
    if (campoSenha.value.length < 5) {
        mensagem = "Senha curta ou inválida.";
        return mensagem;
    } else if (campoSenha.value != campoRepetirSenha.value) {
        mensagem = "As senhas não correspondem.";
        return mensagem;
    }else{
        campoSenha.setCustomValidity('');
        campoRepetirSenha.setCustomValidity('');
        return mensagem;
    }
}

const mensagens = {
    nome:
    {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email:
    {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    aniversario:
    {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        typeMismatch: "Por favor, preencha uma data de nascimento válida.",
    },
    senha:
    {
        valueMissing: "O campo de senha não pode estar vazio.",
        patternMismatch: "Por favor, preencha uma senha válida.",
        tooShort: "Senha muito curta ou inválida."
    },
    repetirsenha:
    {
        valueMissing: "O campo de repetir senha não pode estar vazio.",
        patternMismatch: "Por favor, preencha a senha corretamente no campo.",
        tooShort: "Senha muito curta ou inválida."
    },
    usuario:
    {
        valueMissing: "O campo de usuário não pode estar vazio.",
        patternMismatch: "Por favor, preencha um usuário válido.",
        tooShort: "Por favor, preencha um usuário válido."
    },
}