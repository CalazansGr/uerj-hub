document.addEventListener('DOMContentLoaded', function () {
  if (!UERJHub.auth.isAuthenticated()) {
    window.location.href = 'index.html';
    return;
  }

  function bindLogout() {
    var btn = document.getElementById('logout-btn-sidebar');
    if (btn) {
      btn.addEventListener('click', function () {
        UERJHub.auth.logout();
        window.location.href = 'index.html';
      });
    }
  }

  Promise.all([UERJHub.services.getUser(), UERJHub.services.getUnreadEmailCount()])
    .then(function (results) {
      var user = results[0];
      var unread = results[1];
      document.getElementById('topbar-content').innerHTML = UERJHub.components.topbar.render(user, unread);
      bindLogout();
      UERJHub.router.init();
    });
});
