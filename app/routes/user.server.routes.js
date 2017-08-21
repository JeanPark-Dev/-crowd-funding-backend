const users = require('../controllers/user.server.controller');
const db = require('../../config/db.js');


function isValidToken(token, done){
    // console.log('isValidToken');
    var sql = 'SELECT * FROM Users WHERE Token = ?';
    db.get().query(sql, token, function(err, result){

        // console.log(JSON.parse(JSON.stringify(result)).length);

        if (JSON.parse(JSON.stringify(result)).length == 0){
            done(false);
        } else {
            // result = true;
            done(true);
        }


    });
}

const myMiddleware = (req, res, next) => {
    // console.log("myMiddleware");
    // console.log(req.get('X-Authorization'))
    isValidToken(req.get('X-Authorization'), function(result){
        // console.log(result);
        if(result){
            next();
        } else {
            // console.log("token FAIL");
            // res.sendStatus(401);
            res.send(401);
        }
    })
}

module.exports = function(app) {
    app.route('/api/users')
        .post(users.Create_User);

    app.route('/api/users/login')
        .post(users.Login);

    app.route('/api/users/logout')
        .post(myMiddleware, users.Logout);

    app.route('/api/users/:user_id')
        .get(users.viewUser)
        .put(myMiddleware, users.UpdateUser)
        .delete(myMiddleware, users.DeleteUser);
};
