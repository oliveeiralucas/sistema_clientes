// db.js

const { Pool } = require("pg");

const pool = new Pool({
  user: "seu_usuario",
  host: "localhost",
  database: "sistema_clientes",
  password: "sua_senha",
  port: 5432, // Porta padrão do PostgreSQL
});

module.exports = pool;
