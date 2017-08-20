const db = require('../../config/db.js');

exports.getUser = function(userId, done){

    // var sql = 'SELECT *' +
    //     'FROM Users' +
    //     'WHERE id = ?';

    var sql = 'SELECT * from Users where id = ?';

    db.get().query(sql, userId, function(err, rows){
        if (err) return done({"ERROR": "Error'getUser'"});
        return done(rows);
    })
}

exports.add_user = function(userdata, done){
    var sql = 'INSERT INTO Users (username, location, email, password) VALUES (?, ?, ?, ?)';

    db.get().query(sql, userdata, function(err, result){
        if (err) return done({"ERROR": "Error add_user"});
        return done("OK");
    });


}

exports.LoginResponse = function(username, password, done){
    console.log(username);
    var values = [
        username,
        password
    ]
    var sql = 'SELECT id, Token from Users WHERE username = ? AND password = ?';

    db.get().query(sql, values, function(err, result){
        // console.log(typeof(JSON.stringify(result)));
        var r = result.toString();

        // console.log(r == '[object Object]');
        if (r == '[object Object]'){
            console.log("correct");
            return done(200, result);
        } else {
            console.log('wrong');
            return done(400, "Invalid username/password supplied");
        }
    })
}

exports.inputTOKEN = function(TOKEN, username, done){
    var values = [
        TOKEN,
        username
    ];
    var sql = "UPDATE Users SET Token = ? WHERE username = ?";

    db.get().query(sql, values, function(err, result){
        if (err) return done({"ERROR": "Error inputTOKEN"});
        done(result);
    });
};


exports.deleteTOKEN = function(TOKEN, done){
    var sql = "UPDATE Users SET Token = NULL WHERE Token = ?";

    db.get().query(sql, TOKEN, function(err, result){
        if (err) return done({"ERROR": "Error inputTOKEN"});
        done(result);
    })
}

exports.updateUserDetail = function(user_data, done){
    // console.log("updateUserDetail");
    var sql = "UPDATE Users SET username = ?, location = ?, email = ?, password = ? WHERE id = ?";

    db.get().query(sql, user_data, function(err, result){
        // console.log("updateUserDetail: query");

        if (err) return done({"ERROR": "Error 'updateUserDetail'"});
        done(result);
    })
}

exports.deleteUser = function(user_id, done){
    var sql = "DELETE FROM Users WHERE id = ?";

    db.get().query(sql, user_id, function(err, result){
        if(err) return done({"ERROR": "Error 'deleteUser"});
        done(result);
    })
}

exports.getUserIDbyTOKEN = function(TOKEN, done){
    var sql = 'SELECT id FROM Users where Token = ?';
    // console.log("getUserIDbyTOKEN");
    db.get().query(sql, TOKEN, function(err, result){
        if (err) return done({"ERROR": "getUserIDbyTOKEN"});
        // console.log(result);
        // console.log("getUserIDbyTOKEN: query");
        return done(result[0]['id']);
    });
};

