document.addEventListener("DOMContentLoaded", carregarAtestados);
const modalAtestado = new bootstrap.Modal(document.getElementById("modalAtestado"));
const modalVisualizar = new bootstrap.Modal(document.getElementById("modalVisualizar"));
const tabela = document.getElementById("tabelaAtestados");
const form = document.getElementById("formAtestado");

document.getElementById("novoAtestadoBtn").addEventListener("click", () => {
  form.reset();
  modalAtestado.show();
});

form.addEventListener("submit", e => {
  e.preventDefault();
  const novo = {
    id: Date.now(),
    dataEmissao: form.dataEmissao.value,
    dataRetorno: form.dataRetorno.value,
    aluno: form.aluno.value,
    turma: form.turma.value,
    motivo: form.motivo.value,
    recomendacoes: form.recomendacoes.value,
    medico: form.medico.value,
    crm: form.crm.value,
    responsavel: form.responsavel.value,
    telefone: form.telefone.value
  };
  const lista = JSON.parse(localStorage.getItem("atestados") || "[]");
  lista.push(novo);
  localStorage.setItem("atestados", JSON.stringify(lista));
  modalAtestado.hide();
  carregarAtestados();
});

function carregarAtestados() {
  tabela.innerHTML = "";
  const lista = JSON.parse(localStorage.getItem("atestados") || "[]");
  lista.forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${a.dataEmissao}</td>
      <td>${a.aluno}</td>
      <td>${a.motivo}</td>
      <td>${a.recomendacoes.substring(0, 30)}...</td>
      <td>${a.dataRetorno}</td>
      <td>
        <button class="btn btn-outline-success btn-sm" onclick="visualizarAtestado(${a.id})">👁️ Visualizar</button>
        <button class="btn btn-outline-secondary btn-sm" onclick="gerarPDF(${a.id})">📄 PDF</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

function visualizarAtestado(id) {
  const lista = JSON.parse(localStorage.getItem("atestados") || "[]");
  const a = lista.find(x => x.id === id);
  document.getElementById("conteudoVisualizar").innerHTML = `
    <h4 class="text-center text-success">Next Care - Enfermaria Escolar</h4>
    <hr>
    <h5 class="text-center mb-3">Atestado Médico</h5>
    <p><b>Data de Emissão:</b> ${a.dataEmissao}</p>
    <p><b>Aluno:</b> ${a.aluno} (${a.turma})</p>
    <p><b>Motivo:</b> ${a.motivo}</p>
    <p><b>Recomendações:</b> ${a.recomendacoes}</p>
    <p><b>Data de Retorno:</b> ${a.dataRetorno}</p>
    <p><b>Médico:</b> ${a.medico} - CRM: ${a.crm}</p>
    <p><b>Responsável:</b> ${a.responsavel} (${a.telefone})</p>
  `;
  modalVisualizar.show();
}

function gerarPDF(id) {
  const lista = JSON.parse(localStorage.getItem("atestados") || "[]");
  const a = lista.find(x => x.id === id);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Next Care - Enfermaria Escolar", 20, 20);
  doc.setFontSize(12);
  doc.text("Atestado Médico", 20, 30);
  doc.text(`Data de Emissão: ${a.dataEmissao}`, 20, 45);
  doc.text(`Aluno: ${a.aluno} (${a.turma})`, 20, 55);
  doc.text(`Motivo: ${a.motivo}`, 20, 65);
  doc.text(`Recomendações: ${a.recomendacoes}`, 20, 75);
  doc.text(`Data de Retorno: ${a.dataRetorno}`, 20, 85);
  doc.text(`Médico: ${a.medico} - CRM ${a.crm}`, 20, 95);
  doc.text(`Responsável: ${a.responsavel}`, 20, 105);
  doc.text(`Telefone: ${a.telefone}`, 20, 115);
  doc.save(`Atestado_${a.aluno}.pdf`);
}
