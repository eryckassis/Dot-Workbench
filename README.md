# Dot Workbench

Ambiente modular para construção de interfaces em grid de pontos (spotlight / dot-grid), com foco em acessibilidade, performance, escalabilidade e manutenção. Código leve, legível e consistente em TypeScript, com semântica HTML otimizada para SEO.

## Objetivos

- Estrutura sustentável: fácil evolução sem dívidas técnicas.
- Clean Code + SOLID + separação de camadas.
- Baixo acoplamento, alta coesão.
- Reutilização de componentes (design system incremental).
- SEO técnico aplicado (semântica, performance, meta-informação).

## Principais Recursos

- Renderização de grid interativo.
- Sistema de plugins/extensões.
- Tipagem forte (TypeScript estrito).
- Build otimizado para distribuição.
- Estrutura pronta para SSR ou static export.
- Hooks/utilitários puros e testáveis.

## Stack

- TypeScript
- HTML semântico
- CSS modular/utility-first (ou CSS-in-TS se configurado)
- Bundler (ex: Vite / esbuild) – ajustar conforme o projeto
- Testes (Jest / Vitest) (recomendado)
- Lint + Format (ESLint + Prettier)

## Estrutura de Pastas (sugerida)

```
dist/
src/
  core/          # Regras de negócio
  components/    # Componentes puros (UI + lógica desacoplada)
  hooks/
  utils/
  styles/
  types/
  adapters/
tests/
public/
```

## Padrões de Código

- TypeScript strict: evitar any.
- Funções pequenas, nomes descritivos.
- Componentes puros (sem efeitos colaterais fora de hooks controlados).
- Evitar duplicação (DRY) e preferir composição.
- Preferir dados imutáveis.
- Adotar ESLint + Prettier + Husky (pre-commit).

## Semântica & SEO

- Usar landmarks (header, main, nav, footer).
- Títulos hierárquicos (h1 único).
- meta tags: description, viewport, og:_, twitter:_
- Atributos alt em imagens.
- Preferir <button> ao invés de div clicável.
- Lazy loading em elementos pesados.
- Evitar conteúdo layout shift (CLS).

## Acessibilidade

- Foco visível.
- Navegação completa via teclado.
- ARIA somente quando necessário.
- Contraste AA mínimo.
- Anunciar mudanças dinâmicas (aria-live se aplicável).

## Performance

- Divisão de código (code splitting).
- Árvore estática limpa (no dead code).
- Evitar renders desnecessários (memoização criteriosa).
- Assets otimizados (imagens modernas, compressão).
- Lighthouse como métrica de acompanhamento.

## Instalação

```
git clone <repo>
cd spotlight-dot-grid
pnpm install
pnpm dev
```

## Scripts (exemplo)

```
dev    - ambiente de desenvolvimento
build  - build otimizado
lint   - análise estática
test   - testes
preview - inspecionar build
```

## Contribuição

1. Abrir issue descrevendo motivação.
2. Criar branch feature/nome-claro.
3. Escrever testes quando aplicável.
4. Executar lint + test antes do PR.
5. PR objetivo com descrição sucinta.

## Convenções de Commits

Conventional Commits (ex):

- feat: nova funcionalidade
- fix: correção
- refactor: alteração interna
- docs: documentação
- chore: tarefas auxiliares
- test: testes

## Roadmap (sugestão)

- [ ] Modo dark acessível
- [ ] Sistema de temas
- [ ] Export de configurações
- [ ] Plugin de snapping inteligente
- [ ] Internacionalização (i18n)

## MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the Software), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contato

Abra uma issue para dúvidas ou sugestões.

Focado em qualidade, clareza e evolução contínua.
