const fs = require('fs')

fs.readFile('dark.jpg', function(error, buffer){
    
    console.log("Arquivo lido")
    fs.writeFile('dark2.jpg', buffer, function(err){
        console.log('--> Arquivo escrito')
    })
})