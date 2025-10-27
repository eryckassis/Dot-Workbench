# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o **Dot-Workbench**! Este documento fornece diretrizes para tornar o processo de contribuição simples e eficaz.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Posso Contribuir?](#como-posso-contribuir)
- [Configurando o Ambiente](#configurando-o-ambiente)
- [Processo de Desenvolvimento](#processo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Commits e Mensagens](#commits-e-mensagens)
- [Pull Requests](#pull-requests)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)

---

## 📜 Código de Conduta

Este projeto segue o [Código de Conduta](CODE_OF_CONDUCT.md). Ao participar, você concorda em manter um ambiente respeitoso e inclusivo.

---

## 🚀 Como Posso Contribuir?

### Tipos de Contribuição

- 🐛 **Reportar Bugs** - Encontrou um problema? Abra uma issue!
- ✨ **Sugerir Features** - Tem uma ideia legal? Compartilhe conosco!
- 📝 **Melhorar Documentação** - Docs nunca são demais!
- 💻 **Contribuir com Código** - Correções, features, testes, etc.
- 🎨 **Design e UX** - Melhorias visuais e de experiência
- ♿ **Acessibilidade** - Tornar o projeto mais inclusivo

---

## 🛠️ Configurando o Ambiente

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x (ou pnpm/yarn)
- **Git** >= 2.x

### Passo a Passo

1. **Fork o repositório**

   Clique no botão "Fork" no topo da página do GitHub.

2. **Clone seu fork**

   ```bash
   git clone https://github.com/SEU-USUARIO/Dot-Workbench.git
   cd Dot-Workbench
   ```

3. **Adicione o repositório original como upstream**

   ```bash
   git remote add upstream https://github.com/eryckassis/Dot-Workbench.git
   ```

4. **Instale as dependências**

   ```bash
   npm install
   ```

5. **Verifique se tudo está funcionando**

   ```bash
   npm run dev        # Inicia o servidor de desenvolvimento
   npm test           # Roda os testes unitários
   npm run test:e2e   # Roda os testes E2E (opcional)
   npm run lint       # Verifica o código
   ```

---

## 💻 Processo de Desenvolvimento

### 1. Sincronize com o upstream

Antes de começar, garanta que está atualizado:

```bash
git checkout master
git pull upstream master
```

### 2. Crie uma branch

Use nomes descritivos seguindo o padrão:

```bash
# Para features
git checkout -b feat/nome-da-feature

# Para correções
git checkout -b fix/nome-do-bug

# Para documentação
git checkout -b docs/descricao

# Para refatoração
git checkout -b refactor/descricao
```

**Exemplos:**

- `feat/add-dark-mode`
- `fix/dot-grid-alignment`
- `docs/update-readme`
- `refactor/simplify-grid-logic`

### 3. Desenvolva

- Escreva código limpo e legível
- Siga os padrões do projeto
- Adicione/atualize testes quando necessário
- Documente mudanças significativas

### 4. Teste seu código

```bash
# Testes unitários
npm test

# Testes com coverage
npm run test:coverage

# Testes E2E
npm run test:e2e:chromium

# Lint
npm run lint

# Type check
npm run typecheck
```

### 5. Commit suas mudanças

Siga o padrão [Conventional Commits](#commits-e-mensagens):

```bash
git add .
git commit -m "feat: add dark mode toggle"
```

### 6. Push para seu fork

```bash
git push origin feat/add-dark-mode
```

### 7. Abra um Pull Request

Vá até seu fork no GitHub e clique em "Compare & pull request".

---

## 📐 Padrões de Código

### TypeScript

- **Strict mode** habilitado
- Evite `any` - use tipos específicos
- Prefira `interface` para objetos públicos
- Use `type` para unions e intersections

**Bom:**

```typescript
interface DotGridProps {
  spacing: number;
  color: string;
}

function createGrid(props: DotGridProps): HTMLElement {
  // ...
}
```

**Ruim:**

```typescript
function createGrid(props: any) {
  // ...
}
```

### Nomenclatura

- **Variáveis/Funções:** `camelCase`
- **Classes/Interfaces:** `PascalCase`
- **Constantes:** `UPPER_SNAKE_CASE`
- **Arquivos:** `kebab-case.ts`

**Exemplos:**

```typescript
const MAX_GRID_SIZE = 1000;
class DotGrid {}
interface GridOptions {}
function calculateSpacing() {}
```

### ESLint e Prettier

O projeto usa ESLint + Prettier para manter a consistência:

```bash
# Verificar problemas
npm run lint

# Corrigir automaticamente
npm run lint:fix

# Formatar código
npm run format
```

**Dica:** Configure seu editor para formatar ao salvar!

---

## 📝 Commits e Mensagens

### Conventional Commits

Usamos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
<tipo>(<escopo>): <descrição curta>

[corpo opcional]

[rodapé opcional]
```

### Tipos Permitidos

- **feat:** Nova funcionalidade
- **fix:** Correção de bug
- **docs:** Mudanças na documentação
- **style:** Formatação, ponto e vírgula, etc (sem mudança de código)
- **refactor:** Refatoração de código
- **perf:** Melhorias de performance
- **test:** Adição/correção de testes
- **chore:** Tarefas de manutenção, configs, etc
- **ci:** Mudanças em arquivos de CI/CD
- **build:** Mudanças no build ou dependências

### Exemplos

```bash
# Feature
git commit -m "feat: add dark mode toggle to settings"

# Bug fix
git commit -m "fix: correct dot spacing calculation on mobile"

# Documentação
git commit -m "docs: update installation instructions in README"

# Breaking change
git commit -m "feat!: redesign grid API

BREAKING CHANGE: Grid constructor now requires options object"

# Com escopo
git commit -m "fix(grid): prevent negative spacing values"
```

### ⚠️ Regras de Commit

- Use verbos no imperativo ("add" não "added")
- Primeira linha com no máximo 72 caracteres
- Seja específico e descritivo
- Referencie issues quando aplicável: `fix: resolve #123`

**Os commits são validados automaticamente pelo Husky!**

---

## 🔄 Pull Requests

### Checklist antes de abrir um PR

- [ ] Código está formatado (`npm run format`)
- [ ] Lint passou sem erros (`npm run lint`)
- [ ] Testes estão passando (`npm test`)
- [ ] Testes E2E passando (se aplicável)
- [ ] TypeScript sem erros (`npm run typecheck`)
- [ ] Documentação atualizada (se necessário)
- [ ] Commits seguem o padrão Conventional
- [ ] Branch está atualizada com `master`

### Título do PR

Siga o mesmo padrão dos commits:

```
feat: add dark mode support
fix: resolve dot grid alignment issue
docs: improve contributing guide
```

### Descrição do PR

Use o template fornecido e inclua:

**O que foi feito:**

- Descreva as mudanças de forma clara
- Liste as funcionalidades adicionadas
- Explique correções de bugs

**Por que foi feito:**

- Contexto e motivação
- Problema que resolve
- Referência a issues: `Closes #123`

**Como testar:**

- Passo a passo para testar as mudanças
- Screenshots/GIFs se aplicável
- Casos de uso importantes

**Checklist:**

- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Sem breaking changes (ou documentado)

### Revisão de Código

- Seja paciente - revisões levam tempo
- Responda aos comentários de forma construtiva
- Faça as mudanças solicitadas
- Mantenha discussões focadas e respeitosas

### Após aprovação

- Seu PR será mergeado por um mantenedor
- A branch será deletada automaticamente
- Você será creditado no CHANGELOG

---

## 🐛 Reportando Bugs

### Antes de reportar

1. Verifique se já não existe uma issue sobre o problema
2. Teste na versão mais recente
3. Confirme que não é um problema de configuração local

### Como reportar

Use o template de issue "Bug Report" e inclua:

**Descrição do Bug**

- O que aconteceu
- O que era esperado

**Passos para Reproduzir**

1. Vá para '...'
2. Clique em '...'
3. Veja o erro

**Ambiente**

- OS: [e.g. Windows 11, macOS 14]
- Browser: [e.g. Chrome 120, Firefox 121]
- Node version: [e.g. 20.10.0]

**Screenshots**

- Adicione capturas de tela se possível

**Logs de Erro**

```
Cole logs relevantes aqui
```

---

## 💡 Sugerindo Melhorias

### Antes de sugerir

1. Verifique se já não existe uma sugestão similar
2. Confirme que se alinha com os objetivos do projeto
3. Prepare uma proposta clara

### Como sugerir

Use o template de issue "Feature Request" e inclua:

**Descrição da Feature**

- O que você quer que seja implementado
- Por que isso seria útil

**Casos de Uso**

- Exemplos práticos de uso
- Benefícios esperados

**Alternativas Consideradas**

- Outras abordagens que você pensou
- Por que essa é a melhor opção

**Recursos Adicionais**

- Links, referências, exemplos de outros projetos

---

## 🧪 Testes

### Tipos de Testes

**Unit Tests (Jest)**

```bash
npm test                 # Rodar todos os testes
npm run test:watch       # Modo watch
npm run test:coverage    # Com coverage
```

**E2E Tests (Playwright)**

```bash
npm run test:e2e              # Todos os navegadores
npm run test:e2e:chromium     # Apenas Chromium
npm run test:e2e:ui           # Modo UI interativo
npm run test:e2e:debug        # Modo debug
```

### Escrevendo Testes

**Unit Test Example:**

```typescript
import { calculateSpacing } from "./grid";

describe("calculateSpacing", () => {
  it("should return correct spacing for standard grid", () => {
    const result = calculateSpacing(100, 10);
    expect(result).toBe(10);
  });

  it("should handle edge cases", () => {
    expect(calculateSpacing(0, 10)).toBe(0);
    expect(calculateSpacing(100, 0)).toBe(0);
  });
});
```

**E2E Test Example:**

```typescript
import { test, expect } from "@playwright/test";

test("should display dot grid correctly", async ({ page }) => {
  await page.goto("/");
  const grid = page.locator(".dot-grid");
  await expect(grid).toBeVisible();
});
```

---

## 📚 Recursos Úteis

### Documentação

- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Playwright Docs](https://playwright.dev/)
- [Jest Documentation](https://jestjs.io/)

### Padrões

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)

### Código Limpo

- [Clean Code JavaScript](https://github.com/ryanmcdermott/clean-code-javascript)
- [Airbnb Style Guide](https://github.com/airbnb/javascript)

---

## ❓ Dúvidas?

- 💬 Abra uma [Discussion](https://github.com/eryckassis/Dot-Workbench/discussions)
- 📧 Entre em contato via issues
- 👥 Participe das conversas nas PRs e issues

---

## 🎉 Obrigado!

Sua contribuição é muito valiosa! Juntos, tornamos o Dot-Workbench melhor para todos. 🚀

**Happy Coding!** 💻✨
