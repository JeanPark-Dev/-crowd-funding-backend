const projects = require('../controllers/project.server.controller');

module.exports = function(app){
    app.route('/api/projects')
        .get(projects.ViewProjects)
        .post(projects.CreateProject);

    app.route('/api/projects/:id')
        .get()
        .put();

    app.route('/api/projects/:id/image')
        .get()
        .put();

    app.route('/api/projects/:id/pledge')
        .post();

    app.route('/api/projects/:id/rewards')
        .get()
        .put();

    app.route('/api/users')
        .post();

    app.route('/api/users/login')
        .post();

    app.route('/api/users/logout')
        .post();

    app.route('/users/:user_id')
        .get()
        .put()
        .delete();


};