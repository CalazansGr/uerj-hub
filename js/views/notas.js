window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.notas = (function () {
  var svc = UERJHub.services;
  var badge = UERJHub.components.badge;

  function notaValue(v) {
    return v === null || v === undefined ? '—' : v.toFixed(1);
  }

  function freqClass(freq) {
    if (freq < 75) return 'danger';
    if (freq < 85) return 'warning';
    return '';
  }

  function renderDisciplina(d) {
    return (
      '<div class="disciplina-row">' +
        '<div class="disciplina-head">' +
          '<div>' +
            '<h3>' + d.nome + '</h3>' +
            '<p class="prof">' + d.codigo + ' · ' + d.professor + ' · ' + d.creditos + ' créditos</p>' +
          '</div>' +
          badge.situacao(d.situacao) +
        '</div>' +
        '<div class="notas-grid">' +
          '<div class="nota-box"><div class="label">AP1</div><div class="value">' + notaValue(d.notas.ap1) + '</div></div>' +
          '<div class="nota-box"><div class="label">AP2</div><div class="value">' + notaValue(d.notas.ap2) + '</div></div>' +
          '<div class="nota-box"><div class="label">Final</div><div class="value">' + notaValue(d.notas.final) + '</div></div>' +
        '</div>' +
        '<div class="freq-row">' +
          '<div class="progress-track"><div class="progress-fill ' + freqClass(d.frequencia) + '" style="width:' + d.frequencia + '%;"></div></div>' +
          '<span class="freq-value">' + d.frequencia + '%</span>' +
        '</div>' +
      '</div>'
    );
  }

  function render() {
    return Promise.all([svc.getUser(), svc.getGrades()]).then(function (r) {
      var user = r[0], grades = r[1];

      var tabs = grades.map(function (p, i) {
        return '<button type="button" class="pill' + (i === 0 ? ' active' : '') + '" aria-pressed="' + (i === 0) + '" data-periodo="' + i + '">' + p.periodo + (p.atual ? ' (atual)' : '') + '</button>';
      }).join('');

      var panels = grades.map(function (p, i) {
        var rows = p.disciplinas.map(renderDisciplina).join('');
        return '<div class="periodo-panel' + (i === 0 ? ' active' : '') + '" data-periodo-panel="' + i + '"><div class="card">' + rows + '</div></div>';
      }).join('');

      return (
        '<div class="section-head"><h1>Notas e Boletim</h1></div>' +
        '<div class="cr-banner">' +
          '<div><p>Coeficiente de Rendimento</p><div class="cr-value">' + user.cr.toFixed(1) + '</div></div>' +
          '<p>' + user.curso + ' — ' + user.periodoAtual + ' período</p>' +
        '</div>' +
        '<div class="periodo-tabs row">' + tabs + '</div>' +
        panels
      );
    });
  }

  function afterRender(root) {
    var tabs = root.querySelectorAll('[data-periodo]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var idx = tab.getAttribute('data-periodo');
        tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-pressed', 'false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-pressed', 'true');
        root.querySelectorAll('[data-periodo-panel]').forEach(function (panel) {
          panel.classList.toggle('active', panel.getAttribute('data-periodo-panel') === idx);
        });
      });
    });
  }

  return { render: render, afterRender: afterRender };
})();
