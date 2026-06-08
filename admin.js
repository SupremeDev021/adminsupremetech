const STORAGE_KEY = "supreme_platform_state_v2";
const ADMIN_SESSION_KEY = "supreme_admin_session_v2";
const SESSION_TIMEOUT_MS = 1000 * 60 * 60 * 4;
const SUPABASE_URL = "https://hhyvtehbsfoeuagwhklm.supabase.co";
const SUPABASE_KEY = "sb_publishable_S9oWEYBafLstrVI2SJQ9uA_ijH5Ph9e";

const MODULES = {
  dashboard: { label: "Dashboard", icon: "layout-dashboard" },
  inbox: { label: "Atendimentos", icon: "messages-square" },
  crm: { label: "CRM visual", icon: "git-branch" },
  agenda: { label: "Agenda", icon: "calendar-days" },
  management: { label: "Gestao empresarial", icon: "building-2" },
  automations: { label: "Automacoes", icon: "workflow" },
  marketplace: { label: "Marketplace", icon: "shopping-bag" },
  settings: { label: "Configuracoes", icon: "settings" }
};

const PERMISSION_ACTIONS = ["view", "create", "edit", "delete", "export", "manage_users", "configure_integrations"];
const ROLE_LABELS = {
  proprietario: "Proprietario",
  administrador: "Administrador",
  gerente: "Gerente",
  supervisor: "Supervisor",
  atendente: "Atendente",
  financeiro: "Financeiro",
  comercial: "Comercial",
  suporte: "Suporte"
};

const ICONS = {
  activity: "<path d='M22 12h-4l-3 8L9 4l-3 8H2'/>",
  "badge-dollar-sign": "<path d='M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.78 4.78 4 4 0 0 1-6.74 0 4 4 0 0 1-4.78-4.78 4 4 0 0 1 0-6.75Z'/><path d='M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6'/>",
  blocks: "<rect width='7' height='7' x='3' y='3' rx='1'/><rect width='7' height='7' x='14' y='3' rx='1'/><rect width='7' height='7' x='14' y='14' rx='1'/><rect width='7' height='7' x='3' y='14' rx='1'/>",
  brain: "<path d='M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z'/><path d='M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18ZM15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4'/>",
  "building-2": "<path d='M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18'/><path d='M6 12H4a2 2 0 0 0-2 2v8h20v-8a2 2 0 0 0-2-2h-2'/><path d='M10 6h4M10 10h4M10 14h4M10 18h4'/>",
  "calendar-days": "<path d='M8 2v4M16 2v4M3 10h18'/><rect x='3' y='4' width='18' height='18' rx='2'/><path d='M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01'/>",
  "chart-column": "<path d='M3 3v18h18'/><path d='M18 17V9M13 17V5M8 17v-3'/>",
  "chart-no-axes-combined": "<path d='M12 16v5M16 14v7M20 10v11M22 3l-8.5 8.5-5-5L2 13'/>",
  "git-branch": "<line x1='6' x2='6' y1='3' y2='15'/><circle cx='18' cy='6' r='3'/><circle cx='6' cy='18' r='3'/><path d='M18 9a9 9 0 0 1-9 9'/>",
  "layout-dashboard": "<rect width='7' height='9' x='3' y='3' rx='1'/><rect width='7' height='5' x='14' y='3' rx='1'/><rect width='7' height='9' x='14' y='12' rx='1'/><rect width='7' height='5' x='3' y='16' rx='1'/>",
  "list-checks": "<path d='m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8'/>",
  "lock-keyhole": "<circle cx='12' cy='16' r='1'/><rect x='3' y='10' width='18' height='12' rx='2'/><path d='M7 10V7a5 5 0 0 1 10 0v3'/>",
  "log-out": "<path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'/><path d='m16 17 5-5-5-5'/><path d='M21 12H9'/>",
  "messages-square": "<path d='M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z'/><path d='M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1'/>",
  plus: "<path d='M5 12h14M12 5v14'/>",
  "refresh-cw": "<path d='M3 12a9 9 0 0 1 15-6.7L21 8'/><path d='M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16'/><path d='M3 21v-5h5'/>",
  save: "<path d='M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z'/><path d='M17 21v-8H7v8M7 3v5h8'/>",
  settings: "<path d='M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.51a2 2 0 0 1 1-1.72l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z'/><circle cx='12' cy='12' r='3'/>",
  "shield-check": "<path d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z'/><path d='m9 12 2 2 4-4'/>",
  "shopping-bag": "<path d='M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z'/><path d='M3 6h18M16 10a4 4 0 0 1-8 0'/>",
  "users-round": "<path d='M18 21a8 8 0 0 0-16 0'/><circle cx='10' cy='8' r='5'/><path d='M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3'/>",
  workflow: "<rect width='8' height='8' x='3' y='3' rx='2'/><rect width='8' height='8' x='13' y='13' rx='2'/><path d='M11 7h4a2 2 0 0 1 2 2v4'/>"
};

let platform = loadPlatform();
let adminSession = loadAdminSession();
let activeSection = "dashboard";

document.addEventListener("DOMContentLoaded", bootAdmin);

function bootAdmin() {
  renderIcons();
  if (!platform.admin?.passwordHash) setText("setup-hint", "Primeiro acesso: defina uma senha master para este ambiente.");
  on("admin-login-form", "submit", handleAdminLogin);
  on("admin-logout", "click", adminLogout);
  document.querySelectorAll("#admin-menu button").forEach(button => button.addEventListener("click", () => setSection(button.dataset.section)));
  bindEvents();
  restoreAdminSession();
  registerServiceWorker();
}

function loadPlatform() {
  const base = {
    companies: [],
    plans: [],
    modules: defaultMarketplace(),
    roles: defaultRoles(),
    audit: [],
    notifications: [],
    finance: {},
    security: { sessionTimeoutMinutes: 240, rateLimitPerMinute: 60 },
    integrations: defaultIntegrations(),
    version: 2
  };
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    return { ...base, ...saved, integrations: mergeIntegrations(saved.integrations) };
  } catch {
    return base;
  }
}

function savePlatform() {
  const snapshot = { ...platform, companies: [] };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
}

function loadAdminSession() {
  try {
    return JSON.parse(localStorage.getItem(ADMIN_SESSION_KEY));
  } catch {
    return null;
  }
}

function saveAdminSession() {
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminSession));
}

async function handleAdminLogin(event) {
  event.preventDefault();
  const password = value("admin-password");
  if (!platform.admin?.passwordHash) {
    platform.admin = { passwordHash: await hash(password), createdAt: nowIso() };
    audit(null, "admin_password_created", "Senha master administrativa configurada");
    savePlatform();
  } else if (platform.admin.passwordHash !== await hash(password)) {
    setText("admin-login-message", "Senha invalida.");
    return;
  }
  adminSession = { startedAt: Date.now(), lastActivityAt: Date.now() };
  saveAdminSession();
  audit(null, "admin_login", "Login administrativo realizado");
  await openAdmin();
}

function restoreAdminSession() {
  if (!adminSession) return;
  if (Date.now() - adminSession.lastActivityAt > SESSION_TIMEOUT_MS) return adminLogout(false);
  openAdmin();
}

