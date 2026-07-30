window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.dashboard = (function () {
  var svc = UERJHub.services;
  var card = UERJHub.components.card;

  function avgFrequencia(periodo) {
    if (!periodo || !periodo.disciplinas.length) return 0;
    var soma = periodo.disciplinas.reduce(function (acc, d) { return acc + d.frequencia; }, 0);
    return Math.round(soma / periodo.disciplinas.length);
  }

  function render() {
    return Promise.all([
      svc.getUser(),
      svc.getCurrentPeriodGrades(),
      svc.getUnreadEmailCount(),
      svc.getUpcomingEvents(4),
      svc.getCaengPosts(),
      svc.getCourses(),
      svc.getBandejao()
    ]).then(function (r) {
      var user = r[0], periodo = r[1], unread = r[2], events = r[3], caengPosts = r[4], courses = r[5], bandejao = r[6];
      var freq = avgFrequencia(periodo);

      var quickLinks = UERJHub.components.nav.QUICK_LINKS.map(function (item) {
        return '<a href="#/' + item.route + '" class="quick-link">' + item.icon + '<span>' + item.label + '</span></a>';
      }).join('');

      var eventsHtml = events.map(function (e) {
        return '<li><span class="title">' + e.titulo + '</span><span class="meta">' + card.formatDate(e.data) + '</span></li>';
      }).join('') || '<li class="empty-state" style="padding:var(--space-4) 0;">Nenhum evento por perto.</li>';

      var caengHtml = caengPosts.slice(0, 3).map(function (p) {
        return '<li><span class="title">' + p.titulo + '</span><span class="meta">' + card.formatDate(p.data) + '</span></li>';
      }).join('');

      var proximaAula = courses[0];

      return (
        '<div class="greeting">' +
          '<h1>Olá, ' + user.nome + '! <span aria-hidden="true">👋</span></h1>' +
          '<p>' + user.curso + ' · ' + user.periodoAtual + ' período</p>' +
        '</div>' +

        '<div class="card-grid">' +
          card.statCard({ label: 'CR atual', value: user.cr.toFixed(1), hint: 'Coeficiente de Rendimento' }) +
          card.statCard({ label: 'Frequência média', value: freq + '%', hint: 'Período ' + user.periodoAtual }) +
          card.statCard({ label: 'E-mails não lidos', value: unread, hint: 'Caixa de entrada' }) +
          card.statCard({ label: 'Próxima aula', value: proximaAula ? proximaAula.nome : '—', hint: proximaAula ? proximaAula.horario : '' }) +
          card.statCard({ label: 'Saldo do bandejão', value: card.formatCurrency(bandejao.saldo), hint: 'Cartão de refeição' }) +
        '</div>' +

        '<div class="quick-links">' + quickLinks + '</div>' +

        '<div class="dashboard-cols">' +
          '<div class="card">' +
            '<div class="section-head"><h3>Próximos eventos</h3><a href="#/calendario">Ver calendário</a></div>' +
            '<ul class="preview-list">' + eventsHtml + '</ul>' +
          '</div>' +
          '<div class="card">' +
            '<div class="section-head"><h3>Mural do CAENG</h3><a href="#/caeng">Ver mural</a></div>' +
            '<ul class="preview-list">' + caengHtml + '</ul>' +
          '</div>' +
        '</div>'
      );
    });
  }

  return { render: render };
})();
