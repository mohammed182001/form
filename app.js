const express = require('express');
const expresslayout = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 5000;
const moongose = require('mongoose');

const flash = require('connect-flash');
const session = require('express-session');
//database config
const db = require('./config/key').mongoURI;
//connecting to moongo
moongose.connect(db,{useNewUrlParser : true})
    .then( ()  =>console.log('MongoDB has been connected....'))
    .catch(err => console.log(err));
//EJS
app.use(expresslayout);
app.set('view engine','ejs');
//bodyparser
app.use(express.urlencoded({extended : false}));
//express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
//connect flash
app.use(flash());
//global vars
app.use((req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});
//routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.listen(PORT , console.log(`server is running on port ${PORT} `));