async function openAdmin() {
  document.getElementById("admin-auth").hidden = true;
  document.getElementById("admin-shell").hidden = false;
  try {
    await refreshCompaniesFromSupabase();
  } catch (error) {
    toast(error.message || "Nao foi possivel carregar empresas do Supabase.", "error");
  }
  setSection(activeSection);
}

function adminLogout(record = true) {
  if (record) audit(null, "admin_logout", "Logout administrativo realizado");
  adminSession = null;
  localStorage.removeItem(ADMIN_SESSION_KEY);
  document.getElementById("admin-shell").hidden = true;
  document.getElementById("admin-auth").hidden = false;
}

function bindEvents() {
  on("refresh-dashboard", "click", renderDashboard);
  on("new-company", "click", () => openCompanyModal());
  on("company-search", "input", renderCompanies);
  on("company-status-filter", "change", renderCompanies);
  on("new-plan", "click", () => openPlanModal());
  on("new-module", "click", () => openModuleModal());
  on("new-role", "click", () => openRoleModal());
  on("security-form", "submit", saveSecurity);
  on("refresh-integrations", "click", renderIntegrations);
  on("chatwoot-form", "submit", saveChatwootIntegration);
  on("n8n-form", "submit", saveN8nIntegration);
  on("evolution-form", "submit", saveEvolutionIntegration);
  on("test-chatwoot", "click", testChatwootConnection);
  on("sync-chatwoot", "click", syncChatwoot);
  on("test-n8n-workflow", "click", testN8nWorkflow);
  on("test-n8n-webhook", "click", testN8nWebhook);
  on("test-evolution", "click", testEvolution);
  on("sync-evolution", "click", syncEvolution);
  on("test-supabase", "click", testSupabaseConnection);
}

function setSection(section) {
  activeSection = section;
  document.querySelectorAll(".module").forEach(item => item.classList.toggle("active", item.id === `section-${section}`));
  document.querySelectorAll("#admin-menu button").forEach(button => button.classList.toggle("active", button.dataset.section === section));
  const renderers = {
    dashboard: renderDashboard,
    companies: renderCompanies,
    plans: renderPlans,
    modules: renderModules,
    integrations: renderIntegrations,
    rbac: renderRoles,
    finance: renderFinance,
    audit: renderAudit,
    security: renderSecurity
  };
  renderers[section]?.();
  renderIcons();
}

function renderDashboard() {
  const metrics = computeMetrics();
  document.getElementById("admin-kpis").innerHTML = [
    metric("Empresas ativas", metrics.activeCompanies, "Base operacional"),
    metric("MRR", formatCurrency(metrics.mrr), "Receita mensal recorrente"),
    metric("ARR", formatCurrency(metrics.arr), "Receita anualizada"),
    metric("Churn", `${metrics.churn.toFixed(1)}%`, "Cancelamentos sobre base"),
    metric("Inadimplencia", `${metrics.overdue}`, "Licencas vencidas"),
    metric("Modulos ativos", metrics.activeModules, "Marketplace disponivel")
  ].join("");
  renderPlanChart();
  renderStatusChart(metrics);
  renderInsights(metrics);
}

function computeMetrics() {
  const companies = platform.companies;
  const activeCompanies = companies.filter(item => item.status === "active").length;
  const cancelled = companies.filter(item => item.status === "cancelled").length;
  const suspended = companies.filter(item => item.status === "suspended").length;
  const overdue = companies.filter(item => licenseStatus(item) === "expired").length;
  const mrr = companies.filter(item => item.status === "active").reduce((sum, item) => sum + Number(item.monthly || 0), 0);
  return {
    total: companies.length,
    activeCompanies,
    suspended,
    cancelled,
    overdue,
    mrr,
    arr: mrr * 12,
    churn: companies.length ? cancelled / companies.length * 100 : 0,
    activeModules: platform.modules.filter(item => item.active).length
  };
}

function metric(label, value, caption) {
  return `<article class="metric-card"><span>${label}</span><strong>${value}</strong><em>${caption}</em></article>`;
}

function renderPlanChart() {
  const totals = platform.plans.map(plan => ({
    name: plan.name,
    value: platform.companies
      .filter(company => company.planId === plan.id && company.status === "active")
      .reduce((sum, company) => sum + Number(company.monthly || 0), 0)
  }));
  const max = Math.max(1, ...totals.map(item => item.value));
  document.getElementById("plan-chart").innerHTML = totals.length
    ? totals.map(item => `<div class="bar-row"><span>${escapeHtml(item.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${item.value / max * 100}%"></div></div><strong>${formatCurrency(item.value)}</strong></div>`).join("")
    : "<p class='muted'>Nenhum plano com receita ativa.</p>";
}

function renderStatusChart(metrics) {
  document.getElementById("status-chart").innerHTML = [
    ["Ativas", metrics.activeCompanies, "active"],
    ["Suspensas", metrics.suspended, "suspended"],
    ["Canceladas", metrics.cancelled, "cancelled"],
    ["Vencidas", metrics.overdue, "expired"]
  ].map(([label, count, status]) => `<div class="status-line"><span class="status-pill ${status}">${label}</span><strong>${count}</strong></div>`).join("");
}

function renderInsights(metrics) {
  const insights = [];
  if (!metrics.total) insights.push("Nenhuma empresa cadastrada. O dashboard sera preenchido com dados reais apos o onboarding.");
  if (metrics.overdue) insights.push(`${metrics.overdue} licenca(s) vencida(s) exigem acao financeira.`);
  if (metrics.activeCompanies && !metrics.mrr) insights.push("Existem empresas ativas sem mensalidade configurada.");
  if (!insights.length) insights.push("Operacao sem alertas criticos no momento.");
  document.getElementById("admin-insights").innerHTML = insights.map(text => `<div class="timeline-item">${escapeHtml(text)}<small>${formatDate(nowIso())}</small></div>`).join("");
}

function renderCompanies() {
  const term = value("company-search").toLowerCase();
  const status = value("company-status-filter") || "all";
  const rows = platform.companies.filter(company => {
    const searchable = `${company.name} ${company.email} ${company.responsible || ""}`.toLowerCase();
    return searchable.includes(term) && (status === "all" || company.status === status);
  });
  document.getElementById("companies-table").innerHTML = rows.length ? rows.map(company => `
    <tr>
      <td><strong>${escapeHtml(company.name)}</strong><br><span class="muted">${escapeHtml(company.email)}</span></td>
      <td>${escapeHtml(planName(company.planId))}</td>
      <td><span class="status-pill ${company.status}">${statusLabel(company.status)}</span></td>
      <td>${formatCurrency(company.monthly || 0)}</td>
      <td><span class="status-pill ${licenseStatus(company)}">${licenseLabel(licenseStatus(company))}</span></td>
      <td class="actions">
        <button class="btn ghost" onclick="window.editCompany('${company.id}')">Editar</button>
        <button class="btn ghost" onclick="window.toggleCompany('${company.id}')">${company.status === "active" ? "Suspender" : "Ativar"}</button>
        <button class="btn danger" onclick="window.cancelCompany('${company.id}')">Cancelar</button>
      </td>
    </tr>
  `).join("") : "<tr><td colspan='6'>Nenhuma empresa cadastrada.</td></tr>";
}

