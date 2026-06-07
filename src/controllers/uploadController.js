const uploadModel = require("../models/uploadModel");
const usuarioModel = require("../models/usuarioModel");

const path = require("path");

function upload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ erro: "Arquivo não enviado" });
    }

    const file = req.file.filename;
    const { idUsuario, caminhoFoto } = req.body;

    const caminhoArquivo = path.join(__dirname, "../../public/storage", file);

    const dados = { idUsuario, file };

    let arquivo = caminhoArquivo.split(".");

    let nomeArquivo = arquivo[0];
    extensao = arquivo[1];

    uploadModel.upload(nomeArquivo, extensao);
    usuarioModel.updateFotoPerfil(nomeArquivo, extensao);
  } catch (erro) {
    return res.status(500).json({ erro: erro.message });
  }
}

module.exports = {
  upload,
};
