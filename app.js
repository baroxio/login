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
    name: 'app_rigo',
    secret:'secret',
    resave: false,
    saveUninitialized: true
}));


// 8 - Invocamos al modulo de conexion de la BDC
const connection = require('./database/db');


// 9. Estableciendo las rutas
app.get('/', (req, res) => {
    res.render('index'); 
});
app.get('/login', (req, res) => {
    res.render('login'); 
});
app.get('/register', (req, res) => {
    res.render('register'); 
});


// 10. Registracion
app.post('/register', async (req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    connection.query('INSERT INTO users SET ?', {user:user, name:name, rol:rol, pass:passwordHaash}, async(error, results)=>{
        if(error){
            console.log(error);
        } else {
            res.render('register', {
                alert: true,
                alertTitle: "Registration", 
                alertMessage: "!Successful Registration!",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 2000,
                ruta:''
            })
        }
    })
})

app.listen(3000, (req, res) => {
    console.log('SERVER MUST RUNNING IN http://localhost:3000');
});


