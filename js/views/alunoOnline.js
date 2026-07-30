window.UERJHub = window.UERJHub || {};
UERJHub.views = UERJHub.views || {};

(function () {
  // espelha os grupos de serviço do Aluno Online real. Itens com "route"
  // abrem uma tela já implementada no protótipo; os demais caem na tela
  // genérica "em construção", já que só uma faculdade inteira de telas
  // reais caberia num sistema de verdade, não num protótipo acadêmico
  var GROUPS = [
    {
      titulo: 'Cadastro',
      itens: [
        { label: 'Alteração de Senha' },
        { label: 'Dados Bancários' },
        { label: 'Dados Complementares' },
        { label: 'Dados para Contato' },
        { label: 'Dados Pessoais' },
        { label: 'Emissão de Documentos' }
      ]
    },
    {
      titulo: 'Consulta Acadêmica',
      itens: [
        { label: 'Disciplinas do Currículo / A Cursar' },
        { label: 'Disciplinas Universais' },
        { label: 'Disciplinas em Curso', route: 'disciplinas' },
        { label: 'Notas do Período', route: 'notas' },
        { label: 'Pendências de Documentos' },
        { label: 'Requisitos Cursados' },
        { label: 'Síntese da Formação' },
        { label: 'Situação no ENADE' }
      ]
    },
    {
      titulo: 'Inscrição em Disciplinas',
      itens: [
        { label: 'SID: Solicitar Inscrição' },
        { label: 'SID: Consultar Inscrição' },
        { label: 'RID: Resultado Provisório' },
        { label: 'RID: Resultado da Inscrição' },
        { label: 'SAID: Alteração de Inscrição' },
        { label: 'SAID: Cancelamento de Inscrição' },
        { label: 'SAID: Consultar Recibos' },
        { label: 'Ramificação: Abrir' },
        { label: 'Ramificação: Excluir' }
      ]
    },
    {
      titulo: 'Procedimento Acadêmico',
      itens: [
        { label: 'Retorno Antecipado' },
        { label: 'Trancamento de Matrícula' },
        { label: 'Transferência Interna' }
      ]
    },
    {
      titulo: 'Outras Consultas',
      itens: [
        { label: 'Consulte Página do DAA' },
        { label: 'Consulte Página do DEP' },
        { label: 'Critérios de Avaliação (Crédito)' },
        { label: 'Critérios de Avaliação (Seriado)' },
        { label: 'Tabela de Horário UERJ / CAP' }
      ]
    }
  ];

  function renderItem(item) {
    var href = item.route
      ? '#/' + item.route
      : '#/aluno-online/em-breve?titulo=' + encodeURIComponent(item.label);
    return '<a href="' + href + '" class="hub-link">' + item.label + '</a>';
  }

  function renderGroup(g) {
    return (
      '<div class="hub-group">' +
        '<div class="hub-group-title">' + g.titulo + '</div>' +
        '<div class="hub-group-body">' + g.itens.map(renderItem).join('') + '</div>' +
      '</div>'
    );
  }

  function render() {
    return (
      '<div class="section-head"><h1>Aluno Online</h1></div>' +
      '<p style="color:var(--color-text-muted);">Cadastro, consultas acadêmicas, inscrição em disciplinas e outros serviços. Os itens já implementados neste protótipo abrem a tela real; o restante mostra um aviso de "em construção".</p>' +
      '<div class="hub-groups">' + GROUPS.map(renderGroup).join('') + '</div>'
    );
  }

  UERJHub.views['aluno-online'] = { render: render };
})();
