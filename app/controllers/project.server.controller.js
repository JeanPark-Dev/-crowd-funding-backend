const Project = require('../models/project.server.model');

//  /api/projects
exports.ViewProjects = function(req, res){
    /*Project.ProjectOverview(function(result){
        res.json(result);
    });*/

    // Project.Progress(1, function(result){
    //     res.json(result);
    // });

    // Project.Reward(1, function(result){
    //     res.json(result);
    // });

    Project.ProjectData(1, function(result){
        res.json(result);
    });


};

exports.CreateProject = function(req, res){
    Project.P
}


// exports.ViewProgress = function(req, res){
//     var user_data = {
//         "project_id": req.body.project_id
//     };
//     var id = [
//         [user_data['project_id'].toString()]
//     ];
//
//
//     Project.Progress(id, function(result){
//         res.json(result);
//     });
// };