function openCompanyModal(id) {
  const company = platform.companies.find(item => item.id === id);
  const companyIntegrations = defaultCompanyIntegrations(company, company?.integrations);
  const moduleChecks = platform.modules.map(module => `<label class="field"><span><input name="modules" type="checkbox" value="${module.key}" ${(company?.modules || []).includes(module.key) ? "checked" : ""}> ${escapeHtml(module.name)}</span></label>`).join("");
  openModal(company ? "Editar empresa" : "Nova empresa", `
    <form id="company-form" class="stack">
      ${inputField("name", "Nome da empresa", company?.name)}
      <div class="form-row">${inputField("email", "E-mail de acesso", company?.email, "email")}${inputField("password", "Senha inicial", company?.password || "", "password")}</div>
      <div class="form-row">${inputField("responsible", "Responsavel", company?.responsible)}${inputField("document", "Documento fiscal", company?.document)}</div>
      <div class="form-row">${selectField("planId", "Plano", platform.plans.map(plan => ({ value: plan.id, label: plan.name })), company?.planId)}${inputField("monthly", "Mensalidade", company?.monthly || 0, "number")}${inputField("setup", "Setup", company?.setup || 0, "number")}</div>
      <div class="form-row">${selectField("status", "Status", ["active", "suspended", "cancelled"], company?.status || "active")}${inputField("licenseDue", "Vencimento da licenca", company?.license?.dueDate || "", "date")}</div>
      <div class="panel"><h2>Dashboard principal</h2><div class="form-row">${selectField("dashboardMode", "Visao da Home", [{ value: "both", label: "Leads e Agenda" }, { value: "leads", label: "Somente Leads" }, { value: "agenda", label: "Somente Agenda" }, { value: "none", label: "Desativar ambos" }], company?.dashboardConfig?.mode || "both")}${inputField("instanceName", "Nome da instancia", company?.instance?.name || company?.instanceName || "", "text")}</div></div>
      <div class="panel"><h2>Dados da instancia</h2><div class="form-row">${inputField("instanceId", "ID da instancia", company?.instance?.id || "", "text")}${inputField("instanceUrl", "URL da instancia", company?.instance?.url || "", "url")}</div><div class="form-row">${inputField("instanceToken", "Token", company?.instance?.token || "", "text")}${selectField("instanceIntegration", "Integracao utilizada", ["Evolution API", "Z-API", "WPPConnect", "UltraMsg", "Outra"], company?.instance?.integration || "Evolution API")}</div></div>
      <div class="panel"><h2>Integracoes da empresa</h2><div class="form-row">${optionalInputField("companyChatwootAccountId", "Chatwoot Account ID", companyIntegrations.chatwoot.accountId)}${optionalInputField("companyChatwootInboxId", "Chatwoot Inbox ID", companyIntegrations.chatwoot.inboxId)}</div><div class="form-row">${optionalInputField("companyEvolutionInstanceName", "Evolution - Nome da instancia", companyIntegrations.evolution.instanceName)}${optionalInputField("companyEvolutionNumber", "Evolution - Numero", companyIntegrations.evolution.number)}</div><div class="form-row">${optionalInputField("companyN8nWorkflow", "N8N - Workflow da empresa", companyIntegrations.n8n.workflow)}</div><p class="muted">Esses dados vinculam a empresa ao fluxo WhatsApp > Chatwoot > N8N > Supabase. Tokens e URLs internas permanecem no dashboard administrativo.</p></div>
      <div class="panel"><h2>Modulos liberados</h2><div class="settings-grid">${moduleChecks}</div></div>
      <footer><button class="btn ghost" type="button" data-close-modal>Cancelar</button><button class="btn primary" type="submit">${icon("save")} Salvar</button></footer>
    </form>
  `);
  document.getElementById("company-form").addEventListener("submit", async event => {
    event.preventDefault();
    const submit = event.target.querySelector("button[type=submit]");
    submit.disabled = true;
    const form = event.target;
    const data = Object.fromEntries(new FormData(form).entries());
    const modules = Array.from(form.querySelectorAll("input[name=modules]:checked")).map(input => input.value);
    const payload = company || { id: uid("company"), createdAt: nowIso(), data: emptyCompanyData(), users: [] };
    Object.assign(payload, {
      ...data,
      modules,
      monthly: Number(data.monthly) || 0,
      setup: Number(data.setup) || 0,
      license: { status: data.licenseDue && new Date(data.licenseDue) < new Date() ? "expired" : "active", dueDate: data.licenseDue || null },
      dashboardConfig: { ...(company?.dashboardConfig || defaultDashboardConfig()), mode: data.dashboardMode || "both" },
      instance: {
        name: data.instanceName || "",
        id: data.instanceId || "",
        url: data.instanceUrl || "",
        token: data.instanceToken || "",
        integration: data.instanceIntegration || "Evolution API"
      },
      integrations: {
        chatwoot: {
          accountId: data.companyChatwootAccountId || "",
          inboxId: data.companyChatwootInboxId || "",
          status: data.companyChatwootAccountId && data.companyChatwootInboxId ? "configured" : "not_configured",
          lastSync: companyIntegrations.chatwoot.lastSync,
          lastError: companyIntegrations.chatwoot.lastError || ""
        },
        evolution: {
          instanceName: data.companyEvolutionInstanceName || data.instanceName || "",
          number: data.companyEvolutionNumber || "",
          status: data.companyEvolutionInstanceName || data.companyEvolutionNumber ? "configured" : "not_configured",
          lastSync: companyIntegrations.evolution.lastSync,
          lastError: companyIntegrations.evolution.lastError || ""
        },
        n8n: {
          workflow: data.companyN8nWorkflow || "",
          status: data.companyN8nWorkflow ? "configured" : "not_configured",
          lastSync: companyIntegrations.n8n.lastSync,
          lastError: companyIntegrations.n8n.lastError || ""
        },
        updatedAt: nowIso()
      }
    });
    payload.users = payload.users?.length ? payload.users : [ownerUser(payload)];
    try {
      await upsertCompany(payload);
      notify(payload.id, "Configuracao atualizada", "Modulos, plano ou licenca foram atualizados pela Supreme Tech.", "high");
      audit(payload.id, company ? "company_updated" : "company_created", company ? "Empresa atualizada" : "Empresa criada");
      await saveCompanyPanelData(payload);
      closeModal();
      await refreshCompaniesFromSupabase();
      renderCompanies();
      renderDashboard();
      toast("Empresa sincronizada com Supabase.", "success");
    } catch (error) {
      toast(error.message || "Falha ao salvar empresa no Supabase.", "error");
    } finally {
      submit.disabled = false;
    }
  });
}

window.editCompany = id => openCompanyModal(id);

window.toggleCompany = async id => {
  const company = platform.companies.find(item => item.id === id);
  if (!company) return;
  company.status = company.status === "active" ? "suspended" : "active";
  notify(company.id, company.status === "active" ? "Acesso reativado" : "Acesso suspenso", "O status da empresa foi alterado pela administracao.", "high");
  audit(company.id, "company_status_changed", `Status alterado para ${statusLabel(company.status)}`);
  try {
    await upsertCompany(company);
    await saveCompanyPanelData(company);
    await refreshCompaniesFromSupabase();
    renderCompanies();
    renderDashboard();
  } catch (error) {
    toast(error.message || "Falha ao alterar status no Supabase.", "error");
  }
};

