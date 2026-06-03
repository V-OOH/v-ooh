function buscarDashboard(idDisplay) {

    return new Promise((resolve, reject) => {

        try {

            const resultado = {
                dashboard: {},
                historico_dados: [],
                historico_processos: []
            };

            resolve(resultado);

        } catch (erro) {

            reject(erro);

        }
    });
}

module.exports = {
    buscarDashboard
};