# Escala IMOB — Frontend

Página de captura e diagnóstico da Escala IMOB, desenvolvida com React, TypeScript e Vite.

Este repositório contém **somente o frontend**. O backend responsável por validação, persistência e integração com o Google Sheets será mantido em um projeto separado, permitindo evolução e escala independentes.

## Requisitos

- Node.js 22.12 ou superior
- npm 10 ou superior

Quem utiliza `nvm` pode selecionar a versão indicada pelo projeto:

```bash
nvm use
```

## Instalação

```bash
npm ci
```

## Desenvolvimento

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação.

## Verificações

Validar os tipos sem gerar arquivos:

```bash
npm run typecheck
```

Gerar o build de produção:

```bash
npm run build
```

Visualizar localmente o build gerado:

```bash
npm run preview
```

## Estrutura principal

```text
src/
├── assets/       # Imagens e arquivos da marca
├── components/   # Componentes reutilizáveis
├── features/     # Regras organizadas por funcionalidade
├── sections/     # Seções e etapas da página
├── styles/       # Estilos globais
└── types/        # Tipos compartilhados do frontend
```

## Integração com o backend

A comunicação com o backend será feita por HTTPS. A URL pública da API será fornecida ao frontend por variável de ambiente do Vite quando a integração for implementada.

Credenciais do Google, segredos da AWS e outras informações sensíveis nunca devem ser adicionadas a este repositório ou expostas no código executado pelo navegador.

## Arquivos gerados

Os itens abaixo são gerados automaticamente e não devem ser versionados:

- `node_modules/`
- `dist/`
- `*.tsbuildinfo`
- `vite.config.js`
- `vite.config.d.ts`
- arquivos `.env`, exceto modelos `.env.example`
