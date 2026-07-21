window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.perfil = (function () {
  var svc = UERJHub.services;

  function infoRow(label, value) {
    return (
      '<div class="row-between" style="padding:var(--space-3) 0;border-bottom:1px solid var(--color-border);">' +
        '<span style="color:var(--color-text-muted);font-weight:700;">' + label + '</span>' +
        '<span style="font-weight:700;">' + value + '</span>' +
      '</div>'
    );
  }

  function render() {
    return svc.getUser().then(function (user) {
      var initials = user.nome.trim().charAt(0).toUpperCase();
      return (
        '<div class="section-head"><h1>Perfil</h1></div>' +
        '<div class="card" style="max-width:520px;">' +
          '<div class="row" style="margin-bottom:var(--space-5);">' +
            '<span class="avatar avatar-lg">' + initials + '</span>' +
            '<div><h2 style="margin-bottom:2px;">' + user.nomeCompleto + '</h2>' +
            '<p style="margin:0;color:var(--color-text-muted);">' + user.curso + '</p></div>' +
          '</div>' +
          infoRow('Matrícula', user.matricula) +
          infoRow('Curso', user.curso) +
          infoRow('Centro', user.centro) +
          infoRow('Período atual', user.periodoAtual) +
          infoRow('E-mail', user.email) +
          '<div style="margin-top:var(--space-5);">' +
            '<button type="button" id="logout-btn-profile" class="btn btn-ghost btn-block">Sair da conta</button>' +
          '</div>' +
        '</div>'
      );
    });
  }

  function afterRender(root) {
    var btn = root.querySelector('#logout-btn-profile');
    if (btn) {
      btn.addEventListener('click', function () {
        UERJHub.auth.logout();
        window.location.href = 'index.html';
      });
    }
  }

  return { render: render, afterRender: afterRender };
})();
