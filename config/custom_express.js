const express = require('express')
const consign = require('consign')
var bodyParser = require('body-parser')

module.exports = function(){
    
    const app = express()
    bodyParser.urlencoded({extended: true})
    app.use(bodyParser.json())

    consign()
    .include('controllers')
    .into(app)

    return app


}