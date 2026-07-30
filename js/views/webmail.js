window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

(function () {
  var ICONS = UERJHub.components.nav.ICONS;

  var ITEMS = [
    { route: 'calendario', label: 'Calendário', icon: ICONS.calendario },
    { route: 'email', label: 'Mail', icon: ICONS.email },
    { route: 'contatos', label: 'Lista de Contatos', icon: ICONS.contatos }
  ];

  function render() {
    var tiles = ITEMS.map(function (item) {
      return '<a href="#/' + item.route + '" class="quick-link">' + item.icon + '<span>' + item.label + '</span></a>';
    }).join('');

    return (
      '<div class="section-head"><h1>Webmail</h1></div>' +
      '<p style="color:var(--color-text-muted);">Seu e-mail institucional, calendário e lista de contatos, tudo em um só lugar.</p>' +
      '<div class="quick-links">' + tiles + '</div>'
    );
  }

  UERJHub.views['webmail'] = { render: render };
})();
