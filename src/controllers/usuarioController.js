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
            fkEmpresa: resultadoAutenticar[0].empresaId,
            email: resultadoAutenticar[0].email,
            nome: resultadoAutenticar[0].nome,
            id: resultadoAutenticar[0].idUsuario,
            tipo: resultadoAutenticar[0].tipoUsuario
          })
        } else{
          throw new Error("Erro ao realizar o login");    
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
    var email = req.body.emailServer;
    var codigo = req.body.codigoServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (codigo == undefined) {
        res.status(400).send("Seu codigo está undefined!");
    } else {

        usuarioModel.cadastrar(email, codigo)
            .then(
                function (resultadoCadastrar) {
                    console.log(`\nResultados encontrados: ${resultadoCadastrar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoCadastrar)}`);

                    if (resultadoCadastrar.length == 1) {
                        console.log(resultadoCadastrar);

                        res.json({
                            id: resultadoCadastrar[0].idUsuario,
                            email: resultadoCadastrar[0].email,
                            fkEmpresa: resultadoCadastrar[0].empresaId
                        });

                    } else if (resultadoCadastrar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function finalizarCadastro(req, res) {
    var nome = req.body.nomeServer;
    var senha = req.body.senhaServer;
    var id = req.body.idServer;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        usuarioModel.finalizarCadastro(nome, senha, id)
        .then(function (resultado) {

            console.log("Update realizado");

            res.json({
                status: "ok"
            });

        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function cadastrarFuncionario(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var idUsuario = req.body.idSuperiorVar;
    var nome = req.body.nome;
    var email = req.body.email;
    var dataNascimento = req.body.dataNascimento;
    var cpf = req.body.cpf;
    var senha = req.body.senha;
    var rg = req.body.rg


    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (dataNascimento == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (rg == undefined) {
        res.status(400).send("Seu rg está undefined!");
    } else {
        usuarioModel.cadastrarFuncionario(fkEmpresa, idUsuario, nome, email, dataNascimento, cpf, senha, rg)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function cadastrarGestor(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var emailUser = req.body.emailUser;
    var dtNasc = req.body.dtNasc;
    var cpf = req.body.cpf;
    var rg = req.body.rg;

    if (fkEmpresa == undefined) {
        res.status(400).send("A fkEmpresa está undefined!");
    } else if (emailUser == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (dtNasc == undefined) {
        res.status(400).send("Sua data de nascimento está undefined!");
    } else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    } else if (rg == undefined) {
        res.status(400).send("Seu rg está undefined!");
    } else {

        usuarioModel.cadastrarGestor(fkEmpresa, emailUser, dtNasc, cpf, rg)
            .then(
                function (resultado) {
                        res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o cadastro do gestor! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

    function buscarUsuarios(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    usuarioModel.buscarUsuarios(fkEmpresa)
        .then(function (resultadoBuscar) {
            if (resultadoBuscar.length > 0) {
                console.log("TUDO CERTO")
                return res.status(200).json(resultadoBuscar)

            } else {
                throw new Error("Erro Ao Buscar Informações");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
            "\nHouve um erro ao buscar informações! Erro: ",
            erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
  }

      function buscarNumUsuarios(req, res) {
        var fkEmpresa = req.body.fkEmpresa;
        usuarioModel.buscarNumUsuarios(fkEmpresa)
        .then(function (resultadoBuscar) {
            if (resultadoBuscar.length > 0) {
                console.log("TUDO CERTO")
                return res.status(200).json(resultadoBuscar)

            } else {
                throw new Error("Erro Ao Buscar Informações");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(
            "\nHouve um erro ao buscar informações! Erro: ",
            erro.sqlMessage
            );
            res.status(500).json(erro.sqlMessage);
        });
  }

  


module.exports = {
  autenticar,
  cadastrar,
  finalizarCadastro,
  cadastrarFuncionario,
  cadastrarGestor,
  buscarUsuarios,
  buscarNumUsuarios
};
