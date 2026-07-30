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
      svc.getCourses(),
      svc.getBandejao()
    ]).then(function (r) {
      var user = r[0], periodo = r[1], unread = r[2], courses = r[3], bandejao = r[4];
      var freq = avgFrequencia(periodo);
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
        '</div>'
      );
    });
  }

  return { render: render };
})();