window.cancelCompany = async id => {
  const company = platform.companies.find(item => item.id === id);
  if (!company || !confirm("Cancelar esta empresa? O acesso sera bloqueado.")) return;
  company.status = "cancelled";
  audit(company.id, "company_cancelled", "Empresa cancelada");
  notify(company.id, "Empresa cancelada", "O acesso foi cancelado pela administracao.", "high");
  try {
    await upsertCompany(company);
    await saveCompanyPanelData(company);
    await refreshCompaniesFromSupabase();
    renderCompanies();
    renderDashboard();
  } catch (error) {
    toast(error.message || "Falha ao cancelar no Supabase.", "error");
  }
};

function renderPlans() {
  document.getElementById("plans-grid").innerHTML = platform.plans.length ? platform.plans.map(plan => `
    <article class="data-card">
      <small>${formatCurrency(plan.price || 0)} por mes</small>
      <h2>${escapeHtml(plan.name)}</h2>
      <p class="muted">${escapeHtml(plan.description || "")}</p>
      <p>${(plan.modules || []).map(key => `<span class="status-pill active">${escapeHtml(moduleName(key))}</span>`).join(" ")}</p>
      <div class="actions"><button class="btn ghost" onclick="window.editPlan('${plan.id}')">Editar</button><button class="btn danger" onclick="window.deletePlan('${plan.id}')">Excluir</button></div>
    </article>
  `).join("") : "<div class='panel'>Nenhum plano cadastrado.</div>";
}

function openPlanModal(id) {
  const plan = platform.plans.find(item => item.id === id);
  const moduleChecks = platform.modules.map(module => `<label class="field"><span><input name="modules" type="checkbox" value="${module.key}" ${(plan?.modules || []).includes(module.key) ? "checked" : ""}> ${escapeHtml(module.name)}</span></label>`).join("");
  openModal(plan ? "Editar plano" : "Novo plano", `<form id="plan-form" class="stack">${inputField("name", "Nome do plano", plan?.name)}${inputField("price", "Mensalidade", plan?.price || 0, "number")}<label class="field">Descricao<textarea name="description">${escapeHtml(plan?.description || "")}</textarea></label><div class="settings-grid">${moduleChecks}</div><footer><button class="btn ghost" type="button" data-close-modal>Cancelar</button><button class="btn primary" type="submit">${icon("save")} Salvar</button></footer></form>`);
  document.getElementById("plan-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    const modules = Array.from(event.target.querySelectorAll("input[name=modules]:checked")).map(input => input.value);
    upsert(platform.plans, { id, ...data, price: Number(data.price) || 0, modules });
    audit(null, "plan_saved", "Plano salvo");
    savePlatform();
    closeModal();
    renderPlans();
  });
}

window.editPlan = id => openPlanModal(id);
window.deletePlan = id => {
  if (!confirm("Excluir plano?")) return;
  platform.plans = platform.plans.filter(item => item.id !== id);
  audit(null, "plan_deleted", "Plano excluido");
  savePlatform();
  renderPlans();
};

function renderModules() {
  document.getElementById("modules-grid").innerHTML = platform.modules.map(module => `
    <article class="data-card">
      ${icon(module.icon || "blocks")}
      <h2>${escapeHtml(module.name)}</h2>
      <p class="muted">${escapeHtml(module.description || "Sem descricao.")}</p>
      <span class="status-pill ${module.active ? "active" : "suspended"}">${module.active ? "Ativo" : "Inativo"}</span>
      <div class="actions"><button class="btn ghost" onclick="window.editModule('${module.key}')">Editar</button><button class="btn ghost" onclick="window.toggleModule('${module.key}')">${module.active ? "Desativar" : "Ativar"}</button></div>
    </article>
  `).join("");
}

function openModuleModal(key) {
  const module = platform.modules.find(item => item.key === key);
  openModal(module ? "Editar modulo" : "Novo modulo", `<form id="module-form" class="stack">${inputField("key", "Chave tecnica", module?.key)}${inputField("name", "Nome", module?.name)}${inputField("icon", "Icone Lucide", module?.icon || "blocks")}<label class="field">Descricao<textarea name="description">${escapeHtml(module?.description || "")}</textarea></label>${selectField("commercial", "Comercializavel", [{ value: "true", label: "Sim" }, { value: "false", label: "Nao" }], String(module?.commercial ?? true))}<footer><button class="btn ghost" type="button" data-close-modal>Cancelar</button><button class="btn primary" type="submit">${icon("save")} Salvar</button></footer></form>`);
  document.getElementById("module-form").addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());
    const current = platform.modules.find(item => item.key === key);
    const payload = { ...current, ...data, active: current?.active ?? true, commercial: data.commercial === "true" };
    if (current) Object.assign(current, payload);
    else platform.modules.push(payload);
    audit(null, "module_saved", "Modulo salvo no marketplace");
    savePlatform();
    closeModal();
    renderModules();
  });
}

window.editModule = key => openModuleModal(key);
window.toggleModule = key => {
  const module = platform.modules.find(item => item.key === key);
  if (!module) return;
  module.active = !module.active;
  audit(null, "module_status_changed", `Modulo ${module.name} alterado`);
  savePlatform();
  renderModules();
};

function renderRoles() {
  document.getElementById("roles-grid").innerHTML = Object.entries(platform.roles).map(([role, permissions]) => `
    <article class="data-card">
      <small>RBAC</small>
      <h2>${escapeHtml(ROLE_LABELS[role] || role)}</h2>
      <p class="muted">${Object.keys(permissions).length} modulos configurados</p>
      <button class="btn ghost" onclick="window.editRole('${role}')">Editar permissoes</button>
    </article>
  `).join("");
}

function openRoleModal(role) {
  const permissions = platform.roles[role] || {};
  const rows = Object.keys(MODULES).map(moduleKey => `<article class="panel"><h2>${MODULES[moduleKey].label}</h2>${PERMISSION_ACTIONS.map(action => `<label class="field"><span><input type="checkbox" name="${moduleKey}" value="${action}" ${permissions[moduleKey]?.includes(action) ? "checked" : ""}> ${permissionLabel(action)}</span></label>`).join("")}</article>`).join("");
  openModal(`Permissoes: ${ROLE_LABELS[role] || "Novo perfil"}`, `<form id="role-form" class="stack">${role ? "" : inputField("role", "Chave do perfil")}<div class="settings-grid">${rows}</div><footer><button class="btn ghost" type="button" data-close-modal>Cancelar</button><button class="btn primary" type="submit">${icon("save")} Salvar</button></footer></form>`);
  document.getElementById("role-form").addEventListener("submit", event => {
    event.preventDefault();
    const roleKey = role || new FormData(event.target).get("role");
    platform.roles[roleKey] = {};
    Object.keys(MODULES).forEach(moduleKey => {
      platform.roles[roleKey][moduleKey] = Array.from(event.target.querySelectorAll(`input[name="${moduleKey}"]:checked`)).map(input => input.value);
    });
    audit(null, "role_saved", "Perfil RBAC salvo");
    savePlatform();
    closeModal();
    renderRoles();
  });
}

window.editRole = role => openRoleModal(role);

