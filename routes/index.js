var express = require('express');
var router = express.Router();

//const UsersController = require('../controllers/UsersController');
const { validationRules, UsersController } = require('../controllers/UsersController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

// router.get('/users', function(req, res, next) {
//   //res.render('users', { title: 'Users' });
//   res.render()
// });

router.get('/users', UsersController.getAllUsers)

router.get('/addUser', (req, res) => {
  res.render('adduser');
});

router.get('/addUser/:id', UsersController.getUser);

router.post('/addUser', validationRules, UsersController.addUser);

router.post('/addUser/:id', validationRules, UsersController.updateUser);

router.delete('/deleteUser/:id', UsersController.deleteUser);



module.exports = router;
