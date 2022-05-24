# PizzaDog
HAMIMI DANY / 21952735
KAABECHE Rayane / 
L3 INFORMATIQUE GROUPE 3
Projet de Programmation WEB : 

Afin de pouvoir utiliser le Site vous devez au préalable installer la base de données présente dans le fichier
PizzaDogData.sql via les commandes suivantes dans la base de donnée du nom "pizzadog" que vous aurez créee

CREATE DATABASE pizzadog;
\q
psql pizzadog < PizzaDogData.sql

Votre base de donnée postgresql devra avoir les identifiants suivants ou bien vous pourrez les changer depuis le
fichier server.js :
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "myPassword",
    database: "pizzadog",

Ensuite vous pourrez lancer le site via les commandes suivantes :

npm i
npm install express
npm install bcrypt
npm install cookie-parser
npm install express-session
npm install pg
npm install ejs
npm start
vous pourrez accéder au site via localhost:5000

Les fonctionalités vous sont présentées dans la vidéo suivante :

