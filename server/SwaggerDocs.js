var createError = require('http-errors');
var express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs= require('fs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const accountRouter = require("./routes/account");
const custmersRouter = require("./routes/custmers");
const farmersRouter = require("./routes/farmers");



var app = express();


const swaggerOptions = {

  swaggerDefinition:{
    info: {
      // API informations (required)
      title: 'Swagger MWA', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'A sample for MWA', // Description (optional)
    },
    
    basePath: '/routes/', // Base path (optional)
  },
  //apis:['account.js','custmers.js','farmers.js','users.js'],
    apis:['account.js']
  

};

const sweggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swiger', swaggerUi.serve, swaggerUi.setup(swaggerOptions));




// view engine setup
module.exports = app;
