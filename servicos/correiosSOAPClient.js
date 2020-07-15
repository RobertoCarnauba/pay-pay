const soap = require('soap');

soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?WSDL', 
function(erro, cliente){

    console.log('Cliente SOAP criado');
    cliente.CalcPrazo({'nCdServico':'40010',
                       'sCepOrigem':'04209003',
                       'sCepDestino':'03080000'},
    function(erro, resultado){
        if(!erro){
            console.log(JSON.stringify(resultado));
        }
        console.log(erro);
    })

})
