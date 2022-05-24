var express = require('express');
var app = express();
const server = require('http').createServer(app);
//const io = require('socket.io')(server, {'pingTimeout': 180000, 'pingInterval': 25000});
const port = process.env.PORT || 5000;
const path = require('path');
const bcrypt = require('bcrypt');
//cookie parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());


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

let toppingPizz;

let starterName;

let boissonName;

let menuName;

let commande;

let fin;


client.query('Select * from Pizza', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        pizzaName = res.rows;
    }
    //client.end(); // Ne pas end sinon plus possible de faire aucune demande
})

client.query('Select * from topping', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        toppingPizz = res.rows;
    }
    //client.end(); // Ne pas end sinon plus possible de faire aucune demande
})


client.query('Select * from boisson', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        boissonName = res.rows;
    }
    //client.end(); // Ne pas end sinon plus possible de faire aucune demande
})

client.query('Select * from starter', (err, res) => {
    if (err) {
        console.log(err.stack);
    } else {
        starterName = res.rows;
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
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'));
//app.use(bodyParser.urlencoded({ extended: true })); 

app.get('/', (req, res) => {
    if (isLogged(req)) {
        livreur(res);
        ;
    }
    else {
        console.log(toppingPizz);
        let prom = new Promise((resolve, reject) => {
            client.query('Select * from menu', (err, res) => {
                if (err) {
                    console.log(err.stack);
                } else {
                    menuName = res.rows;
                }
                resolve(menuName);
            })
        })
        prom.then(() => {
            console.log(menuName);
            res.render("index.ejs", { message: "rayane teste", pizzaName: pizzaName, toppingPizz: toppingPizz, starterName: starterName, boissonName: boissonName, menuName: menuName });
        })
    }

})

app.get('/login', (req, res) => {
    res.render("login.ejs", { tried: "0" });
})


app.get('/register', (req, res) => {
    res.render("register.ejs", { tried: "0" });
})

let command_info;

app.get('/etat/:id', (req, res) => {
    var sqlLine = "Select * from commande where commande_id = " + req.params.id;
    let prom = new Promise((resolve, reject) => {
        client.query(sqlLine, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(sqlLine);
                fin = res.rows;
                resolve(res);
            }
        })
    })
    prom.then(() => {
        console.log('coucou');
    })
    var sqlLine2 = "Select * from commande_ligne where commande_id = " + req.params.id;
    let prom2 = new Promise((resolve, reject) => {
        client.query(sqlLine2, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(sqlLine2);
                command_info = res.rows;
                resolve(res);
            }
        })
    })
    prom2.then(() => {
        console.log('coucou');
        res.send('<script>window.location.href="/etat";</script>');
    })
    //res.render("etat.ejs");
})

app.get('/etat', (req, res) => {
    let pizza;
    let boisson;
    res.render("etat.ejs", { fin: fin });

})

app.get('/basket', (req, res) => {
    //console.log('Cookies: ', req.cookies.basket);
    const elmns = [];
    elmns.push(req.cookies.basket);
    //console.log(elmns.join(''));
    //regex '/' elmns
    var bisElmns = elmns.join('').split('/');
    bisElmns = elmns.join('').split(',');
    res.render("basket.ejs", { basket: bisElmns });
})

function getCookiePers(req) {
    const elmns = [];
    elmns.push(req.cookies.basket);
    //console.log(elmns.join(''));
    //regex '/' elmns
    var bisElmns = elmns.join('').split('/');
    return bisElmns;
}

app.get('/order', (req, res) => {
    //console.log('Cookies: ', req.cookies.basket);
    const elmns = [];
    elmns.push(req.cookies.basket);
    //console.log(elmns.join(''));
    //regex '/' elmns
    var bisElmns = elmns.join('').split('/');
    bisElmns = elmns.join('').split(',');
    res.render("order.ejs", { basket: bisElmns });
})

function livreur(res) {
    let prom = new Promise((resolve, reject) => {
        client.query('Select * from commande where status !=2', (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                commande = res.rows;
            }
            resolve(commande);
        })
    })
    prom.then(() => {
        //console.log(commande);
        res.render("livreur.ejs", { commande: commande });
    })
}

let test_pers;

function get_id_commande(res) {
    let retur;
    let prom = new Promise((resolve, reject) => {
        client.query('Select MAX(commande_id) from commande', (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                retur = res.rows;
            }
            resolve(retur);
        })
    })
    prom.then(() => {
        console.log(retur);
        test_pers = retur;
    })
}

