window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.calendario = (function () {
  var svc = UERJHub.services;
  var badge = UERJHub.components.badge;

  var FILTERS = [
    { key: 'todos', label: 'Todos' },
    { key: 'academico', label: 'Acadêmico' },
    { key: 'aula', label: 'Aulas' }
  ];

  function groupByDate(events) {
    var groups = {};
    events.forEach(function (e) {
      var key = e.data.slice(0, 10);
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    });
    return Object.keys(groups).sort().map(function (key) {
      return { data: key, itens: groups[key] };
    });
  }

  function formatGroupDate(iso) {
    var d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
  }

  function renderGroups(groups) {
    if (!groups.length) return '<div class="empty-state"><div class="emoji" aria-hidden="true">🗓️</div><p>Nenhum evento nessa categoria.</p></div>';
    return groups.map(function (g) {
      var items = g.itens.map(function (e) {
        return (
          '<div class="timeline-item" data-origem="' + e.origem + '">' +
            '<span class="titulo">' + e.titulo + '</span>' +
            badge.origem(e.origem) +
          '</div>'
        );
      }).join('');
      return '<div class="timeline-group"><div class="timeline-date">' + formatGroupDate(g.data) + '</div>' + items + '</div>';
    }).join('');
  }

  function render() {
    return svc.getEvents().then(function (events) {
      var filters = FILTERS.map(function (f, i) {
        return '<button type="button" class="pill' + (i === 0 ? ' active' : '') + '" aria-pressed="' + (i === 0) + '" data-origem-filter="' + f.key + '">' + f.label + '</button>';
      }).join('');

      return (
        '<div class="section-head"><h1>Calendário</h1></div>' +
        '<p style="color:var(--color-text-muted);">Prazos acadêmicos e aulas, tudo num só lugar.</p>' +
        '<div class="row calendario-filters">' + filters + '</div>' +
        '<div id="calendario-timeline">' + renderGroups(groupByDate(events)) + '</div>'
      );
    });
  }

  function afterRender(root) {
    svc.getEvents().then(function (events) {
      var filters = root.querySelectorAll('[data-origem-filter]');
      var container = root.querySelector('#calendario-timeline');

      filters.forEach(function (btn) {
        btn.addEventListener('click', function () {
          filters.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
          btn.classList.add('active');
          btn.setAttribute('aria-pressed', 'true');
          var key = btn.getAttribute('data-origem-filter');
          var filtered = key === 'todos' ? events : events.filter(function (e) { return e.origem === key; });
          container.innerHTML = renderGroups(groupByDate(filtered));
        });
      });
    });
  }

  return { render: render, afterRender: afterRender };
})();
