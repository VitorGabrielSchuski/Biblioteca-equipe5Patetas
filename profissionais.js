const modal = document.getElementById("newProfessionalModal");
const openBtn = document.getElementById("newProfessionalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.getElementById("professionalForm");
const table = document.getElementById("professionalTable");

openBtn.onclick = () => (modal.style.display = "flex");
cancelBtn.onclick = () => (modal.style.display = "none");

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const role = document.getElementById("role").value;
  const specialization = document.getElementById("specialization").value;

  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td><span class="badge ${getBadge(role)}">${role}</span></td>
    <td>${specialization}</td>
    <td>0</td>
    <td>0</td>
    <td>0</td>
    <td>
      <button class="btn-acao"><i class="bi bi-calendar-event"></i></button>
      <button class="btn-excluir"><i class="bi bi-trash"></i></button>
    </td>
  `;
  table.appendChild(row);
  saveLocalStorage();
  form.reset();
  modal.style.display = "none";

  Toastify({
    text: "Profissional cadastrado com sucesso!",
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: "#106b00",
  }).showToast();

  attachEvents(row);
});

function getBadge(role) {
  if (role.includes("Enfermeiro")) return "enfermeiro";
  if (role.includes("Médico")) return "medico";
  if (role.includes("Psicólogo")) return "psicologo";
  return "";
}

function attachEvents(context = document) {
  context.querySelectorAll(".btn-acao").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const nome = e.target.closest("tr").children[0].textContent;
      Toastify({
        text: `Abrindo agenda de ${nome}...`,
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#106b00",
      }).showToast();
    })
  );

  context.querySelectorAll(".btn-excluir").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      const linha = e.target.closest("tr");
      const nome = linha.children[0].textContent;
      if (confirm(`Deseja excluir ${nome}?`)) {
        linha.remove();
        saveLocalStorage();
        Toastify({
          text: `${nome} removido.`,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#f44336",
        }).showToast();
      }
    })
  );
}

function saveLocalStorage() {
  const data = Array.from(table.querySelectorAll("tr")).map((tr) => {
    const tds = tr.querySelectorAll("td");
    return {
      nome: tds[0].textContent,
      funcao: tds[1].textContent,
      especializacao: tds[2].textContent,
    };
  });
  localStorage.setItem("profissionais", JSON.stringify(data));
}

function loadLocalStorage() {
  const data = JSON.parse(localStorage.getItem("profissionais")) || [];
  data.forEach((p) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.nome}</td>
      <td><span class="badge ${getBadge(p.funcao)}">${p.funcao}</span></td>
      <td>${p.especializacao}</td>
      <td>0</td><td>0</td><td>0</td>
      <td><button class="btn-acao"><i class="bi bi-calendar-event"></i></button>
          <button class="btn-excluir"><i class="bi bi-trash"></i></button></td>`;
    table.appendChild(row);
  });
  attachEvents();
}

loadLocalStorage();
