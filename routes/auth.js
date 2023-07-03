var express = require('express');
var router = express.Router();

const { validationRules, UsersController } = require('../controllers/UsersController');

const passport = require('../controllers/AuthController');

router.get('/login', function (req, res) {
    res.render('login');
});

router.get('/register', function (req, res) {
    res.render('register');
});

router.get('/protected', passport.authenticate('session'), function (req, res) {
    res.send('Welcome to protected section');
});

router.post('/login', passport.authenticate(
    'local',
    {
        successRedirect: "/",
        failureRedirect: "/auth/login"
    }
));

router.post('/register', validationRules, UsersController.addUser);


module.exports = router;