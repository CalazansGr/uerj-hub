window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.disciplinas = (function () {
  var svc = UERJHub.services;
  var card = UERJHub.components.card;

  function renderCourseCard(c, selected) {
    return (
      '<div class="card card-hover course-card' + (selected ? ' selected' : '') + '" data-course-id="' + c.id + '" role="button" tabindex="0" aria-pressed="' + (selected ? 'true' : 'false') + '" style="border-left-color:' + c.cor + ';">' +
        '<h3>' + c.nome + '</h3>' +
        '<p class="meta">' + c.professor + '</p>' +
        '<p class="meta">' + c.horario + '</p>' +
        (c.avisos.length ? '<div class="aviso-count"><span class="badge badge-warning">' + c.avisos.length + ' aviso(s)</span></div>' : '') +
      '</div>'
    );
  }

  function renderDetail(c) {
    var avisos = c.avisos.length
      ? c.avisos.map(function (a) {
          return '<div class="aviso-item"><strong>' + a.titulo + '</strong><div class="meta">' + card.formatDate(a.data) + '</div></div>';
        }).join('')
      : '<p style="color:var(--color-text-muted);">Nenhum aviso no momento.</p>';

    var materiais = c.materiais.length
      ? '<ul class="material-list">' + c.materiais.map(function (m) {
          return '<li><span aria-hidden="true">📄</span> ' + m + '</li>';
        }).join('') + '</ul>'
      : '<p style="color:var(--color-text-muted);">Nenhum material publicado ainda.</p>';

    return (
      '<div class="card course-detail">' +
        '<h2><span class="course-color-dot" style="background:' + c.cor + ';"></span>' + c.nome + '</h2>' +
        '<p style="color:var(--color-text-muted);">' + c.professor + ' · ' + c.horario + ' · ' + c.sala + '</p>' +
        '<h3 style="margin-top:var(--space-5);">Avisos</h3>' + avisos +
        '<h3 style="margin-top:var(--space-5);">Materiais</h3>' + materiais +
      '</div>'
    );
  }

  function render() {
    return svc.getCourses().then(function (courses) {
      var cardsHtml = courses.map(function (c, i) { return renderCourseCard(c, i === 0); }).join('');
      var detailHtml = courses.length ? renderDetail(courses[0]) : '<div class="empty-state">Nenhuma disciplina matriculada.</div>';

      return (
        '<div class="section-head"><h1>Minhas Disciplinas</h1></div>' +
        '<div class="split-view has-detail">' +
          '<div class="stack" id="course-list">' + cardsHtml + '</div>' +
          '<div id="course-detail">' + detailHtml + '</div>' +
        '</div>'
      );
    });
  }

  function afterRender(root) {
    svc.getCourses().then(function (courses) {
      var list = root.querySelector('#course-list');
      var detail = root.querySelector('#course-detail');

      function selectCourse(target) {
        var id = target.getAttribute('data-course-id');
        var course = courses.find(function (c) { return c.id === id; });
        if (!course) return;

        list.querySelectorAll('.course-card').forEach(function (el) {
          el.classList.remove('selected');
          el.setAttribute('aria-pressed', 'false');
        });
        target.classList.add('selected');
        target.setAttribute('aria-pressed', 'true');
        detail.innerHTML = renderDetail(course);

        // no mobile o detalhe fica abaixo da lista, fora da tela
        if (window.matchMedia('(max-width: 899px)').matches) {
          var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          detail.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
        }
      }

      list.addEventListener('click', function (e) {
        var target = e.target.closest('[data-course-id]');
        if (target) selectCourse(target);
      });

      list.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var target = e.target.closest('[data-course-id]');
        if (!target) return;
        e.preventDefault();
        selectCourse(target);
      });
    });
  }

  return { render: render, afterRender: afterRender };
})();
