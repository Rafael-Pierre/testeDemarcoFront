let colaboradores = [];

//create
function salvar() {
  if (validarCampos()) {
    const nome = document.getElementById("nome").value;
    const idade = document.getElementById("idade").value;
    const funcao = document.getElementById("funcao").value;

    colaboradores.push({ nome, idade, funcao });
    listar();
    limpar();
  } else {
    alert("Por favor, corrija os campos destacados.");
  }
}

//read
function listar() {
  const tabela = document.getElementById("tabelaCadastros").getElementsByTagName("tbody")[0];
  tabela.innerHTML = '';

  colaboradores.forEach((colaborador, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${colaborador.nome}</td>
    <td>${colaborador.idade}</td>
    <td>${colaborador.funcao}</td>
    <td>
      <button onclick="alterar(${index})" class="btnAlterar">Alterar</button>
      <button onclick="Deletar(${index})" class="redButton">Excluir</button>
    </td>
  `;
    tabela.appendChild(tr);
  });
}

//update
function alterar(index) {
  const colaborador = colaboradores[index];
  document.getElementById("nome").value = colaborador.nome;
  document.getElementById("idade").value = colaborador.idade;
  document.getElementById("funcao").value = colaborador.funcao;

  colaboradores.splice(index, 1);

  document.getElementById("btnSubmit").textContent = "Salvar Alteração";
  document.getElementById("btnSubmit").onclick = () => {
    salvar();
    document.getElementById("btnSubmit").textContent = "Salvar";
    document.getElementById("btnSubmit").onclick = salvar;
  };
}

//delete
let indiceParaExcluir = null;
function Deletar(index) {
  indiceParaExcluir = index;
  const colaborador = colaboradores[index];
  document.getElementById(
    "popupMessage"
  ).textContent = `Tem certeza que deseja excluir o colaborador ${colaborador.nome}?`;
  document.getElementById("popupConfirmacao").style.display = "flex";
}

document.getElementById("btnConfirmar").addEventListener("click", () => {
  if (indiceParaExcluir !== null) {
    colaboradores.splice(indiceParaExcluir, 1);
    listar();
    indiceParaExcluir = null;
    fecharPopup();
  }
});

document.getElementById("btnCancelar").addEventListener("click", fecharPopup);

function fecharPopup() {
  document.getElementById("popupConfirmacao").style.display = "none";
}




function validarCampos() {
  let isValid = true;

  const nomeInput = document.getElementById("nome");
  const idadeInput = document.getElementById("idade");
  const funcaoInput = document.getElementById("funcao");

  const erroNome = document.getElementById("erroNome");
  const erroIdade = document.getElementById("erroIdade");
  const erroFuncao = document.getElementById("erroFuncao");

  erroNome.textContent = "";
  erroNome.classList.remove("visivel");
  erroIdade.textContent = "";
  erroIdade.classList.remove("visivel");
  erroFuncao.textContent = "";
  erroFuncao.classList.remove("visivel");


  if (nomeInput.value.trim() === "") {
    nomeInput.classList.add("invalid");
    nomeInput.classList.remove("valid");
    erroNome.textContent = "Nome é campo obrigatório.";
    erroNome.classList.add("visivel");
    isValid = false;
  } else {
    nomeInput.classList.add("valid");
    nomeInput.classList.remove("invalid");
  }

  if (
    idadeInput.value.trim() === "" ||
    isNaN(idadeInput.value) ||
    idadeInput.value <= 0 ||
    !Number.isInteger(parseFloat(idadeInput.value))
  ) {
    idadeInput.classList.add("invalid");
    idadeInput.classList.remove("valido");
    erroIdade.textContent = "Idade deve ser um número inteiro epositivo.";
    erroIdade.classList.add("visivel");
    isValid = false;
  } else {
    idadeInput.classList.add("valid");
    idadeInput.classList.remove("invalid");
  }

  if (funcaoInput.value.trim() === "") {
    funcaoInput.classList.add("invalid");
    funcaoInput.classList.remove("valid");
    erroFuncao.textContent = "Função é campo obrigatório.";
    erroFuncao.classList.add("visivel");
    isValid = false;
  } else {
    funcaoInput.classList.add("valid");
    funcaoInput.classList.remove("invalid");
  }

  return isValid;
}


function limpar() {
  document.getElementById("nome").value = "";
  document.getElementById("idade").value = "";
  document.getElementById("funcao").value = "";

  document.getElementById("nome").classList.remove("valid", "invalid");
  document.getElementById("idade").classList.remove("valid", "invalid");
  document.getElementById("funcao").classList.remove("valid", "invalid");

  erroNome.textContent = "";
  erroNome.classList.remove("visivel");
  erroIdade.textContent = "";
  erroIdade.classList.remove("visivel");
  erroFuncao.textContent = "";
  erroFuncao.classList.remove("visivel");

  document.getElementById("formcadastro").reset();
}
