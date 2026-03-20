// === CONEXÃO COM O BANCO DE DADOS (SUPABASE) ===
const SUPABASE_URL = 'https://hhyvtehbsfoeuagwhklm.supabase.co';
const SUPABASE_KEY = 'COLE_AQUI_A_SUA_PUBLISHKEY_COMPLETA'; // <--- COLE SUA CHAVE AQUI

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let clientesReais = [];

// 1. LOGIN MASTER
async function entrarAdmin(e) {
    e.preventDefault();
    const senha = document.getElementById('admin-senha').value;
    
    if(senha === 'master123') { 
        document.getElementById('login-admin').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
        await carregarTabelaDoBanco();
    } else {
        document.getElementById('erro-login').style.display = 'block';
    }
}

function sairAdmin() {
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

// 4. RENDERIZAR A TABELA COM STATUS REAL
function renderizarTabela() {
    const tbody = document.getElementById('tabela-clientes');
    tbody.innerHTML = ''; 

    if (clientesReais.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum cliente cadastrado ainda.</td></tr>';
        return;
    }

    clientesReais.forEach(c => {
        let statusAtual = c.status || 'ativo'; 
        
        let badge = statusAtual === 'ativo' 
            ? '<span class="badge badge-active">🟢 ATIVO</span>' 
            : '<span class="badge badge-suspended">🔴 SUSPENSO</span>';
        
        let botaoAcao = statusAtual === 'ativo'
            ? `<button class="btn-action suspend" onclick="mudarStatus(${c.id}, 'suspenso')">Cortar Acesso</button>`
            : `<button class="btn-action reactivate" onclick="mudarStatus(${c.id}, 'ativo')">Reativar Conta</button>`;

        tbody.innerHTML += `
            <tr>
                <td style="color: var(--primary);">#${c.id}</td>
                <td style="color: #fff; font-weight: bold;">${c.nome_empresa}</td>
                <td style="text-transform: capitalize;">${c.segmento}</td>
                <td style="text-transform: capitalize;">${c.plano}</td>
                <td>${badge}</td>
                <td>
                    ${botaoAcao}
                    <button class="btn-action" style="margin-left: 5px;" onclick="alert('Senha deste cliente: ${c.senha}')">🔑 Ver Senha</button>
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
            valor_mensalidade: dados.valor_mensalidade  
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
