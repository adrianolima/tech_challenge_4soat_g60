var express = require('express')
var {Client} = require('pg');
var app = express()

client = new Client({
    host: 'totem-postgres',
    user: 'totem',
    password: 'totem',
    database: 'totem',
})

client.connect().then(() => {
    console.log('Connected to database!');
}).catch((err) => {
    console.error('Error connecting to the database:', err);
});

app.get('/', function (req, res) {

})

app.listen(80, function () {
    console.log('app listening on port 80!')
})

