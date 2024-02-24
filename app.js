// 1. Invocamos a Express   
const express = require('express');
const app = express();

// 2. Seteamos Urlencoder para las variables
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// 3. Invocamos a DOTENV
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

// 4. El directorio public
app.use('/resource', express.static('public'));
app.use('/resource', express.static(__dirname + '/public'));

// 5. Establecemos el motor de plantillas ejs
app.set('view engine', 'ejs');

// 6. Invocamos a  bcryptjs
const bcryptjs = require('bcryptjs');

// 7. Var de Session
const session = require('express-session');

app.use(session({
    secret:'secret',
    resave:true,
    saveUnitialized: true
}));


// 8 - Invocamos al modulo de conexion de la BDC
const connection = require('./database/db');

app.get('/', (req, res) => {
    res.send('Hola Mundo!!!!!!'); 
});

app.listen(3000, (req, res) => {
    console.log('SERVER MUST RUNNING IN http://localhost:3000');
});


