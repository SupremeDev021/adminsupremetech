# Documentacao de Integracoes Supreme Tech

## Visao geral

O fluxo operacional previsto e:

WhatsApp -> Evolution API -> Chatwoot -> N8N -> Supabase -> Painel Supreme

O Painel Administrativo Supreme Tech e o lugar correto para configurar, testar e monitorar as integracoes. O Painel do Cliente nao deve exibir tokens, API keys, URLs internas, webhooks ou status tecnico das conexoes.

## Quem configura

Supreme Tech configura:

- URL, Account ID, Inbox ID e API Token do Chatwoot.
- URL, Webhook principal, Workflow principal e API Key do N8N.
- Instancia, numero, URL e token da Evolution API.
- Vinculo de cada empresa com Account ID, Inbox ID, instancia, numero e workflow.
- Regras de roteamento entre etiquetas, pipelines e etapas do CRM.

Cliente final configura e opera:

- Pipelines e etapas do CRM, quando liberado.
- Etiquetas e fluxo comercial da propria empresa, quando o modulo estiver habilitado.
- Leads, agenda, tarefas e gestao diaria.

## Painel Administrativo > Integracoes

### Chatwoot

Campos:

- URL do Chatwoot: dominio publico do Chatwoot atras do NGINX.
- Account ID: identificador da conta dentro do Chatwoot.
- Inbox ID: caixa de entrada usada pela empresa ou operacao.
- API Token: token administrativo do Chatwoot.

Acoes:

- Salvar: guarda a configuracao no Admin.
- Testar conexao: consulta a API da conta.
- Sincronizar: valida a inbox configurada.

Se o teste falhar por `Failed to fetch`, verifique HTTPS, NGINX e CORS do Chatwoot.

### N8N

Campos:

- URL do N8N: dominio publico do N8N atras do NGINX.
- Webhook principal: endpoint usado para eventos de teste e entrada do fluxo.
- Workflow principal: ID ou chave do workflow principal.
- API Key: opcional, usada para consultar a API do N8N quando disponivel.

Acoes:

- Testar workflow: consulta o workflow pela API do N8N quando houver API Key.
- Testar webhook: envia um payload de teste para o webhook principal.
- Salvar: guarda a configuracao no Admin.

### Evolution API

Campos:

- Nome da instancia: nome exato da instancia WhatsApp.
- Numero: numero conectado.
- URL da API: dominio publico da Evolution API.
- Token: chave de acesso da Evolution.

Acoes:

- Testar instancia: consulta o estado da conexao da instancia.
- Sincronizar: consulta as instancias disponiveis.
- Salvar: guarda a configuracao no Admin.

### Supabase

O painel exibe apenas auditoria:

- Projeto conectado.
- URL publica do projeto.
- Tabelas principais encontradas.
- Ultima verificacao.

Nao exponha service role key no frontend. Para producao plena, testes sensiveis devem migrar para backend seguro, Edge Functions ou API propria.

## Cadastro de empresa

Em cada empresa, preencha somente os vinculos especificos:

- Chatwoot Account ID.
- Chatwoot Inbox ID.
- Evolution - Nome da instancia.
- Evolution - Numero.
- N8N - Workflow da empresa.

Esses campos sao opcionais no onboarding. A empresa pode ser criada primeiro e conectada depois.

## CRM automatico com etiquetas

O N8N deve receber eventos do Chatwoot e gravar no Supabase dentro do `dados_painel` da empresa correta.

Fluxo esperado:

1. Conversa chega pelo WhatsApp na Evolution API.
2. Chatwoot recebe a conversa.
3. N8N identifica empresa, contato e etiquetas.
4. N8N verifica se ja existe lead no Supabase.
5. Se nao existir, cria lead.
6. Se existir, associa conversa ao lead existente.
7. O roteamento usa regra da empresa: etiqueta -> pipeline -> etapa.

Exemplo por empresa:

- Etiqueta `Novo Lead` -> Pipeline `Comercial` -> Etapa `Entrada`.
- Etiqueta `Orcamento` -> Pipeline `Vendas` -> Etapa `Proposta`.
- Etiqueta `Cliente` -> Pipeline `Pos-Venda` -> Etapa `Onboarding`.

Nao deve existir regra global fixa para todas as empresas.

## Checklist de validacao

1. Configurar Chatwoot no Admin.
2. Testar conexao do Chatwoot.
3. Configurar N8N no Admin.
4. Testar webhook do N8N.
5. Configurar Evolution API no Admin.
6. Testar instancia da Evolution.
7. Cadastrar empresa.
8. Vincular Account ID, Inbox ID, instancia, numero e workflow da empresa.
9. Enviar mensagem real pelo WhatsApp.
10. Confirmar entrada no Chatwoot.
11. Confirmar execucao do N8N.
12. Confirmar persistencia no Supabase.
13. Confirmar lead no Painel Supreme.
14. Confirmar pipeline/etapa conforme etiqueta.

## Observacoes de seguranca

- O painel atual e estatico e serve para validacao interna controlada.
- Tokens administrativos nao devem ser entregues ao cliente final.
- Para escalar em producao, mover testes e chamadas sensiveis para backend seguro.
- RLS do Supabase deve ser revisado antes de liberar multiempresa em larga escala.
