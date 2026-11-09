const participantes = [];
let editandoId = null;
let ordemCrescente = true;
function adicionarParticipante(event) {
    event.preventDefault();
    const nome = document.getElementById("input_nome").value.trim();
    if (nome === "") {
        alert("Digite o nome do participante!");
        return;
    }
    // Verifica se está editando ou adicionando
    if (editandoId !== null) {
        const participante = participantes.find(p => p.id === editandoId);
        participante.nome = nome;
        editandoId = null;
        document.getElementById("btn_adicionar").textContent = "Adicionar";
    } else {
        const obj = {
            id: participantes.length > 0
                ? Math.max(...participantes.map(p => p.id)) + 1
                : 1,
            nome: nome
        };
        participantes.push(obj);
    }
    document.getElementById("input_nome").value = "";
    listar();
}
// LISTAR PARTICIPANTES
function listar(sorteadoId) {
    const tbody = document.getElementById("lista");
    tbody.innerHTML = '';
    participantes.forEach(p => {
        const tr = document.createElement("tr");
        if (p.id == sorteadoId) {
            tr.classList.add('sorteado', 'destaque');
        }
        tr.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nome}</td>
            <td>
                <button onclick="editar(${p.id})">✏️</button>
                <button onclick="excluir(${p.id})">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}
// EDITAR PARTICIPANTE
function editar(id) {
    const participante = participantes.find(p => p.id === id);
    document.getElementById("input_nome").value = participante.nome;
    editandoId = id;
    document.getElementById("btn_adicionar").textContent = "Alterar";
}
// EXCLUIR PARTICIPANTE
function excluir(id) {
    const idx = participantes.findIndex(p => p.id === id);
    participantes.splice(idx, 1);
    if (editandoId === id) {
        editandoId = null;
        document.getElementById("input_nome").value = "";
        document.getElementById("btn_adicionar").textContent = "Adicionar";
    }
    listar();
}
// ORDENAR POR NOME
function ordenarNome() {
    participantes.sort((a, b) => {
        return ordemCrescente
            ? a.nome.localeCompare(b.nome, 'pt-BR')
            : b.nome.localeCompare(a.nome, 'pt-BR');
    });
    document.getElementById("btn_ordenar").textContent =
        ordemCrescente ? "Nome ↑" : "Nome ↓";
    ordemCrescente = !ordemCrescente;
    listar();
}
// SORTEAR PARTICIPANTE
function sortear() {
    if (participantes.length === 0) {
        alert("Adicione participantes antes de sortear!");
        return;
    }
    const idx = Math.floor(Math.random() * participantes.length);
    const sorteado = participantes[idx];
    listar(sorteado.id);
}