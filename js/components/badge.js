window.UERJHub = window.UERJHub || {};
UERJHub.components = UERJHub.components || {};

UERJHub.components.badge = (function () {
  var SITUACAO_MAP = {
    cursando: { label: 'Cursando', cls: 'badge-info' },
    aprovado: { label: 'Aprovado', cls: 'badge-success' },
    reprovado: { label: 'Reprovado', cls: 'badge-danger' },
    pendente: { label: 'Pendente', cls: 'badge-warning' }
  };

  var ORIGEM_MAP = {
    academico: { label: 'Acadêmico', cls: 'badge-info' },
    aula: { label: 'Aula', cls: 'badge-success' }
  };

  function fromMap(map, key) {
    var entry = map[key] || { label: key, cls: 'badge-info' };
    return '<span class="badge ' + entry.cls + '">' + entry.label + '</span>';
  }

  return {
    situacao: function (key) { return fromMap(SITUACAO_MAP, key); },
    origem: function (key) { return fromMap(ORIGEM_MAP, key); }
  };
})();
