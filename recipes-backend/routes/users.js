var express = require('express');
var router = express.Router();
usersRoute = require("../controllers/usersControllers");

/* GET users listing. */
router.get('/', usersRoute.usersController);

module.exports = router;
