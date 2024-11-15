-- Criação do banco de dados
CREATE DATABASE sistema_clientes;

-- Conecte-se ao banco de dados
\c sistema_clientes;

-- Criação da tabela cliente
CREATE TABLE cliente (
    idcliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    limite NUMERIC(15,2) NOT NULL
);

-- Inserção de alguns clientes
INSERT INTO cliente (nome, email, telefone, endereco, limite) VALUES
('João Silva', 'joao.silva@example.com', '11987654321', 'Rua A, 123, São Paulo', 5000.00),
('Maria Souza', 'maria.souza@example.com', '21987654321', 'Av. B, 456, Rio de Janeiro', 7500.50),
('Pedro Santos', 'pedro.santos@example.com', '31987654321', 'Praça C, 789, Belo Horizonte', 3000.75);
