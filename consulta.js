function sair() {
    window.location.href = "login.html";
  }
  
  function novaConsulta() {
    alert("Abrir página para nova consulta!");
    // aqui você poderia usar: window.location.href="novaConsulta.html";
  }
  
  function verDetalhes(botao){
    const linha = botao.closest("tr");
    const aluno = linha.children[1].innerText;
    const profissional = linha.children[2].innerText;
    const motivo = linha.children[3].innerText;
    const status = linha.children[4].innerText;
    alert(`Detalhes da consulta:\nAluno: ${aluno}\nProfissional: ${profissional}\nMotivo: ${motivo}\nStatus: ${status}`);
  }
  
  // Função de filtragem básica
  function filtrarConsultas(){
    const busca = document.getElementById("busca").value.toLowerCase();
    const statusFiltro = document.getElementById("statusFiltro").value;
    const periodoFiltro = document.getElementById("periodoFiltro").value;
    const linhas = document.querySelectorAll("#listaConsultas tr");
  
    linhas.forEach(linha=>{
      const aluno = linha.children[1].innerText.toLowerCase();
      const profissional = linha.children[2].innerText.toLowerCase();
      const motivo = linha.children[3].innerText.toLowerCase();
      const status = linha.children[4].innerText;
  
      let exibir = true;
  
      if(busca && !(aluno.includes(busca) || profissional.includes(busca) || motivo.includes(busca))){
        exibir = false;
      }
      if(statusFiltro && status !== statusFiltro){
        exibir = false;
      }
  
      linha.style.display = exibir ? "" : "none";
    });
  }
  