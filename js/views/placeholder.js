window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

(function () {
  function makePlaceholder(voltarRoute, voltarLabel) {
    return {
      render: function () {
        var query = window.location.hash.split('?')[1] || '';
        var titulo = new URLSearchParams(query).get('titulo') || 'Funcionalidade';
        return (
          '<div class="section-head"><h1>' + titulo + '</h1></div>' +
          '<div class="card empty-state">' +
            '<div class="emoji" aria-hidden="true">🚧</div>' +
            '<p>Essa funcionalidade ainda não foi implementada neste protótipo acadêmico.</p>' +
            '<a href="#/' + voltarRoute + '" class="btn btn-ghost" style="margin-top:var(--space-4);">Voltar para ' + voltarLabel + '</a>' +
          '</div>'
        );
      }
    };
  }

  UERJHub.views['aluno-online/em-breve'] = makePlaceholder('aluno-online', 'Aluno Online');
  UERJHub.views['webmail/em-breve'] = makePlaceholder('webmail', 'Webmail');
})();
