// Script utilitário — gera os PDFs de exemplo usados no AVA (assets/pdfs/*).
// Não faz parte do app em si, só popula o mock com anexos reais e clicáveis.
// Rode com: node scripts/gen-pdfs.js
var fs = require('fs');
var path = require('path');

function escapePdfText(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function buildPdf(titulo, linhas) {
  var lines = [];
  lines.push('BT /F1 18 Tf 72 740 Td (' + escapePdfText(titulo) + ') Tj ET');
  var y = 700;
  linhas.forEach(function (linha) {
    lines.push('BT /F1 12 Tf 72 ' + y + ' Td (' + escapePdfText(linha) + ') Tj ET');
    y -= 20;
  });
  var content = lines.join('\n');
  var contentBytes = Buffer.byteLength(content, 'latin1');

  var objects = [];
  objects.push('<< /Type /Catalog /Pages 2 0 R >>');
  objects.push('<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  objects.push('<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>');
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  objects.push('<< /Length ' + contentBytes + ' >>\nstream\n' + content + '\nendstream');

  var pieces = ['%PDF-1.4\n'];
  var offsets = [0];
  var pos = pieces[0].length;

  objects.forEach(function (obj, i) {
    var num = i + 1;
    var chunk = num + ' 0 obj\n' + obj + '\nendobj\n';
    offsets.push(pos);
    pieces.push(chunk);
    pos += Buffer.byteLength(chunk, 'latin1');
  });

  var xrefStart = pos;
  var xref = 'xref\n0 ' + (objects.length + 1) + '\n0000000000 65535 f \n';
  for (var i = 1; i <= objects.length; i++) {
    xref += String(offsets[i]).padStart(10, '0') + ' 00000 n \n';
  }
  var trailer = 'trailer\n<< /Size ' + (objects.length + 1) + ' /Root 1 0 R >>\nstartxref\n' + xrefStart + '\n%%EOF';

  return Buffer.from(pieces.join('') + xref + trailer, 'latin1');
}

var docs = [
  {
    file: 'calc3-lista-exercicios-6.pdf',
    titulo: 'Lista de Exercícios 6 — Cálculo III',
    linhas: [
      'Prof. Ricardo Andrade — Engenharia de Produção',
      '',
      '1) Calcule a integral tripla de f(x,y,z) = xyz sobre a região',
      '   limitada por 0<=x<=1, 0<=y<=x, 0<=z<=x+y.',
      '2) Determine o volume do sólido delimitado pelas superfícies',
      '   z = 4 - x^2 - y^2 e z = 0.',
      '3) Use coordenadas cilíndricas para resolver a integral tripla',
      '   de f(x,y,z) = x^2 + y^2 sobre o cilindro x^2+y^2<=4, 0<=z<=3.',
      '',
      'Entrega até 25/07/2026, junto com a prova remarcada.'
    ]
  },
  {
    file: 'calc3-slides-integrais-triplas.pdf',
    titulo: 'Slides — Integrais Triplas',
    linhas: [
      'Prof. Ricardo Andrade — Engenharia de Produção',
      '',
      '- Definição de integral tripla e interpretação geométrica',
      '- Mudança de variáveis: coordenadas cilíndricas e esféricas',
      '- Aplicações: volume, massa e centro de massa',
      '- Exercícios resolvidos em aula'
    ]
  },
  {
    file: 'calc3-instrucoes-prova-reposicao.pdf',
    titulo: 'Instruções — Prova de Reposição',
    linhas: [
      'Prof. Ricardo Andrade — Engenharia de Produção',
      '',
      'Alunos que faltaram à prova do dia 25/07 e têm direito a',
      'reposição devem seguir os passos abaixo:',
      '',
      '1) Enviar o atestado médico (ou justificativa documentada)',
      '   por aqui, respondendo este comunicado, em até 5 dias úteis',
      '   após a data da prova.',
      '2) Aguardar a confirmação da data de reposição, publicada aqui',
      '   no AVA.',
      '3) Comparecer com documento de identificação no dia marcado.',
      '',
      'Sem o atestado dentro do prazo, não será possível agendar a',
      'reposição.'
    ]
  },
  {
    file: 'mecsol-roteiro-laboratorio-3.pdf',
    titulo: 'Roteiro do Laboratório 3 — Mecânica dos Sólidos',
    linhas: [
      'Profa. Camila Duarte — Engenharia de Produção',
      '',
      'Ensaio de flexão em vigas — objetivo, materiais, procedimento',
      'experimental e roteiro para o relatório final.',
      '',
      'Entrega do relatório: 21/07/2026.'
    ]
  },
  {
    file: 'po1-estudo-caso-programacao-linear.pdf',
    titulo: 'Estudo de Caso — Programação Linear',
    linhas: [
      'Prof. Diego Farias — Engenharia de Produção',
      '',
      'Estudo de caso de otimização de mix de produção usando',
      'programação linear. Resolver com o método simplex e',
      'comparar com a solução obtida na planilha modelo.'
    ]
  },
  {
    file: 'qualidade-artigo-six-sigma.pdf',
    titulo: 'Artigo — Six Sigma na Indústria',
    linhas: [
      'Profa. Renata Souza — Engenharia de Produção',
      '',
      'Leitura obrigatória para o seminário em grupo da próxima aula.',
      'Discutir aplicações do Six Sigma em processos produtivos e',
      'trazer um exemplo real para apresentar.'
    ]
  },
  {
    file: 'ergo-nr17-resumo.pdf',
    titulo: 'Norma NR-17 — Resumo',
    linhas: [
      'Prof. Marcelo Vianna — Engenharia de Produção',
      '',
      'Resumo comentado da Norma Regulamentadora NR-17',
      '(Ergonomia): mobiliário, condições ambientais e organização',
      'do trabalho.'
    ]
  }
];

var outDir = path.join(__dirname, '..', 'assets', 'pdfs');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

docs.forEach(function (doc) {
  var pdf = buildPdf(doc.titulo, doc.linhas);
  fs.writeFileSync(path.join(outDir, doc.file), pdf);
  console.log('gerado: ' + doc.file + ' (' + pdf.length + ' bytes)');
});
