const PagamentoDao = require("../persistencia/PagamentoDao");
const { body, validationResult } = require('express-validator');



module.exports = function(app){
  
    app.get('/pagamentos', (req, res) => {
      res.send('PAGAMENTOS')
    })
    
    app.post('/pagamentos/pagamento', [
      body('forma_de_pagamento', '[forma_de_pagamento] is required').notEmpty(),
      body('valor','[valor] is required').isLength({ min: 5 }).isFloat()
    ], (req, res) => {
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    
      var pagamento = req.body;
      console.log('processando pagamento...');
  
      var connection = app.persistencia.connectionFactory();
      var pagamentoDao = new app.persistencia.PagamentoDao(connection);
  
      pagamento.status = "CRIADO";
      pagamento.data = new Date;
  
      pagamentoDao.salva(pagamento, function(error, result){
        if(error){
          console.log("Erro ao salvar -->"+error)
          res.status(400).send(error);
        } else {
          console.log('pagamento criado: '+ pagamento.valor);
          res.json(pagamento);
        }

      });;
    });

    // app.post("/pagamentos/pagamento",function(req, res) {


    //   var pagamento = req.body;
    //   console.log('processando pagamento...');
  
    //   var connection = app.persistencia.connectionFactory();
    //   var pagamentoDao = new app.persistencia.PagamentoDao(connection);
  
    //   pagamento.status = "CRIADO";
    //   pagamento.data = new Date;
  
    //   pagamentoDao.salva(pagamento, function(error, result){
    //     if(error){
    //       console.log("Erro ao salvar -->"+error)
    //       res.status(400).send(error);
    //     } else {
    //       console.log('pagamento criado: '+ pagamento.valor);
    //       res.json(pagamento);
    //     }

    //   });
    // });
}


  
   