const
    mysql = require('mysql'),
    bodyParser = require('body-parser'),
    express = require('express');

const connect = () =>{
    return mysql.createConnection({
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 6033,
        user: 'root',
        password: 'secret',
        database: 'mysql'
    })
};

var app = express();

app.listen(4941, function(){
    console.log('Connected');
})
