const express = require('express')
const morgan =require('morgan');
const cors = require('cors');
const { notFoundHandellar, globalErrorHandellar } = require('./errorHandler');

//all middlewares setup
let middlewares = [express.json(), express.urlencoded({extended : true}) , morgan('dev') , cors() , notFoundHandellar , globalErrorHandellar]

//export for external use
module.exports = middlewares



