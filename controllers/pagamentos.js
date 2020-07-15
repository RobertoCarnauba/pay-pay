const PagamentoDao = require("../persistencia/PagamentoDao");
const { body, validationResult } = require('express-validator');



module.exports = function (app) {

  //Idex
  app.get('/pagamentos', (req, res) => {
    res.send('PAGAMENTOS')
  })

  //Deleta um pagamento(cancelar)
  app.delete('/pagamentos/pagamento/:id', (req, res) => {

    var pagamento = {}
    var id = req.params.id

    pagamento.id = id
    pagamento.status = 'CANCELADO'

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualizar(pagamento, function (erro) {
      if (erro) {
        res.status(500).send(erro)
        return;
      }
      console.log('Pagamento cancelado')
      res.status(204).send(pagamento)
    })
  })

  //Altera um pagamento 
  app.put('/pagamentos/pagamento/:id', (req, res) => {

    var pagamento = {}
    var id = req.params.id

    pagamento.id = id
    pagamento.status = 'CONFIRMADO'

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualizar(pagamento, function (erro) {
      if (erro) {
        res.status(500).send(erro)
        return;
      }
      res.send(pagamento)
    })
  })

  //Cria um novo pagamento
  app.post('/pagamentos/pagamento', [
    body('pagamento.forma_de_pagamento', '[forma_de_pagamento] is required').notEmpty(),
    body('pagamento.valor', '[valor] is required').isLength({ min: 4 }).isFloat()
  ], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    var pagamento = req.body["pagamento"];
    console.log('processando pagamento...');

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamento.status = "CRIADO";
    pagamento.data = new Date;

    pagamentoDao.salva(pagamento, function (error, result) {

      if (error) {

        console.log("Erro ao salvar -->" + error)
        res.status(500).send(error);

      } else {

        pagamento.id = result.insertId
        console.log('pagamento criado: ' + pagamento.valor);
        res.location('/pagamentos/pagamento/' + pagamento.id);

        if (pagamento.forma_de_pagamento == "cartao-paypay") {

          var cartao = req.body["cartao"]
          console.log(cartao)

          const clienteCartoes = new app.servicos.clienteCartoes();
          clienteCartoes.autoriza(cartao, function (exception, request, response, retorno) {
            if(exception){

             console.log(exception)
             res.status(400).send(exception)

            }else {

              var response = {
                daddos_do_pagamento: pagamento,
                cartao: retorno,
                links: [
                  {
                    href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                    rel: "confirmar",
                    method: "PUT"
                  },
                  {
                    href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                    rel: "cancelar",
                    method: "DELETE"
                  }
                ]
              }
              res.status(201).json(response)
              return
            }
          })
        } else {

          var response = {
            daddos_do_pagamento: pagamento,
            links: [
              {
                href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                rel: "confirmar",
                method: "PUT"
              },
              {
                href: "http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                rel: "cancelar",
                method: "DELETE"
              }
            ]
          }
          res.status(201).json(response);
        }

      }

    })
  })
}



