/* ALEE.ST — conteúdo editável. Consulte README.md antes de publicar. */
const profile = {
  name: "Alessandro",
  brand: "ALEE.ST",
  // Preencha apenas com canais reais. Campos vazios não são exibidos.
  email: "alesomensit@gmail.com",
  github: "",
  linkedin: "",
  whatsapp: "54 99920-4663"
};

// Para adicionar um projeto, copie um objeto desta lista.
// demoUrl, downloadUrl, videoUrl e repoUrl só mostram botões quando têm URLs reais.
// screenshots aceita caminhos reais de imagens, por exemplo: "assets/meu-projeto.png".
const projects = [
  {
    slug: "erp-estudos",
    title: "Sistema ERP — Projeto de aprendizado",
    category: "Sistema de gestão · Em desenvolvimento",
    platform: "desktop",
    status: "Tabelas do banco em andamento",
    draft: false,
    featured: true,
    icon: "ERP",
    startedAt: "28/09/2026",
    learningProject: true,
    currentPhase: "Estruturação das tabelas do banco de dados",
    // Atualize manualmente de 0 a 100 conforme o trabalho realmente implementado.
    progressPercent: 10,
    summary: "Projeto educacional em desenvolvimento para praticar conceitos de sistemas ERP, modelagem de dados e integração entre aplicação e banco de dados.",
    description: "Este sistema ERP está sendo desenvolvido para fins de aprendizado. O objetivo é estudar, na prática, como estruturar um sistema de gestão e organizar seus dados. O projeto está em andamento e suas funcionalidades serão documentadas conforme forem implementadas.",
    problem: "O foco atual é construir a base de dados do sistema. Neste momento, a estruturação das tabelas está em andamento; módulos e funcionalidades ainda não devem ser considerados concluídos.",
    features: [],
    tech: ["Python", "MySQL", "SQL"],
    demoUrl: "",
    downloadUrl: "",
    videoUrl: "",
    repoUrl: "",
    screenshots: [],
    installation: [],
    roadmap: [
      { title: "Estruturação das tabelas do banco de dados", status: "Em andamento", state: "current" },
      { title: "Relacionamentos e integridade dos dados", status: "Próxima etapa", state: "planned" },
      { title: "Implementação das operações e regras de negócio", status: "Planejado", state: "planned" },
      { title: "Desenvolvimento dos módulos do ERP", status: "Planejado", state: "planned" },
      { title: "Testes, ajustes e demonstração", status: "Planejado", state: "planned" }
    ]
  }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const safeUrl = value => {
  if (!value || typeof value !== "string") return "";
  const v = value.trim();
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(v) && !v.startsWith("//") && !v.split("/").includes("..")) return v;
  try { const u = new URL(v); return ["https:", "http:"].includes(u.protocol) ? v : ""; }
  catch { return ""; }
};
const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const platformLabel = p => ({desktop:"Desktop",web:"Web",study:"Estudo"}[p] || "Projeto");
const projectIcon = p => p.icon || (p.platform === "web" ? "</>" : p.platform === "desktop" ? "Py" : "{ }");
const visual = (p, i) => `<div class="project-visual"><span class="visual-index">ALEE.ST / ${String(i+1).padStart(2,"0")}</span><span class="visual-status">${escapeHtml(p.status || "Em desenvolvimento")}</span><div class="visual-icon"><span>${escapeHtml(projectIcon(p))}</span></div></div>`;
const chips = p => (p.tech || []).slice(0,4).map(t=>`<span class="chip">${escapeHtml(t)}</span>`).join("");
function projectCard(p, i) {
  return `<article class="project-card">
    ${visual(p,i)}
    <div class="project-body">
      <div class="project-meta"><span class="project-category">${escapeHtml(p.category || platformLabel(p.platform))}</span><span class="project-status">${p.draft ? "RASCUNHO" : escapeHtml(p.status || "PROJETO")}</span></div>
      <h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.summary)}</p>
      <div class="chip-row">${chips(p) || '<span class="chip">Tecnologias a definir</span>'}</div>
      <a class="project-card-link" href="#/projetos/${encodeURIComponent(p.slug)}"><span>Conhecer projeto</span><span aria-hidden="true">↗</span></a>
    </div>
  </article>`;
}
function actionButton(label, url, kind) {
  const valid = safeUrl(url);
  if (!valid) return "";
  const attrs = `href="${escapeHtml(valid)}"`;
  const external = /^https?:/i.test(valid) ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `<a class="button ${kind === "primary" ? "button-primary" : "button-ghost"}" ${attrs}${external}>${label}</a>`;
}
function videoEmbed(value) {
  const safe = safeUrl(value);
  if (!safe || !/^https:/i.test(safe)) return "";
  try {
    const u = new URL(safe);
    let id = "";
    if (u.hostname.replace(/^www\./,"") === "youtu.be") id = u.pathname.slice(1);
    if (["youtube.com","m.youtube.com","youtube-nocookie.com"].includes(u.hostname.replace(/^www\./,""))) {
      id = u.pathname.startsWith("/embed/") ? u.pathname.split("/")[2] : u.searchParams.get("v") || "";
    }
    return /^[a-zA-Z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : "";
  } catch { return ""; }
}
function renderHome() {
  const featured = projects.filter(p => p.featured).slice(0,3);
  $("#featured-grid").innerHTML = featured.length ? featured.map(p=>projectCard(p,projects.indexOf(p))).join("") : `<p class="section-note">Os projetos em destaque aparecerão aqui quando forem adicionados.</p>`;
}
function renderProjects() {
  const q = ($("#project-search")?.value || "").trim().toLocaleLowerCase("pt-BR");
  const platform = $("#platform-filter")?.value || "all";
  const filtered = projects.filter(p => (platform === "all" || p.platform === platform) && `${p.title} ${p.summary} ${(p.tech||[]).join(" ")}`.toLocaleLowerCase("pt-BR").includes(q));
  $("#all-projects-grid").innerHTML = filtered.map(p=>projectCard(p,projects.indexOf(p))).join("");
  $("#project-count").textContent = `${filtered.length} ${filtered.length === 1 ? "projeto" : "projetos"}`;
  $("#projects-empty").hidden = filtered.length > 0;
  $("#all-projects-grid").hidden = filtered.length === 0;
}
function renderContact() {
  const items = [
    ["E-mail", profile.email ? `mailto:${profile.email}` : ""],
    ["GitHub", profile.github],
    ["LinkedIn", profile.linkedin],
    ["WhatsApp", profile.whatsapp]
  ].map(([label,url]) => {
    const valid = label === "E-mail" ? (url && /^mailto:[^\s@]+@[^\s@]+\.[^\s@]+$/.test(url) ? url : "") : safeUrl(url);
    if (!valid) return "";
    const external = valid.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : "";
    return `<a href="${escapeHtml(valid)}"${external}>${escapeHtml(label)} ↗</a>`;
  }).join("");
  $("#contact-links").innerHTML = items || `<p class="contact-empty">Os links de contato ainda não foram configurados.</p>`;
}
function renderDetail(slug) {
  const p = projects.find(item => item.slug === slug);
  const root = $("#detail-page");
  if (!p) { showPage("notfound"); return false; }
  const actions = [
    actionButton("Abrir demonstração ↗",p.demoUrl,"primary"),
    actionButton("Baixar versão demo ↓",p.downloadUrl,"ghost"),
    actionButton("Assistir tutorial ▶",p.videoUrl,"ghost"),
    actionButton("Ver repositório ↗",p.repoUrl,"ghost")
  ].filter(Boolean).join("");
  const embed = videoEmbed(p.videoUrl);
  const shots = (p.screenshots || []).filter(s => s && safeUrl(s.src)).map(s=>`<img src="${escapeHtml(safeUrl(s.src))}" alt="${escapeHtml(s.alt || p.title)}" loading="lazy">`).join("");
  const features = (p.features || []).map(f=>`<li>${escapeHtml(f)}</li>`).join("");
  const tech = (p.tech || []).map(t=>`<span class="chip">${escapeHtml(t)}</span>`).join("");
  const installation = (p.installation || []).map((s,i)=>`<li>${escapeHtml(s)}</li>`).join("");
  const progress = Math.max(0, Math.min(100, Number(p.progressPercent) || 0));
  const roadmap = (p.roadmap || []).map(step => `<li class="roadmap-item roadmap-${escapeHtml(step.state || "planned")}"><span class="roadmap-marker" aria-hidden="true"></span><div class="roadmap-copy"><strong>${escapeHtml(step.title)}</strong><span>${escapeHtml(step.status)}</span></div></li>`).join("");
  root.innerHTML = `
    <a class="detail-back" href="#/projetos">← Voltar para projetos</a>
    <header class="detail-header">
      <div class="detail-title-row"><span class="project-category">${escapeHtml(platformLabel(p.platform))}</span><span class="project-status">${escapeHtml(p.status || "Em desenvolvimento")}</span>${p.learningProject ? '<span class="draft-pill">PROJETO EDUCACIONAL</span>' : p.draft ? '<span class="draft-pill">RASCUNHO</span>' : ""}</div>
      <h1>${escapeHtml(p.title)}</h1><p class="detail-lede">${escapeHtml(p.description || p.summary)}</p>
      ${p.startedAt ? `<div class="project-facts"><span><small>INÍCIO DO PROJETO</small><strong>${escapeHtml(p.startedAt)}</strong></span><span><small>FASE ATUAL</small><strong>${escapeHtml(p.currentPhase || p.status)}</strong></span></div>` : ""}
      ${p.learningProject ? '<p class="learning-notice"><strong>Finalidade educacional:</strong> projeto criado para aprendizado e prática. O status exibido reflete o estágio atual, e as etapas futuras ainda não estão concluídas.</p>' : ""}
      <div class="detail-actions">${actions || '<p class="detail-lede">Nenhuma demonstração, versão para download ou vídeo foi publicado para este projeto ainda.</p>'}</div>
      ${safeUrl(p.demoUrl) ? '<p class="detail-lede" style="font-size:10px;margin:12px 0 0">A demonstração pode abrir em uma nova página.</p>' : ""}
    </header>
    <div class="detail-visual">${visual(p,projects.indexOf(p)).replace('project-visual','project-visual')}</div>
    <div class="detail-layout">
      <div class="detail-main">
        <section><h2>O que é este projeto?</h2><p>${escapeHtml(p.problem || "A descrição do problema será adicionada quando o escopo estiver definido.")}</p></section>
        ${p.roadmap ? `<section class="roadmap-section"><h2>Etapas e progresso</h2><div class="progress-summary"><div class="progress-label"><span>Progresso geral estimado</span><strong>${progress}%</strong></div><div class="progress-track" role="progressbar" aria-label="Progresso geral do projeto" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}"><span style="width:${progress}%"></span></div><p class="progress-note">Estimativa manual do que já foi desenvolvido; atualizada conforme o projeto evolui.</p></div><p class="roadmap-intro">Atualize o status de cada etapa no arquivo <code>app.js</code> conforme concluir o trabalho.</p><ol class="roadmap-list">${roadmap}</ol></section>` : ""}
        <section><h2>Funcionalidades</h2>${features ? `<ul>${features}</ul>` : '<p>As funcionalidades serão documentadas quando estiverem definidas e implementadas.</p>'}</section>
        <section><h2>Capturas de tela</h2>${shots ? `<div class="detail-gallery">${shots}</div>` : '<div class="gallery-placeholder">As capturas de tela serão adicionadas quando houver imagens reais do projeto.</div>'}</section>
        <section><h2>Tutorial em vídeo</h2>${embed ? `<iframe class="video-frame" src="${escapeHtml(embed)}" title="Tutorial de ${escapeHtml(p.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>` : (safeUrl(p.videoUrl) ? actionButton("Assistir tutorial em outra página ↗",p.videoUrl,"ghost") : '<div class="video-placeholder"><div class="play-icon">▷</div><strong>Vídeo ainda não publicado</strong><p>O tutorial aparecerá aqui quando o link real for cadastrado.</p></div>')}</section>
        ${safeUrl(p.downloadUrl) ? `<section><h2>Instalação e uso</h2><div class="detail-download-note">Esta é uma versão demonstrativa. Confira as instruções e a compatibilidade antes de executar.</div>${installation ? `<ul>${installation}</ul>` : '<p>As instruções de instalação ainda não foram adicionadas.</p>'}</section>` : ""}
      </div>
      <aside class="detail-sidebar">
        <section><h2>Tecnologias</h2><div class="chip-row">${tech || '<p>A definir.</p>'}</div></section>
        <section><h2>Plataforma</h2><p>${escapeHtml(platformLabel(p.platform))}</p></section>
        <section><h2>Status</h2><p>${escapeHtml(p.status || "Em desenvolvimento")}</p></section>
        <section><h2>Transparência</h2><p>${p.learningProject ? "Projeto em desenvolvimento para fins de aprendizado. As funcionalidades serão listadas quando implementadas e verificadas." : p.draft ? "Este conteúdo é um rascunho editável. Confirme as informações antes de apresentar como projeto concluído." : "As informações e os materiais devem refletir o estado real do projeto."}</p></section>
      </aside>
    </div>
    ${projects.some(item=>item.slug!==p.slug) ? `<div class="content-divider"></div><div class="section-heading"><div><p class="eyebrow">CONTINUE EXPLORANDO</p><h2>Outros <span class="accent-text">projetos.</span></h2></div><a class="text-link" href="#/projetos">Ver todos ↗</a></div><div class="project-grid">${projects.filter(item=>item.slug!==p.slug).slice(0,3).map(item=>projectCard(item,projects.indexOf(item))).join("")}</div>` : ""}`;
  return true;
}
function showPage(name) {
  $$(".page-section").forEach(el => { el.hidden = el.dataset.page !== name; });
  $$("#main-nav a").forEach(a => a.classList.toggle("active", a.dataset.nav === name));
  if (name === "detail") $$("#main-nav a").forEach(a=>a.classList.toggle("active",a.dataset.nav==="projects"));
  window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}
function route() {
  const path = decodeURIComponent(location.hash.replace(/^#\/?/,""));
  if (!path || path === "") showPage("home");
  else if (path === "sobre") showPage("about");
  else if (path === "projetos") { showPage("projects"); renderProjects(); }
  else if (path === "contato") showPage("contact");
  else if (path.startsWith("projetos/")) { const ok = renderDetail(path.slice("projetos/".length)); if (ok) showPage("detail"); }
  else showPage("notfound");
  $("#main").focus({preventScroll:true});
  $("#main-nav").classList.remove("open");
  $("#menu-toggle").setAttribute("aria-expanded","false");
  $("#menu-toggle").textContent = "☰";
  $("#menu-toggle").setAttribute("aria-label","Abrir menu");
}

// Tema claro/escuro: salva a escolha neste navegador.
const themeToggle = $("#theme-toggle");
const themeIcon = $(".theme-icon", themeToggle);
const themeLabel = $(".theme-label", themeToggle);
const themeMeta = $("#theme-color-meta");
function applyTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeToggle.setAttribute("aria-label", dark ? "Ativar modo claro" : "Ativar modo escuro");
  themeToggle.setAttribute("title", dark ? "Ativar modo claro" : "Ativar modo escuro");
  themeIcon.textContent = dark ? "☀" : "☾";
  themeLabel.textContent = dark ? "Modo claro" : "Modo escuro";
  if (themeMeta) themeMeta.setAttribute("content", dark ? "#10131a" : "#f7f7f4");
}
let savedTheme = "light";
try { savedTheme = localStorage.getItem("alee-theme") === "dark" ? "dark" : "light"; } catch (_) {}
applyTheme(savedTheme);
themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try { localStorage.setItem("alee-theme", nextTheme); } catch (_) {}
});

$("#menu-toggle").addEventListener("click", () => {
  const open = $("#main-nav").classList.toggle("open");
  $("#menu-toggle").setAttribute("aria-expanded",String(open));
  $("#menu-toggle").textContent = open ? "×" : "☰";
  $("#menu-toggle").setAttribute("aria-label",open ? "Fechar menu" : "Abrir menu");
});
$("#project-search").addEventListener("input",renderProjects);
$("#platform-filter").addEventListener("change",renderProjects);
$("#clear-filters").addEventListener("click",()=>{$("#project-search").value="";$("#platform-filter").value="all";renderProjects();});
window.addEventListener("hashchange",route);
$("#year").textContent = new Date().getFullYear();
renderHome(); renderContact(); route();
