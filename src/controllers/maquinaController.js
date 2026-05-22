var maquinaModel = require("../models/maquinaModel");

function buscar(req, res) {
  var idEmpresa = req.body.idEmpresa;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    maquinaModel
      .buscar(idEmpresa)
      .then(function (resultadoBuscar) {
        if (resultadoBuscar.length > 0) {
          console.log("TUDO CERTO");

          return res.status(200).json(resultadoBuscar);
        } else {
          throw new Error("Erro Ao Buscar Maquinas");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao buscar maquinas! Erro: ",
          erro.sqlMessage,
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  var nomeMaquina = req.body.nomeServer;
  var fkEmpresa = req.body.fkEmpresaServer;

  if (nomeMaquina == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (fkEmpresa == undefined) {
    res.status(400).send("Sua fkEmpresa está undefined!");
  } else {
    var cadastromaquina = maquinaModel.cadastrar(fkEmpresa, nomeMaquina);

    if (cadastromaquina < 1) {
      return res.status(400).json({ erro: "Erro ao cadastrar o usuário!" });
    } else {
      return res.status(200).json(cadastromaquina);
    }
  }
}

// Função para listar os displays cadastrados - Falta completar o SQL
function listarDisplays(req, res) {
  let idEmpresa = req.body.idEmpresa;

  if (idEmpresa == undefined) {
    res.status(400).send("ID da Empresa (fkEmpresa) está undefinida!");
    return;
  }
}

function buscarZona(req, res) {
  let idEmpresa = req.body.idEmpresa;

  if (idEmpresa == undefined) {
    return res.status(400).send("ID da Empresa (fkEmpresa) está undefinida!");
  }else{

  maquinaModel
    .buscarZona(idEmpresa)
    .then(function (resultado) {
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log("Erro ao buscar zonas:", erro);
      return res.status(500).json(erro.sqlMessage);
    });
}
}

function listarZona(req, res) {
  let idEmpresa = req.body.idEmpresa;

  if (idEmpresa == undefined) {
    return res.status(400).send("ID da Empresa (fkEmpresa) está undefinida!");
  }else{

  maquinaModel
    .listarZona(idEmpresa)
    .then(function (resultado) {
      return res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log("Erro ao buscar zonas:", erro);
      return res.status(500).json(erro.sqlMessage);
    });
}
}

module.exports = {
  buscar,
  cadastrar,
  buscarZona,
  listarZona
};
