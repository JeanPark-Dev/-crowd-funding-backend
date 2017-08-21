const projects = require('../controllers/project.server.controller');
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



module.exports = function(app){
    app.route('/api/projects')
        .get(projects.ViewProjects)
        .post(myMiddleware, projects.CreateProject);

    app.route('/api/projects/:id')
        .get(projects.ProjectDetail)
        .put(myMiddleware, projects.UpdateProject);

    app.route('/api/projects/:id/image')
        .get(projects.ViewImage)
        .put(myMiddleware, projects.UpdateProject_imageUri);

    app.route('/api/projects/:id/pledge')
        .post(myMiddleware, projects.Pledge);

    app.route('/api/projects/:id/rewards')
        .get(projects.ViewRewards)
        .put();


    app.route('/api/test')
        .get(projects.testfunction);
        // .post(projects.testfunction);
};