function renderFinance() {
  const metrics = computeMetrics();
  document.getElementById("finance-grid").innerHTML = [
    metric("MRR", formatCurrency(metrics.mrr), "Mensalidade ativa"),
    metric("ARR", formatCurrency(metrics.arr), "Receita anual recorrente"),
    metric("Setup contratado", formatCurrency(platform.companies.reduce((sum, company) => sum + Number(company.setup || 0), 0)), "Implantacao"),
    metric("Licencas vencidas", metrics.overdue, "Bloqueio ou cobranca")
  ].join("");
  document.getElementById("billing-table").innerHTML = platform.companies.length ? platform.companies.map(company => `
    <tr>
      <td>${escapeHtml(company.name)}</td>
      <td>${formatCurrency(company.monthly || 0)}</td>
      <td>${formatCurrency(company.setup || 0)}</td>
      <td>${company.license?.dueDate || "Sem vencimento"}</td>
      <td><span class="status-pill ${licenseStatus(company)}">${licenseLabel(licenseStatus(company))}</span></td>
      <td class="actions"><button class="btn ghost" onclick="window.renewLicense('${company.id}')">Renovar</button><button class="btn danger" onclick="window.expireLicense('${company.id}')">Vencer</button></td>
    </tr>
  `).join("") : "<tr><td colspan='6'>Nenhuma cobranca cadastrada.</td></tr>";
}

function renderIntegrations() {
  platform.integrations = mergeIntegrations(platform.integrations);
  const { chatwoot, n8n, evolution, supabase } = platform.integrations;
  setInputValue("chatwoot-url", chatwoot.url);
  setInputValue("chatwoot-account-id", chatwoot.accountId);
  setInputValue("chatwoot-inbox-id", chatwoot.inboxId);
  setInputValue("chatwoot-api-token", chatwoot.apiToken);
  setInputValue("n8n-url", n8n.url);
  setInputValue("n8n-main-webhook", n8n.mainWebhook);
  setInputValue("n8n-workflow", n8n.workflow);
  setInputValue("n8n-api-key", n8n.apiKey);
  setInputValue("evolution-instance-name", evolution.instanceName);
  setInputValue("evolution-number", evolution.number);
  setInputValue("evolution-url", evolution.url);
  setInputValue("evolution-token", evolution.token);
  renderIntegrationStatus("chatwoot", chatwoot);
  renderIntegrationStatus("n8n", n8n);
  renderIntegrationStatus("evolution", evolution);
  renderIntegrationStatus("supabase", supabase);
  setText("supabase-project", supabase.project);
  setText("supabase-url", supabase.url);
  setText("supabase-tables", supabase.tables.join(", "));
  setText("supabase-last-sync", supabase.lastSync ? formatDate(supabase.lastSync) : "Nunca");
  renderIntegrationKpis();
  renderCompanyIntegrationsTable();
}

function renderIntegrationKpis() {
  const configuredCompanies = platform.companies.filter(company => companyIntegrationHealth(company).configured).length;
  const critical = ["chatwoot", "n8n", "evolution", "supabase"].filter(key => ["error", "offline"].includes(platform.integrations[key]?.status)).length;
  document.getElementById("integration-kpis").innerHTML = [
    metric("Servicos monitorados", 4, "Chatwoot, N8N, Evolution e Supabase"),
    metric("Empresas configuradas", configuredCompanies, "Com pelo menos uma integracao vinculada"),
    metric("Alertas tecnicos", critical, "Falhas de conexao ou sincronizacao"),
    metric("Fluxo principal", integrationFlowStatus(), "WhatsApp > CRM Supreme")
  ].join("");
}

function renderCompanyIntegrationsTable() {
  document.getElementById("company-integrations-table").innerHTML = platform.companies.length ? platform.companies.map(company => {
    const integrations = defaultCompanyIntegrations(company, company.integrations);
    const rules = company.data?.crmRoutingRules?.length || 0;
    const updatedAt = integrations.updatedAt || company.updatedAt || company.createdAt;
    return `
      <tr>
        <td><strong>${escapeHtml(company.name)}</strong><br><span class="muted">${escapeHtml(company.email)}</span></td>
        <td>${companyIntegrationPill(integrations.chatwoot, integrations.chatwoot.accountId && integrations.chatwoot.inboxId)}</td>
        <td>${companyIntegrationPill(integrations.evolution, integrations.evolution.instanceName && integrations.evolution.number)}</td>
        <td>${companyIntegrationPill(integrations.n8n, integrations.n8n.workflow)}</td>
        <td>${rules ? `${rules} regra(s)` : "Sem regras"}</td>
        <td>${updatedAt ? formatDate(updatedAt) : "Nunca"}</td>
      </tr>
    `;
  }).join("") : "<tr><td colspan='6'>Nenhuma empresa cadastrada para monitoramento.</td></tr>";
}

function companyIntegrationPill(config, hasRequiredFields) {
  const status = config?.status && config.status !== "not_configured" ? config.status : (hasRequiredFields ? "configured" : "not_configured");
  return `<span class="status-pill ${status}">${integrationStatusLabel(status)}</span>`;
}

function companyIntegrationHealth(company) {
  const integrations = defaultCompanyIntegrations(company, company.integrations);
  return {
    configured: Boolean(
      integrations.chatwoot.accountId ||
      integrations.chatwoot.inboxId ||
      integrations.evolution.instanceName ||
      integrations.evolution.number ||
      integrations.n8n.workflow
    )
  };
}

function integrationFlowStatus() {
  const statuses = ["chatwoot", "n8n", "evolution", "supabase"].map(key => platform.integrations[key]?.status);
  if (statuses.every(status => ["connected", "synced"].includes(status))) return "Conectado";
  if (statuses.some(status => ["configured", "connected", "synced"].includes(status))) return "Parcial";
  return "Aguardando";
}

function saveChatwootIntegration(event) {
  event.preventDefault();
  Object.assign(platform.integrations.chatwoot, {
    url: value("chatwoot-url"),
    accountId: value("chatwoot-account-id"),
    inboxId: value("chatwoot-inbox-id"),
    apiToken: value("chatwoot-api-token"),
    status: hasChatwootConfig() ? "configured" : "not_configured",
    lastError: ""
  });
  audit(null, "chatwoot_integration_saved", "Configuracao global do Chatwoot salva");
  savePlatform();
  renderIntegrations();
  toast("Configuracao do Chatwoot salva no Admin.", "success");
}

function saveN8nIntegration(event) {
  event.preventDefault();
  Object.assign(platform.integrations.n8n, {
    url: value("n8n-url"),
    mainWebhook: value("n8n-main-webhook"),
    workflow: value("n8n-workflow"),
    apiKey: value("n8n-api-key"),
    status: hasN8nConfig() ? "configured" : "not_configured",
    lastError: ""
  });
  audit(null, "n8n_integration_saved", "Configuracao global do N8N salva");
  savePlatform();
  renderIntegrations();
  toast("Configuracao do N8N salva no Admin.", "success");
}

function saveEvolutionIntegration(event) {
  event.preventDefault();
  Object.assign(platform.integrations.evolution, {
    instanceName: value("evolution-instance-name"),
    number: value("evolution-number"),
    url: value("evolution-url"),
    token: value("evolution-token"),
    status: hasEvolutionConfig() ? "configured" : "not_configured",
    lastError: ""
  });
  audit(null, "evolution_integration_saved", "Configuracao global da Evolution API salva");
  savePlatform();
  renderIntegrations();
  toast("Configuracao da Evolution API salva no Admin.", "success");
}

