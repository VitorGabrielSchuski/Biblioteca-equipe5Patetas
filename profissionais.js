const newProfessionalBtn = document.getElementById('newProfessionalBtn');
const newProfessionalModal = document.getElementById('newProfessionalModal');
const cancelBtn = document.getElementById('cancelBtn');
const professionalForm = document.getElementById('professionalForm');
const professionalTable = document.getElementById('professionalTable');

newProfessionalBtn.addEventListener('click', () => {
    newProfessionalModal.style.display = 'flex';
});

cancelBtn.addEventListener('click', () => {
    newProfessionalModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === newProfessionalModal) {
        newProfessionalModal.style.display = 'none';
    }
});

professionalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const role = document.getElementById('role').value;
    const specialization = document.getElementById('specialization').value;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${name}</td>
        <td><span class="badge ${getBadgeClass(role)}">${role}</span></td>
        <td>${specialization}</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>
            <button class="btn-action">Ver Agenda</button>
            <button class="btn-delete">🗑️</button>
        </td>
    `;

    professionalTable.appendChild(newRow);
    attachButtonEvents(newRow);

    const total = document.getElementById('totalProfessionals');
    total.textContent = parseInt(total.textContent) + 1;

    alert('Profissional cadastrado com sucesso!');
    professionalForm.reset();
    newProfessionalModal.style.display = 'none';
});

function getBadgeClass(role) {
    if (role.includes('Enfermeiro')) return 'enfermeiro';
    if (role.includes('Médico')) return 'medico';
    if (role.includes('Psicólogo')) return 'psicologo';
    return '';
}

function verAgenda(nome) {
    alert(`Abrindo agenda de ${nome}...`);
}

function excluirProfissional(linha) {
    const nome = linha.querySelector('td').textContent;
    if (confirm(`Deseja realmente excluir o profissional ${nome}?`)) {
        linha.remove();

        const total = document.getElementById('totalProfessionals');
        total.textContent = parseInt(total.textContent) - 1;

        alert(`${nome} foi removido do sistema.`);
    }
}

function attachButtonEvents(container = document) {
    const viewButtons = container.querySelectorAll('.btn-action');
    const deleteButtons = container.querySelectorAll('.btn-delete');

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const nome = e.target.closest('tr').querySelector('td').textContent;
            verAgenda(nome);
        });
    });

    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const linha = e.target.closest('tr');
            excluirProfissional(linha);
        });
    });
}

attachButtonEvents();

document.getElementById('logoutBtn').addEventListener('click', () => {
    alert('Você saiu do sistema.');
    window.location.href = 'login.html';
});