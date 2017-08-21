const db = require('../../config/db.js');

exports.ProjectOverview = function(startIndex, count,done) {
    var values = [startIndex, count];
    var sql = 'SELECT Projects.id, title, subtitle, imageUri ' +
        'FROM Projects ' +
        'JOIN Project_data ON (Projects.id = Project_data.id)' +
        'ORDER BY Projects.id ' +
        'LIMIT ?, ?';

    db.get().query(sql, values, function (err, rows){
        if (err) return done({"ERROR": "Error 'ProjectOverview"});
        return done(rows);
    });
};

exports.ProjectData = function(projectId, done){
    var sql = 'SELECT Projects.id, Projects.title, Projects.subtitle, Project_data.createDate, Project_data.description, Project_data.imageUri, Project_data.target FROM Projects JOIN Project_data ON (Projects.id = Project_data.id) WHERE Projects.id = ?';
    db.get().query(sql, projectId, function(err, rows){
        if (err) return done({"ERROR": "Error 'ProjectData'"});
        return done(rows);
    });
};

exports.creators = function(projectId, done){
    var sql = 'SELECT user_id AS id, username AS name ' +
        'FROM Users ' +
        'JOIN Creators on (Creators.user_id = Users.id) ' +
        'WHERE project_id = ?';

    db.get().query(sql, projectId, function(err,rows){
        if (err) return done({"ERROR": "Error 'creators'"});
        return done(rows);
    });
};

exports.backers = function(projectId, done){
    var sql = 'SELECT Users.username, Backers.total_amount as amount from Backers JOIN Users on (Users.id = Backers.user_id) WHERE project_id = ?';

    db.get().query(sql, projectId, function(err, rows){
        if (err) return done({"ERROR": "Error 'backers'"});
        return done(rows);
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

exports.Reward = function(project_id, done){
    var sql = 'SELECT id, amount, description ' +
        'FROM Rewards ' +
        'WHERE project_id = ?';

    db.get().query(sql, project_id, function (err, rows){
        if (err) return done({"ERROR": "Error 'Reward'"});
        return done(rows);
    });
};

exports.get_Creator = function(user_id, project_id, done){
    var sql = 'SELECT * FROM Creators WHERE user_id = ? and project_id = ?';
    var values = [user_id, project_id];
    db.get().query(sql, values, function(err, rows){
        return done(rows);
    })
};

exports.get_Backers = function(user_id, project_id, done){
    var sql = 'SELECT * FROM Backers WHERE user_id = ? and project_id = ?';
    var values = [user_id, project_id];
    db.get().query(sql, values, function(err, rows){
        return done(rows);
    })
}

exports.update_backer = function(amount, user_id, project_id, done){
    var sql = "UPDATE Backers SET total_amount = total_amount + ? where user_id = ? and project_id = ?";
    var values = [amount, user_id, project_id];

    db.get().query(sql, values, function(err, rows){
      return done(rows);
    })
}

exports.User = function(userId, done){
    var sql = "SELECT id, username, location, email FROM Users where id = ?";

    db.get().query(sql, userId, function (err, rows){
        if (err) return done({"ERROR": "Error 'User'"});
        return done(rows);
    })
};

exports.projectImage = function(project_id, done){
    var sql = "SELECT imageUri " +
        "From Project_data" +
        "WHERE id = ?";

    var sql = "SELECT imageUri FROM Project_data WHERE id = 1"

    db.get().query(sql, project_id, function (err, rows){
        if (err) return done({"ERROR": "'Project Image'"});
        return done(rows);
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

exports.project_statusUpdate = function(project_id, done){
    var sql = "UPDATE Projects SET openstatus = case when openstatus = false then true else false end where id = ?";

    db.get().query(sql, project_id, function(err, result){
        if (err) return done({"ERROR": "project_statusUpdate"});
        return done(result);
    })
}

exports.project_imageUri_Update = function(imageUri, project_id, done){
    var sql = "UPDATE Project_data SET imageUri = ? WHERE id = ?";
    var values = [imageUri, project_id];

    db.get().query(sql, values, function(err, result){
        if (err) return done({"ERROR": "Pproject_imageUri_Update"});
        return done(result);
    })
}


exports.progress_currentPledged_update = function(amount, project_id, done){
  var sql = "UPDATE Progress SET currentPledged = currentPledged + ? where = project_id = ?";
  var values = [amount, project_id];

  db.get().query(sql, values, function(err, result){
    if (err) return done({"ERROR": "progress_currentPledged_update"});
    return done(result);
  })
}

exports.rewards_update = function(reward_id, amount, description, done){
  var sql = "UPDATE Rewards SET amount = amount + ?, description = ? WHERE id = ?";
  var values = [amount, description, reward_id];

  db.get().query(sql, values, function(err, result){
    if (err) return done(400, "Malformed request");
    return done(result);
  })
}


//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------


exports.insert_Projects = function(title, subtitle, done){
    var sql = "INSERT INTO Projects (title, subtitle) VALUES (?, ?)";
    var values = [title, subtitle];

    db.get().query(sql, values, function(err, result){
        if (err) return done(err);
        done(result);
    });
};

exports.get_MaxID = function(done){
    var sql = "SELECT MAX(id) FROM Projects";
    db.get().query(sql, function(err, result){
        done(result);
    });
};

exports.get_MaxID_pledge = function(done){
    var sql = "SELECT MAX(PledgeId) FROM Pledge";
    db.get().query(sql, function(err, result){
        done(result);
    });
};

exports.insert_Project_data = function(id, imageUri, target, description, done){
    var sql = "INSERT INTO Project_data (id, imageUri, target, description) VALUES (?, ?, ?, ?)";
    var values = [id, imageUri, target, description];

    db.get().query(sql, values, function (err, result){
        done(result);
    });
};


exports.insert_Rewards = function(amount, description, project_id, done){
    var sql = "INSERT INTO Rewards (amount, description, project_id) VALUES (?, ?, ?)";
    var values = [amount, description, project_id];

    db.get().query(sql, values, function (err, result){
        done(result);
    });
};

exports.insert_Creators = function(user_id, project_id, done){
    var sql = "INSERT INTO Creators (user_id, project_id) VALUES (?, ?)";
    var values = [user_id, project_id];

    db.get().query(sql, values, function (err, result){
        done(result);
    })
}

exports.insert_Backers = function(user_id, project_id, pledge_id, done){
    var sql1 = "INSERT INTO Backers (user_id, project_id, pledge_id) VALUES (?, ?, ?)";
    var sql2 = "UPDATE Progress SET No_Backers = No_Backers + 1 WHERE project_id = ?";
    var values = [user_id, project_id, pledge_id];

    db.get().query(sql1, values, function(err, result){
      done(result);
      db.get().query(sql2, project_id, function(err, result){
        done(result);
      })
    })
}

exports.insert_Pledge = function(amount, anonymous, done){
    var sql = "INSERT INTO Pledge (amount, anonymous) VALUES (?, ?)";
    var values = [amount, anonymous];

    db.get().query(sql, values, function(err, result){
        done(result);
    })
}

exports.insert_Progress = function(project_id, currentPledged, No_Backers, done){
    var sql = "INSERT INTO Progress (project_id, currentPledged, No_Backers) VALUES (?, ?, ?)";
    var values = [project_id, currentPledged, No_Backers];

    db.get().query(sql, values,function(err, result){
        done(result);
    })
}

// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
