# Diretrizes de Desenvolvimento e Arquitetura — NEO3D

Este documento estabelece as diretrizes de desenvolvimento, arquitetura e design para o projeto **NEO3D**, baseando-se na análise técnica do site atual e na referência estética e funcional do projeto **CARGO Architecture**.

---

## 1. Análise Comparativa e Diagnóstico

### 1.1. Site Atual: NEO3D (Raiz)
O site atual já implementa uma estética minimalista de alto padrão, inspirada diretamente na linguagem visual de escritórios de arquitetura contemporâneos.

- **Design Visual:** Paleta monocromática (Preto/Branco), tipografia *Inter* com foco em legibilidade e espaçamento, uso de *Glassmorphism* no cabeçalho.
- **Componentes Chave:**
    - **Hero Infinite Carousel:** Carrossel horizontal infinito movido via JavaScript para garantir fluidez total e sincronia com o cursor.
    - **Header Adaptativo:** Esconde-se ao rolar para baixo e reaparece ao rolar para cima; utiliza efeito de desfoque (backdrop-filter).
    - **Grid de Projetos:** Sistema flexível que permite alternar entre visualização em Grade (Grid) e Lista (List).
    - **Animações de Revelação:** Uso de `IntersectionObserver` para animar a entrada de elementos conforme o scroll.
- **Arquitetura Técnica:** Vanilla JS (sem frameworks pesados), CSS com metodologia BEM (Block Element Modifier), estrutura multi-página estática.

### 1.2. Referência: CARGO Architecture (`/cargo`)
A referência principal apresenta uma maturidade visual superior e funcionalidades mais complexas voltadas para conversão e portfólio profissional.

- **Diferenciais de UI/UX:**
    - **Tipografia:** Uso da família *Swiss 721*, conferindo um aspecto mais "suíço" e brutalista elegante.
    - **Micro-interações:** Transições de página mais suaves e estados de *hover* mais sofisticados (ex: animações de texto no menu).
    - **Fluxos de Conversão:** Formulários detalhados (Gravity Forms) e CTAs claros ("Votre projet commence ici").
    - **Metadados:** Exibição clara de Ano e Localização em cada projeto, reforçando a autoridade.
- **Tecnologia:** Baseado em WordPress, utilizando **GSAP** para animações complexas e **Tailwind CSS** para utilitários de design.

---

## 2. Diretrizes de Design (UI/UX)

### 2.1. Princípios Estéticos
- **Minimalismo Radical:** Menos é mais. O conteúdo (peças 3D) deve ser o protagonista.
- **Espaçamento Negativo:** Uso generoso de margens e paddings para permitir que o design "respire".
- **Contraste de Tipografia:** Títulos em caixa alta (uppercase) com alto *letter-spacing* contrastando com textos de corpo leves (weight 300).

### 2.2. Padrões de Componentes
- **Imagens:** Devem ter `aspect-ratio` definido (4:3 para grid, 16:9 ou 16:7 para lista) e `object-fit: cover`.
- **Botões (CTAs):** Bordas retas, sem border-radius (ou mínimo de 4px), com transições de inversão de cor no hover.
- **Transições:** Toda navegação entre páginas deve ser precedida por um efeito de `fade-out` de aproximadamente 400ms.

---

## 3. Arquitetura Técnica e Código

### 3.1. Stack Recomendada
- **Core:** HTML5, CSS3, Vanilla JS (manter a leveza atual).
- **Animações:** Evoluir o uso de `IntersectionObserver`. Considerar a integração leve do **GSAP** apenas para interações de scroll mais complexas (como as vistas no site Cargo).
- **Assets:** Utilizar formatos modernos (WebP para imagens, SVG para ícones/logos).

### 3.2. Padrões de Código
- **CSS:** Seguir estritamente a convenção **BEM**.
    - Ex: `.project-card`, `.project-card__image`, `.project-card--featured`.
- **JavaScript:**
    - Código modular e orientado a eventos.
    - Evitar manipulação direta de estilos; preferir toggle de classes CSS.
    - Utilizar `requestAnimationFrame` para animações baseadas em JS (como o carrossel).

---

## 4. Fluxo de Navegação e Funcionalidades

### 4.1. Estrutura de Páginas
1.  **Home:** Impacto visual imediato com o carrossel infinito de peças premium.
2.  **Projetos:** Galeria filtrável com alternância de visualização.
3.  **Sobre:** Narrativa da marca com estatísticas de impacto.
4.  **Contato:** Foco total em conversão (WhatsApp + Formulário).

### 4.2. Requisitos de Performance
- **Lazy Loading:** Obrigatório para todas as imagens fora da dobra inicial.
- **Minificação:** Minificar arquivos CSS e JS antes do deploy.
- **Acessibilidade:** Garantir contraste adequado e tags `aria-label` em botões iconográficos.

---

## 5. Critérios de Sucesso
- Carregamento inicial da página em menos de 2 segundos.
- Experiência de scroll fluida (60fps) sem "jank".
- Responsividade perfeita em dispositivos móveis (Mobile-First).
- Alinhamento estético 1:1 com as referências de design arquitetônico de alto nível.

---
**Documento gerado em:** 14/05/2026
**Status:** Versão 1.0 — Pronto para implementação.
