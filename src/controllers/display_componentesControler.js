var displayComponenteModel =
    require("../models/display_componenteModel");

function buscarDashboard(req, res) {

    var idDisplay = req.params.idDisplay;

    if (idDisplay == undefined) {

        res.status(400).send(
            "Seu idDisplay está undefined!"
        );

    } else {

        displayComponenteModel.buscarDashboard(idDisplay)
            .then(
                function (resultado) {

                    res.status(200).json(resultado);

                }
            )
            .catch(
                function (erro) {

                    console.log(erro);

                    console.log(
                        "\nHouve um erro ao buscar o dashboard! Erro:",
                        erro
                    );

                    res.status(500).json(erro);

                }
            );
    }
}

module.exports = {
    buscarDashboard
};