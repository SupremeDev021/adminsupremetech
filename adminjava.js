// === CONEXÃO COM O BANCO DE DADOS (SUPABASE) ===
const SUPABASE_URL = 'https://hhyvtehbsfoeuagwhklm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_S9oWEYBafLstrVI2SJQ9uA_ijH5Ph9e'; // <--- COLE SUA CHAVE AQUI

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let clientesReais = [];

// === MOTOR DE NOTIFICAÇÕES (TOAST) ===
function mostrarToast(mensagem, tipo = 'success') {
    let container = document.getElementById('toast-container');
    if(!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast-msg ${tipo}`;
    toast.innerHTML = mensagem;
    container.appendChild(toast);
    
    // Animação de entrada e saída
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // Remove do HTML depois de sumir
    }, 3500); // Fica na tela por 3.5 segundos
}

// === MEMÓRIA DE SESSÃO DO ADMIN ===
window.onload = () => {
    if(localStorage.getItem('admin_supreme_logado') === 'true') {
        document.getElementById('login-admin').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
        carregarTabelaDoBanco();
    }
};
// 1. LOGIN MASTER
async function entrarAdmin(e) {
    e.preventDefault();
    const senha = document.getElementById('admin-senha').value;
    if(senha === 'master123') { 
        localStorage.setItem('admin_supreme_logado', 'true'); // <--- GRAVA A MEMÓRIA
        document.getElementById('login-admin').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
        await carregarTabelaDoBanco();
        mostrarToast('👋 Bem-vindo de volta, Master!', 'success'); // <--- AVISA COM TOAST
    } else {
        document.getElementById('erro-login').style.display = 'block';
    }
}
function sairAdmin() {
    localStorage.removeItem('admin_supreme_logado'); // <--- APAGA A MEMÓRIA
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('login-admin').style.display = 'flex';
    document.getElementById('form-login').reset();
    document.getElementById('erro-login').style.display = 'none';
}

function navegarAdmin(idSecao, elementoMenu) {
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    elementoMenu.classList.add('active');
    document.querySelectorAll('.section-panel').forEach(s => s.classList.remove('active'));
    document.getElementById(idSecao).classList.add('active');
}

// 2. BUSCAR DADOS E ATUALIZAR O FINANCEIRO
async function carregarTabelaDoBanco() {
    const tbody = document.getElementById('tabela-clientes');
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Buscando dados no servidor...</td></tr>';

    const { data: clientes, error } = await supabaseClient
        .from('clientes')
        .select('*')
        .order('id', { ascending: false }); 

    if (error) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Erro ao buscar clientes.</td></tr>';
        return;
    }

    clientesReais = clientes;
    renderizarTabela();
    atualizarDashboard(); 
}

// 3. INTELIGÊNCIA DO DASHBOARD (MRR)
function atualizarDashboard() {
    let ativos = 0;
    let suspensos = 0;
    let receitaMensal = 0;

    clientesReais.forEach(c => {
        let statusAtual = c.status || 'ativo';
        if (statusAtual === 'ativo') {
            ativos++;
            receitaMensal += Number(c.valor_mensalidade) || 0; 
        } else {
            suspensos++;
        }
    });

    document.querySelectorAll('.stat-card .value')[0].innerText = ativos;
    document.querySelectorAll('.stat-card .value')[1].innerText = suspensos;
    document.querySelectorAll('.stat-card .value')[2].innerText = `R$ ${receitaMensal.toFixed(2).replace('.', ',')}`;
}

// 4. RENDERIZAR A TABELA COM STATUS, E-MAIL, INSTÂNCIA E EXCLUIR
function renderizarTabela() {
    const termoBusca = document.getElementById('busca-cliente') ? document.getElementById('busca-cliente').value.toLowerCase() : '';
    const tbody = document.getElementById('tabela-clientes');
    tbody.innerHTML = ''; 

    // A MÁGICA DO FILTRO: Verifica se o que você digitou existe no nome, email ou instância
    const clientesFiltrados = clientesReais.filter(c => 
        c.nome_empresa.toLowerCase().includes(termoBusca) || 
        c.email.toLowerCase().includes(termoBusca) || 
        (c.nome_instancia && c.nome_instancia.toLowerCase().includes(termoBusca))
    );

    if (clientesFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Nenhum cliente encontrado.</td></tr>';
        return;
    }

    clientesFiltrados.forEach(c => {
        // ... (MANTENHA EXATAMENTE O MESMO CÓDIGO QUE VOCÊ JÁ TEM AQUI DENTRO PARA DESENHAR AS LINHAS DA TABELA)
        let statusAtual = c.status || 'ativo'; 
        let badge = statusAtual === 'ativo' ? '<span class="badge badge-active">🟢 ATIVO</span>' : '<span class="badge badge-suspended">🔴 SUSPENSO</span>';
        let botaoAcao = statusAtual === 'ativo' ? `<button class="btn-action suspend" onclick="mudarStatus(${c.id}, 'suspenso')">Cortar Acesso</button>` : `<button class="btn-action reactivate" onclick="mudarStatus(${c.id}, 'ativo')">Reativar Conta</button>`;
        let nomeInstancia = c.nome_instancia ? c.nome_instancia : '<span style="color:gray;">N/A</span>';

        tbody.innerHTML += `
            <tr>
                <td style="color: var(--primary);">#${c.id}</td>
                <td style="color: #fff; font-weight: bold;">${c.nome_empresa}</td>
                <td style="color: var(--text-muted); font-size: 12px;">${c.email}</td>
                <td style="color: #00d2ff; font-family: monospace;">${nomeInstancia}</td>
                <td style="text-transform: capitalize;">${c.segmento}</td>
                <td style="text-transform: capitalize;">${c.plano}</td>
                <td>${badge}</td>
                <td>
                    ${botaoAcao}
                    <button class="btn-action" style="margin-left: 5px;" onclick="alert('Senha: ${c.senha}')">🔑</button>
                    <button class="btn-action" style="margin-left: 5px; color: #ffc107; border-color: #ffc107;" onclick="abrirModalEdicao(${c.id})" title="Editar">✏️</button>
                    <button class="btn-action" style="margin-left: 5px; color: var(--danger); border-color: var(--danger);" onclick="excluirCliente(${c.id})" title="Excluir">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// 5. CORTAR OU REATIVAR ACESSO
async function mudarStatus(id, novoStatus) {
    const confirmacao = confirm(`Tem certeza que deseja mudar o status do cliente #${id} para ${novoStatus.toUpperCase()}?`);
    if(confirmacao) {
        const { error } = await supabaseClient
            .from('clientes')
            .update({ status: novoStatus })
            .eq('id', id);

        if (error) {
            alert("Erro ao atualizar o status no servidor.");
        } else {
            await carregarTabelaDoBanco(); 
        }
    }
}

// 6. GERAR SENHA
function gerarSenha() {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";
    let senha = "";
    for (let i = 0; i < 8; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    document.getElementById('senha-gerada').value = senha;
}

// 7. CADASTRAR CLIENTE (COM VALORES FINANCEIROS E VÍRGULAS CORRETAS)
async function cadastrarCliente(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    const btnSubmit = form.querySelector('button[type="submit"]');
    const txtOriginal = btnSubmit.innerText;
    btnSubmit.innerText = "Criando no Servidor...";

    const { data: novoCliente, error: erroCliente } = await supabaseClient
        .from('clientes')
        .insert([{ 
            nome_empresa: dados.nome_empresa, 
            email: dados.email_cliente, 
            senha: dados.senha, 
            segmento: dados.segmento, 
            plano: dados.plano,
            valor_implantacao: dados.valor_implantacao, 
            valor_mensalidade: dados.valor_mensalidade,
            nome_instancia: dados.nome_instancia
    
        }])
        .select();

    if (erroCliente) {
        alert("Erro: Este e-mail já pode estar cadastrado.");
        console.error(erroCliente);
        btnSubmit.innerText = txtOriginal;
        return;
    }

    const clienteId = novoCliente[0].id;
    const { error: erroConfig } = await supabaseClient
        .from('configuracoes_robo')
        .insert([{ cliente_id: clienteId, dados_painel: {} }]);

    btnSubmit.innerText = txtOriginal;

    if (erroConfig) {
        alert("Cliente criado, mas houve erro ao gerar a gaveta de configurações.");
        console.error(erroConfig);
    } else {
        alert(`✅ Sucesso! O painel da empresa "${dados.nome_empresa}" já está online.`);
        form.reset();
        await carregarTabelaDoBanco();
        navegarAdmin('sec-clientes', document.querySelectorAll('.menu-item')[1]);
    }
}
// 8. EXCLUIR CLIENTE PERMANENTEMENTE
async function excluirCliente(id) {
    const confirmacao = confirm(`🚨 ATENÇÃO EXTREMA: Tem certeza que deseja DELETAR o cliente #${id} permanentemente?\n\nTodos os dados, cardápios e configurações dele serão apagados para sempre.`);
    
    if(confirmacao) {
        const { error } = await supabaseClient
            .from('clientes')
            .delete()
            .eq('id', id);

        if (error) {
            alert("Erro ao excluir cliente no servidor.");
            console.error(error);
        } else {
            alert("Cliente excluído com sucesso.");
            await carregarTabelaDoBanco(); 
        }
    }
}
// ==========================================
// SISTEMA DE EDIÇÃO DE CLIENTES
// ==========================================
function abrirModalEdicao(id) {
    // 1. Acha o cliente na lista pelo ID
    const cliente = clientesReais.find(c => c.id === id);
    if (!cliente) return;

    // 2. Preenche os campos do modal com os dados dele
    document.getElementById('edit-id').value = cliente.id;
    document.getElementById('edit-nome').value = cliente.nome_empresa;
    document.getElementById('edit-email').value = cliente.email;
    document.getElementById('edit-instancia').value = cliente.nome_instancia || '';
    document.getElementById('edit-segmento').value = cliente.segmento;
    document.getElementById('edit-plano').value = cliente.plano;
    document.getElementById('edit-setup').value = cliente.valor_implantacao;
    document.getElementById('edit-mensalidade').value = cliente.valor_mensalidade;
    document.getElementById('edit-senha').value = cliente.senha;

    // 3. Mostra a janela flutuante
    document.getElementById('modal-edicao').style.display = 'flex';
}

function fecharModalEdicao() {
    document.getElementById('modal-edicao').style.display = 'none';
}

async function salvarEdicao(e) {
    e.preventDefault();
    const form = e.target;
    const btnSubmit = form.querySelector('button[type="submit"]');
    const txtOrig = btnSubmit.innerText;
    
    btnSubmit.innerText = "Atualizando Cofre...";

    const id = document.getElementById('edit-id').value;
    
    // Monta o pacote com os dados novos
    const dadosAtualizados = {
        nome_empresa: document.getElementById('edit-nome').value,
        email: document.getElementById('edit-email').value,
        nome_instancia: document.getElementById('edit-instancia').value,
        segmento: document.getElementById('edit-segmento').value,
        plano: document.getElementById('edit-plano').value,
        valor_implantacao: document.getElementById('edit-setup').value,
        valor_mensalidade: document.getElementById('edit-mensalidade').value,
        senha: document.getElementById('edit-senha').value
    };

    // Manda para o Supabase substituir
    const { error } = await supabaseClient
        .from('clientes')
        .update(dadosAtualizados)
        .eq('id', id);

    btnSubmit.innerText = txtOrig;

    if (error) {
        alert("Erro ao atualizar! Verifique se o e-mail já não pertence a outra empresa.");
        console.error(error);
    } else {
        alert("✅ Dados atualizados com sucesso!");
        fecharModalEdicao();
        await carregarTabelaDoBanco(); // Recarrega a tabela para mostrar as mudanças
    }
}
