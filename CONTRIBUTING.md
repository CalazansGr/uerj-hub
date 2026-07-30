# Contribuindo com o UERJ Hub

Este projeto foi pensado para ser mantido por várias gerações de alunos, não só por quem escreveu a primeira versão. Se você chegou aqui querendo continuar o trabalho, seja bem-vindo(a).

## Antes de começar

- Leia o [README.md](README.md) — principalmente a seção "Estrutura" e "Como adaptar para outra universidade ou curso", que explica onde fica cada coisa.
- Não há build, não há dependências para instalar. Basta editar os arquivos e recarregar o navegador.
- Suba um servidor local para testar (`python -m http.server 8080`) em vez de abrir `index.html` direto com `file://`, para evitar problemas de fetch/CORS.

## Fluxo de contribuição

1. Crie um fork ou uma branch a partir de `main` (ex: `git checkout -b minha-melhoria`).
2. Faça as alterações. Mantenha o padrão do projeto:
   - HTML/CSS/JS puro, sem framework e sem bundler.
   - Views novas seguem o padrão `render()` (retorna HTML) + `afterRender()` (liga eventos) — veja qualquer arquivo em `js/views/` como exemplo.
   - Dados mock ficam isolados em `js/data/`, nunca hardcoded direto na view.
3. Teste no navegador (desktop e, se possível, mobile) antes de abrir o PR.
4. Abra um Pull Request descrevendo o que mudou e por quê. Se for uma tela nova, prints ajudam bastante quem for revisar.
5. Se encontrar um bug ou tiver uma ideia mas não tiver tempo de implementar, abra uma Issue — vale mais registrar do que perder a ideia.

## Ideias de continuidade

Coisas que ficaram de fora do protótipo original e que podem virar contribuições futuras:

- Persistência real (hoje os dados mock voltam ao estado inicial a cada refresh).
- Modo responsivo mais refinado para telas muito pequenas.
- Acessibilidade (contraste, navegação por teclado, leitores de tela).
- Testes automatizados (hoje a verificação é manual, no navegador).

## Dúvidas

Abra uma Issue no repositório — é o lugar certo para perguntas, mesmo que pareçam básicas.
