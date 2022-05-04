var express = require('express');
var app = express();
const server = require('http') .createServer(app);
//const io = require('socket.io')(server, {'pingTimeout': 180000, 'pingInterval': 25000});
const port = process.env.PORT || 5000;
const path = require('path');
const bcrypt = require('bcrypt');



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

client.query('Select * from Pizza', (err, res) => {
    if(err) {
        console.log(err.stack);
    }else{
        console.log(res.rows);
    }
    client.end();
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
    res.sendFile(`${__dirname}\views\index.ejs`)
})

server.listen(port, () =>{
    console.log(`Ca demarre sur le port ${port}`);
});