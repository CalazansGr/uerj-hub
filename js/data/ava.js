window.UERJHub = window.UERJHub || {};
UERJHub.data = UERJHub.data || {};

// cursoId referencia UERJHub.data.courses. anexos são PDFs de verdade,
// clicáveis (abrem em outra aba), em assets/pdfs/.
UERJHub.data.ava = [
  {
    id: 1, cursoId: 'calc3', data: '2026-07-18',
    titulo: 'Prova remarcada para 25/07',
    corpo: 'Pessoal, a prova foi remarcada para o dia 25/07 (mesmo horário de aula). Revisem a lista 6 antes da prova.',
    anexos: []
  },
  {
    id: 2, cursoId: 'calc3', data: '2026-07-14',
    titulo: 'Lista de exercícios 6 disponível',
    corpo: 'Publiquei a lista 6, sobre integrais triplas. Vale ponto extra pra quem entregar até a véspera da prova.',
    anexos: [{ nome: 'Lista de exercícios 6.pdf', url: 'assets/pdfs/calc3-lista-exercicios-6.pdf' }]
  },
  {
    id: 3, cursoId: 'calc3', data: '2026-07-11',
    titulo: 'Slides da aula de integrais triplas',
    corpo: 'Segue o material usado em aula, com os exemplos resolvidos em coordenadas cilíndricas e esféricas.',
    anexos: [{ nome: 'Slides — Integrais triplas.pdf', url: 'assets/pdfs/calc3-slides-integrais-triplas.pdf' }]
  },
  {
    id: 4, cursoId: 'calc3', data: '2026-07-19',
    titulo: 'Instruções para quem vai fazer prova de reposição',
    corpo: 'Quem faltou à prova e tem direito a reposição precisa enviar o atestado médico dentro do prazo — os detalhes estão no anexo.',
    anexos: [{ nome: 'Instruções — Prova de reposição.pdf', url: 'assets/pdfs/calc3-instrucoes-prova-reposicao.pdf' }]
  },
  {
    id: 5, cursoId: 'mecsol', data: '2026-07-15',
    titulo: 'Roteiro do laboratório 3',
    corpo: 'Segue o roteiro do ensaio de flexão em vigas. Relatório em grupo, entrega dia 21/07.',
    anexos: [{ nome: 'Roteiro do laboratório 3.pdf', url: 'assets/pdfs/mecsol-roteiro-laboratorio-3.pdf' }]
  },
  {
    id: 6, cursoId: 'po1', data: '2026-07-10',
    titulo: 'Estudo de caso — Programação Linear',
    corpo: 'Estudo de caso pra praticar o método simplex. Comparem com a planilha modelo que passei em aula.',
    anexos: [{ nome: 'Estudo de caso — Programação Linear.pdf', url: 'assets/pdfs/po1-estudo-caso-programacao-linear.pdf' }]
  },
  {
    id: 7, cursoId: 'qualidade', data: '2026-07-17',
    titulo: 'Leitura obrigatória para o seminário',
    corpo: 'Leiam o artigo antes da próxima aula — cada grupo vai apresentar um exemplo real de aplicação.',
    anexos: [{ nome: 'Artigo — Six Sigma na indústria.pdf', url: 'assets/pdfs/qualidade-artigo-six-sigma.pdf' }]
  },
  {
    id: 8, cursoId: 'ergo', data: '2026-07-09',
    titulo: 'Resumo da NR-17',
    corpo: 'Material de apoio sobre ergonomia no trabalho, vai cair na próxima avaliação.',
    anexos: [{ nome: 'Norma NR-17 — resumo.pdf', url: 'assets/pdfs/ergo-nr17-resumo.pdf' }]
  }
];
