const Project = require('../models/project.server.model');

//  /api/projects
exports.ViewProjects = function(req, res){
    var headerData = JSON.parse(JSON.stringify(req.headers));
    var startIndex = parseInt(headerData['startindex'])-1;
    var count = parseInt(headerData['count']);


    Project.ProjectOverview(startIndex, count, function(result){
        res.json(result);
    });
};

exports.CreateProject = function(req, res){

    var TOKEN = req.get('X-Authorization');
    var project_data = req.body;
    var current_project_id;
    var current_user_id;
    var imageUri = project_data['imageUri'];
    var target = project_data['target'];
    var project_description = project_data['description'];
    var creators = project_data['creators'];
    var rewards = project_data['rewards'];

    Project.insert_Projects(project_data['title'], project_data['subtitle'], function(result){
        Project.get_MaxID(function (result){
            current_project_id = JSON.parse(JSON.stringify(result))[0]['MAX(id)'];

            Project.insert_Project_data(current_project_id, imageUri, target, project_description, function(result){
                Project.getUserIDbyTOKEN(TOKEN, function(result){
                    current_user_id = result;
                    Project.User(current_user_id, function(result){
                        // console.log(JSON.parse(JSON.stringify(result))[0]["id"]);
                        creators.push({ "id": current_user_id, "name": JSON.parse(JSON.stringify(result))[0]["username"]});
                        // console.log(creators);
                        if (creators.length == 0){
                            res.sendStatus(400);
                        } else if (creators.length > 0){
                            for (var i = 0; i < creators.length; i++){
                                Project.insert_Creators(creators[i]['id'], current_project_id, function(result){

                                })
                            }
                            if (rewards.length > 0){
                                for (var j = 0; j < rewards.length; j++){
                                    Project.insert_Rewards(rewards[j]['amount'], rewards[j]['description'], current_project_id, function(result){
                                        res.sendStatus(201, 'OK');
                                    } )
                                }

                            }
                        }
                    })
                })
            })
        })

    })
}



exports.ProjectDetail = function(req, res){
    var id = req.params.id; //Project ID


    var ProjectData;
    var creators;
    var Rewards;
    var Progress;
    var Backers;



    Project.ProjectData(id, function(result){
        // console.log(result);
        ProjectData = JSON.parse(JSON.stringify(result));
        Project.creators(id, function(result){
            creators =  JSON.stringify(result);

            Project.Reward(id, function(result){
                Rewards = JSON.stringify(result);

                Project.Progress(id, function(result){
                    Progress = JSON.stringify(result);

                    Project.backers(id, function(result){
                        Backers = JSON.stringify(result);

                        result = {
                            "project": {
                                "id": ProjectData[0]['id'],
                                "creationDate": ProjectData[0]['createDate'],
                                "data": {
                                    "title": ProjectData[0]['title'],
                                    "subtitle": ProjectData[0]['subtitle'],
                                    "description": ProjectData[0]['description'],
                                    "imageUri": ProjectData[0]['imageUri'],
                                    "target": ProjectData[0]['target'],
                                    "creators": JSON.parse(creators)
                                    ,
                                    "rewards": JSON.parse(Rewards)
                                }
                            }
                            ,
                            "progress": JSON.parse(Progress)[0]
                            ,
                            "backers": JSON.parse(Backers)
                        }
                        res.json(200, result);

                    })

                })

            })
        })
    })
};
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

exports.ViewImage = function(req, res){
    var projectId = parseInt(req.params.id);

    Project.projectImage(projectId, function(result){
        res.json(result[0]);
    })
}

exports.ViewRewards = function(req, res){
    var projectId = parseInt(req.params.id);

    Project.Reward(projectId, function(result){
        res.json(result);
    })
}


exports.UpdateProject = function(req, res){
    var TOKEN = req.get('X-Authorization');
    var project_id = req.params.id;
    var current_user_id;

    Project.getUserIDbyTOKEN(TOKEN, function(result){
        current_user_id = result;
        Project.get_Creator(current_user_id, project_id, function(result){
            // console.log(JSON.parse(JSON.stringify(result)));
            if (JSON.parse(JSON.stringify(result)).length > 0){
                console.log(result);
                Project.project_statusUpdate(project_id, function(result){
                    res.sendStatus(200, "OK")
                })
            } else {
                res.sendStatus(403, "Forbidden - unable to update a project you do not own");
            }
        })
    })
}

exports.UpdateProject_imageUri = function(req, res){
    var TOKEN = req.get('X-Authorization');
    var project_id = req.params.id;
    var current_user_id;
    var imageUri = req.body.imageUri;

    // console.log(imageUri);

    Project.getUserIDbyTOKEN(TOKEN, function(result){
        current_user_id = result;
        Project.get_Creator(current_user_id, project_id, function(result){
            // console.log(JSON.parse(JSON.stringify(result)));
            if (JSON.parse(JSON.stringify(result)).length > 0){
                Project.project_imageUri_Update(imageUri, project_id, function(result){
                    res.sendStatus(200, "OK")
                })
            } else {
                res.sendStatus(403, "Forbidden - unable to update a project you do not own");
            }
        })
    })
}

exports.Update_Rewards = function(req, res){
  var TOKEN = req.get('X-Authorization');
  var reward_data = req.body;
  var reward_id;
  var amount;
  var description;

  // console.log(reward_data.length);
  if (reward_data.length > 0){
    for (var i = 0; i > reward_data.length; i++){
      reward_id = reward_data[i]["id"];
      amount = reward_data[i]["amount"];
      description = reward_data[i]["description"]

      Projects.rewards_update(reward_id, amount, description, function(result){

      })
    } res.sendStatus(200, "OK");
  }
}

exports.Pledge = function(req, res){
    var TOKEN = req.get('X-Authorization');
    var project_id = req.params.id;
    var current_user_id;
    var current_pledge_id;
    var user_data = req.body;
    var amount = user_data['amount'];
    var anonymous = user_data['anonymous'];

    Project.getUserIDbyTOKEN(TOKEN, function(result){
      current_user_id = result;
      Project.insert_Pledge(amount, anonymous, function(reslut){
        Project.get_MaxID_pledge(function (result){
          current_pledge_id = JSON.parse(JSON.stringify(result))[0]['MAX(PledgeId)'];
            Project.get_Backers(current_user_id, project_id, function(result){
              if (JSON.parse(JSON.stringify(result)).length > 0){
                Project.update_backer(amount, current_user_id, project_id, function(result){
                  Project.progress_currentPledged_update(amount, project_id, function(result){
                    res.send(200, "OK");
                  })
                })
              } else {
                Project.insert_Backers(current_user_id, project_id, current_pledge_id, function(result){
                  Project.progress_currentPledged_update(amount, project_id, function(result){
                    res.send(200, "OK");
                  })
                })
              }
            })
        })
      })
    })
}
