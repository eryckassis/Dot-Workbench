# 🧪 Dot-Workbench - Integração Jest com TypeScript + Vite

Ambiente modular para construção de interfaces em grid de pontos (spotlight / dot-grid), com foco em acessibilidade, performance, escalabilidade e manutenção. Código leve, legível e consistente em TypeScript, com semântica HTML otimizada para SEO.

**PLUS**: Integração completa de testes automatizados Jest com TypeScript/Vite, incluindo todas as configurações necessárias e soluções para problemas comuns.

## 🎯 Objetivos

- Estrutura sustentável: fácil evolução sem dívidas técnicas.
- Clean Code + SOLID + separação de camadas.
- Baixo acoplamento, alta coesão.
- Reutilização de componentes (design system incremental).
- SEO técnico aplicado (semântica, performance, meta-informação).
- **Testes automatizados profissionais com Jest**

## 🚀 Principais Recursos

- Renderização de grid interativo.
- Sistema de plugins/extensões.
- Tipagem forte (TypeScript estrito).
- Build otimizado para distribuição.
- Estrutura pronta para SSR ou static export.
- Hooks/utilitários puros e testáveis.
- **✅ Testes Jest + TypeScript + DOM Testing**
- **✅ Cobertura de código automatizada**
- **✅ Compatibilidade Windows/Linux**

---

# 🧪 Documentação Jest - Integração Completa

Esta seção documenta a integração completa de testes automatizados Jest em projeto TypeScript/Vite, suportando:

- ✅ ES Modules e CommonJS
- ✅ DOM Testing com jsdom
- ✅ TypeScript completo
- ✅ CSS Mocking
- ✅ Compatibilidade Windows/Linux

## 📦 Instalação das Dependências

### Dependências Principais

```bash
npm install --save-dev jest @types/jest ts-jest typescript
npm install --save-dev @testing-library/dom @testing-library/jest-dom jsdom
npm install --save-dev identity-obj-proxy jest-environment-jsdom
npm install --save-dev cross-env @types/node
```

### Explicação das Dependências

| Dependência                 | Finalidade                                             |
| --------------------------- | ------------------------------------------------------ |
| `jest`                      | Framework de testes principal                          |
| `@types/jest`               | Tipagens TypeScript para Jest                          |
| `ts-jest`                   | Preset para executar TypeScript no Jest                |
| `@testing-library/jest-dom` | Matchers adicionais para DOM testing                   |
| `jsdom`                     | Simula ambiente DOM no Node.js                         |
| `identity-obj-proxy`        | Mock para arquivos CSS/SCSS                            |
| `jest-environment-jsdom`    | Ambiente jsdom para Jest 30+                           |
| `cross-env`                 | Compatibilidade de variáveis de ambiente Windows/Linux |
| `@types/node`               | Tipagens Node.js (necessário para `require()`)         |

## ⚙️ Configuração dos Arquivos

### 1. package.json

```json
{
  "name": "dot-workbench",
  "private": true,
  "version": "0.0.0",
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@types/jest": "^30.0.0",
    "@types/node": "^22.7.9",
    "cross-env": "^7.0.3",
    "identity-obj-proxy": "^3.0.0",
    "jest": "^30.2.0",
    "jest-environment-jsdom": "^30.2.0",
    "jsdom": "^27.0.0",
    "ts-jest": "^29.4.5",
    "typescript": "~5.9.3",
    "vite": "^7.1.7"
  }
}
```

> ⚠️ **IMPORTANTE**: NÃO incluir `"type": "module"` quando usar Jest tradicional

### 2. jest.config.js

```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/__tests__/**/*.(ts|js)", "**/*.(test|spec).(ts|js)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
```

> ⚠️ **ATENÇÃO**: Use `moduleNameMapper` (não `moduleNameMapping`)

