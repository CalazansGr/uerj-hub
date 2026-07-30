window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.contatos = (function () {
  var svc = UERJHub.services;

  function initials(nome) {
    return (nome || '?').trim().charAt(0).toUpperCase();
  }

  function renderContato(c) {
    return (
      '<div class="card contato-card">' +
        '<span class="avatar" aria-hidden="true">' + initials(c.nome) + '</span>' +
        '<div>' +
          '<h3 style="margin:0 0 2px;">' + c.nome + '</h3>' +
          '<p style="margin:0;color:var(--color-text-muted);">' + c.setor + '</p>' +
          '<p style="margin:4px 0 0;"><a href="mailto:' + c.email + '">' + c.email + '</a> · ' + c.telefone + '</p>' +
        '</div>' +
      '</div>'
    );
  }

  function render() {
    return svc.getContatos().then(function (contatos) {
      var listHtml = contatos.map(renderContato).join('');
      return (
        '<div class="section-head"><h1>Lista de Contatos</h1></div>' +
        '<div class="field" style="max-width:360px;">' +
          '<label for="contatos-busca">Buscar</label>' +
          '<input type="text" id="contatos-busca" placeholder="Nome, setor ou e-mail">' +
        '</div>' +
        '<div id="contatos-lista" class="stack">' + listHtml + '</div>'
      );
    });
  }

  function afterRender(root) {
    var input = root.querySelector('#contatos-busca');
    var cards = root.querySelectorAll('.contato-card');
    input.addEventListener('input', function () {
      var termo = input.value.trim().toLowerCase();
      cards.forEach(function (card) {
        var visivel = card.textContent.toLowerCase().indexOf(termo) !== -1;
        card.style.display = visivel ? '' : 'none';
      });
    });
  }

  return { render: render, afterRender: afterRender };
})();
