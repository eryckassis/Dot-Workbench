# Dot Workbench / Spotlight Dot Grid

Uma pequena aplicação interativa criada para praticar fundamentos de HTML semântico, CSS moderno (com variáveis, responsividade e theming automático light/dark), eventos de ponteiro e princípios de Clean Code. Você pode utilizá-la como um workbench (bancada de experimentação) para visualizar, testar ou demonstrar componentes e micro‑interações baseadas em posição do cursor.

---

## 1. Visão Geral

Este projeto exibe uma grade de pontos (dot grid) sobre a qual um efeito de “spotlight” (máscara radial) acompanha o ponteiro. As coordenadas atuais do cursor são exibidas em tempo real. O código foi intencionalmente mantido enxuto para favorecer estudo, extensão e migração futura para TypeScript ou React.

## 2. Objetivo do Projeto

Projeto de prática (laboratório) para:

- Exercitar HTML semântico enxuto
- Treinar manipulação de variáveis CSS a partir de eventos JavaScript
- Aplicar princípios de Clean Code em código front‑end minimalista
- Servir como base para experimentos (ex.: incorporar novos componentes dentro da área da grade)
- Facilitar futura migração incremental para TypeScript e/ou React sem reescrever tudo

## 3. Principais Funcionalidades

- Spotlight (máscara radial) que acompanha o ponteiro
- Grade responsiva com densidade baseada em `radial-gradient`
- Suporte a tema claro/escuro via `prefers-color-scheme`
- Exibição das coordenadas X e Y do ponteiro
- Uso de variáveis CSS (tokens de design) para fácil personalização

## 4. Arquitetura e Estrutura Simplificada

```text
dist/
  index.html       -> Estrutura semântica base
  style.css        -> Design tokens + layout + efeitos
  script.js        -> Captura de evento pointermove e atualização de variáveis
  Dot-Workbench/
    README.md      -> (Este documento)
```

Não há bundler obrigatório. Pode ser servido por qualquer servidor estático.

## 5. HTML Semântico

Boas práticas aplicadas ou recomendadas:

- Uso de `<main>` para delimitar a área principal
- `<header>` para o topo fixo com título e campos
- Substituição de `<div>` genéricas por elementos com significado quando pertinente (ex.: `fieldset` para agrupar outputs de posição do cursor)
- Título principal com `<h1>` assegurando hierarquia correta
- Evitar profundidade desnecessária de aninhamento

Exemplo conceitual (simplificado):

```html
<main>
  <section class="container">
    <header>
      <h1>DOT GRID</h1>
      <fieldset class="fields">
        <legend>Posição do cursor</legend>
        <span><label for="x-pos">X</label><output id="x-pos"></output></span>
        <span><label for="y-pos">Y</label><output id="y-pos"></output></span>
      </fieldset>
    </header>
    <section class="dot-grid">
      <section class="dot-grid-mask"></section>
    </section>
  </section>
</main>
```

## 6. Princípios de Clean Code Aplicados

- Função única e pequena para atualizar coordenadas
- Nomes descritivos (`updatePointerPosition` em vez de `handler` genérico)
- Early return para abortar se elementos de saída não existirem
- Zero lógica duplicada / DRY
- Uso de `const` para referências estáveis
- Código comentado apenas quando o “porquê” não é óbvio (evita ruído)

### Exemplo em TypeScript (opcional)

```ts
const root = document.documentElement;
const xOutput = document.querySelector<HTMLOutputElement>("#x-pos");
const yOutput = document.querySelector<HTMLOutputElement>("#y-pos");

function updatePointerPosition(event: PointerEvent): void {
  if (!xOutput || !yOutput) return; // Early return defensivo
  root.style.setProperty("--x", `${event.x}px`);
  root.style.setProperty("--y", `${event.y}px`);
  xOutput.textContent = event.x.toFixed(0);
  yOutput.textContent = event.y.toFixed(0);
}

document.addEventListener("pointermove", updatePointerPosition);
```

## 7. Variáveis CSS (Design Tokens)

O arquivo `style.css` define tokens de espaçamento, cor, raio e estado. Benefícios:

- Consistência visual
- Fácil theming (alterar apenas variáveis)
- Redução de repetição em regras

Exemplo:

```css
:root {
  --space-3: 16px;
  --surface-000: var(--gray-000);
  --text: var(--black);
}

@media (prefers-color-scheme: dark) {
  :root {
    --surface-000: var(--black);
    --text: var(--gray-000);
  }
}
```

## 8. Acessibilidade (A11y)

