# ALEE.ST — portfólio pessoal

Um portfólio estático, responsivo e funcional, sem Lovable, sem dependências e sem precisar instalar ferramentas de programação.

## Como abrir

1. Extraia o arquivo ZIP para uma pasta.
2. Abra `index.html` com seu navegador.
3. Pronto: o site funciona localmente.

Para publicar na internet, envie os arquivos para qualquer hospedagem de site estático, mantendo a estrutura de pastas. O site usa rotas por hash (`#/projetos/erp-estudos`), então as páginas internas funcionam em hospedagens estáticas sem configuração especial de servidor.

## Como personalizar

Abra `app.js` em um editor de texto, como Bloco de Notas ou VS Code.

### Informações pessoais

No começo do arquivo, altere `profile`:
- `name`: seu nome.
- `email`: seu e-mail real.
- `github`: URL do seu perfil.
- `linkedin`: URL do seu perfil.
- `whatsapp`: URL real de conversa do WhatsApp.

Links vazios ficam ocultos. Não deixe os exemplos fictícios como se fossem seus contatos.

### Adicionar um projeto

Na lista `projects`, copie o objeto de exemplo e altere:
- `slug`: identificador único, sem espaços (ex.: `meu-sistema`).
- `title`, `summary`, `description`, `problem`.
- `platform`: `desktop`, `web` ou `study`.
- `status`, `category`, `icon`.
- `tech`: lista de tecnologias realmente usadas.
- `features`: lista de funcionalidades reais.
- `featured: true`: mostra o projeto na página inicial.
- `draft: true`: identifica o projeto como rascunho.
- `demoUrl`: URL da demonstração real.
- `downloadUrl`: URL real de download (pode ser um caminho como `downloads/demo.zip` se você adicionar o arquivo à pasta do site).
- `videoUrl`: link real do tutorial, preferencialmente YouTube.
- `repoUrl`: link real do repositório.
- `screenshots`: lista de imagens, por exemplo `[{ src: "assets/meu-sistema.png", alt: "Tela inicial do sistema" }]`.
- `installation`: lista de passos reais para instalar/usar a versão demo.

Os botões de demonstração, download, tutorial e repositório aparecem somente quando há links válidos. Para download, verifique que o arquivo existe e não inclua dados pessoais ou credenciais no pacote.

### Visual

Edite `styles.css`. As cores principais ficam no início, em `:root`. A identidade visual usa fundo claro, tipografia limpa, tons de grafite e azul cobalto como destaque. A marca é **ALEE.ST**, com assinatura pessoal “Alessandro — Software & Sistemas”.

## Estrutura

- `index.html`: estrutura das páginas.
- `styles.css`: identidade visual, responsividade e acessibilidade.
- `app.js`: navegação, conteúdo dos projetos, filtros e ações.
- `assets/favicon.svg`: ícone do site.

## Observações

- O portfólio apresenta somente o Sistema ERP educacional. A data de início está indicada como 28/09/2026, e a fase atual é a estruturação das tabelas do banco de dados. As etapas futuras são marcadas como planejadas; não representam funcionalidades já implementadas.
- O portfólio não inclui backend, login ou formulário que finja enviar mensagens. Configure contatos reais para que visitantes possam entrar em contato.
- Antes de publicar, confira todos os textos, links, capturas de tela, arquivos para download e vídeos.
