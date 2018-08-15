 const express = require( 'express' );
const bodyParser = require('body-parser');
const mongoose= require('mongoose');



const passport =require('passport');
const config = require('./config/main')
const morgan  = require('morgan');
const User = require('./models/user');



const port = 8000;
const app = express();

//jwt stuff
const jwt = require("jsonwebtoken");



//use body-parser to make a request for our login
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan('dev'));
mongoose.connect(config.database)

require('./config/passport')(passport);
require('./routes/routes');

//const app = express.Router()
// route
app.get('/', (req, res) => {
  res.send('Welcome to home page')
});



app.listen(port);
console.log('We are running live on  port' +  port + '.');