// === CONEXÃO COM O BANCO DE DADOS (SUPABASE) ===
const SUPABASE_URL = 'https://hhyvtehbsfoeuagwhklm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_S9oWEYBafLstrVI2SJQ9uA_ijH5Ph9e'; // <--- COLE SUA CHAVE AQUI

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let clientesReais = [];

// 1. LOGIN MASTER
async function entrarAdmin(e) {
    e.preventDefault();
    const senha = document.getElementById('admin-senha').value;
    
    // A senha de segurança do dono da Supreme-Tech
    if(senha === 'master123') { 
        document.getElementById('login-admin').style.display = 'none';
        document.getElementById('admin-panel').style.display = 'flex';
        
        // Assim que entra, já busca os clientes reais no banco de dados!
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

// 2. NAVEGAÇÃO
function navegarAdmin(idSecao, elementoMenu) {
    document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
    elementoMenu.classList.add('active');
    
    document.querySelectorAll('.section-panel').forEach(s => s.classList.remove('active'));
    document.getElementById(idSecao).classList.add('active');
}

// 3. BUSCAR E RENDERIZAR TABELA DO SUPABASE
async function carregarTabelaDoBanco() {
    const tbody = document.getElementById('tabela-clientes');
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Buscando dados no servidor...</td></tr>';

    // Puxa todos os clientes da tabela SQL
    const { data: clientes, error } = await supabaseClient
        .from('clientes')
        .select('*')
        .order('id', { ascending: false }); // Do mais novo pro mais velho

    if (error) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center; color:red;">Erro ao buscar clientes.</td></tr>';
        return;
    }

    clientesReais = clientes;
    renderizarTabela();
}

function renderizarTabela() {
    const tbody = document.getElementById('tabela-clientes');
    tbody.innerHTML = ''; 

    if (clientesReais.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum cliente cadastrado ainda.</td></tr>';
        return;
    }

    clientesReais.forEach(c => {
        let badge = '<span class="badge badge-active">🟢 ATIVO</span>';
        
        tbody.innerHTML += `
            <tr>
                <td style="color: var(--primary);">#${c.id}</td>
                <td style="color: #fff; font-weight: bold;">${c.nome_empresa}</td>
                <td style="text-transform: capitalize;">${c.segmento}</td>
                <td style="text-transform: capitalize;">${c.plano}</td>
                <td>${badge}</td>
                <td>
                    <button class="btn-action suspend" onclick="alert('O corte de acesso será habilitado via n8n em breve.')">Cortar Acesso</button>
                    <button class="btn-action" style="margin-left: 5px;" onclick="alert('Senha deste cliente: ${c.senha}')">🔑 Ver Senha</button>
                </td>
            </tr>
        `;
    });
}

// 4. GERADOR DE SENHA SEGURA PARA NOVOS CLIENTES
function gerarSenha() {
    const caracteres = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";
    let senha = "";
    for (let i = 0; i < 8; i++) {
        senha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    document.getElementById('senha-gerada').value = senha;
}

// 5. CADASTRAR NOVO CLIENTE DE VERDADE NO SUPABASE
async function cadastrarCliente(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const dados = Object.fromEntries(formData.entries());

    const btnSubmit = form.querySelector('button[type="submit"]');
    const txtOriginal = btnSubmit.innerText;
    btnSubmit.innerText = "Criando no Servidor...";

    // Passo A: Criar a conta na tabela 'clientes'
    const { data: novoCliente, error: erroCliente } = await supabaseClient
        .from('clientes')
        .insert([{ 
            nome_empresa: dados.nome_empresa, 
            email: dados.email_cliente, 
            senha: dados.senha, 
            segmento: dados.segmento, 
            plano: dados.plano 
        }])
        .select();

    if (erroCliente) {
        console.error(erroCliente);
        alert("Erro: Este e-mail já pode estar cadastrado ou houve falha na rede.");
        btnSubmit.innerText = txtOriginal;
        return;
    }

    // Passo B: Criar a gaveta vazia na tabela 'configuracoes_robo'
    const clienteId = novoCliente[0].id;
    const { error: erroConfig } = await supabaseClient
        .from('configuracoes_robo')
        .insert([{ 
            cliente_id: clienteId, 
            dados_painel: {} 
        }]);

    btnSubmit.innerText = txtOriginal;

    if (erroConfig) {
        alert("Cliente criado com sucesso, mas houve erro ao gerar a gaveta de configurações.");
    } else {
        alert(`✅ Sucesso! O painel da empresa "${dados.nome_empresa}" já está online e pronto para uso.`);
        form.reset();
        
        // Atualiza a tabela imediatamente e muda pra ela
        await carregarTabelaDoBanco();
        navegarAdmin('sec-clientes', document.querySelectorAll('.menu-item')[1]);
    }
}
