// Simulação de dados (em produção, virão do localStorage das outras páginas)
if (!localStorage.getItem("consultas")) {
    const consultasDemo = [
        { data: "2025-10-10", profissional: "Dra. Fernanda Costa", status: "agendada" },
        { data: "2025-10-12", profissional: "Dr. Roberto Lima", status: "realizada" },
        { data: "2025-10-18", profissional: "Dra. Lucia Mendes", status: "cancelada" },
        { data: "2025-10-28", profissional: "Dra. Fernanda Costa", status: "faltou" },
    ];
    localStorage.setItem("consultas", JSON.stringify(consultasDemo));
}

if (!localStorage.getItem("profissionais")) {
    localStorage.setItem("profissionais", JSON.stringify([
        "Dra. Fernanda Costa",
        "Dr. Roberto Lima",
        "Dra. Lucia Mendes"
    ]));
}

const consultas = JSON.parse(localStorage.getItem("consultas"));
const profissionais = JSON.parse(localStorage.getItem("profissionais"));

const selectProfissional = document.getElementById("selectProfissional");
const consultasHoje = document.getElementById("consultasHoje");
const gradeCalendario = document.getElementById("gradeCalendario");

profissionais.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    selectProfissional.appendChild(opt);
});

let dataAtual = new Date();
const hoje = new Date();

function gerarCalendario() {
    const mes = dataAtual.getMonth();
    const ano = dataAtual.getFullYear();
    const tituloMes = document.getElementById("tituloMes");
    const meses = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    tituloMes.textContent = `${meses[mes]} ${ano}`;

    gradeCalendario.innerHTML = "";

    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diaSemanaInicio = primeiroDia.getDay();
    const diasMes = ultimoDia.getDate();

    for (let i = 0; i < diaSemanaInicio; i++) {
        const vazio = document.createElement("div");
        gradeCalendario.appendChild(vazio);
    }

    const filtroProf = selectProfissional.value;
    const consultasFiltradas = filtroProf === "todos"
        ? consultas
        : consultas.filter(c => c.profissional === filtroProf);

    for (let dia = 1; dia <= diasMes; dia++) {
        const celula = document.createElement("div");
        celula.classList.add("dia");
        const dataStr = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

        const consultasDoDia = consultasFiltradas.filter(c => c.data === dataStr);
        celula.innerHTML = `<div class="num">${dia}</div>`;

        consultasDoDia.forEach(c => {
            const marcador = document.createElement("span");
            marcador.classList.add("status", c.status);
            celula.appendChild(marcador);
        });

        if (dataStr === hoje.toISOString().split("T")[0]) {
            celula.classList.add("hoje");
        }

        celula.addEventListener("click", () => abrirConsultasDoDia(dataStr));
        gradeCalendario.appendChild(celula);
    }

    atualizarConsultasHoje();
}

function abrirConsultasDoDia(data) {
    const consultasDoDia = consultas.filter(c => c.data === data);
    if (consultasDoDia.length === 0) {
        alert("Nenhuma consulta agendada neste dia.");
        return;
    }

    let texto = `Consultas em ${data}:\n\n`;
    consultasDoDia.forEach(c => {
        texto += `${c.profissional} - ${c.status}\n`;
    });
    alert(texto);
}

function atualizarConsultasHoje() {
    const hojeISO = hoje.toISOString().split("T")[0];
    const consultasDia = consultas.filter(c => c.data === hojeISO);

    consultasHoje.innerHTML = "";
    if (consultasDia.length === 0) {
        consultasHoje.textContent = "Nenhuma consulta agendada";
        return;
    }

    consultasDia.forEach(c => {
        const p = document.createElement("p");
        p.textContent = `${c.profissional} (${c.status})`;
        consultasHoje.appendChild(p);
    });
}

// Navegação entre meses
document.getElementById("btnPrev").addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    gerarCalendario();
});
document.getElementById("btnNext").addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    gerarCalendario();
});
document.getElementById("btnHoje").addEventListener("click", () => {
    dataAtual = new Date();
    gerarCalendario();
});

selectProfissional.addEventListener("change", gerarCalendario);

gerarCalendario();
