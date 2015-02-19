var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  models.Project.find({_id : projectID}, afterQuery);

  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;

  console.log(form_data);

  var project = new models.Project(form_data);

  project.save(function (err, project) {
    if (err) {
      console.error(err);
      return res.send("500", {message: err.message});
    }
    console.log(project);
    res.send("200");
  });

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();

  models.Project.find({_id: projectID}).remove().exec(function() {
    return res.send("200");
  });
}