// app.js

const express = require("express");
const bodyParser = require("body-parser");
const pool = require("./db");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let dadosAtuais = {};

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cliente");
    res.render("index", { clientes: result.rows });
  } catch (err) {
    res.send("Erro ao listar clientes: " + err);
  }
});

app.get("/alterar/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query(
      "SELECT * FROM cliente WHERE idcliente = $1",
      [id]
    );
    if (result.rows.length > 0) {
      dadosAtuais[id] = result.rows[0];
      res.render("alterar", { cliente: result.rows[0] });
    } else {
      res.send("Cliente não encontrado.");
    }
  } catch (err) {
    res.send("Erro ao buscar cliente: " + err);
  }
});

app.post("/alterar/:id", async (req, res) => {
  const id = req.params.id;
  const novoCliente = {
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
    limite: parseFloat(req.body.limite),
  };

  try {
    await pool.query("BEGIN");

    // Re-buscar os dados atuais do cliente
    const result = await pool.query(
      "SELECT * FROM cliente WHERE idcliente = $1",
      [id]
    );
    if (result.rows.length > 0) {
      const dadosBanco = result.rows[0];

      // Comparar dados atuais com os armazenados anteriormente
      const dadosAnteriores = dadosAtuais[id];
      if (
        dadosAnteriores.nome === dadosBanco.nome &&
        dadosAnteriores.email === dadosBanco.email &&
        dadosAnteriores.telefone === dadosBanco.telefone &&
        dadosAnteriores.endereco === dadosBanco.endereco &&
        parseFloat(dadosAnteriores.limite) === parseFloat(dadosBanco.limite)
      ) {
        // Dados estão iguais, proceder com update
        const updateResult = await pool.query(
          "UPDATE cliente SET nome = $1, email = $2, telefone = $3, endereco = $4, limite = $5 WHERE idcliente = $6",
          [
            novoCliente.nome,
            novoCliente.email,
            novoCliente.telefone,
            novoCliente.endereco,
            novoCliente.limite,
            id,
          ]
        );

        if (updateResult.rowCount > 0) {
          // Simular confirmação do usuário
          const confirmar = true; // Aqui você pode implementar uma confirmação via interface

          if (confirmar) {
            await pool.query("COMMIT");
            res.send("Alteração confirmada e salva no banco de dados.");
          } else {
            await pool.query("ROLLBACK");
            res.send("Alteração cancelada e desfeita.");
          }
        } else {
          await pool.query("ROLLBACK");
          res.send("Nenhum registro foi atualizado.");
        }
      } else {
        await pool.query("ROLLBACK");
        res.send("O registro já foi alterado por outro usuário.");
      }
    } else {
      await pool.query("ROLLBACK");
      res.send("Cliente não encontrado.");
    }
  } catch (err) {
    await pool.query("ROLLBACK");
    res.send("Erro ao alterar cliente: " + err);
  } finally {
    delete dadosAtuais[id];
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
