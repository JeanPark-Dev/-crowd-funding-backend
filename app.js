const db = require('./config/db');
const express = require('./config/express');

const app = express();

// Connect to MySQL on start
db.connect(function(err){
    if (err) {
        console.log('Unable to connect to MySQL.');
        process.exit(1);
    } else {
        app.listen(4000, function() {
            console.log('Listening on port: ' + 4000);
        });
    }
});