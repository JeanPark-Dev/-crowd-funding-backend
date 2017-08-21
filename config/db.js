const mysql = require('mysql');
const importer = require('node-mysql-importer');

const state = {
    pool: null
};

var config = {
    host: process.env.SENG365_MYSQL_HOST || 'localhost',
    port: process.env.SENG365_MYSQL_PORT || 6033,
    user: 'root',
    password: 'secret',
    database: 'test'
    // database: 'mysql'
};

exports.connect = function(done){
    state.pool = mysql.createConnection(config);
    done();
};

exports.createTables = function(){
  importer.config(config);

  importer.importSQL('tabel.sql').then( () => {
    console.log('statement executed');
  }).catch( err=> {
    console.log('err');
  })
}

exports.get = function(){
    return state.pool;
}
