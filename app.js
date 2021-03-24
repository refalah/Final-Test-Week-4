const express = require('express')
const flash = require('express-flash')
const dotenv = require('dotenv')
const ejs = require('ejs')
const mysql = require('mysql');
const session = require('express-session');
const multer = require('multer')
const path = require('path')
//const flash = require('connect-flash');

const app = express();
const formRouter = require('./routes/form');

dotenv.config({path: './.env'});

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

//Storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//Init Upload
const upload = multer({
    storage: storage,
}).single('photo')

app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: false
}))
app.use(flash());
/////ROUTES//////
app.use('/', formRouter);

app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('started on port 3000');
});