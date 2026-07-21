window.UERJHub = window.UERJHub || {};
UERJHub.components = UERJHub.components || {};

UERJHub.components.nav = (function () {
  var ICONS = {
    dashboard: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9"/></svg>',
    notas: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg>',
    disciplinas: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20"/></svg>',
    bandejao: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>',
    email: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    caeng: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v3a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z"/><path d="M15 8a3 3 0 0 1 0 8M18.5 6a6 6 0 0 1 0 12"/></svg>',
    calendario: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>',
    perfil: '<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6"/></svg>'
  };

  var ITEMS = [
    { route: 'dashboard', label: 'Início', icon: ICONS.dashboard },
    { route: 'notas', label: 'Notas', icon: ICONS.notas },
    { route: 'disciplinas', label: 'Disciplinas', icon: ICONS.disciplinas },
    { route: 'bandejao', label: 'Bandejão', icon: ICONS.bandejao },
    { route: 'email', label: 'E-mail', icon: ICONS.email },
    { route: 'caeng', label: 'CAENG', icon: ICONS.caeng },
    { route: 'calendario', label: 'Calendário', icon: ICONS.calendario },
    { route: 'perfil', label: 'Perfil', icon: ICONS.perfil }
  ];

  function renderSidebar(activeRoute) {
    return ITEMS.map(function (item) {
      var active = item.route === activeRoute;
      // aria-label + title garantem nome acessível quando a sidebar está
      // colapsada (label com display:none entre 768px e 1023px)
      return '<a href="#/' + item.route + '" class="sidebar-item' + (active ? ' active' : '') + '"' +
        (active ? ' aria-current="page"' : '') +
        ' aria-label="' + item.label + '" title="' + item.label + '">' +
        item.icon + '<span class="label">' + item.label + '</span></a>';
    }).join('');
  }

  function renderBottomNav(activeRoute) {
    var mobileItems = ITEMS.filter(function (i) {
      return ['dashboard', 'notas', 'email', 'caeng', 'perfil'].indexOf(i.route) !== -1;
    });
    return mobileItems.map(function (item) {
      var active = item.route === activeRoute;
      return '<a href="#/' + item.route + '" class="bottom-nav-item' + (active ? ' active' : '') + '"' +
        (active ? ' aria-current="page"' : '') + '>' +
        item.icon + '<span>' + item.label + '</span></a>';
    }).join('');
  }

  return { ITEMS: ITEMS, renderSidebar: renderSidebar, renderBottomNav: renderBottomNav };
})();
