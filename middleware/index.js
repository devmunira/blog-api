const express = require('express')
const morgan =require('morgan');
const cors = require('cors')

//all middlewares setup
let middlewares = [express.json(), express.urlencoded({extended : true}) , morgan('dev') , cors()]

//export for external use
module.exports = middlewares



