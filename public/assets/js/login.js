"use strict";
function logar() {
    //pegar inputs html e colocar em variaveis
    let usuarioLogin = document.querySelector("#usuarioLogin");
    let usuarioLoginLabel = document.querySelector("#usuarioLoginLabel");
    let senhaLogin = document.querySelector("#senhaLogin");
    let senhaLoginLabel = document.querySelector("#senhaLoginLabel");
    // varer localstorage e listar usuarios
    let listaUser = [];
    listaUser = JSON.parse(localStorage.getItem("usuarios") || '[]');
    const usuarioEncontrado = listaUser.find((valor) => usuarioLogin.value === valor.nome && senhaLogin.value === valor.senha);
    const erro = document.getElementById("tratarErro");
    if (usuarioLogin.value === "" && senhaLogin.value === "") {
        usuarioLoginLabel.setAttribute("style", "color:#d33220");
        usuarioLogin.setAttribute("style", "border-color:#d33220");
        senhaLogin.setAttribute("style", "border-color:#d33220");
        senhaLoginLabel.setAttribute("style", "color:#d33220");
        erro.setAttribute("style", "display:block");
        erro.innerHTML = "Campos vazios";
        usuarioLogin.focus();
        setTimeout(() => {
            erro.style.display = "none";
            usuarioLoginLabel.removeAttribute("style");
            usuarioLogin.removeAttribute("style");
            senhaLogin.removeAttribute("style");
            senhaLoginLabel.removeAttribute("style");
        }, 1000);
    }
    else if (usuarioLogin.value === "") {
        return setErrorFors(usuarioLogin, "Campo Usuario está vazio.");
    }
    else if (senhaLogin.value === "") {
        return setErrorFors(senhaLogin, "Campo Senha está vazio.");
    }
    else if (usuarioEncontrado !== undefined) {
        const validarUsuarios = {
            nome: usuarioEncontrado.nome,
            mensagens: usuarioEncontrado.mensagens,
        };
        let chave = Math.random().toString(16).substring(2) +
            Math.random().toString(16).substring(2);
        localStorage.setItem("chave", chave);
        localStorage.setItem("usuarioLogado", JSON.stringify(validarUsuarios));
        window.location.href = "home.html";
    }
    else {
        usuarioLoginLabel.setAttribute("style", "color:#d33220");
        usuarioLogin.setAttribute("style", "border-color:#d33220");
        senhaLogin.setAttribute("style", "border-color:#d33220");
        senhaLoginLabel.setAttribute("style", "color:#d33220");
        erro.setAttribute("style", "display:block");
        erro.innerHTML = "Usuario ou senha invalida!.";
        setTimeout(() => {
            erro.style.display = "none";
            usuarioLoginLabel.removeAttribute("style");
            usuarioLogin.removeAttribute("style");
            senhaLogin.removeAttribute("style");
            senhaLoginLabel.removeAttribute("style");
        }, 1000);
    }
}
// erro e sucesso css com js
function setErrorFors(input, message) {
    const textfield = input.parentElement;
    const small = textfield.querySelector("small");
    small.innerText = message;
    textfield.className = "textfield erro";
    setTimeout(() => {
        small.innerText = "";
        textfield.className = "textfield";
    }, 1000);
}
function setSucessoFors(input) {
    const textfield = input.parentElement;
    textfield.className = "textfield sucesso";
}
