# Sistema de Clientes

## Descrição

Aplicação desenvolvida em JavaScript utilizando Node.js e Express.js para gerenciar clientes em um banco de dados PostgreSQL. Permite listar, alterar e gerenciar transações de forma segura, garantindo a integridade dos dados em situações de concorrência.

## Funcionalidades

1. **Listar Clientes**: Exibe todos os clientes cadastrados.
2. **Alterar Cliente**:
   - Selecionar um cliente para alterar.
   - Visualizar os dados atuais do cliente.
   - Realizar alterações e confirmar a transação.
   - Gerenciamento de concorrência para evitar sobrescritas indesejadas.

## Configuração

1. **Requisitos**:
   - Node.js
   - PostgreSQL

2. **Instalação das Dependências**:

   ```bash
   npm install
