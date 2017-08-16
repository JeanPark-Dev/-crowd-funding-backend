const db = require('../../config/db.js');

exports.ProjectOverview = function(done) {
    var sql = 'SELECT Projects.id, title, subtitle, imageUri ' +
        'FROM Projects ' +
        'JOIN Project_data on (Projects.id = Project_data.id)';

    // var sql = 'SELECT target, currentPledged, No_Backers AS numberOfBackers' +
    //     'FROM Progress' +
    //     'JOIN Project_data ON (Progress.project_id = Project_data.id)' +
    //     'WHERE Progress.project_id = 1';

    // var sql = 'SELECT target, currentPledged, No_Backers AS numberOfBackers From Progress JOIN Project_data on (Progress.project_id = Project_data.id) where Progress.project_id = 1';

    db.get().query(sql, function (err, rows){
        if (err) return done({"ERROR": "Error 'ProjectOverview'"});
        return done(rows);
    });
};

exports.ProjectDetails = function(done){

};

exports.Project = function(done){

};

exports.ProjectData = function(projectId, done){
    // var sql = 'SELECT Projects.title, Projects.subtitle, Project_data.description, Project_data.imageUri, Project_data.target' +
    //     'FROM Projects' +
    //     'JOIN Project_data ON (Projects.id = Project_data.id)' +
    //     'WHERE Projects.id = ?';

    var sql = 'SELECT Projects.title, Projects.subtitle, Project_data.description, Project_data.imageUri, Project_data.target FROM Projects JOIN Project_data ON (Projects.id = Project_data.id) WHERE Projects.id = ?';


    db.get().query(sql, projectId, function(err, rows){
        if (err) return done({"ERROR": "Error 'ProjectData'"});
        done(rows);
    });
};

exports.creators = function(projectId, done){
    var sql = 'SELECT user_id AS id, username AS name ' +
        'FROM Users ' +
        'JOIN Creators on (Creators.user_id = Users.id) ' +
        'WHERE project_id = ?';

    db.get().query(sql, projectId, function(err,rows){
        if (err) return done({"ERROR": "Error 'creators'"});
        done(rows);
    });
};



exports.Progress = function(projectId, done){
    var sql = 'SELECT target, currentPledged, No_Backers AS numberOfBackers ' +
        'From Progress ' +
        'JOIN Project_data on (Progress.project_id = Project_data.id) ' +
        'WHERE Progress.project_id = ?';

    db.get().query(sql, projectId, function (err, rows){
        if (err) return done({"ERROR": "Error 'Progress'"});
        return done(rows);
    })
};

exports.Reward = function(rewardId, done){
    var sql = 'SELECT id, amount, description ' +
        'FROM Rewards ' +
        'WHERE project_id = ?';

    db.get().query(sql, rewardId, function (err, rows){
        if (err) return done({"ERROR": "Error 'Reward'"});
        return done(rows);
    })
};


exports.addProject = function(done){

}



exports.Pledge = function(done){

};

exports.CreditCard = function(done){

};

exports.User = function(userId, done){
    var sql = "SELECT id, username, location, email FROM Users where id = ?";

    db.get().query(sql, userId, function (err, rows){
        if (err) return done({"ERROR": "Error 'User'"});
        return done(rows);
    })
};

exports.PublicUser = function(done){

};

exports.LoginResponse = function (done){

};



