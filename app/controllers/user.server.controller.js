const User = require('../models/user.server.model');

exports.viewUser = function(req, res){
    var id = parseInt(req.params.user_id);
    // console.log(typeof(id));
    User.getUser(id, function(result){
        result = {
            "id": result[0]["id"],
            "username": result[0]["username"],
            "location": result[0]["location"],
            "email": result[0]["email"]
        }
        res.json(result);
    })
}

exports.Create_User = function(req, res){

    // var id = parseInt(req.body.id);
    var username = req.body.username;
    var location = req.body.location;
    var email = req.body.email;
    var password = req.body.password;
    // console.log(email);

    var value = [
        username, location, email, password
    ]
    console.log(value);

    User.add_user(value, function(err, result){
        res.sendStatus(200, result);
    })
}

exports.Login = function(req, res){
    var id;
    var username = req.body.username.toString();
    var password = req.body.password.toString();


    User.LoginResponse(username, password, function(err, result){
        var token;
        // console.log(result[0]["id"])
        // console.log(result);
        if (err == 200){
            token = TOKEN();
            id = result[0]["id"];
            User.inputTOKEN(token, username, function(err, result){
                // console.log(result);
                result = {
                    "id": id,
                    "token": token
                };
                res.json(result);

            })
        } else if (err == 400){
            res.send(err, result);

        }

    })

}

exports.Logout = function(req, res){
    var Token = req.get('X-Authorization');
    // console.log(Token);
    User.deleteTOKEN(Token, function(err, result){
        res.json()
    })

}

exports.UpdateUser = function(req, res){
    var TOKEN = req.get('X-Authorization');
    var user_id = req.params.user_id;
    var user_data = req.body;


    User.getUserIDbyTOKEN(TOKEN, function(result){

        if (parseInt(user_id) == result){
            var values = [
                user_data["user"]["username"].toString(),
                user_data["user"]["location"].toString(),
                user_data["user"]["email"].toString(),
                user_data["password"].toString(),
                user_id
            ]

            User.updateUserDetail(values, function(err, result){
                // console.log("updateUserDetail");
                res.json();
            })
        } else {
            res.sendStatus(403, "Forbidden - account not owned");
        }

    })

}


exports.DeleteUser = function(req, res){
    var TOKEN = req.get('X-Authorization');
    var user_id = parseInt(req.params.user_id);

    User.getUserIDbyTOKEN(TOKEN, function(result){
        if (user_id == result){
            User.deleteCreator(user_id, function(result){
                // res.sendStatus(200, "User deleted");
                console.log
                User.deleteBackers(user_id, function(result){
                    User.deleteUser(user_id, function(result){
                        res.sendStatus(200, "User deleted");
                    })
                })
            })
        } else {
            res.sendStatus(403, "Forbidden - account not owned");
        }
    });
}



function TOKEN(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
