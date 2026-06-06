// ==========================================================================
// 1. CONEXÃO COM O BANCO DE DADOS (SUPABASE)
// O coração do sistema. O Admin e o Cliente leem daqui.
// ==========================================================================
const SUPABASE_URL = 'https://hhyvtehbsfoeuagwhklm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_S9oWEYBafLstrVI2SJQ9uA_ijH5Ph9e'; 

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let clientesReais = [];

// ==========================================================================
// 2. MOTOR DE NOTIFICAÇÕES (TOAST)
// ==========================================================================
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

// ==========================================================================
// 3. MEMÓRIA DE SESSÃO DO ADMIN MASTER
// ==========================================================================
window.onload = () => {
    if(localStorage.getItem('admin_supreme_logado') === 'true') {
        document.getElementById('login-admin').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
        carregarTabelaDoBanco();
    }
};

// LOGIN MASTER
async function entrarAdmin(e) {
    e.preventDefault();
    const senha = document.getElementById('admin-senha').value;
    
    // Senha Mestra (Hardcoded conforme sua arquitetura de segurança atual)
    if(senha === '69227100Jp@') { 
        localStorage.setItem('admin_supreme_logado', 'true'); 
        document.getElementById('login-admin').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
        await carregarTabelaDoBanco();
        mostrarToast('👋 Bem-vindo de volta, Master!', 'success'); 
    } else {
        document.getElementById('erro-login').style.display = 'block';
    }
}

function sairAdmin() {
    localStorage.removeItem('admin_supreme_logado'); 
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

// ==========================================================================
// 4. BUSCAR DADOS E ATUALIZAR O FINANCEIRO (DASHBOARD)
// ==========================================================================
async function carregarTabelaDoBanco() {
    const tbody = document.getElementById('tabela-clientes');
    if(!tbody) return;
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Buscando dados no servidor...</td></tr>';

    const { data: clientes, error } = await supabaseClient
        .from('clientes')
        .select('*')
        .order('id', { ascending: false }); 

    if (error) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:red;">Erro ao buscar clientes.</td></tr>';
        return;
    }

    clientesReais = clientes;
    renderizarTabela();
    atualizarDashboard(); 
}

// INTELIGÊNCIA DO DASHBOARD (MRR)
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

    const statValues = document.querySelectorAll('.stat-card .value');
    if(statValues.length >= 3) {
        statValues[0].innerText = ativos;
        statValues[1].innerText = suspensos;
        statValues[2].innerText = `R$ ${receitaMensal.toFixed(2).replace('.', ',')}`;
    }
}

