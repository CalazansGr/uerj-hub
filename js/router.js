window.UERJHub = window.UERJHub || {};

UERJHub.router = (function () {
  var viewRootEl;

  function currentRoute() {
    var hash = window.location.hash || '#/dashboard';
    var route = hash.replace('#/', '').split('?')[0];
    return route || 'dashboard';
  }

  function updateNav(route) {
    var sidebarNav = document.getElementById('sidebar-nav');
    var bottomNav = document.getElementById('bottom-nav');
    if (sidebarNav) sidebarNav.innerHTML = UERJHub.components.nav.renderSidebar(route);
    if (bottomNav) bottomNav.innerHTML = UERJHub.components.nav.renderBottomNav(route);
  }

  function render() {
    if (!UERJHub.auth.isAuthenticated()) {
      window.location.href = 'login/';
      return;
    }

    var route = currentRoute();
    var view = UERJHub.views[route];
    if (!view) {
      window.location.hash = '#/dashboard';
      return;
    }

    updateNav(route);

    var navItem = UERJHub.components.nav.ITEMS.filter(function (i) { return i.route === route; })[0] ||
      UERJHub.components.nav.QUICK_LINKS.filter(function (i) { return i.route === route; })[0];
    document.title = navItem ? 'UERJ Hub — ' + navItem.label : 'UERJ Hub';

    Promise.resolve(view.render()).then(function (html) {
      var wrapper = document.createElement('div');
      wrapper.className = 'view-enter';
      wrapper.innerHTML = html;
      viewRootEl.innerHTML = '';
      viewRootEl.appendChild(wrapper);
      if (typeof view.afterRender === 'function') {
        view.afterRender(wrapper);
      }
      window.scrollTo(0, 0);
      // move o foco para o conteúdo, para leitores de tela e navegação por teclado
      viewRootEl.focus({ preventScroll: true });
    });
  }

  function init() {
    viewRootEl = document.getElementById('view-root');
    window.addEventListener('hashchange', render);
    render();
  }

  return { init: init, refresh: render };
})();
