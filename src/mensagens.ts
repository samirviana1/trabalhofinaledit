let descricao = document.getElementById("desc") as HTMLInputElement;
let detalhamento = document.getElementById("detalha") as HTMLInputElement;
let formDesc = document.getElementById("formDesc") as HTMLFormElement;


let rtable = document.getElementById("rtable")as HTMLTableElement;

let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")|| '[]');
document.addEventListener("DOMContentLoaded", () => {

  let logado = document.querySelector("#logado") as HTMLHeadingElement;
  logado.innerHTML = `Usuario:  ${usuarioLogado.nome}`;

  if (localStorage.getItem("chave") == null) {
    alert("Você precisa estar logado para acessar essa página!.");
    window.location.href = "login.html";
  }
  let listarUsuarios: Array<User> = listaDeUsuarios();

  console.log(listarUsuarios);
  /*const usuarioLogado = listarUsuarios.find(
    (usuario) => usuario.nome === usuarioLogado.nome
  );
  console.log(usuarioLogado);

  if(!usuarioLogado){
    console.log("Usuario não encontrado");
    return;
  }*/
  
    montarMensagemHtml(usuarioLogado.mensagens)
  
});

function listaDeUsuarios():Array<User> {
  const dbStorage:Array<User> = JSON.parse(localStorage.getItem("usuarios")!);
  return dbStorage

}

formDesc.addEventListener("submit", (event) => {
  event.preventDefault();
  salvarMensagens();
});

function salvarMensagens() {
  const mensagemNova:Mensagem = {
    chaves:Math.random().toString(16).substring(2),
    descricao: descricao.value,
    detalhamento: detalhamento.value,
  };
  console.log(mensagemNova);
  usuarioLogado.mensagens.push(mensagemNova);
  novoDadosUsuaiosLogado(usuarioLogado);
  montarMensagemHtml(usuarioLogado.mensagens);
  formDesc.reset();
}

function novoDadosUsuaiosLogado(dadosUserAtualizado:User) {
  let listaUsuarios:Array<User> = listaDeUsuarios();
  let indiceUserAlualizado = listaUsuarios.findIndex(
    (usuario) => usuario.nome === dadosUserAtualizado.nome
  );
  listaUsuarios[indiceUserAlualizado].mensagens = dadosUserAtualizado.mensagens;
  atualizarLocalStorage(listaUsuarios);
}

function atualizarLocalStorage(listaDados:Array<User>){
  localStorage.setItem("usuarios", JSON.stringify(listaDados));
}

function montarMensagemHtml(novaMensagem:Array<Mensagem>){
  rtable.innerHTML = ""
  for(let i of novaMensagem){
  let linhaTable = document.createElement("tr");
  linhaTable.classList.add("mensagensDnc");
  linhaTable.setAttribute("id", i.chaves);
  let colunaTableChave = document.createElement("td");
  colunaTableChave.innerHTML = i.chaves; 

  let colunaTableDesc = document.createElement("td");
  colunaTableDesc.innerHTML = i.descricao;

  let colunaTableDetalha = document.createElement("td");
  colunaTableDetalha.innerHTML = i.detalhamento;

  let colunaTableAcao = document.createElement("td");
  let buttonEditar = document.createElement("button");
  buttonEditar.innerHTML = "Editar";
  buttonEditar.classList.add("buttonCss");
  buttonEditar.addEventListener("click", () => {
    editarMensagem(i);
  });

  let buttonApagar = document.createElement("button");
  buttonApagar.innerHTML = "Apagar";
  buttonApagar.classList.add("buttonCss");
  buttonApagar.addEventListener("click", () => {
    apagarMensagem(i.chaves);
  });

  colunaTableAcao.appendChild(buttonApagar);
  colunaTableAcao.appendChild(buttonEditar);
  linhaTable.appendChild(colunaTableChave);
  linhaTable.appendChild(colunaTableDesc);
  linhaTable.appendChild(colunaTableDetalha);
  linhaTable.appendChild(colunaTableAcao);
  rtable.appendChild(linhaTable);
  }
  
}

function editarMensagem(mensagem:Mensagem) {
  let mensagemDousuario = usuarioLogado.mensagens.findIndex(
    (valorMsn:Mensagem) => valorMsn.chaves === mensagem.chaves
  );
  console.log(mensagemDousuario);
  if (mensagemDousuario !== -1) {
    let editDescricaoNovMsn = prompt("Digite novo descrição: ");
    usuarioLogado.mensagens[mensagemDousuario].descricao =
      editDescricaoNovMsn
        ? editDescricaoNovMsn
        : usuarioLogado.mensagens[mensagemDousuario].descricao;
    let editDetalhamentonovMsn = prompt("Digite nova detalhamento: ");
    usuarioLogado.mensagens[mensagemDousuario].detalhamento =
      editDetalhamentonovMsn
        ? editDetalhamentonovMsn
        : usuarioLogado.mensagens[mensagemDousuario].detalhamento;
        novoDadosUsuaiosLogado(usuarioLogado);
        montarMensagemHtml(usuarioLogado.mensagens);
  } else {
    alert('Recado não encontrado!.')
  }
}

function apagarMensagem(chaves:string) {
  let mensagemEncontrada = usuarioLogado.mensagens.findIndex(
    (mensagem:Mensagem) => mensagem.chaves === chaves
  );

  console.log(mensagemEncontrada);
  let linhaTableApg = document.getElementById(chaves)as HTMLTableRowElement;
  let aviso = confirm(`Gostaria realmente de apagar está mensagem ? ${ chaves}`);
  if (aviso) {
    linhaTableApg.remove();
    usuarioLogado.mensagens.splice(mensagemEncontrada, 1);
    novoDadosUsuaiosLogado(usuarioLogado);
    /*montarMensagemHtml(usuarioLogado.mensagens);*/
  } else {
  }
}

function sair() {
  localStorage.removeItem("chave");
  window.location.href = "login.html";
}
