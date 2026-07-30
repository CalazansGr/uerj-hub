# UERJ Hub

Protótipo de um "hub" unificado para alunos da UERJ — um trabalho de faculdade que propõe modernizar e integrar em um único lugar experiências hoje espalhadas entre o **Aluno Online**, o **Webmail (SOGo)**, o **AVA** e a comunicação com os Centros Acadêmicos (hoje só via WhatsApp/grupos).

⚠️ **Este é um protótipo acadêmico com dados fictícios.** Não se conecta aos sistemas reais da UERJ, não usa credenciais reais, não faz scraping e não processa pagamentos de verdade — inclusive a recarga do cartão do bandejão é 100% simulada. O login aceita qualquer matrícula/senha só para demonstrar a experiência de estar autenticado. Não tem afiliação oficial com a Universidade do Estado do Rio de Janeiro.

## Funcionalidades

| Tela | O que faz |
|---|---|
| **Início** | Visão geral: CR, frequência, e-mails não lidos, próxima aula, saldo do bandejão, próximos eventos e mural do CA |
| **Notas** | Boletim por período, com abas para períodos anteriores, notas de AP1/AP2/Final e barra de frequência |
| **Disciplinas** | Lista de disciplinas matriculadas com avisos e materiais publicados por cada uma |
| **Bandejão** | Saldo do cartão de refeição, recarga simulada via **Pix** (com código copia-e-cola) ou **cartão de crédito/débito**, e histórico de movimentações |
| **E-mail** | Caixa de entrada, enviados e lixeira, com leitura e resposta simulada de mensagens |
| **CAENG** | Mural do Centro Acadêmico: avisos, eventos e assembleias, filtráveis por categoria |
| **Calendário** | Linha do tempo unificada de prazos acadêmicos, aulas e eventos do CA |
| **Perfil** | Dados cadastrais do aluno e logout |

## Como rodar

Não há build step, dependência de Node ou instalação — é HTML/CSS/JS puro.

1. **Direto no navegador**: dê duplo-clique em `index.html` (algumas funcionalidades de fetch podem exigir servidor local em vez de `file://`, dependendo do navegador).
2. **Servidor local simples** (recomendado):
   ```bash
   python -m http.server 8080
   ```
   e acesse `http://localhost:8080`.
3. **GitHub Pages**: ative em *Settings → Pages* deste repositório (branch `main`, pasta raiz) para ter um link público hospedado.

## Estrutura

```
index.html              tela de login
app.html                shell do hub (sidebar + topbar + roteador por hash)
css/
  theme.css             tokens de design (cores, tipografia, raios, espaçamento)
  base.css              reset e estilos globais
  components.css        botões, cards, badges, inputs, pills, alerts...
  layout.css            sidebar, topbar, bottom-nav, containers
  animations.css        transições e keyframes
  views/                estilos específicos de cada tela
js/
  data/                 dados mock (o "banco de dados" fictício em memória)
  services/
    dataService.js       única camada que as views usam para ler/gravar dados
  components/            sidebar, topbar, card e badge reutilizáveis
  views/                 lógica de cada tela do hub
  router.js               roteador por hash (#/notas, #/email...)
  app.js                   bootstrap da aplicação
  auth.js                  sessão fake via sessionStorage
assets/img/              logo e ícones
```

## Navegação

O hub usa roteamento por hash (`app.html#/notas`, `app.html#/email`, etc.) para funcionar tanto abrindo o arquivo localmente quanto hospedado no GitHub Pages, sem precisar de servidor com rotas próprias.

## Como adaptar para outra universidade ou curso

O projeto foi feito para ser reaproveitado. Nenhuma lógica está amarrada à UERJ especificamente — tudo fica em poucos arquivos:

1. **Cores e tipografia** → `css/theme.css` (variáveis CSS no `:root`). Troque as cores primárias e prontas: todo o resto do site (botões, badges, gradientes) já usa essas variáveis.
2. **Logo** → `assets/img/logo-uerj.svg`. É um SVG simples, dá pra substituir por qualquer outro (mantenha proporções ~1:1 para caber no círculo do topbar/sidebar/login).
3. **Nome da marca** → troque "UERJ Hub" em `index.html`, `app.html` (título da aba, `.sidebar-brand`, `.topbar-brand`).
4. **Conteúdo mock** → cada arquivo em `js/data/` é só um objeto/array JavaScript. Edite `user.js`, `grades.js`, `courses.js`, `emails.js`, `caeng.js`, `events.js` e `bandejao.js` com os dados que fizerem sentido para a sua instituição.
5. **Adicionar ou remover uma aba** → edite o array `ITEMS` em `js/components/sidebar.js` (ícone + rota + label), crie `js/views/<nome>.js` seguindo o padrão de qualquer view existente (`render()` retorna HTML, `afterRender()` liga os eventos) e registre o script em `app.html`.
6. **Centro Acadêmico → equivalente local** → a tela `caeng` é genérica o suficiente para virar o mural de qualquer grêmio, DCE ou centro acadêmico — só trocar os textos em `js/data/caeng.js`.

Sinta-se livre para copiar a ideia inteira, adaptar só uma tela, ou usar como referência de design system em outro projeto de faculdade.

## Stack

HTML5, CSS3 (variáveis CSS, Grid/Flexbox) e JavaScript ES5 puro (sem framework, sem bundler, sem dependências externas além das fontes do Google Fonts). Compatibilidade ampla e código fácil de ler para quem está aprendendo.

## Licença

Distribuído sob a licença [MIT](LICENSE) — pode copiar, modificar, usar em outro projeto (inclusive comercial) e redistribuir livremente, contanto que mantenha o aviso de copyright e a licença original. Nenhuma garantia é oferecida sobre o código.

## Contribuindo

Sugestões, issues e pull requests são bem-vindos. Se você adaptar este projeto para a sua universidade, ficaria muito feliz em saber — abra uma issue contando! Veja o [CONTRIBUTING.md](CONTRIBUTING.md) para o fluxo de contribuição e ideias de continuidade para próximas gerações.