Medidas e sugestões:

- Uso de `<label>` associado por `for` e `id`
- Contrast ratio adequado entre texto e fundo (verificar com ferramentas como Lighthouse)
- Evitar depender exclusivamente de cor para transmitir informação
- Garantir foco visível caso elementos interativos sejam adicionados
- Manter hierarquia correta de headings

## 9. SEO Básico

Embora seja uma demonstração, boas práticas ajudam:

- Título de página descritivo (`<title>Spotlight Dot Grid</title>`)
- Uso de `<meta charset="UTF-8">` e potencial para adicionar `<meta name="description">`
- Estrutura semântica clara para rastreadores
- Evitar conteúdo bloqueado por JavaScript para informações críticas (a página é funcional sem JS para estrutura base)

Sugestão adicional:

```html
<meta
  name="description"
  content="Workbench interativo com grid de pontos e efeito spotlight para testes de UI e componentes."
/>
```

## 10. Guia de Uso (Local)

1. Clonar ou copiar os arquivos
2. Abrir `index.html` diretamente no navegador OU servir com um servidor estático simples

Exemplos de servidores locais (opcionais):

```bash
# Python 3
python -m http.server 5173

# Node (npx)
npx serve .
```

Em seguida acesse: `http://localhost:5173` (ou porta exibida).

## 11. Personalização Rápida

| Objetivo            | Onde alterar                                          |
| ------------------- | ----------------------------------------------------- |
| Cor do foco / hover | Variáveis `--focus`, `--hover`, `--active` em `:root` |
| Densidade da grade  | `background-size` em `.dot-grid`                      |
| Raio do spotlight   | `--radius` em `.dot-grid-mask`                        |
| Fonte               | Declaração `font-family` em `body`                    |

Para experimentar dinamicamente: ajustar as variáveis via DevTools ou com novos controles no header.

## 12. Migração para TypeScript

Estratégia incremental:

1. Renomear `script.js` para `script.ts`
2. Adicionar arquivo `tsconfig.json` mínimo
3. Tipar saída de `querySelector`
4. Adicionar verificação estrita (`strict: true`)
5. Evoluir para múltiplos módulos se a lógica crescer

Exemplo de `tsconfig.json` minimalista:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "Node",
    "strict": true,
    "outDir": "./build"
  },
  "include": ["./**/*.ts"]
}
```

## 13. Migração para React (Opcional)

Possível abordagem:

1. Criar estrutura com Vite (`npm create vite@latest`)
2. Mover `style.css` para `src/` e importar em `App.tsx`
3. Transformar a grade em componente `<DotGrid />`
4. Usar `useState` / `useEffect` para coordenadas ou `useRef` para manipular CSS custom properties
5. Manter tokens CSS como estão (evita refator desnecessário)

Exemplo de hook básico:

```tsx
function usePointerCssVars() {
  useEffect(() => {
    function handle(e: PointerEvent) {
      document.documentElement.style.setProperty("--x", `${e.x}px`);
      document.documentElement.style.setProperty("--y", `${e.y}px`);
    }
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);
}
```

## 14. Roadmap Sugerido

- [ ] Adicionar controle de raio do spotlight (slider)
- [ ] Alternar densidade da grade (select)
- [ ] Exportar captura do estado atual (screenshot ou JSON de configs)
- [ ] Suporte a múltiplos spotlights (multiplayer / multi-pointer)
- [ ] Adicionar painel lateral para componentes customizados
- [ ] Converter para TypeScript completo
- [ ] Criar versão React com Storybook

## 15. Contribuições

Contribuições são bem-vindas. Recomenda-se:

1. Abrir issue descrevendo a proposta
2. Criar branch nomeada (ex.: `feat/controle-raio`)
3. Seguir estilo existente (consistência > reinvenção)
4. Testar em tema claro e escuro
5. Abrir Pull Request explicando motivação e mudanças

## 16. Licença

> Este projeto é distribuído sob a licença MIT. Consulte o arquivo LICENSE para mais detalhes.

## 17. FAQ Rápido

**Por que não usar canvas?**
O objetivo era demonstrar o poder de gradientes CSS e máscaras com zero dependências.

**Funciona em dispositivos touch?**
Sim, o evento `pointermove` cobre ponteiros diversos, mas a experiência spotlight é naturalmente mais interessante com mouse.

**Posso integrar com Storybook?**
Sim. Basta envolver o container da grade em um decorator e expor componentes dentro dele.

---

Se este workbench lhe for útil, adapte e expanda livremente mantendo créditos quando apropriado.
