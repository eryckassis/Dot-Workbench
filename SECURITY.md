# 🔒 Política de Segurança

## Versões Suportadas

Apenas a versão mais recente do Dot-Workbench recebe atualizações de segurança.

| Versão   | Suportada          |
| -------- | ------------------ |
| latest   | :white_check_mark: |
| < latest | :x:                |

## 🐛 Reportando uma Vulnerabilidade

A segurança do Dot-Workbench é levada a sério. Se você descobriu uma vulnerabilidade de segurança, pedimos que **NÃO** abra uma issue pública.

### Como Reportar

1. **E-mail para os mantenedores**
   - Envie detalhes para: [eng.assis.dev@gmail.com]
   - Use o assunto: `[SECURITY] Descrição breve`

2. **Inclua as seguintes informações:**
   - Descrição da vulnerabilidade
   - Passos para reproduzir
   - Possível impacto
   - Sugestões de correção (se houver)

### O que esperar

- **Confirmação:** Você receberá uma resposta em até 48 horas
- **Avaliação:** Avaliaremos a vulnerabilidade em até 7 dias
- **Correção:** Trabalharemos em uma correção prioritariamente
- **Divulgação:** Coordenaremos a divulgação pública com você

## 🛡️ Medidas de Segurança Implementadas

### Código

- ✅ TypeScript strict mode
- ✅ ESLint security rules
- ✅ Dependências auditadas regularmente
- ✅ Dependabot ativado
- ✅ Code review obrigatório

### CI/CD

- ✅ Testes automatizados
- ✅ Security headers configurados
- ✅ Análise de vulnerabilidades no build
- ✅ Deploy automático apenas após aprovação

### Deploy

- ✅ HTTPS obrigatório
- ✅ Content Security Policy (CSP)
- ✅ X-Frame-Options
- ✅ X-Content-Type-Options
- ✅ Referrer-Policy

## 🔍 Auditoria de Dependências

Verificamos regularmente nossas dependências:

```bash
# Verificar vulnerabilidades
npm audit

# Corrigir automaticamente (quando possível)
npm audit fix
```

## 📝 Histórico de Segurança

Nenhuma vulnerabilidade de segurança foi reportada até o momento.

## 🙏 Agradecimentos

Agradecemos aos pesquisadores de segurança que reportam vulnerabilidades de forma responsável.

## 📞 Contato

Para questões de segurança: eng.assis.dev@gmail.com
