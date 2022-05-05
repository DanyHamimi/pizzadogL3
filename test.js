var express = require('express');
var app = express();
const server = require('http') .createServer(app);
//const io = require('socket.io')(server, {'pingTimeout': 180000, 'pingInterval': 25000});
const port = process.env.PORT || 5000;
const path = require('path');
const bcrypt = require('bcrypt');


var session = require('express-session')({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  });
app.use(session);
//postgresql connection
const { Client } = require('pg');
const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "myPassword",
    database: "pizzadog",
});

client.connect();

let pizzaName;

client.query('Select * from Pizza', (err, res) => {
    if(err) {
        console.log(err.stack);
    }else{
        console.log(res.rows);
        pizzaName = res.rows;
    }
    //client.end(); // Ne pas end sinon plus possible de faire aucune demande
})


//ejs
app.set('view engine', 'ejs');
app.set('views', path.join('./views'));




var session = require('express-session')({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  });

app.use(session);
app.use(express.static('img'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req,res) => {
    res.render("index.ejs", {message: "rayane teste", pizzaName: pizzaName});    
})

app.get('/login', (req,res) => {
    res.render("login.ejs", {});
})

app.get('/register', (req,res) => {
    res.render("register.ejs", {});
})
app.get('/registerB', (req,res) => {
    res.render("registerB.ejs", {});
})

app.get('/basket', (req,res) => {
    res.render("basket.ejs", {});
})

app.post('/register', function(request, response) {
    var name = request.body.name;
    var surename = request.body.surename;
    var email = request.body.email;
    var password = request.body.password;

    if(name && surename && email && password){
        client.connect;
        client.query("SELECT * FROM users WHERE mail = '"+email+"'", (err, res) => {
            if(err) {
                console.log(err.stack);
            }else{
                console.log(res.rows.length);
                if(res.rows.length > 0){
                    response.redirect('/registerB');//Changer la page de register en ejs pr afficher le message d err
                } else {
                    bcrypt.hash(password, 10, function(err, hash) {
                        let token = Array(100).fill().map(()=>"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.random()*62)).join(""); // TODO : Vérifier que le token est unique
                        client.query("INSERT INTO users VALUES (1,'"+name+"','"+surename+"','"+email+"',NULL,NULL,'"+token+"','"+hash+"')", (err, res) => { // TODO : Changer uniqueID pr autoincrement
                            if(err) {
                                console.log(err.stack);
                            } else {
                                response.redirect('/login');
                            }
                        });
                    });
                }
            } 

        });
    }
})

app.post('/login', function(request, response) {
    var mail = request.body.mail;
    var password = request.body.password;
    if(mail && password){
        client.query("SELECT * FROM users WHERE mail = '"+mail+"'", (err, res) => {
            if(err) {
                console.log(err.stack);
            }else{
                if(res.rows.length > 0){
                    //console.log(res.rows[0].password);
                    let token = res.rows[0].token;

                    bcrypt.compare(password, res.rows[0].password, function(err, res) {
                        if(res == true){
                            request.session.loggedin = 1;
                            response.cookie("token", token);
                            request.session.token = token;
                            response.redirect('/');
                            console.log('token: ' + request.session.token+' is logged in');
                        } else {
                            response.redirect('/login');
                        }
                    });
                } else {
                    response.redirect('/register');
                }
            }
        });
    }
});

server.listen(port, () =>{
    console.log(`Ca demarre sur le port ${port}`);
});