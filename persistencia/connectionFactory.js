var mysql  = require('mysql');

  function createDBConnection(){
    return mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'paypay'
    });
  }

  module.exports = function() {
    return createDBConnection;
  }