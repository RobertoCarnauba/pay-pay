module.exports = function (app) {

    app.post('/correios/calcula-prazo', function (req, res) {

        const dadosDaEntrega = req.body;
        const correiosSOAPClient = new app.servicos.correiosSOAPClient();
        correiosSOAPClient.calcularPrazo(dadosDaEntrega, function (erro, resultado) {
            if (erro) {
                res.status(500).send(erro);
                return;
            }
            console.log('Prazo calculado');
            res.json(resultado);
        })
    })
}