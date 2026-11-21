# Michael Vitale — Psicólogo

Site institucional estático (HTML, CSS e JS puro, sem dependências nem build).

## Estrutura

```
index.html
assets/
  css/style.css
  js/main.js        ← configuração (WhatsApp, e-mail, identidade)
  img/              ← logos, foto, favicons, imagem de compartilhamento
.nojekyll
```

## Configuração rápida

Abra `assets/js/main.js` e edite o bloco `CONFIG`:

| Campo | O que é |
|---|---|
| `whatsapp` | DDI + DDD + número, só dígitos (ex.: `5511999998888`) |
| `whatsappMsg` | Mensagem que já vem escrita no WhatsApp |
| `email` | E-mail de contato |
| `defaultTheme` | `presenca` ou `equilibrio` |
| `showPreviewBar` | `true` mostra a barra de troca de identidade; `false` para o site final |

## Mostrar ao cliente

Com a barra de prévia ativa, dá para mandar um link direto de cada versão:

- `.../?identidade=presenca`
- `.../?identidade=equilibrio`

## Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "Site Michael Vitale — versão inicial"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/site-michael-vitale.git
git push -u origin main
```

No GitHub: **Settings → Pages → Source: Deploy from a branch → main / (root)**.
Em 1–2 minutos o site fica em `https://SEU-USUARIO.github.io/site-michael-vitale/`.

### Domínio próprio (opcional)

1. Crie um arquivo `CNAME` na raiz com o domínio (ex.: `michaelvitale.com.br`).
2. No registro do domínio, aponte um `CNAME` de `www` para `SEU-USUARIO.github.io`
   e registros `A` do domínio raiz para os IPs do GitHub Pages.
3. Em Settings → Pages, ative **Enforce HTTPS**.

## Antes de publicar a versão final

- [ ] Preencher WhatsApp e e-mail no `CONFIG`
- [ ] Trocar textos entre `[colchetes]` (formação, abordagem, público, plataforma, e-Psi)
- [ ] Foto original em alta resolução em `assets/img/michael-sobre.jpg` (4:5)
- [ ] `showPreviewBar: false` e `defaultTheme` com a identidade escolhida
- [ ] Trocar a `og:image` para URL absoluta depois de ter o domínio

## Ética profissional (CFP)

O conteúdo segue o Art. 20 do Código de Ética e a Nota Técnica CFP nº 1/2022:
nome e CRP visíveis, sem depoimentos de pacientes, sem preços, sem promessa de resultados.
Não adicionar seções de depoimentos ou valores.
