const soap = require('soap');

function correiosSOAPClient() {
    this._url = 'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?WSDL'
}

correiosSOAPClient.prototype.calcularPrazo = function (args, callback) {
    soap.createClient(this._url, function (erro, cliente) {
        console.log('Cliente SOAP criado')
        cliente.CalcPrazo(args, callback)
    })
}

module.exports = function () {
    return correiosSOAPClient;
}