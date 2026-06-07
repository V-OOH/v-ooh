const configUpload = require("../../config/uploadConfig");

function upload(nomeArquivo, extensaoArquivo) {
  if (nomeArquivo.length === 0 || !nomeArquivo) {
    return "Nome do arquivo inválido!";
  }

  if (
    extensaoArquivo != ".png" ||
    extensaoArquivo != ".jpeg" ||
    extensaoArquivo != "webp" ||
    extensaoArquivo != ".jpg"
  ) {
    return "Extensão não suportada";
  }

  return true;
}

module.exports = upload;
