/*
const mysql = require('mysql');
const importer = require('node-mysql-importer');
const fs = require('fs');

const state = {
    pool: null
};

var config = {
    host: process.env.SENG365_MYSQL_HOST || 'localhost',
    port: process.env.SENG365_MYSQL_PORT || 6033,
    user: 'root',
    password: 'secret',
    // database: 'test'
    database: 'mysql'
};

exports.connect = function(done){
    state.pool = mysql.createConnection(config);
    done();
};

exports.createTables = function(){
  var sql = fs.readFileSync("./table.sql").toString();
    state.pool.query(sql, function(err, rows) {
        if(!err){

        } else {

        }
    })


  // importer.importSQL('table.sql').then( () => {
  //   console.log('statement executed');
  // }).catch( err => {
  //   console.log('err');
  // })
}

exports.get = function(){
    return state.pool;
}
*/

const mysql = require('mysql');
const fs = require('fs');


const state = {
    pool: null
};

exports.connect = function(done){
    state.pool = mysql.createPool({
        multipleStatements: true,
        host: process.env.SENG365_MYSQL_HOST || 'localhost',
        port: process.env.SENG365_MYSQL_PORT || 6033,
        user: 'root',
        password: 'secret',
        database: 'mysql'
        // database: 'mysql'
    });
    done();
};

exports.get = function(){
    return state.pool;
}

exports.DB = function(done){
    var sql = fs.readFileSync("./table.sql").toString();
    state.pool.query(sql, function(err, rows){
        if (!err){
            console.log("db create");
        } else {
            console.log(err);
        }
    });
    done();
}