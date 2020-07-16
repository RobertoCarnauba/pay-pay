const fs = require('fs');

fs.createReadStream('dark.jpg')
  .pipe(fs.createWriteStream('dark2-stream.jpg'))
  .on('finish', function(){
      console.log('--> Aquivo criado com Stream.')
  })