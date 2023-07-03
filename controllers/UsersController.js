const db = require('../config/db');
const userModel = require('../models/user');
const { check, validationResult } = require('express-validator');
const UserORM = require('../models/userORM');

const validationRules = [
    check('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 5, max: 20 }).withMessage('Username must be between 8 and 20 characters')
        .trim()
        .matches(/^[A-Za-z0-9 .]+$/).withMessage('The username cannot contain special characters'),
    check('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be larger than 6')
        .matches(/^[A-Za-z0-9 .,'!&]+$/).withMessage('The password must contain letters, numbers and special characters')
    // check('id')
    //     .notEmpty().withMessage('Please insert an ID')
    //     .matches(/^[0-9]+$/).withMessage('The ID must be valid')
];

class UsersController {

    static async getAllUsers(req, res) {

        let results = await UserORM.findAll();

        if (results) {
            // res.send(results);
            res.render('users', {users: results})
        }
    }

    static async getUser(req, res) {

        let id = req.params.id;

        //let results = await userModel.getUser(id);

        let results = await UserORM.findByPk(id);

        if (results) {
            // res.send(results);
            res.render('adduser', {user: results})
        }
    }

    static async addUser(req, res) {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.send(errors.errors[0].msg);
        }
        else {

            const newUser = req.body;
            let results = UserORM.create({
                username: newUser.username,
                password: newUser.password,
                avatar: newUser.avatar
            });

            (await results).save();

            if (results) {
                res.redirect('/users/')
            }
            else {
                res.send("User couldn't be added");
            }
        }

        
    }

    static async updateUser(req, res) {

        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            res.send(errors.errors[0].msg);
        }
        else {

            let id = req.params.id;
            const newUser = req.body;
            const userToUpdate = await UserORM.findByPk(id);

            let result = await userToUpdate.update({
                username: newUser.username,
                password: newUser.password,
                avatar: newUser.avatar
            });


            if (result) {
                res.redirect('/users');
            }
            else {
                res.send("User couldn't be modified");
            }
        }

        
    }

    static async deleteUser(req, res) {

        let id = req.params.id;

        let result = false;

        if (id) {
            
            const user = await UserORM.findByPk(id);
            result = await user.destroy();
        }

        res.status(200).send("OK");
    }

}

module.exports = {
    validationRules,
    UsersController
};