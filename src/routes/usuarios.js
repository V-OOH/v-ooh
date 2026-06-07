var express = require("express");
var router = express.Router();
const upload = require("../../config/uploadConfig");

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});
router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

router.patch("/finalizarCadastro", function (req, res) {
  usuarioController.finalizarCadastro(req, res);
});

router.post("/cadastrarFuncionario", function (req, res) {
  usuarioController.cadastrarFuncionario(req, res);
});

router.post("/cadastrarGestor", function (req, res) {
  usuarioController.cadastrarGestor(req, res);
});

router.post("/buscarUsuarios", function (req, res) {
  usuarioController.buscarUsuarios(req, res);
});

router.post("/buscarNumUsuarios", function (req, res) {
  usuarioController.buscarNumUsuarios(req, res);
});

router.post("/update-foto", upload.single("fotoPerfil"), (req, res) => {
  usuarioController.updateFotoPerfil(req, res);
});

router.post("/foto-perfil", (req, res) => {
  usuarioController.bucarFotoPerfil(req, res);
});

module.exports = router;
