window.UERJHub = window.UERJHub || {};

UERJHub.auth = (function () {
  var STORAGE_KEY = 'uerjhub_session';

  function login(matricula) {
    var session = {
      matricula: matricula || 'convidado',
      loggedInAt: new Date().toISOString()
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    return session;
  }

  function logout() {
    sessionStorage.removeItem(STORAGE_KEY);
  }

  function getSession() {
    var raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function isAuthenticated() {
    return getSession() !== null;
  }

  return {
    login: login,
    logout: logout,
    getSession: getSession,
    isAuthenticated: isAuthenticated
  };
})();
