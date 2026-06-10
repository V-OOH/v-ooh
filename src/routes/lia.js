const express = require("express");
const router = express.Router();
const liaModel = require("../models/liaModel");
const { request } = require("../models/liaModel");

router.post("/perguntar", async (req, res) => {
  const mensagem = req.body.mensagem;

  if (mensagem == "" || mensagem == undefined) {
    return res.status(400).send("Corpo de mensagem está vazio!");
  }

  try {
    const result = await liaModel(mensagem);
    return res.json({ resposta: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro interno no servidor");
  }
});

router.post("/perguntar-lia", async (req, res) => {
  const mensagem = req.body.mensagem;

  if (mensagem == "" || mensagem == undefined) {
    return res.status(400).send("Corpo de mensagem está vazio!");
  }

  try {
    const result = await request(mensagem);
    return res.json({ resposta: result });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Erro interno no servidor");
  }
});

module.exports = router;
