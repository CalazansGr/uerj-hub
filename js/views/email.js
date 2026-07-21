window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.email = (function () {
  var svc = UERJHub.services;
  var card = UERJHub.components.card;
  var FOLDERS = [
    { key: 'inbox', label: 'Caixa de Entrada' },
    { key: 'enviados', label: 'Enviados' },
    { key: 'lixeira', label: 'Lixeira' }
  ];

  function renderEmailItem(e, selectedId) {
    var unreadClass = (e.pasta === 'inbox' && !e.lida) ? ' unread' : '';
    var selClass = String(e.id) === String(selectedId) ? ' selected' : '';
    return (
      '<button type="button" class="email-item' + unreadClass + selClass + '" data-email-id="' + e.id + '">' +
        '<span class="remetente">' + e.remetente + (unreadClass ? '<span class="sr-only"> (não lida)</span>' : '') + '</span>' +
        '<span class="assunto">' + e.assunto + '</span>' +
        '<span class="data">' + card.formatDateTime(e.data) + '</span>' +
      '</button>'
    );
  }

  function renderDetail(e) {
    if (!e) return '<div class="empty-state"><div class="emoji" aria-hidden="true">📭</div><p>Selecione uma mensagem para ler.</p></div>';
    return (
      '<div class="card email-detail">' +
        '<div class="assunto-header"><h2>' + e.assunto + '</h2>' +
          '<button type="button" class="btn btn-primary" id="reply-btn" data-email-id="' + e.id + '">Responder</button>' +
        '</div>' +
        '<p class="remetente-info">De: ' + e.remetente + ' · ' + card.formatDateTime(e.data) + '</p>' +
        '<p class="corpo">' + e.corpo + '</p>' +
      '</div>'
    );
  }

  function render() {
    return svc.getEmails('inbox').then(function (emails) {
      var listHtml = emails.map(function (e) { return renderEmailItem(e, emails[0] ? emails[0].id : null); }).join('') ||
        '<div class="empty-state">Sem mensagens nesta pasta.</div>';
      var detailHtml = renderDetail(emails[0]);

      var pills = FOLDERS.map(function (f, i) {
        return '<button type="button" class="pill' + (i === 0 ? ' active' : '') + '" aria-pressed="' + (i === 0) + '" data-folder="' + f.key + '">' + f.label + '</button>';
      }).join('');

      return (
        '<div class="section-head"><h1>E-mail</h1></div>' +
        '<div class="row email-folders">' + pills + '</div>' +
        '<div class="split-view has-detail">' +
          '<div class="stack" id="email-list">' + listHtml + '</div>' +
          '<div id="email-detail">' + detailHtml + '</div>' +
        '</div>'
      );
    });
  }

  function afterRender(root) {
    var listEl = root.querySelector('#email-list');
    var detailEl = root.querySelector('#email-detail');
    var pills = root.querySelectorAll('[data-folder]');
    var currentFolder = 'inbox';
    var selectedId = null;

    function refreshList() {
      return svc.getEmails(currentFolder).then(function (emails) {
        listEl.innerHTML = emails.map(function (e) { return renderEmailItem(e, selectedId); }).join('') ||
          '<div class="empty-state">Sem mensagens nesta pasta.</div>';
      });
    }

    pills.forEach(function (pill) {
      pill.addEventListener('click', function () {
        pills.forEach(function (p) { p.classList.remove('active'); p.setAttribute('aria-pressed', 'false'); });
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
        currentFolder = pill.getAttribute('data-folder');
        selectedId = null;
        detailEl.innerHTML = renderDetail(null);
        refreshList();
      });
    });

    function scrollToDetailOnMobile() {
      // abaixo de 900px a lista e o detalhe ficam empilhados: sem isso,
      // o detalhe atualiza fora da tela e o toque parece não fazer nada
      if (window.matchMedia('(max-width: 899px)').matches) {
        var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        detailEl.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
      }
    }

    listEl.addEventListener('click', function (e) {
      var target = e.target.closest('[data-email-id]');
      if (!target) return;
      var id = target.getAttribute('data-email-id');
      selectedId = id;
      svc.getEmailById(Number(id)).then(function (email) {
        if (!email) return;
        email.lida = true;
        detailEl.innerHTML = renderDetail(email);
        // rola só depois da lista re-renderizar: mutações no DOM
        // cancelam a animação de scroll suave no Chrome
        refreshList().then(scrollToDetailOnMobile);
        svc.getUnreadEmailCount().then(UERJHub.components.topbar.updateUnread);
      });
    });

    detailEl.addEventListener('click', function (e) {
      var btn = e.target.closest('#reply-btn');
      if (!btn) return;
      svc.getEmailById(Number(btn.getAttribute('data-email-id'))).then(function (original) {
        if (!original) return;
        var newId = Math.max.apply(null, UERJHub.data.emails.map(function (em) { return em.id; })) + 1;
        UERJHub.data.emails.push({
          id: newId,
          pasta: 'enviados',
          remetente: 'estudante.demo@graduacao.uerj.br',
          assunto: 'Re: ' + original.assunto,
          corpo: 'Mensagem enviada a partir do UERJ Hub (protótipo, sem envio real).',
          lida: true,
          data: new Date().toISOString()
        });
        pills.forEach(function (p) { p.classList.remove('active'); });
        root.querySelector('[data-folder="enviados"]').classList.add('active');
        currentFolder = 'enviados';
        selectedId = newId;
        detailEl.innerHTML = renderDetail(UERJHub.data.emails[UERJHub.data.emails.length - 1]);
        refreshList();
      });
    });
  }

  return { render: render, afterRender: afterRender };
})();
