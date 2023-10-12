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
    client.query('SELECT * FROM clientes', (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
        } else {
            res.json(result.rows)
        }
    });

})

app.listen(80, function () {
    console.log('app listening on port 80!')
})

