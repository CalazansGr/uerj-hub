window.UERJHub = window.UERJHub || {};
UERJHub.components = UERJHub.components || {};

UERJHub.components.topbar = (function () {
  function initials(nome) {
    return (nome || '?').trim().charAt(0).toUpperCase();
  }

  function unreadBadge(unreadCount) {
    return unreadCount > 0
      ? '<span class="badge badge-danger pulse" aria-label="' + unreadCount + ' não lidos">' + unreadCount + '</span>'
      : '';
  }

  function render(user, unreadCount) {
    return (
      '<div class="topbar-brand">' +
        '<img src="assets/img/logo-uerj.webp" width="28" height="28" alt="">' +
        '<span>UERJ Hub</span>' +
      '</div>' +
      '<div class="row topbar-actions">' +
        '<a href="./" class="btn-ghost btn topbar-back" style="padding:8px 14px;" aria-label="Voltar aos links úteis" title="Voltar aos links úteis"><svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/><path d="M9 12h11"/></svg><span>Links</span></a>' +
        '<a href="#/email" class="btn-ghost btn" style="padding:8px 14px;">E-mails' +
          '<span id="topbar-unread-slot" class="topbar-unread">' + unreadBadge(unreadCount) + '</span>' +
        '</a>' +
        '<a href="#/perfil" class="row" style="text-decoration:none;" aria-label="Perfil">' +
          '<span class="avatar" aria-hidden="true">' + initials(user.nome) + '</span>' +
        '</a>' +
      '</div>'
    );
  }

  function updateUnread(unreadCount) {
    var slot = document.getElementById('topbar-unread-slot');
    if (slot) slot.innerHTML = unreadBadge(unreadCount);
  }

  return { render: render, updateUnread: updateUnread };
})();
