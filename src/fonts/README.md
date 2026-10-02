# Fontes tipográficas

Syne (display) e DM Sans (corpo), hospedadas no repositório.

O build de produção não chama `fonts.googleapis.com` / `fonts.gstatic.com`. Isso evita a falha intermitente do Turbopack com `next/font/google` no GitHub Actions (`Can't resolve '@vercel/turbopack-next/internal/font/google/font'`).

Arquivos: subset `latin` da API CSS pública do Google Fonts (suficiente para `pt-BR`).
