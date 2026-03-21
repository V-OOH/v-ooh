var usuarioModel = require("../models/usuarioModel");


function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;
  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  }
  else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  }
  else {
    usuarioModel
      .autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        if (resultadoAutenticar.length == 1) {
          console.log("TUDO CERTO")
          return res.status(200).json({
            fkEmpresa: resultadoAutenticar[0].fkEmpresa,
            email: resultadoAutenticar[0].email,
            nome: resultadoAutenticar[0].nome,
          })
        } else{
          throw new Error("Erro ao realizar o login");
          // return res.status(400).json({erro: "Erro ao fazer login!"})
          
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}


function cadastrar(req, res) {
  var nome = req.body.nomeServer
  var fkEmpresa = req.body.fkEmpresaServer
  var email = req.body.emailServer
  var cpf = req.body.cpfServer
  var senha = req.body.senhaServer

  // Faça as validações dos valores
  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Sua fkEmpresa está undefined!");
  } else if (cpf == undefined) {
    res.status(400).send("Seu cpf está undefined!");
  } else {
    var cadastroUsuario = usuarioModel.cadastrar(fkEmpresa, nome, email, cpf, senha)
    console.log("TIPO DO CADASTRO USUARIO: " + typeof(cadastroUsuario));
    
    if (cadastroUsuario < 1) {
      return res.status(400).json({ erro: "Erro ao cadastrar o usuário!" })
    } else {
      return res.status(200).json(cadastroUsuario)
    }
  }
}

module.exports = {
  autenticar,
  cadastrar
};