// ==========================================================================
// 5. RENDERIZAR A TABELA GERAL DE CLIENTES
// ==========================================================================
function renderizarTabela() {
    const buscaEl = document.getElementById('busca-cliente');
    const termoBusca = buscaEl ? buscaEl.value.toLowerCase() : '';
    const tbody = document.getElementById('tabela-clientes');
    if(!tbody) return;
    tbody.innerHTML = ''; 

    // A MÁGICA DO FILTRO: Verifica nome, email ou instância
    const clientesFiltrados = clientesReais.filter(c => 
        (c.nome_empresa && c.nome_empresa.toLowerCase().includes(termoBusca)) || 
        (c.email && c.email.toLowerCase().includes(termoBusca)) || 
        (c.nome_instancia && c.nome_instancia.toLowerCase().includes(termoBusca))
    );

    if (clientesFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">Nenhum cliente encontrado.</td></tr>';
        return;
    }

    clientesFiltrados.forEach(c => {
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
                    <button class="btn-action" style="margin-left: 5px;" onclick="alert('Senha do cliente: ${c.senha}')" title="Ver Senha">🔑</button>
                    <button class="btn-action" style="margin-left: 5px; color: #ffc107; border-color: #ffc107;" onclick="abrirModalEdicao(${c.id})" title="Editar">✏️</button>
                    <button class="btn-action" style="margin-left: 5px; color: var(--danger); border-color: var(--danger);" onclick="excluirCliente(${c.id})" title="Excluir">🗑️</button>
                </td>
            </tr>
        `;
    });
}

// CORTAR OU REATIVAR ACESSO (O cliente perde acesso ao Painel Camaleão na hora)
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

// ==========================================================================
// 6. CADASTRO UNIFICADO DE EMPRESAS
// ==========================================================================
function gerarSenha() {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";
    let senha = "";
    for (let i = 0; i < 8; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    const senhaGerada = document.getElementById('senha-gerada');
    if(senhaGerada) senhaGerada.value = senha;
}

async function cadastrarCliente(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    const btnSubmit = form.querySelector('button[type="submit"]');
    const txtOriginal = btnSubmit.innerText;
    btnSubmit.innerText = "Criando no Servidor...";

    // 1. Cria a empresa na base de dados (O Painel Camaleão usará estes dados)
    const { data: novoCliente, error: erroCliente } = await supabaseClient
        .from('clientes')
        .insert([{ 
            nome_empresa: dados.nome_empresa, 
            email: dados.email_cliente, 
            senha: dados.senha, 
            segmento: dados.segmento, // <--- O Painel do Cliente lerá isso para definir os menus
            plano: dados.plano,
            valor_implantacao: dados.valor_implantacao, 
            valor_mensalidade: dados.valor_mensalidade,
            nome_instancia: dados.nome_instancia,
            status: 'ativo'
        }])
        .select();

    if (erroCliente) {
        alert("Erro: Este e-mail já pode estar cadastrado ou ocorreu um problema.");
        console.error(erroCliente);
        btnSubmit.innerText = txtOriginal;
        return;
    }

    // 2. Prepara a Gaveta de Configurações do Robô
    const clienteId = novoCliente[0].id;
    const { error: erroConfig } = await supabaseClient
        .from('configuracoes_robo')
        .insert([{ 
            cliente_id: clienteId, 
            dados_painel: {},
            modulos_ativos: [] // Preparado para o futuro caso você queira ativar módulos por API
        }]);

    btnSubmit.innerText = txtOriginal;

    if (erroConfig) {
        alert("Cliente criado, mas houve erro ao gerar a gaveta de configurações.");
        console.error(erroConfig);
    } else {
        alert(`✅ Sucesso! O painel da empresa "${dados.nome_empresa}" já está online e unificado.`);
        form.reset();
        await carregarTabelaDoBanco();
        
        // Redireciona de volta para a tabela
        const menuItemClientes = document.querySelectorAll('.menu-item')[1];
        if(menuItemClientes) navegarAdmin('sec-clientes', menuItemClientes);
    }
}

// EXCLUIR CLIENTE PERMANENTEMENTE
async function excluirCliente(id) {
    const confirmacao = confirm(`🚨 ATENÇÃO EXTREMA: Tem certeza que deseja DELETAR o cliente #${id} permanentemente?\n\nTodos os dados, fluxos do Chatwoot e configurações dele serão apagados para sempre.`);
    
    if(confirmacao) {
        const { error } = await supabaseClient
            .from('clientes')
            .delete()
            .eq('id', id);

        if (error) {
            alert("Erro ao excluir cliente no servidor.");
            console.error(error);
        } else {
            alert("Cliente excluído com sucesso. Acesso revogado.");
            await carregarTabelaDoBanco(); 
        }
    }
}

// ==========================================================================
// 7. SISTEMA DE EDIÇÃO DE CLIENTES
// ==========================================================================
function abrirModalEdicao(id) {
    const cliente = clientesReais.find(c => c.id === id);
    if (!cliente) return;

    document.getElementById('edit-id').value = cliente.id;
    document.getElementById('edit-nome').value = cliente.nome_empresa || '';
    document.getElementById('edit-email').value = cliente.email || '';
    document.getElementById('edit-instancia').value = cliente.nome_instancia || '';
    document.getElementById('edit-segmento').value = cliente.segmento || 'clinica';
    document.getElementById('edit-plano').value = cliente.plano || 'supreme start';
    document.getElementById('edit-setup').value = cliente.valor_implantacao || 0;
    document.getElementById('edit-mensalidade').value = cliente.valor_mensalidade || 0;
    document.getElementById('edit-senha').value = cliente.senha || '';

    const modal = document.getElementById('modal-edicao');
    if(modal) modal.style.display = 'flex';
}

function fecharModalEdicao() {
    const modal = document.getElementById('modal-edicao');
    if(modal) modal.style.display = 'none';
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
        segmento: document.getElementById('edit-segmento').value, // Se mudar o segmento aqui, o Painel do Cliente muda de "cara" automaticamente
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
        mostrarToast("✅ Dados atualizados com sucesso!", "success");
        fecharModalEdicao();
        await carregarTabelaDoBanco(); 
    }
}
