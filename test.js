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
app.use(express.static('img'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}\public\index.html`)
})

server.listen(port, () =>{
    console.log(`Ca demarre sur le port ${port}`);
});