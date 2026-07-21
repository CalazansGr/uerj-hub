window.UERJHub = window.UERJHub || {};
UERJHub.components = UERJHub.components || {};

UERJHub.components.card = (function () {
  function statCard(opts) {
    return (
      '<div class="card card-hover">' +
        '<p class="stat-label">' + opts.label + '</p>' +
        '<p class="stat-value">' + opts.value + '</p>' +
        (opts.hint ? '<p class="stat-hint">' + opts.hint + '</p>' : '') +
      '</div>'
    );
  }

  function formatDate(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  }

  function formatDateTime(iso) {
    var d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) + ' às ' +
      d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  function formatCurrency(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return { statCard: statCard, formatDate: formatDate, formatDateTime: formatDateTime, formatCurrency: formatCurrency };
})();
