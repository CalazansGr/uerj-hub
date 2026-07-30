window.UERJHub = window.UERJHub || {};

/**
 * Camada única de acesso a dados. Hoje lê de js/data/*.js (mock em memória),
 * mas todas as funções retornam Promise para que, no futuro, o corpo possa
 * ser trocado por fetch() de uma API real sem precisar alterar as views.
 */
UERJHub.services = (function (data) {
  function resolve(value) {
    return Promise.resolve(value);
  }

  function getUser() {
    return resolve(data.user);
  }

  function getGrades() {
    return resolve(data.grades);
  }

  function getCurrentPeriodGrades() {
    return resolve(data.grades.find(function (p) { return p.atual; }) || null);
  }

  function getCourses() {
    return resolve(data.courses);
  }

  function getCourseById(id) {
    return resolve(data.courses.find(function (c) { return c.id === id; }) || null);
  }

  function getEmails(pasta) {
    var emails = data.emails;
    if (pasta) {
      emails = emails.filter(function (e) { return e.pasta === pasta; });
    }
    return resolve(emails.slice().sort(function (a, b) { return new Date(b.data) - new Date(a.data); }));
  }

  function getEmailById(id) {
    return resolve(data.emails.find(function (e) { return e.id === id; }) || null);
  }

  function getUnreadEmailCount() {
    return resolve(data.emails.filter(function (e) { return e.pasta === 'inbox' && !e.lida; }).length);
  }

  function getAvaPosts(cursoId) {
    var posts = data.ava;
    if (cursoId) {
      posts = posts.filter(function (p) { return p.cursoId === cursoId; });
    }
    return resolve(posts.slice().sort(function (a, b) { return new Date(b.data) - new Date(a.data); }));
  }

  function getEvents() {
    return resolve(data.events.slice().sort(function (a, b) { return new Date(a.data) - new Date(b.data); }));
  }

  function getUpcomingEvents(limit) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var upcoming = data.events
      .filter(function (e) { return new Date(e.data) >= today; })
      .sort(function (a, b) { return new Date(a.data) - new Date(b.data); });
    return resolve(limit ? upcoming.slice(0, limit) : upcoming);
  }

  function getBandejao() {
    return resolve(data.bandejao);
  }

  function getContatos() {
    return resolve(data.contatos);
  }

  function rechargeBandejao(valor, metodo) {
    data.bandejao.saldo = Math.round((data.bandejao.saldo + valor) * 100) / 100;
    var novoId = Math.max.apply(null, data.bandejao.historico.map(function (h) { return h.id; })) + 1;
    data.bandejao.historico.unshift({
      id: novoId,
      tipo: 'recarga',
      valor: valor,
      data: new Date().toISOString(),
      descricao: 'Recarga via ' + (metodo === 'pix' ? 'Pix' : 'cartão de crédito/débito')
    });
    return resolve(data.bandejao);
  }

  return {
    getUser: getUser,
    getGrades: getGrades,
    getCurrentPeriodGrades: getCurrentPeriodGrades,
    getCourses: getCourses,
    getCourseById: getCourseById,
    getEmails: getEmails,
    getEmailById: getEmailById,
    getUnreadEmailCount: getUnreadEmailCount,
    getAvaPosts: getAvaPosts,
    getEvents: getEvents,
    getUpcomingEvents: getUpcomingEvents,
    getBandejao: getBandejao,
    rechargeBandejao: rechargeBandejao,
    getContatos: getContatos
  };
})(UERJHub.data);
