const fs = require('fs')

module.exports = function(app){

    app.post("/upload/imagem", function(req, res){

        console.log("--> Recebendo imagen...")
        //Para testar, não esquecer o headers filename.
        var filename = req.headers.filename

        req.pipe(fs.createWriteStream('files/' + filename))
           .on('finish', function(){
               console.log("-> Arquivo escrito:" + filename)
               res.status(201).send('ok')
           })
    })
}