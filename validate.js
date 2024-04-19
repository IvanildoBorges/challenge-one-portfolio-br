const camposDoFormulario = document.querySelectorAll("[required]");
const tiposDeErro = [
    "valueMissing",     // erro quando não há nada no campo
    "typeMismatch",     // erro quando o tipo de dado que você está colocando não combina com o do campo
    "tooShort",         // erro quando o dado é muito curto ao tamanho minimo do campo
    "customError"       // mensagem de erro customizada
];
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode ficar vazio!",
        typeMismatch: "Por favor, preencha um nome válido!",
        tooShort: "Por favor, preencha um nome válido!"
    },
    email: {
        valueMissing: "O campo de email não pode ficar vazio!",
        typeMismatch: "Por favor, preencha um email válido!",
        tooShort: "Por favor, preencha um email válido!"
    },
    assunto: {
        valueMissing: "O campo de assunto não pode ficar vazio!",
        typeMismatch: "Por favor, preencha um assunto válido!",
        tooShort: "Por favor, preencha um assunto válido!"
    },
    mensagem: {
        valueMissing: "O campo de mensagem não pode ficar vazio!",
        typeMismatch: "Por favor, preencha uma mensagem válida!",
        tooShort: "Por favor, preencha uma mensagem válida!"
    }
};
const botaoEnviar = document.querySelector("section.formcontato .formcontato__contacto .formcontato__text .formcontato__form .formcontato__botao");
let naoHaCamposVazios = [false]; // inicia a pagina com botão desativado
let sections = document.querySelectorAll('section[id]');

// função para iniciar a pagina com botão desativado
ativaBotao(naoHaCamposVazios[0]);

// evento disparado quando clicar fora do campo de entrada
camposDoFormulario.forEach( campo => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
});

// evento disparado quando clica no botão de enviar
botaoEnviar.addEventListener("click", () => Alert("Seu contato foi enviado com sucesso!"));

// evento disparado quando rolar a página
window.addEventListener('scroll', () => {
    sections.forEach((section, index) => {
        let posicaoInicialDaJanela = window.scrollY + 80;
        let pontoDeInicioDaSection = section.offsetTop;
        let alturaDaSection = section.offsetHeight;
        let itemDeNavegacao = document.querySelectorAll("section.menu > nav > .menu__list .menu__list__item a");

        // Quando a section aparecer na tela, ou seja, quando rolar para uma section, será ativado o link de navegação correspondente a section.
        if (posicaoInicialDaJanela >= pontoDeInicioDaSection && posicaoInicialDaJanela < pontoDeInicioDaSection + alturaDaSection) {
            itemDeNavegacao[index].classList.add("ativo");
        } else {
            itemDeNavegacao[index].classList.remove("ativo");
        }
    });
});

function verificaCampo(campo) {
    let mensagem = "";
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const validadorDeInput = campo.checkValidity();


    if (campo.name === "nome" && campo.value.length <= 50) {
        naoHaCamposVazios[0] = ehUmNome(campo, mensagemErro);
    }

    if (campo.name === "email" && campo.value.length <= 50) {
        naoHaCamposVazios[1] = ehUmEmail(campo, mensagemErro)
    }

    if (campo.name === "assunto" && campo.value.length <= 50) {
        naoHaCamposVazios[2] = ehUmAssunto(campo, mensagemErro)
    }

    if (campo.name === "mensagem" && campo.value.length <= 50) {
        naoHaCamposVazios[3] = ehUmaMensagem(campo, mensagemErro)
    }

    // salva o erro do campo na variável mensagem
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    });

    // verifica qual campo está selecionado e coloca um texto na tag span de erro
    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    }

    // ativa o botão de enviar se os campos não forem vazios
    if (naoHaCamposVazios[0] && naoHaCamposVazios[1] && naoHaCamposVazios[2] && naoHaCamposVazios[3]) {
        ativaBotao(true);
    } else {
        ativaBotao(false);
    }
}
function valorEhString(value) {
    // o método isNaN verifica se o valor do campo é string (TRUE) ou não (FALSE)
    // e método trim verifica se o campo está somente com espaços em branco
    if (isNaN(value) && value.trim()) {
        return true;
    } else {
        return false;
    }
}
function ehUmNome(campo, mensagemErro) {
    // verifica se o campo está em string e coloca um texto na tag span de erro
    if (valorEhString(campo.value)) {
        mensagemErro.textContent = "";
        return true;
    } else {
        mensagemErro.textContent = "Digite um nome válido!";
        return false;
    }
}
function ehUmEmail(campo, mensagemErro) {
    // verifica se o campo está em string e coloca um texto na tag span de erro
    if (valorEhString(campo.value)) {
        mensagemErro.textContent = "";
        return true;
    } else {
        mensagemErro.textContent = "Digite um email válido!";
        return false;
    }
}
function ehUmAssunto(campo, mensagemErro) {
    // verifica se o campo está em string e coloca um texto na tag span de erro
    if (valorEhString(campo.value)) {
        mensagemErro.textContent = "";
        return true;
    } else {
        mensagemErro.textContent = "Digite um assunto!";
        return false;
    }
}
function ehUmaMensagem(campo, mensagemErro) {
    // verifica se o campo está em string e coloca um texto na tag span de erro
    if (valorEhString(campo.value)) {
        mensagemErro.textContent = "";
        return true;
    } else {
        mensagemErro.textContent = "Digite uma mensagem!";
        return false;
    }
}
function ativaBotao(campoNaoVazio) {
    if (campoNaoVazio) {
        botaoEnviar.removeAttribute("disabled");
        botaoEnviar.classList.remove("desativado");
    } else {
        botaoEnviar.setAttribute("disabled", "disabled");
        botaoEnviar.classList.add("desativado");
    }
}