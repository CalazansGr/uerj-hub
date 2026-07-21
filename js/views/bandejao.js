window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

UERJHub.views.bandejao = (function () {
  var svc = UERJHub.services;
  var card = UERJHub.components.card;

  var VALORES_RAPIDOS = [10, 20, 50, 100];
  var PIX_CODE = '00020126580014BR.GOV.BCB.PIX0136uerj-hub-simulado-52040000530398654040.005802BR5913UERJ HUB SIM6009RIO DE JANEIRO62070503***6304ABCD';

  function tipoClass(tipo) {
    return tipo === 'recarga' ? 'valor-positivo' : 'valor-negativo';
  }

  function sinal(tipo) {
    return tipo === 'recarga' ? '+' : '';
  }

  function renderHistoricoItem(h) {
    return (
      '<li class="historico-item">' +
        '<div>' +
          '<span class="descricao">' + h.descricao + '</span>' +
          '<span class="data">' + card.formatDateTime(h.data) + '</span>' +
        '</div>' +
        '<span class="valor ' + tipoClass(h.tipo) + '">' + sinal(h.tipo) + card.formatCurrency(h.valor) + '</span>' +
      '</li>'
    );
  }

  function renderValoresRapidos() {
    return VALORES_RAPIDOS.map(function (v) {
      return '<button type="button" class="valor-btn" data-valor="' + v + '">' + card.formatCurrency(v) + '</button>';
    }).join('');
  }

  function render() {
    return svc.getBandejao().then(function (b) {
      var historicoHtml = b.historico.map(renderHistoricoItem).join('') ||
        '<li class="empty-state">Nenhuma movimentação ainda.</li>';

      return (
        '<div class="section-head"><h1>Bandejão</h1></div>' +

        '<div class="bandejao-banner">' +
          '<div><p>Saldo disponível</p><div class="saldo-value" id="saldo-atual">' + card.formatCurrency(b.saldo) + '</div></div>' +
          '<p>Aproxime o cartão da catraca para usar seu saldo no bandejão.</p>' +
        '</div>' +

        '<div class="card recarga-card">' +
          '<h3>Recarregar cartão</h3>' +
          '<p style="color:var(--color-text-muted);">Escolha um valor e a forma de pagamento. Ambiente de simulação — nenhum dado bancário real é enviado ou armazenado.</p>' +

          '<div id="recarga-feedback"></div>' +

          '<div class="valor-options" id="valor-options">' + renderValoresRapidos() + '</div>' +
          '<div class="field valor-custom-field">' +
            '<label for="valor-custom">Ou digite outro valor</label>' +
            '<input type="number" id="valor-custom" min="1" step="0.01" inputmode="decimal" placeholder="R$ 0,00">' +
          '</div>' +

          '<div class="row metodo-tabs">' +
            '<button type="button" class="pill active" aria-pressed="true" data-metodo="pix">Pix</button>' +
            '<button type="button" class="pill" aria-pressed="false" data-metodo="cartao">Cartão de crédito/débito</button>' +
          '</div>' +

          '<div class="metodo-panel active" data-metodo-panel="pix">' +
            '<div class="pix-box">' +
              '<div class="pix-qr" aria-hidden="true"></div>' +
              '<div class="pix-code-row">' +
                '<code id="pix-code">' + PIX_CODE + '</code>' +
                '<button type="button" class="btn btn-ghost" id="copiar-pix">Copiar código</button>' +
              '</div>' +
            '</div>' +
            '<button type="button" class="btn btn-success btn-block" id="confirmar-pix">Simular pagamento confirmado</button>' +
          '</div>' +

          '<div class="metodo-panel" data-metodo-panel="cartao">' +
            '<form id="form-cartao" novalidate>' +
              '<div class="field">' +
                '<label for="cartao-numero">Número do cartão</label>' +
                '<input type="text" id="cartao-numero" inputmode="numeric" autocomplete="cc-number" maxlength="19" placeholder="0000 0000 0000 0000" required>' +
              '</div>' +
              '<div class="field">' +
                '<label for="cartao-nome">Nome impresso no cartão</label>' +
                '<input type="text" id="cartao-nome" autocomplete="cc-name" placeholder="Como está no cartão" required>' +
              '</div>' +
              '<div class="row card-form-grid">' +
                '<div class="field">' +
                  '<label for="cartao-validade">Validade</label>' +
                  '<input type="text" id="cartao-validade" inputmode="numeric" autocomplete="cc-exp" maxlength="5" placeholder="MM/AA" required>' +
                '</div>' +
                '<div class="field">' +
                  '<label for="cartao-cvv">CVV</label>' +
                  '<input type="text" id="cartao-cvv" inputmode="numeric" autocomplete="cc-csc" maxlength="4" placeholder="000" required>' +
                '</div>' +
              '</div>' +
              '<button type="submit" class="btn btn-success btn-block">Confirmar recarga</button>' +
            '</form>' +
          '</div>' +
        '</div>' +

        '<div class="card">' +
          '<div class="section-head"><h3>Histórico</h3></div>' +
          '<ul class="historico-list">' + historicoHtml + '</ul>' +
        '</div>'
      );
    });
  }

  function afterRender(root) {
    var valorSelecionado = null;
    var metodoAtual = 'pix';

    var valorOptionsEl = root.querySelector('#valor-options');
    var customInput = root.querySelector('#valor-custom');
    var feedbackEl = root.querySelector('#recarga-feedback');
    var saldoEl = root.querySelector('#saldo-atual');
    var historicoListEl = root.querySelector('.historico-list');
    var metodoTabs = root.querySelectorAll('[data-metodo]');
    var metodoPanels = root.querySelectorAll('[data-metodo-panel]');

    function valorAtual() {
      var custom = parseFloat((customInput.value || '').replace(',', '.'));
      if (!isNaN(custom) && custom > 0) return Math.round(custom * 100) / 100;
      return valorSelecionado;
    }

    valorOptionsEl.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-valor]');
      if (!btn) return;
      valorSelecionado = Number(btn.getAttribute('data-valor'));
      customInput.value = '';
      valorOptionsEl.querySelectorAll('.valor-btn').forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
    });

    customInput.addEventListener('input', function () {
      if (customInput.value) {
        valorSelecionado = null;
        valorOptionsEl.querySelectorAll('.valor-btn').forEach(function (b) { b.classList.remove('active'); });
      }
    });

    metodoTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        metodoAtual = tab.getAttribute('data-metodo');
        metodoTabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-pressed', 'false'); });
        tab.classList.add('active');
        tab.setAttribute('aria-pressed', 'true');
        metodoPanels.forEach(function (p) {
          p.classList.toggle('active', p.getAttribute('data-metodo-panel') === metodoAtual);
        });
        feedbackEl.innerHTML = '';
      });
    });

    var copiarBtn = root.querySelector('#copiar-pix');
    copiarBtn.addEventListener('click', function () {
      var code = root.querySelector('#pix-code').textContent;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(function () {
          copiarBtn.textContent = 'Copiado!';
          setTimeout(function () { copiarBtn.textContent = 'Copiar código'; }, 2000);
        });
      }
    });

    function mostrarErro(msg) {
      feedbackEl.innerHTML = '<div class="alert alert-error" role="alert">' + msg + '</div>';
    }

    function mostrarSucesso(valor) {
      feedbackEl.innerHTML = '<div class="alert alert-success" role="status">Recarga de ' + card.formatCurrency(valor) + ' confirmada com sucesso!</div>';
      svc.getBandejao().then(function (b) {
        saldoEl.textContent = card.formatCurrency(b.saldo);
        historicoListEl.innerHTML = b.historico.map(renderHistoricoItem).join('');
      });
    }

    // retorna true quando a recarga foi aceita e está em processamento
    function processarRecarga(btn, metodo) {
      var valor = valorAtual();
      if (!valor || valor <= 0) {
        mostrarErro('Escolha ou digite um valor válido para recarregar.');
        return false;
      }
      feedbackEl.innerHTML = '';
      var textoOriginal = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Confirmando...';
      setTimeout(function () {
        svc.rechargeBandejao(valor, metodo).then(function () {
          btn.disabled = false;
          btn.textContent = textoOriginal;
          mostrarSucesso(valor);
          customInput.value = '';
          valorSelecionado = null;
          valorOptionsEl.querySelectorAll('.valor-btn').forEach(function (b) { b.classList.remove('active'); });
        });
      }, 800);
      return true;
    }

    var confirmarPixBtn = root.querySelector('#confirmar-pix');
    confirmarPixBtn.addEventListener('click', function () {
      processarRecarga(confirmarPixBtn, 'pix');
    });

    var formCartao = root.querySelector('#form-cartao');
    formCartao.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = formCartao.querySelector('button[type="submit"]');
      // só limpamos os campos do cartão quando a recarga é aceita — evita
      // apagar o que o usuário digitou se ele esqueceu de escolher um valor
      if (processarRecarga(submitBtn, 'cartao')) formCartao.reset();
    });
  }

  return { render: render, afterRender: afterRender };
})();
