var express = require('express');
var router = express.Router();

const {validationRules, ProjectsController} = require('../controllers/ProjectsController');

router.get('/all', ProjectsController.getAllProjects);



// router.get('/single-project/:id', function (req, res) {

//     const project = ProjectsController.getProject(req);
//     res.send(project);
//     //res.render('./projects/single-project', { project: project });
// })

router.get('/single-project/:id', ProjectsController.getProject);

// router.get('/modify/:id', function (req, res) {

//     const project = ProjectsController.getProject(req);

//     res.render('./projects/new-project', { project: project });
// });

router.get('/modify/:id', ProjectsController.getProject);

router.post('/modify/:id', ProjectsController.modifyProject);



router.get('/new-project', function (req, res) {
    res.render('./projects/new-project');
});



router.post('/new-Project', validationRules, ProjectsController.createProject);


router.delete('/deleteProject/:id', ProjectsController.deleteProject);




module.exports = router;