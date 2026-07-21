window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.caeng = (function () {
  var svc = UERJHub.services;
  var card = UERJHub.components.card;
  var badge = UERJHub.components.badge;

  var FILTERS = [
    { key: 'todos', label: 'Todos' },
    { key: 'aviso', label: 'Avisos' },
    { key: 'evento', label: 'Eventos' },
    { key: 'assembleia', label: 'Assembleias' }
  ];

  function renderPost(p) {
    return (
      '<div class="card post-card" data-categoria="' + p.categoria + '">' +
        '<div class="post-head">' +
          '<div>' + badge.categoria(p.categoria) + '</div>' +
          '<span class="post-date">' + card.formatDate(p.data) + '</span>' +
        '</div>' +
        '<h3>' + p.titulo + '</h3>' +
        '<p style="margin:0;color:var(--color-text-muted);">' + p.corpo + '</p>' +
      '</div>'
    );
  }

  function render() {
    return Promise.all([svc.getCaengInfo(), svc.getCaengPosts()]).then(function (r) {
      var info = r[0], posts = r[1];
      var filters = FILTERS.map(function (f, i) {
        return '<button type="button" class="pill' + (i === 0 ? ' active' : '') + '" aria-pressed="' + (i === 0) + '" data-filter="' + f.key + '">' + f.label + '</button>';
      }).join('');
      var postsHtml = posts.slice().reverse().map(renderPost).join('');

      return (
        '<div class="section-head"><h1>CAENG</h1></div>' +
        '<div class="caeng-header">' +
          '<div><h2 style="color:#fff;margin-bottom:4px;">' + info.nome + '</h2><p>Avisos, eventos e assembleias direto do seu Centro Acadêmico — sem precisar entrar no grupo do WhatsApp.</p></div>' +
          '<button type="button" class="btn btn-ghost" disabled title="Indisponível no protótipo">Fale com o CA</button>' +
        '</div>' +
        '<div class="row caeng-filters">' + filters + '</div>' +
        '<div id="caeng-posts">' + postsHtml + '</div>'
      );
    });
  }

  function afterRender(root) {
    var filters = root.querySelectorAll('[data-filter]');
    var postsContainer = root.querySelector('#caeng-posts');

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        var key = btn.getAttribute('data-filter');
        postsContainer.querySelectorAll('[data-categoria]').forEach(function (post) {
          var show = key === 'todos' || post.getAttribute('data-categoria') === key;
          post.style.display = show ? '' : 'none';
        });
      });
    });
  }

  return { render: render, afterRender: afterRender };
})();
