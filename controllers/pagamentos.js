

module.exports = function(app){
    app.get('/pagamentos', (req, res) => {
      res.send('PAGAMENTOS')
    })

    app.post('/pagamentos/pagamento', (req, res)=> {
      var pagamento = req.body;  
      res.json(pagamento)
    })
}


  
   