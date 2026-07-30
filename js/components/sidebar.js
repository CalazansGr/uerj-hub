window.UERJHub = window.UERJHub || {};
UERJHub.components = UERJHub.components || {};

UERJHub.components.nav = (function () {
  var ICONS = {
    dashboard: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>',
    alunoOnline: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M6 16c.5-2 1.8-3 3-3s2.5 1 3 3"/><path d="M14 9h4M14 13h4"/></svg>',
    webmail: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    notas: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    disciplinas: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/></svg>',
    bandejao: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>',
    email: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    caeng: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v3a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M13 8.5a3.5 3.5 0 0 1 0 7M16 6a6 6 0 0 1 0 12"/></svg>',
    calendario: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
    contatos: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20c.7-3.4 3-5 6-5s5.3 1.6 6 5"/><path d="M16 5.5a3 3 0 0 1 0 6M19 20c-.4-2-1.3-3.5-2.7-4.4"/></svg>',
    perfil: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>'
  };

  // seções principais do menu lateral (espelha a estrutura pedida: Aluno
  // Online, Webmail, Cartão Bandejão e Centro Acadêmico como portas de
  // entrada, cada uma com suas próprias telas dentro)
  var ITEMS = [
    { route: 'dashboard', label: 'Início', icon: ICONS.dashboard },
    { route: 'aluno-online', label: 'Aluno Online', icon: ICONS.alunoOnline },
    { route: 'webmail', label: 'Webmail', icon: ICONS.webmail },
    { route: 'bandejao', label: 'Cartão Bandejão', icon: ICONS.bandejao },
    { route: 'caeng', label: 'Centro Acadêmico', icon: ICONS.caeng },
    { route: 'perfil', label: 'Perfil', icon: ICONS.perfil }
  ];

  // rotas que vivem "dentro" de uma seção (abertas a partir do hub daquela
  // seção) — usado só para saber qual item do menu manter destacado
  var PARENT_OF = {
    notas: 'aluno-online',
    disciplinas: 'aluno-online',
    'aluno-online/em-breve': 'aluno-online',
    calendario: 'webmail',
    email: 'webmail',
    contatos: 'webmail',
    'webmail/em-breve': 'webmail'
  };

  // atalhos diretos para funcionalidades específicas, usados na dashboard
  var QUICK_LINKS = [
    { route: 'notas', label: 'Notas', icon: ICONS.notas },
    { route: 'disciplinas', label: 'Disciplinas', icon: ICONS.disciplinas },
    { route: 'bandejao', label: 'Bandejão', icon: ICONS.bandejao },
    { route: 'email', label: 'E-mail', icon: ICONS.email },
    { route: 'caeng', label: 'Centro Acadêmico', icon: ICONS.caeng },
    { route: 'calendario', label: 'Calendário', icon: ICONS.calendario }
  ];

  function highlightedRoute(route) {
    return PARENT_OF[route] || route;
  }

  function renderSidebar(activeRoute) {
    var highlighted = highlightedRoute(activeRoute);
    return ITEMS.map(function (item) {
      var active = item.route === highlighted;
      // aria-label + title garantem nome acessível quando a sidebar está
      // colapsada (label com display:none entre 768px e 1023px)
      return '<a href="#/' + item.route + '" class="sidebar-item' + (active ? ' active' : '') + '"' +
        (active ? ' aria-current="page"' : '') +
        ' aria-label="' + item.label + '" title="' + item.label + '">' +
        item.icon + '<span class="label">' + item.label + '</span></a>';
    }).join('');
  }

  function renderBottomNav(activeRoute) {
    var highlighted = highlightedRoute(activeRoute);
    var mobileItems = ITEMS.filter(function (i) {
      return ['dashboard', 'aluno-online', 'webmail', 'bandejao', 'caeng'].indexOf(i.route) !== -1;
    });
    return mobileItems.map(function (item) {
      var active = item.route === highlighted;
      return '<a href="#/' + item.route + '" class="bottom-nav-item' + (active ? ' active' : '') + '"' +
        (active ? ' aria-current="page"' : '') + '>' +
        item.icon + '<span>' + item.label + '</span></a>';
    }).join('');
  }

  return { ITEMS: ITEMS, QUICK_LINKS: QUICK_LINKS, ICONS: ICONS, renderSidebar: renderSidebar, renderBottomNav: renderBottomNav };
})();
