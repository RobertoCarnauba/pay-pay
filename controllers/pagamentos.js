const PagamentoDao = require("../persistencia/PagamentoDao");


module.exports = function(app){
    app.get('/pagamentos', (req, res) => {
      res.send('PAGAMENTOS')
    })

    app.post("/pagamentos/pagamento",function(req, res) {
      var pagamento = req.body;
      console.log('processando pagamento...');
  
      var connection = app.persistencia.connectionFactory();
      var pagamentoDao = new app.persistencia.PagamentoDao(connection);
  
      pagamento.status = "CRIADO";
      pagamento.data = new Date;
  
      pagamentoDao.salva(pagamento, function(exception, result){
        console.log('pagamento criado: '+ pagamento.valor);
        res.json(pagamento);
      });
    });
}


  
   