async function testChatwootConnection() {
  saveChatwootIntegration(new Event("submit"));
  const cfg = platform.integrations.chatwoot;
  if (!hasChatwootConfig()) return failIntegration("chatwoot", "Informe URL, Account ID e API Token antes de testar.");
  await testIntegration("chatwoot", async () => fetchJson(`${trimSlash(cfg.url)}/api/v1/accounts/${encodeURIComponent(cfg.accountId)}`, {
    headers: { api_access_token: cfg.apiToken }
  }));
}

async function syncChatwoot() {
  saveChatwootIntegration(new Event("submit"));
  const cfg = platform.integrations.chatwoot;
  if (!hasChatwootConfig() || !cfg.inboxId) return failIntegration("chatwoot", "Informe URL, Account ID, Inbox ID e API Token para sincronizar.");
  await testIntegration("chatwoot", async () => fetchJson(`${trimSlash(cfg.url)}/api/v1/accounts/${encodeURIComponent(cfg.accountId)}/inboxes/${encodeURIComponent(cfg.inboxId)}`, {
    headers: { api_access_token: cfg.apiToken }
  }), "synced");
}

async function testN8nWorkflow() {
  saveN8nIntegration(new Event("submit"));
  const cfg = platform.integrations.n8n;
  if (!cfg.url || !cfg.workflow || !cfg.apiKey) {
    if (cfg.mainWebhook) return testN8nWebhook();
    return failIntegration("n8n", "Informe URL, Workflow e API Key ou um Webhook principal.");
  }
  await testIntegration("n8n", async () => fetchJson(`${trimSlash(cfg.url)}/api/v1/workflows/${encodeURIComponent(cfg.workflow)}`, {
    headers: { "X-N8N-API-KEY": cfg.apiKey }
  }));
}

async function testN8nWebhook() {
  saveN8nIntegration(new Event("submit"));
  const cfg = platform.integrations.n8n;
  if (!cfg.mainWebhook) return failIntegration("n8n", "Informe o Webhook principal do N8N.");
  await testIntegration("n8n", async () => fetchJson(cfg.mainWebhook, {
    method: "POST",
    headers: { ...(cfg.apiKey ? { "X-N8N-API-KEY": cfg.apiKey } : {}) },
    body: JSON.stringify({ source: "supreme-admin-test", timestamp: nowIso() })
  }), "synced");
}

async function testEvolution() {
  saveEvolutionIntegration(new Event("submit"));
  const cfg = platform.integrations.evolution;
  if (!hasEvolutionConfig()) return failIntegration("evolution", "Informe URL da API, nome da instancia e token.");
  await testIntegration("evolution", async () => fetchJson(`${trimSlash(cfg.url)}/instance/connectionState/${encodeURIComponent(cfg.instanceName)}`, {
    headers: { apikey: cfg.token }
  }));
}

async function syncEvolution() {
  saveEvolutionIntegration(new Event("submit"));
  const cfg = platform.integrations.evolution;
  if (!cfg.url || !cfg.token) return failIntegration("evolution", "Informe URL da API e token para sincronizar.");
  await testIntegration("evolution", async () => fetchJson(`${trimSlash(cfg.url)}/instance/fetchInstances`, {
    headers: { apikey: cfg.token }
  }), "synced");
}

async function testSupabaseConnection() {
  await testIntegration("supabase", async () => Promise.all([
    supabaseRequest("/rest/v1/clientes?select=id&limit=1"),
    supabaseRequest("/rest/v1/configuracoes_robo?select=cliente_id&limit=1")
  ]));
}

async function testIntegration(key, runner, successStatus = "connected") {
  setIntegrationStatus(key, "checking", "");
  try {
    await runner();
    setIntegrationStatus(key, successStatus, "");
    audit(null, `${key}_integration_tested`, `Integracao ${key} validada com sucesso`);
    toast(`Conexao ${key} validada.`, "success");
  } catch (error) {
    failIntegration(key, readableIntegrationError(error));
  }
}

function failIntegration(key, message) {
  setIntegrationStatus(key, "error", message);
  audit(null, `${key}_integration_failed`, message);
  toast(message, "error");
}

function setIntegrationStatus(key, status, error = "") {
  platform.integrations = mergeIntegrations(platform.integrations);
  platform.integrations[key].status = status;
  platform.integrations[key].lastSync = nowIso();
  platform.integrations[key].lastError = error;
  savePlatform();
  renderIntegrations();
}

window.renewLicense = id => updateLicense(id, "active");
window.expireLicense = id => updateLicense(id, "expired");

async function updateLicense(id, status) {
  const company = platform.companies.find(item => item.id === id);
  if (!company) return;
  company.license ||= {};
  company.license.status = status;
  if (status === "active") company.license.dueDate = addMonths(new Date(), 1).toISOString().slice(0, 10);
  notify(company.id, status === "active" ? "Licenca renovada" : "Licenca vencida", status === "active" ? "Acesso reativado automaticamente." : "Acesso sujeito a bloqueio.", "high");
  audit(company.id, "license_status_changed", `Licenca alterada para ${licenseLabel(status)}`);
  try {
    await upsertCompany(company);
    await saveCompanyPanelData(company);
    renderFinance();
    renderDashboard();
  } catch (error) {
    toast(error.message || "Falha ao atualizar licenca no Supabase.", "error");
  }
}

function renderAudit() {
  document.getElementById("audit-log").innerHTML = platform.audit.length
    ? platform.audit.slice(0, 200).map(item => `<div class="timeline-item">${escapeHtml(item.description)}<small>${escapeHtml(item.action)} - ${formatDate(item.createdAt)}</small></div>`).join("")
    : "Nenhum log registrado.";
}

function renderSecurity() {
  document.getElementById("session-timeout").value = platform.security?.sessionTimeoutMinutes || 240;
  document.getElementById("rate-limit").value = platform.security?.rateLimitPerMinute || 60;
}

function saveSecurity(event) {
  event.preventDefault();
  platform.security = {
    sessionTimeoutMinutes: Number(value("session-timeout")) || 240,
    rateLimitPerMinute: Number(value("rate-limit")) || 60
  };
  audit(null, "security_policy_saved", "Politicas de seguranca salvas");
  savePlatform();
  toast("Politicas salvas.", "success");
}

function defaultMarketplace() {
  return Object.entries(MODULES).map(([key, cfg]) => ({
    key,
    name: cfg.label,
    icon: cfg.icon,
    description: "",
    active: true,
    commercial: key !== "settings"
  }));
}

function defaultRoles() {
  return {
    proprietario: allPermissions(),
    administrador: allPermissions(),
    gerente: permissions(["view", "create", "edit", "export"]),
    supervisor: permissions(["view", "edit", "export"]),
    atendente: modulePermissions(["dashboard", "inbox", "agenda", "crm"], ["view", "create", "edit"]),
    financeiro: modulePermissions(["dashboard", "management"], ["view", "create", "edit", "export"]),
    comercial: modulePermissions(["dashboard", "crm", "inbox"], ["view", "create", "edit", "export"]),
    suporte: modulePermissions(["dashboard", "inbox", "agenda"], ["view", "create", "edit"])
  };
}

function defaultDashboardConfig() {
  return {
    mode: "both",
    visibleKinds: { kpi: true, chart: true, table: true, ranking: true, calendar: true },
    order: ["appointments_overview", "leads_overview", "conversations_overview", "tasks_overview", "goals_overview", "revenue_overview"],
    hiddenWidgets: []
  };
}

