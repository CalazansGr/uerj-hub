window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.ava = (function () {
  var svc = UERJHub.services;
  var card = UERJHub.components.card;

  function courseById(courses, id) {
    return courses.filter(function (c) { return c.id === id; })[0] || null;
  }

  function renderAnexos(anexos) {
    if (!anexos || !anexos.length) return '';
    return '<div class="ava-anexos">' + anexos.map(function (a) {
      return (
        '<a class="ava-anexo" href="' + a.url + '" target="_blank" rel="noopener">' +
          '<span aria-hidden="true">📄</span> ' + a.nome +
        '</a>'
      );
    }).join('') + '</div>';
  }

  function renderPost(p, curso) {
    return (
      '<div class="card ava-post" data-curso="' + p.cursoId + '">' +
        '<div class="ava-post-head">' +
          '<div class="ava-curso-tag" style="--curso-cor:' + (curso ? curso.cor : '#2F5FFF') + ';">' +
            '<span class="dot" aria-hidden="true"></span>' + (curso ? curso.nome : 'Disciplina') +
          '</div>' +
          '<span class="post-date">' + card.formatDate(p.data) + '</span>' +
        '</div>' +
        '<h3>' + p.titulo + '</h3>' +
        '<p class="ava-professor">' + (curso ? curso.professor : '') + '</p>' +
        '<p style="margin:0;color:var(--color-text-muted);">' + p.corpo + '</p>' +
        renderAnexos(p.anexos) +
      '</div>'
    );
  }

  function render() {
    return Promise.all([svc.getAvaPosts(), svc.getCourses()]).then(function (r) {
      var posts = r[0], courses = r[1];

      var filters = '<button type="button" class="pill active" aria-pressed="true" data-curso-filter="todos">Todas</button>' +
        courses.map(function (c) {
          return '<button type="button" class="pill" aria-pressed="false" data-curso-filter="' + c.id + '">' + c.nome + '</button>';
        }).join('');

      var postsHtml = posts.map(function (p) { return renderPost(p, courseById(courses, p.cursoId)); }).join('') ||
        '<div class="empty-state"><div class="emoji" aria-hidden="true">📭</div><p>Nenhuma publicação ainda.</p></div>';

      return (
        '<div class="section-head"><h1>AVA</h1></div>' +
        '<p style="color:var(--color-text-muted);">Ambiente Virtual de Aprendizagem — materiais, avisos e instruções que os professores publicam em cada disciplina.</p>' +
        '<div class="row ava-filters">' + filters + '</div>' +
        '<div id="ava-posts">' + postsHtml + '</div>'
      );
    });
  }

  function afterRender(root) {
    var filters = root.querySelectorAll('[data-curso-filter]');
    var postsContainer = root.querySelector('#ava-posts');

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        var key = btn.getAttribute('data-curso-filter');
        postsContainer.querySelectorAll('[data-curso]').forEach(function (post) {
          var show = key === 'todos' || post.getAttribute('data-curso') === key;
          post.style.display = show ? '' : 'none';
        });
      });
    });
  }

  return { render: render, afterRender: afterRender };
})();
