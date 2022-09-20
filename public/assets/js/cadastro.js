"use strict";
//capturar variaveis dos inputs e do form htmls
let form = document.getElementById("form");
let nomeUsuario = document.getElementById("nomeUsuario");
let senha = document.getElementById("senha");
let confirmaSenha = document.getElementById("confirmaSenha");
// botão submit do form cadastro e chamar função check imputs
form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    checkImputs();
});
// logica para check imputs
function checkImputs() {
    //pegar usuarios do localstores se não tiver pegar arry vazio.
    let usuarios = JSON.parse(localStorage.getItem("usuarios") || '[]');
    //captuar valores dos inputs e colocar em uma const
    const nomeUsuarioValor = nomeUsuario.value;
    const senhaValor = senha.value;
    const confirmaSenhaValor = confirmaSenha.value;
    //verificar no localstore se a email igual
    const verificaNomeUserIgual = usuarios.some((user) => user.nome === nomeUsuarioValor);
    let sucessoComfirm = document.getElementById("sucessos");
    // verificaçoes de erro e sucesso
    if (nomeUsuarioValor === "") {
        setErrorFor(nomeUsuario, " O campo usuario é obrigatório.");
    }
    if (senhaValor === "") {
        setErrorFor(senha, "A senha é obrigatório.");
    }
    if (senhaValor.length < 8) {
        setErrorFor(senha, "A senha precisa ter no mínimo 8 caracteres.");
    }
    else {
        setSucessoFor(senha);
    }
    if (confirmaSenhaValor === "") {
        return setErrorFor(confirmaSenha, " Confirmar senha é obrigatório.");
    }
    if (confirmaSenhaValor.length < 8) {
        return setErrorFor(confirmaSenha, "A senha precisa ter no mínimo 8 caracteres.");
    }
    else {
        setSucessoFor(confirmaSenha);
    }
    if (verificaNomeUserIgual) {
        return setErrorFor(nomeUsuario, "E-mail já está cadastrado!.");
    }
    else {
        setSucessoFor(nomeUsuario);
    }
    if (confirmaSenhaValor !== senhaValor) {
        return setErrorFor(confirmaSenha, "As senhas não conferem.");
    }
    // criar o usuario no localstore
    usuarios.push({
        nome: nomeUsuarioValor,
        senha: senhaValor,
        mensagens: [],
    });
    //colocar a class do css no html de sucesso
    const formControls = form.querySelectorAll(".formControl");
    const cadastroValido = [...formControls].every((formControl) => {
        return formControl.className === "formControl sucesso";
    });
    // testar se todos os campos inputs tiver a class sucesso no o usuario e valido.
    if (cadastroValido) {
        //puxa usuarios para localstore
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        sucessoComfirm.setAttribute('style', 'display:block');
        sucessoComfirm.innerHTML = "Cadastro realizado com sucesso!";
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        console.log(cadastroValido);
    }
    resetCadastro();
}
// zerar campos depois de cadastrar
function resetCadastro() {
    nomeUsuario.value = "";
    senha.value = "";
    confirmaSenha.value = "";
}
// erro e sucesso css com js
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = message;
    formControl.className = "formControl erro";
}
function setSucessoFor(input) {
    const formControl = input.parentElement;
    formControl.className = "formControl sucesso";
}
