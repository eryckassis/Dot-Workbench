import { Configuration } from "./node_modules/lint-staged/lib/index.d";
import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nova funcionalidade
        "fix", // Correção de bug
        "docs", // Documentação
        "style", // Formatação, ponto e vírgula, etc (sem mudança de código)
        "refactor", // Refatoração (sem adicionar feature ou corrigir bug)
        "perf", // Melhoria de performance
        "test", // Adicionar/corrigir testes
        "chore", // Manutenção (build, CI, dependências)
        "revert", // Reverter commit anterior
        "build", // Mudanças no sistema de build
        "ci", // Mudanças em arquivos de CI
      ],
    ],

    // Tipo não pode ser vazio
    "type-empty": [2, "never"],

    // Tipo deve ser lowercase
    "type-case": [2, "always", "lower-case"],

    // Subject (descrição) é obrigatório
    "subject-empty": [2, "never"],

    // Subject deve começar com minúscula
    "subject-case": [2, "always", "lower-case"],

    // Subject não deve terminar com ponto
    "subject-full-stop": [2, "never", "."],

    // Tamanho máximo do header (type + scope + subject)
    "header-max-length": [2, "always", 100],

    // Body deve ter linha em branco antes
    "body-leading-blank": [2, "always"],

    // Footer deve ter linha em branco antes
    "footer-leading-blank": [2, "always"],
  },
};
