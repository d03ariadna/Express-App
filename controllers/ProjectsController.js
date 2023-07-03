const { check, validationResult } = require('express-validator');
const ProjectORM = require('../models/projectORM');

const validationRules = [
    check('title')
        .notEmpty().withMessage('Title Project is required'),
    check('client')
        .notEmpty().withMessage('Client Name is required'),
    check('description')
        .notEmpty().withMessage('Description Project is required')
]

class ProjectsController{

    static async getAllProjects(req, res) {
        let results = await ProjectORM.findAll();

        if (results) {
            res.render('./projects/all', { projects: results })
        }
    }


    static async getProject(req, res) {
        
        let id = req.params.id;

        let result = await ProjectORM.findByPk(id);

        if (result) {
            res.render('./projects/single-project', {project: result });
        }
    }



    static async createProject(req, res){
        
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.send(errors.errors[0].msg);
        }
        else {
            const newProject = req.body;
            let results = ProjectORM.create({
                title: newProject.title,
                client: newProject.client,
                description: newProject.description
            });

            (await results).save();

            if (results) {
                res.redirect('/pyct/all');
            } else {
                res.send('Project could not be added');
            }
        }

    }


    static async modifyProject(req, res) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.send(errors.errors[0].msg);
        }
        else { 

            let id = req.params.id;

            const newProject = req.body;
            const project = await ProjectORM.findByPk(id);

            let result = await project.update({
                title: newProject.title,
                client: newProject.client,
                description: newProject.description
            });

            console.log(result);
            if (result) {
                res.redirect('/pyct/single-project/'+id);
            } else {
                res.send('Project could not be modified');
            }
        }
    }


    static async deleteProject(req, res) {
        
        let id = req.params.id;

        let result = false;

        if (id) {
            
            const project = await ProjectORM.findByPk(id);
            result = await project.destroy({
                where: {
                    id: id
                }
            });

        }

        res.status(200).send('okkk');

    }
    
}

module.exports = {
    validationRules,
    ProjectsController
};