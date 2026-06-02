function buscarDados(req, res) {
  const AWS_URL = "URL";

  fetch(AWS_URL)
    .then((resposta) => {
      if (!resposta.ok) {
        console.error("Ocorreu um erro na requisição");
        throw new Error("Ocorreu um erro: " + resposta.error);
      }

      return resposta.json();
    })
    .then((dados) => {
      console.log("Dados: ", dados);
    })
    .catch((erro) => {
      console.error("Erro: ", erro);
    });

  module.exports = { buscarDados };
}