function isLogged(req) {
    if (req.cookies.token != null) {
        return true;
    }
}

app.get('/livreur', (req, res) => {
    if (isLogged(req)) {
        livreur(res);
    }
})
app.get('/livreur/:id', (req, res) => {
    var id_command = 0;
    var sqlLine = "UPDATE commande SET status = 1 WHERE commande_id = " + req.params.id;
    let prom = new Promise((resolve, reject) => {
        client.query(sqlLine, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(sqlLine);
                resolve(res);
            }
        })
    })
    prom.then(() => {
        console.log('coucou');
        //res.render("/livreur");
        res.send('<script>window.location.href="/livreur";</script>');

    })
})

app.get('/livre/:id', (req, res) => {
    var id_command = 0;
    var sqlLine = "UPDATE commande SET status = 2 WHERE commande_id = " + req.params.id;
    let prom = new Promise((resolve, reject) => {
        client.query(sqlLine, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(sqlLine);
                resolve(res);
            }
        })
    })
    prom.then(() => {
        console.log('coucou');
        //res.render("/livreur");
        res.send('<script>window.location.href="/livreur";</script>');

    })
})

app.post('/orderConfirm', function (request, response) {
    let prom2 = new Promise((resolve, reject) => {
        client.query('Select MAX(commande_id) from commande', (err, resi) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(resi.rows[0].max);
                var sqlLine = "INSERT INTO commande (name_client, adresse, status, prix) VALUES ('" + request.body.Nom + "','" + request.body.Adresse + "','" + 0 + "', '" + 10 + "')";
                let danydan = getCookiePers(request);
                let prom = new Promise((resolve, reject) => {
                    client.query(sqlLine, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log(sqlLine);
                            resolve(res);
                        }
                    })
                })
                prom.then(() => {
                    console.log('coucou');
                    for (var i = 0; i < danydan.length - 1; i = i + 8) {
                        var newsqlLine = "INSERT INTO commande_ligne values ('" + danydan[i + 1] + "','" + danydan[i + 7] + "','" + (resi.rows[0].max + 1) + "','" + danydan[i + 3] + "','" + danydan[i + 4] + "','" + danydan[i + 5] + "')";
                        let prom3 = new Promise((resolve, reject) => {
                            client.query(newsqlLine, (err, res) => {
                                if (err) {
                                    console.log(err.stack);
                                } else {
                                    console.log(newsqlLine);
                                    resolve(res);
                                }
                            })
                        })
                        prom3.then(() => {
                            console.log('coucou');
                        })
                    }
                    response.send('<script>window.location.href="/etat/' + (resi.rows[0].max + 1) + '";</script>');
                })

                resolve(resi.rows[0].max);

            }

        })
    })
    prom2.then((val) => {
        console.log("ici");
    })
    //get_id_commande(response);

});

app.post('/register', function (request, response) {
    var name = request.body.name;
    var surename = request.body.surename;
    var email = request.body.email;
    var password = request.body.password;

    if (name && surename && email && password) {
        client.connect;
        client.query("SELECT * FROM users WHERE mail = '" + email + "'", (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log(res.rows.length);
                if (res.rows.length > 0) {
                    response.render("register.ejs", { tried: "1" });
                } else {
                    bcrypt.hash(password, 10, function (err, hash) {
                        let token = Array(100).fill().map(() => "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.random() * 62)).join(""); // TODO : Vérifier que le token est unique
                        client.query("INSERT INTO users VALUES (1,'" + name + "','" + surename + "','" + email + "',NULL,NULL,'" + token + "','" + hash + "')", (err, res) => { // TODO : Changer uniqueID pr autoincrement
                            if (err) {
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

app.post('/login', function (request, response) {
    var mail = request.body.mail;
    var password = request.body.password;
    if (mail && password) {
        client.query("SELECT * FROM users WHERE mail = '" + mail + "'", (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                if (res.rows.length > 0) {
                    //console.log(res.rows[0].password);
                    let token = res.rows[0].token;

                    bcrypt.compare(password, res.rows[0].password, function (err, res) {
                        if (res == true) {
                            request.session.loggedin = 1;
                            response.cookie("token", token);
                            request.session.token = token;
                            response.redirect('/');
                            console.log('token: ' + request.session.token + ' is logged in');
                        } else {
                            response.render("login.ejs", { tried: "1" });
                        }
                    });
                } else {
                    response.redirect('/register');
                }
            }
        });
    }
});

server.listen(port, () => {
    console.log(`Ca demarre sur le port ${port}`);
});