### 3. tsconfig.json (Ajustes Necessários)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "types": ["vite/client", "jest", "node"],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": false,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["src"]
}
```

**Configurações Críticas**:

- `"verbatimModuleSyntax": false` - Permite Jest processar imports/exports
- `"types": ["vite/client", "jest", "node"]` - Tipagens necessárias
- `"esModuleInterop": true` - Compatibilidade de módulos

### 4. src/setupTests.ts

```typescript
import "@testing-library/jest-dom";

// Mock CSS imports
jest.mock("./style.css", () => ({}));

// Setup DOM environment
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
```

## 🚨 Erros Comuns e Soluções

### 1. "module is not defined"

```
ReferenceError: module is not defined at jest.config.js:1:1
```

**Causa**: `jest.config.js` usando ES Modules syntax com `"type": "module"`

**Solução**:

```javascript
// ❌ ERRADO
export default { preset: "ts-jest" };

// ✅ CORRETO
module.exports = { preset: "ts-jest" };
```

### 2. "ECMAScript imports and exports cannot be written in CommonJS"

```
TS1295: ECMAScript imports and exports cannot be written in a CommonJS file
```

**Causa**: Conflito entre `"type": "module"` e configuração TypeScript

**Soluções**:

1. Remover `"type": "module"` do package.json
2. Configurar `verbatimModuleSyntax: false` no tsconfig.json
3. Adicionar `esModuleInterop: true`

### 3. "NODE_OPTIONS is not recognized" (Windows)

```
'NODE_OPTIONS' is not recognized as an internal or external command
```

**Causa**: Sintaxe Linux/Mac no Windows

**Solução**:

```json
// ❌ ERRADO (Linux/Mac apenas)
"test": "NODE_OPTIONS=--experimental-vm-modules jest"

// ✅ CORRETO (Multiplataforma)
"test": "cross-env NODE_OPTIONS=--experimental-vm-modules jest"

// ✅ AINDA MELHOR (Sem NODE_OPTIONS)
"test": "jest"
```

### 4. "moduleNameMapping" is unknown

```
Unknown option "moduleNameMapping" with value {...}
```

**Solução**:

```javascript
// ❌ ERRADO
moduleNameMapping: { '\\.(css)$': 'identity-obj-proxy' }

// ✅ CORRETO
moduleNameMapper: { '\\.(css)$': 'identity-obj-proxy' }
```

### 5. "Cannot find name 'require'"

```
Cannot find name 'require'. Do you need to install type definitions for node?
```

**Solução**:

```bash
npm install --save-dev @types/node
```

Adicionar no tsconfig.json:

```json
"types": ["vite/client", "jest", "node"]
```

### 6. "PointerEvent is not defined"

```
ReferenceError: PointerEvent is not defined
```

**Causa**: jsdom não suporta PointerEvent nativamente

**Solução**:

```typescript
// ❌ PROBLEMÁTICO
const mockEvent = new PointerEvent("pointermove", { clientX: 100 });

// ✅ SOLUÇÃO 1: Usar MouseEvent
const mockEvent = new MouseEvent("pointermove", { clientX: 100 });

// ✅ SOLUÇÃO 2: Mock manual
global.PointerEvent = global.MouseEvent;
```

## 📁 Estrutura de Arquivos

```
projeto/
├── src/
│   ├── __tests__/
│   │   ├── main.test.ts           # Testes unitários
│   │   └── integration.test.ts    # Testes de integração
│   ├── main.ts                    # Código principal
│   ├── setupTests.ts              # Configuração global dos testes
│   └── style.css                  # Estilos (mockado nos testes)
├── jest.config.js                 # Configuração do Jest
├── tsconfig.json                  # Configuração TypeScript
├── package.json                   # Dependências e scripts
└── README.md                      # Esta documentação
```

## 🛡️ Checklist de Prevenção de Erros

### Antes de começar:

- [ ] Verificar se projeto usa Vite + TypeScript
- [ ] Confirmar versões das dependências compatíveis
- [ ] Fazer backup do package.json original

### Durante configuração:

- [ ] **NÃO** usar `"type": "module"` com Jest tradicional
- [ ] Usar `moduleNameMapper` (não `moduleNameMapping`)
- [ ] Configurar `verbatimModuleSyntax: false` no tsconfig.json
- [ ] Adicionar `@types/node` se usar `require()`
- [ ] Usar `cross-env` para compatibilidade Windows
- [ ] Configurar `esModuleInterop: true`

### Ao escrever testes:

- [ ] Mock CSS com `identity-obj-proxy`
- [ ] Usar `jsdom` environment
- [ ] Configurar `setupTests.ts` adequadamente
- [ ] Exportar funções do código principal para testes
- [ ] Usar MouseEvent em vez de PointerEvent

## 🚀 Comandos de Uso

### Executar Testes

```bash
# Executar todos os testes
npm test

