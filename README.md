# Fortal Roleplay

Mapeamento cultural e satírico de Fortaleza, CE. +127 locais categorizados por vibe.

## Estrutura

```
fortal-roleplay/
├── index.html              # Mapa principal
├── roteiros.html           # Lista de roteiros
├── sobre.html              # Manifesto + termos
├── roteiro-*.html          # 18 páginas de roteiro
├── assets/
│   ├── css/
│   │   ├── index.css       # Estilos do mapa
│   │   ├── roteiros.css    # Estilos dos roteiros
│   │   ├── roteiro.css     # Estilo compartilhado das páginas de roteiro
│   │   └── sobre.css       # Estilos do sobre
│   ├── js/
│   │   ├── index.js        # Lógica do mapa (Leaflet + database)
│   │   ├── roteiros.js     # Lógica da página de roteiros
│   │   ├── roteiro.js      # JS compartilhado dos roteiros
│   │   └── sobre.js        # Lógica do sobre
│   └── img/
│       ├── logo.png
│       └── logohead.png
└── data/
    └── locais.json         # 127 locais (fallback offline)
```

## Categorias

| Categoria    | Cor      | Descrição                          |
|--------------|----------|------------------------------------|
| Cult         | #8e4ec6  | Alternativo, nicho, underground    |
| Underground  | #c0392b  | Baladas, noite, sem filtro         |
| Elite        | #007aff  | Premium, negócios, alta renda      |
| Povão        | #34c759  | Popular, custo-benefício, tradição |
| Neutros      | #e8a020  | Shopping, turismo, público geral   |

## Deploy (GitHub Pages)

1. Faça upload de todos os arquivos em um repositório público
2. Vá em Settings → Pages → Source: `main` / `/ (root)`
3. Acesse `https://seu-usuario.github.io/fortal-roleplay`

> **Nota:** A API backend (C#) é opcional. Sem ela, o site carrega automaticamente
> de `data/locais.json`. Tudo funciona offline.

## Tecnologias

- Leaflet.js 1.9.4 (mapa)
- GSAP 3.12.2 (animações)
- OpenStreetMap + CartoDB tiles
- Vanilla JS / HTML5 / CSS3

## Licença

Projeto independente, não-comercial. Veja `sobre.html` para detalhes legais.