function defaultIntegrations() {
  return {
    chatwoot: { url: "", accountId: "", inboxId: "", apiToken: "", status: "not_configured", lastSync: null, lastError: "" },
    n8n: { url: "", mainWebhook: "", workflow: "", apiKey: "", status: "not_configured", lastSync: null, lastError: "" },
    evolution: { instanceName: "", number: "", url: "", token: "", status: "not_configured", lastSync: null, lastError: "" },
    supabase: {
      project: "SupremeDev021's Project",
      url: SUPABASE_URL,
      tables: ["clientes", "configuracoes_robo", "demo_clinica"],
      status: "connected",
      lastSync: null,
      lastError: ""
    }
  };
}

function mergeIntegrations(current = {}) {
  const base = defaultIntegrations();
  return {
    chatwoot: { ...base.chatwoot, ...(current.chatwoot || {}) },
    n8n: { ...base.n8n, ...(current.n8n || {}) },
    evolution: { ...base.evolution, ...(current.evolution || {}) },
    supabase: { ...base.supabase, ...(current.supabase || {}), url: SUPABASE_URL }
  };
}

function defaultCompanyIntegrations(company = {}, current = {}) {
  const base = {
    chatwoot: { accountId: "", inboxId: "", status: "not_configured", lastSync: null, lastError: "" },
    evolution: { instanceName: company.instance?.name || company.instanceName || "", number: "", status: "not_configured", lastSync: null, lastError: "" },
    n8n: { workflow: "", status: "not_configured", lastSync: null, lastError: "" },
    updatedAt: null
  };
  return {
    chatwoot: { ...base.chatwoot, ...(current.chatwoot || {}) },
    evolution: { ...base.evolution, ...(current.evolution || {}) },
    n8n: { ...base.n8n, ...(current.n8n || {}) },
    updatedAt: current.updatedAt || null
  };
}

function emptyCompanyData() {
  return {
    conversations: [],
    leads: [],
    pipelines: [],
    appointments: [],
    tasks: [],
    crmRoutingRules: [],
    management: { categories: [], indicators: [], reports: [], goals: [], processes: [] },
    automations: [],
    dashboardWidgets: []
  };
}

function ownerUser(company) {
  return {
    id: `${company.id}-owner`,
    name: company.responsible || company.name,
    email: company.email,
    password: company.password,
    role: "proprietario",
    permissions: platform.roles.proprietario
  };
}

async function refreshCompaniesFromSupabase() {
  const [clients, configs] = await Promise.all([
    supabaseRequest("/rest/v1/clientes?select=*&order=id.desc"),
    supabaseRequest("/rest/v1/configuracoes_robo?select=*")
  ]);
  const configByClient = new Map((configs || []).map(item => [String(item.cliente_id), item.dados_painel || {}]));
  platform.companies = (clients || []).map(row => companyFromSupabase(row, configByClient.get(String(row.id))));
  platform.audit = platform.companies.flatMap(company => configByClient.get(company.id)?.audit || []);
  platform.notifications = platform.companies.flatMap(company => configByClient.get(company.id)?.notifications || []);
  savePlatform();
}

async function upsertCompany(company) {
  const existingId = /^\d+$/.test(String(company.id || "")) ? company.id : null;
  const row = companyToSupabase(company);
  const savedRows = existingId
    ? await supabaseRequest(`/rest/v1/clientes?id=eq.${encodeURIComponent(existingId)}&select=*`, { method: "PATCH", body: row, prefer: "return=representation" })
    : await supabaseRequest("/rest/v1/clientes?select=*", { method: "POST", body: row, prefer: "return=representation" });
  const saved = Array.isArray(savedRows) ? savedRows[0] : savedRows;
  if (!saved?.id) throw new Error("Supabase nao retornou a empresa salva.");
  company.id = String(saved.id);
  const index = platform.companies.findIndex(item => item.id === company.id);
  if (index >= 0) platform.companies[index] = company;
  else platform.companies.unshift(company);
  return company;
}

async function saveCompanyPanelData(company) {
  if (!/^\d+$/.test(String(company.id))) return;
  await supabaseRequest("/rest/v1/configuracoes_robo?on_conflict=cliente_id", {
    method: "POST",
    prefer: "resolution=merge-duplicates,return=minimal",
    body: {
      cliente_id: Number(company.id),
      bot_desativado: company.status === "active" ? "NAO" : "SIM",
      dados_painel: panelDataFromCompany(company),
      atualizado_em: nowIso()
    }
  });
}

function companyFromSupabase(row, panel = {}) {
  const modules = normalizeModules(panel.modules || row.segmento);
  const status = fromSupabaseStatus(row.status);
  const planId = panel.planId || row.plano || "";
  const company = {
    id: String(row.id),
    name: row.nome_empresa || "Empresa sem nome",
    email: row.email || "",
    password: row.senha || "",
    responsible: panel.responsible || "",
    document: panel.document || "",
    planId,
    monthly: Number(row.valor_mensalidade || 0),
    setup: Number(row.valor_implantacao || 0),
    status,
    modules,
    license: panel.license || { status: status === "active" ? "active" : "suspended", dueDate: null },
    data: panel.data || emptyCompanyData(),
    users: panel.users || [],
    rbac: panel.rbac || platform.roles,
    brand: panel.brand || {},
    dashboardConfig: panel.dashboardConfig || defaultDashboardConfig(),
    createdAt: row.criado_em || panel.createdAt || nowIso(),
    instanceName: row.nome_instancia || panel.instance?.name || panel.instanceName || "",
    instance: panel.instance || { name: row.nome_instancia || "", id: "", url: "", token: "", integration: "Evolution API" },
    integrations: defaultCompanyIntegrations({ instance: panel.instance, instanceName: row.nome_instancia || panel.instanceName || "" }, panel.integrations)
  };
  company.users = company.users.length ? company.users : [ownerUser(company)];
  return company;
}

function companyToSupabase(company) {
  return {
    nome_empresa: company.name,
    email: company.email,
    senha: company.password,
    segmento: (company.modules || []).join(","),
    plano: company.planId || "",
    status: toSupabaseStatus(company.status),
    valor_mensalidade: Number(company.monthly || 0),
    valor_implantacao: Number(company.setup || 0),
    nome_instancia: company.instance?.name || company.instanceName || company.name
  };
}

function panelDataFromCompany(company) {
  return {
    responsible: company.responsible || "",
    document: company.document || "",
    planId: company.planId || "",
    modules: company.modules || [],
    license: company.license || { status: "active", dueDate: null },
    users: company.users || [ownerUser(company)],
    rbac: company.rbac || platform.roles,
    data: company.data || emptyCompanyData(),
    brand: company.brand || {},
    dashboardConfig: company.dashboardConfig || defaultDashboardConfig(),
    instance: company.instance || { name: company.instanceName || "", id: "", url: "", token: "", integration: "Evolution API" },
    integrations: defaultCompanyIntegrations(company, company.integrations),
    audit: platform.audit.filter(item => item.companyId === company.id),
    notifications: platform.notifications.filter(item => item.companyId === company.id),
    updatedAt: nowIso()
  };
}

function normalizeModules(raw) {
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === "string") return raw.split(/[,\s;|]+/).map(item => item.trim()).filter(Boolean);
  return ["dashboard", "settings"];
}

