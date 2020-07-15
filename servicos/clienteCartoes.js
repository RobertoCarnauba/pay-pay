const assert = require('assert');
const clients = require('restify-clients');
 
var client = clients.createJsonClient({
  url: 'http://localhost:3001'
});
 
client.post('/cartoes/autoriza',{cartao} , function (err, req, res, obj) {
  assert.ifError(err);
  console.log( obj);
});