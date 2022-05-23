var express = require('express');
var app = express();
const server = require('http') .createServer(app);
//const io = require('socket.io')(server, {'pingTimeout': 180000, 'pingInterval': 25000});
const port = process.env.PORT || 5000;
const path = require('path');
const bcrypt = require('bcrypt');

var mysql = require('mysql');

var session = require('express-session')({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
  });
//var sharedsession = require("express-socket.io-session");
//const { emit } = require('process');
//const { Socket } = require('engine.io');

app.use(session);

//io.use(sharedsession(session));

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'pizzadog',
    charset : 'utf8mb4',
    dateStrings: true,
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`${__dirname}/public/index.html`);
    console.log("Connected!");
  });

app.use(express.static('img'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}\public\index.html`)
    /*if(request.session.loggedin != 1){
        request.session.loggedin = 0;
    }*/
})

app.post('/index.html', function (req, res) {
    res.redirect(`/index.html?name=${req.body.name}`)
    console.log(`Full name is:${req.body.name} .`);
})

app.post('/register', function(request, response) {
    var name = request.body.name;
    var surename = request.body.surename;
    var email = request.body.email;
    var password = request.body.password;


    if(name && surename && email && password){
        connection.query('SELECT * FROM users WHERE mail = ?', [email], function(error, results, fields) {
            console.log(results.length);
            if(results.length > 0){
                response.redirect('/registerB.html')
            } else {
                bcrypt.hash(password, 10, function(err, hash) {
                    connection.query('INSERT INTO users (name, surename, mail, password) VALUES (?, ?, ?, ?)', [name, surename, email, hash], function(error, results, fields) {
                        if(error) {
                            console.log(error);
                        } else {
                            response.redirect('/login.html');
                        }
                    });
                });
            }
        });
    };
});

app.post('/login', function(request, response) {
    var mail = request.body.mail;
    var password = request.body.password;
    if(mail && password){
        connection.query('SELECT * FROM users WHERE mail = ?', [mail], function(error, results, fields) {
            if(results.length > 0){
                bcrypt.compare(password, results[0].password, function(err, res) {
                    if(res == true){
                        request.session.loggedin = 1;
                        request.session.name = results[0].name;
                        request.session.surename = results[0].surename;
                        request.session.mail = results[0].mail;
                        request.session.id = results[0].id;
                        response.redirect('/index.html');
                        console.log('mail: ' + request.session.mail+' is logged in');
                    } else {
                        response.redirect('/login.html');
                    }
                });
            } else {
                response.redirect('/register.html');
            }
        });
    }
});

/*io.on('connection', (socket) =>{
    var session = socket.handshake.session;

    socket.on('checkmail', (mail) => {
        console.log("mail");
        connection.query('SELECT * FROM users WHERE mail = ?', [mail], function(error, results, fields) {
            if(results.length > 0){
                io.emit('checkmail', 'User already exists');
            } else {
                io.emit('checkmail', 'User does not exist');
            }
        }); 
    });
});*/

server.listen(port, () =>{
    console.log(`Ca demarre sur le port ${port}`);
});