function toSupabaseStatus(status) {
  return ({ active: "ativo", suspended: "suspenso", cancelled: "cancelado" })[status] || status || "ativo";
}

function fromSupabaseStatus(status) {
  return ({ ativo: "active", suspenso: "suspended", cancelado: "cancelled", active: "active", suspended: "suspended", cancelled: "cancelled" })[status] || "active";
}

async function supabaseRequest(path, options = {}) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method: options.method || "GET",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      ...(options.prefer ? { Prefer: options.prefer } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Erro Supabase ${response.status}`);
  }
  if (response.status === 204) return null;
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

function allPermissions() {
  return Object.keys(MODULES).reduce((acc, key) => ({ ...acc, [key]: PERMISSION_ACTIONS.slice() }), {});
}

function permissions(actions) {
  return Object.keys(MODULES).reduce((acc, key) => ({ ...acc, [key]: actions.slice() }), {});
}

function modulePermissions(modules, actions) {
  return modules.reduce((acc, key) => ({ ...acc, [key]: actions.slice() }), {});
}

function audit(companyId, action, description) {
  platform.audit.unshift({ id: uid("audit"), companyId, action, description, createdAt: nowIso() });
  savePlatform();
}

function notify(companyId, title, body, priority = "normal") {
  platform.notifications.unshift({ id: uid("notification"), companyId, title, body, priority, read: false, createdAt: nowIso() });
  savePlatform();
}

function openModal(title, body) {
  const root = document.getElementById("modal-root");
  root.hidden = false;
  root.innerHTML = `<section class="modal"><header><div><p class="eyebrow">Supreme Tech</p><h2>${escapeHtml(title)}</h2></div><button class="icon-button" type="button" data-close-modal>${icon("settings")}</button></header>${body}</section>`;
  root.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeModal));
  renderIcons();
}

function closeModal() {
  const root = document.getElementById("modal-root");
  root.hidden = true;
  root.innerHTML = "";
}

function inputField(name, label, currentValue = "", type = "text") {
  return `<label class="field">${label}<input name="${name}" type="${type}" value="${escapeAttr(currentValue ?? "")}" ${type !== "password" ? "required" : ""}></label>`;
}

function optionalInputField(name, label, currentValue = "", type = "text") {
  return `<label class="field">${label}<input name="${name}" type="${type}" value="${escapeAttr(currentValue ?? "")}"></label>`;
}

function selectField(name, label, options, selected = "") {
  const normalized = options.map(item => typeof item === "string" ? { value: item, label: item } : item);
  return `<label class="field">${label}<select name="${name}">${normalized.map(item => `<option value="${escapeAttr(item.value)}" ${String(item.value) === String(selected) ? "selected" : ""}>${escapeHtml(item.label)}</option>`).join("")}</select></label>`;
}

function upsert(list, item) {
  if (item.id) {
    const index = list.findIndex(entry => entry.id === item.id);
    if (index >= 0) {
      list[index] = { ...list[index], ...item };
      return list[index];
    }
  }
  const created = { ...item, id: uid("item"), createdAt: nowIso() };
  list.unshift(created);
  return created;
}

async function hash(valueToHash) {
  const data = new TextEncoder().encode(valueToHash);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function on(id, event, handler) {
  document.getElementById(id)?.addEventListener(event, handler);
}

function setInputValue(id, currentValue = "") {
  const el = document.getElementById(id);
  if (el) el.value = currentValue || "";
}

function value(id) {
  return document.getElementById(id)?.value.trim() || "";
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function renderIntegrationStatus(key, config) {
  const statusEl = document.getElementById(`${key}-status`);
  const syncEl = document.getElementById(`${key}-last-sync`);
  const errorEl = document.getElementById(`${key}-error`);
  if (statusEl) {
    statusEl.className = `status-pill ${config.status || "not_configured"}`;
    statusEl.textContent = integrationStatusLabel(config.status);
  }
  if (syncEl) syncEl.textContent = config.lastSync ? formatDate(config.lastSync) : "Nunca";
  if (errorEl) errorEl.textContent = config.lastError || "";
}

function integrationStatusLabel(status) {
  return ({
    connected: "Conectado",
    synced: "Sincronizado",
    configured: "Configurado",
    checking: "Verificando",
    error: "Erro",
    offline: "Offline",
    not_configured: "Nao configurado"
  })[status] || "Nao configurado";
}

function hasChatwootConfig() {
  const cfg = platform.integrations.chatwoot;
  return Boolean(cfg.url && cfg.accountId && cfg.apiToken);
}

function hasN8nConfig() {
  const cfg = platform.integrations.n8n;
  return Boolean(cfg.mainWebhook || (cfg.url && cfg.workflow));
}

function hasEvolutionConfig() {
  const cfg = platform.integrations.evolution;
  return Boolean(cfg.url && cfg.instanceName && cfg.token);
}

function trimSlash(raw) {
  return String(raw || "").replace(/\/+$/, "");
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    body: options.body
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `HTTP ${response.status}`);
  }
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function readableIntegrationError(error) {
  const message = error?.message || "Falha ao validar integracao.";
  if (message.includes("Failed to fetch")) return "Falha de conexao. Verifique URL, NGINX, HTTPS e CORS do servico.";
  return message.slice(0, 220);
}

function nowIso() {
  return new Date().toISOString();
}

function uid(prefix) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function formatDate(raw) {
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short" }).format(new Date(raw));
}

function formatCurrency(raw) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(raw) || 0);
}

function escapeHtml(raw) {
  return String(raw ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(raw) {
  return escapeHtml(raw).replaceAll("`", "&#096;");
}

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.settings}</svg>`;
}

function renderIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach(el => {
    el.innerHTML = icon(el.dataset.icon);
    el.removeAttribute("data-icon");
  });
}

function toast(message, type = "info") {
  const root = document.getElementById("toast-root");
  const item = document.createElement("div");
  item.className = `toast ${type}`;
  item.textContent = message;
  root.appendChild(item);
  setTimeout(() => item.remove(), 3600);
}

function planName(id) {
  return platform.plans.find(plan => plan.id === id)?.name || "Sem plano";
}

function moduleName(key) {
  return platform.modules.find(module => module.key === key)?.name || MODULES[key]?.label || key;
}

function statusLabel(status) {
  return ({ active: "Ativa", suspended: "Suspensa", cancelled: "Cancelada" })[status] || status;
}

function licenseStatus(company) {
  if (company.license?.status === "expired") return "expired";
  if (company.license?.dueDate && new Date(company.license.dueDate) < new Date()) return "expired";
  return company.license?.status || "active";
}

function licenseLabel(status) {
  return ({ active: "Ativa", expired: "Vencida", suspended: "Suspensa" })[status] || status;
}

function permissionLabel(action) {
  return ({
    view: "Visualizar",
    create: "Criar",
    edit: "Editar",
    delete: "Excluir",
    export: "Exportar",
    manage_users: "Gerenciar usuarios",
    configure_integrations: "Configurar integracoes"
  })[action] || action;
}

function addMonths(date, months) {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}

function registerServiceWorker() {
  if (!["http:", "https:"].includes(location.protocol)) return;
  const manifest = document.createElement("link");
  manifest.rel = "manifest";
  manifest.href = "manifest.webmanifest";
  document.head.appendChild(manifest);
  if ("serviceWorker" in navigator) navigator.serviceWorker.register("sw.js").catch(() => {});
}
