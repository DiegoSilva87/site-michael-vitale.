/* ==========================================================
   Michael Vitale — Psicólogo | Scripts
   ========================================================== */

/* ---------- CONFIGURAÇÃO: edite aqui ---------- */
const CONFIG = {
  // Número com DDI + DDD, só dígitos. Ex.: 5511999998888
  whatsapp: '55DDDNUMERO',
  whatsappMsg: 'Olá, Michael! Vim pelo site e gostaria de saber mais sobre a terapia online.',
  email: 'contato@exemplo.com.br',
  // Identidade padrão: 'presenca' ou 'equilibrio'
  defaultTheme: 'presenca',
  // false = esconde a barra de troca de identidade (use no site final)
  showPreviewBar: true
};
/* ---------------------------------------------- */

(function () {
  const root = document.documentElement;
  const THEMES = ['presenca', 'equilibrio'];
  const THEME_COLOR = { presenca: '#254C43', equilibrio: '#343A3D' };

  /* Links de contato */
  const waUrl = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(CONFIG.whatsappMsg);
  document.querySelectorAll('[data-wa]').forEach(a => {
    a.href = waUrl;
    a.target = '_blank';
    a.rel = 'noopener';
  });
  document.querySelectorAll('[data-email]').forEach(a => {
    a.href = 'mailto:' + CONFIG.email;
    if (a.hasAttribute('data-email-text')) a.textContent = CONFIG.email;
  });
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Identidade visual */
  const bar = document.getElementById('preview-bar');
  if (bar && !CONFIG.showPreviewBar) bar.remove();

  function setTheme(theme) {
    if (!THEMES.includes(theme)) theme = CONFIG.defaultTheme;
    root.setAttribute('data-theme', theme);
    document.querySelectorAll('img[data-logo]').forEach(img => {
      img.src = 'assets/img/' + theme + '-' + img.getAttribute('data-logo') + '.png';
    });
    const fav = document.getElementById('favicon');
    if (fav) fav.href = 'assets/img/favicon-' + theme + '.png';
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = THEME_COLOR[theme];
    document.querySelectorAll('[data-set-theme]').forEach(b => {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-set-theme') === theme));
    });
    try { localStorage.setItem('mv-theme', theme); } catch (e) {}
  }

  // Prioridade: ?identidade=equilibrio na URL > última escolha > padrão
  let initial = CONFIG.defaultTheme;
  if (CONFIG.showPreviewBar) {
    try { initial = localStorage.getItem('mv-theme') || initial; } catch (e) {}
  }
  const param = new URLSearchParams(location.search).get('identidade');
  if (param) initial = param;
  setTheme(initial);

  document.querySelectorAll('[data-set-theme]').forEach(b => {
    b.addEventListener('click', () => setTheme(b.getAttribute('data-set-theme')));
  });

  /* Respiração guiada: inspire 4s, segure 4s, solte 6s — 4 ciclos */
  const PHASES = [
    { label: 'Inspire', hint: 'pelo nariz, devagar', secs: 4, scale: 1 },
    { label: 'Segure', hint: 'só um instante', secs: 4, scale: 1 },
    { label: 'Solte', hint: 'pela boca, sem pressa', secs: 6, scale: 0.55 }
  ];
  const CYCLES = 4;
  const orb = document.getElementById('orb');
  const label = document.getElementById('breath-label');
  const hint = document.getElementById('breath-hint');
  const btn = document.getElementById('breath-btn');
  let timer = null, phase = 0, left = 0, cycle = 0;

  function paint() {
    const p = PHASES[phase];
    label.textContent = p.label;
    hint.textContent = p.hint + ' · ' + left + 's';
  }
  function enterPhase(i) {
    phase = i;
    left = PHASES[i].secs;
    orb.style.transitionDuration = PHASES[i].secs + 's, .6s';
    orb.style.transform = 'scale(' + PHASES[i].scale + ')';
    paint();
  }
  function stop(done) {
    clearInterval(timer);
    timer = null;
    orb.classList.remove('running');
    orb.style.transitionDuration = '';
    orb.style.transform = '';
    if (done) {
      label.textContent = 'Pronto.';
      hint.textContent = 'Esse cuidado com você também é terapia.';
      btn.textContent = 'Respirar de novo';
    } else {
      label.textContent = 'Respire comigo';
      hint.textContent = 'Um minuto, quatro ciclos. Só acompanhe o círculo.';
      btn.textContent = 'Começar · 1 minuto';
    }
  }
  function start() {
    cycle = 1;
    orb.classList.add('running');
    btn.textContent = 'Parar';
    enterPhase(0);
    timer = setInterval(() => {
      if (left > 1) { left--; paint(); return; }
      let next = phase + 1;
      if (next >= PHASES.length) { next = 0; cycle++; }
      if (cycle > CYCLES) { stop(true); return; }
      enterPhase(next);
    }, 1000);
  }
  btn.addEventListener('click', () => (timer ? stop(false) : start()));

  /* Checklist "Prepare o seu espaço" */
  const items = document.querySelectorAll('#checklist button');
  const msg = document.getElementById('prep-msg');
  const barFill = document.getElementById('prep-bar');
  function updateChecklist() {
    const total = items.length;
    const done = [...items].filter(b => b.getAttribute('aria-pressed') === 'true').length;
    msg.textContent = done === total ? 'Seu espaço está pronto. Agora é só chegar.' : done + ' de ' + total + ' prontos';
    barFill.style.width = Math.round((done / total) * 100) + '%';
  }
  items.forEach(b => b.addEventListener('click', () => {
    b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
    updateChecklist();
  }));
  updateChecklist();

  /* FAQ: uma pergunta aberta por vez */
  const details = document.querySelectorAll('#faq details');
  details.forEach(d => d.addEventListener('toggle', () => {
    if (d.open) details.forEach(o => { if (o !== d) o.open = false; });
  }));

  /* Entrada suave das seções */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }
})();