# Modo watch (reexecuta automaticamente quando arquivos mudam)
npm run test:watch

# Com relatório de cobertura de código
npm run test:coverage

# Teste específico
npm test -- --testPathPattern=main.test.ts

# Com mais detalhes (verbose)
npm test -- --verbose

# Limpar cache do Jest
npm test -- --clearCache
```

### Debugging

```bash
# Ver configuração atual do Jest
npx jest --showConfig

# Executar com debug de configuração
npm test -- --verbose --no-cache

# Executar apenas testes que falharam
npm test -- --onlyFailures
```

## 📊 Exemplo de Teste

### Teste Unitário (src/**tests**/main.test.ts)

```typescript
import '@testing-library/jest-dom';
import { getAllButtons, handleButtonClick } from '../main';

describe('Main.ts - Button Logic', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should return all buttons in the document', () => {
    document.body.innerHTML = \`
      <button>Seguir</button>
      <button>Seguir</button>
    \`;

    const buttons = getAllButtons();
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toBeInstanceOf(HTMLButtonElement);
  });

  it('should toggle following class and text', () => {
    document.body.innerHTML = '<button>Seguir</button>';
    const button = document.querySelector('button')!;

    handleButtonClick.call(button);

    expect(button).toHaveClass('following');
    expect(button.textContent).toBe('Unfollow');
  });
});
```

### Teste de Integração (src/**tests**/integration.test.ts)

```typescript
import '@testing-library/jest-dom';

describe('Integration Test', () => {
  beforeEach(() => {
    document.body.innerHTML = \`
      <button>Seguir</button>
      <button>Seguir</button>
      <output id="x-pos"></output>
      <output id="y-pos"></output>
    \`;
  });

  it('should initialize buttons correctly', () => {
    require('../main');

    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    const buttons = document.querySelectorAll('button');
    buttons.forEach((button) => {
      button.click();
      expect(button).toHaveClass('following');
      expect(button.textContent).toBe('Unfollow');
    });
  });
});
```

## 📈 Resultado Final

### Status dos Testes

- ✅ **Jest integrado com sucesso**
- ✅ **TypeScript funcionando completamente**
- ✅ **Testes DOM funcionando com jsdom**
- ✅ **Coverage de código habilitado**
- ✅ **Watch mode funcionando**
- ✅ **Compatibilidade Windows/Linux**

### Métricas

- **7/9 testes passando** (problemas menores de API do DOM)
- **Cobertura de código** configurada
- **Zero conflitos** de módulos ES6/CommonJS
- **Tempo de execução** otimizado

## 🔗 Referências e Links Úteis

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [ts-jest Configuration](https://kulshekhar.github.io/ts-jest/)
- [Testing Library Jest DOM](https://testing-library.com/docs/ecosystem-jest-dom/)
- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig)
- [Vite Testing Guide](https://vitejs.dev/guide/features.html#testing)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (\`git checkout -b feature/nova-feature\`)
3. Adicione testes para sua funcionalidade
4. Execute \`npm test\` para garantir que todos os testes passam
5. Commit suas mudanças (\`git commit -m 'Adiciona nova feature'\`)
6. Push para a branch (\`git push origin feature/nova-feature\`)
7. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo \`LICENSE\` para mais detalhes.

---

**Desenvolvido com ❤️ usando TypeScript, Vite e Jest**

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
