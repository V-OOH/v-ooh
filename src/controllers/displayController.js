var displayModel = require("../models/displayModel");

function cadastrarDisplay(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var nome = req.body.nome;
    var so = req.body.so;
    var id = req.body.id;
    var ip = req.body.ip;


    if (nome == undefined) {
        res.status(400).send("Seu Nome está undefined!");
    } else if (so == undefined) {
        res.status(400).send("Seu Sistema Operacional está undefined!");
    } else if (id == undefined) {
        res.status(400).send("Seu Identificador está undefined!");
    } else if (ip == undefined) {
        res.status(400).send("Seu Endereço de ip está undefined!");
    } else {
        displayModel.cadastrarDisplay(fkEmpresa, nome, id, so, ip)
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

function cadastrarComp(req, res) {

    var Componentes = req.body.Componentes;
    var fkEmpresa = req.body.fkEmpresa;
    var fkServidor = req.body.fkServidor;

    // Faça as validações dos valores
    if (Componentes == undefined) {
        res.status(400).send("Seus componentes está undefined!");
    } else if (fkServidor == undefined) {
        res.status(400).send("Seu servidor está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        displayModel.cadastrarComp(Componentes, fkEmpresa, fkServidor)
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


function cadastrarEnd(req, res) {
    var fkEmpresa = req.body.fkEmpresa;
    var fkServidor = req.body.fkServidor;
    var cep = req.body.cep;
    var logradouro = req.body.logradouro;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var bairro = req.body.bairro;
    var cidade = req.body.cidade;
    var uf = req.body.uf

    if (cep == undefined) {
        res.status(400).send("Seu Cep está undefined!");
    } else if (fkEmpresa == undefined) {
        res.status(400).send("Sua fkEmpresa está undefined!");
    } else if (fkServidor == undefined) {
        res.status(400).send("Sua fkServidor está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu Logradouro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu Numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu Complemento está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu Bairro está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua Cidade está undefined!");
    } else if (uf == undefined) {
        res.status(400).send("Seu UF está undefined!");
    } else {
        displayModel.cadastrarEnd(fkEmpresa, fkServidor, 
            cep, logradouro, numero, 
            complemento, bairro, cidade, uf)
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

function buscarDisplays(req, res){
    var fkEmpresa = req.body.fkEmpresa;
        displayModel.buscarDisplays(fkEmpresa)
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
    cadastrarDisplay,
    cadastrarComp,
    cadastrarEnd,
    buscarDisplays
};
