// Busca global simulada: procura em dados locais (alunos, profissionais, consultas, atestados)
document.addEventListener('DOMContentLoaded', () => {
  const data = {
    alunos: [{id:'1001', nome:'Maria Souza'}, {id:'1002', nome:'Lucas Silva'}, {id:'1003', nome:'João Oliveira'}],
    profissionais: [{nome:'Dr. Paulo'},{nome:'Dra. Ana'}, {nome:'Dr. Carlos'}],
    consultas: [{id:'#001', aluno:'Maria Souza', profissional:'Dr. Paulo', motivo:'Dor de cabeça'},{id:'#002', aluno:'Lucas Silva', profissional:'Dra. Ana', motivo:'Rotina'}],
    atestados: [{id:'#A001', aluno:'Maria Souza', motivo:'Gripe'}]
  };

  const input = document.getElementById('globalSearch');
  const resultsEl = document.getElementById('searchResults');

  function renderResults(matches){
    resultsEl.innerHTML = '';
    if(matches.length === 0){ resultsEl.innerHTML = '<p>Nenhum resultado</p>'; return; }
    matches.forEach(item => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.style.padding='10px';
      card.style.borderBottom='1px solid #eef2f6';
      card.innerHTML = `<strong>${item.title}</strong><div style="color:#6b7280">${item.subtitle || ''}</div>`;
      resultsEl.appendChild(card);
    });
  }

  function search(q){
    q = q.trim().toLowerCase();
    if(!q) return [];
    const out = [];
    data.alunos.forEach(a => { if(a.nome.toLowerCase().includes(q) || a.id.includes(q)) out.push({title:`Aluno: ${a.nome}`, subtitle:`RA: ${a.id}`}); });
    data.profissionais.forEach(p => { if(p.nome.toLowerCase().includes(q)) out.push({title:`Profissional: ${p.nome}`}); });
    data.consultas.forEach(c => { if((c.aluno + c.profissional + c.id + c.motivo).toLowerCase().includes(q)) out.push({title:`Consulta ${c.id}`, subtitle:`${c.aluno} • ${c.profissional} • ${c.motivo}`}); });
    data.atestados.forEach(a => { if((a.aluno + a.id + a.motivo).toLowerCase().includes(q)) out.push({title:`Atestado ${a.id}`, subtitle:`${a.aluno} • ${a.motivo}`}); });
    return out;
  }

  input.addEventListener('input', (e) => {
    const q = e.target.value;
    const matches = search(q);
    renderResults(matches);
  });
});

// ligações comuns: logout, fechar modais, etc.
document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // feedback simples e redirect (simulado)
      alert('Você saiu do sistema.');
      window.location.href = 'index.html';
    });
  }

  // Fechar modal ao clicar fora
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if(e.target === modal) modal.style.display = 'none';
    });
  });
});

