const express = require('express');
const app = express();
const router = express.Router();
const controller=require('../controller/user.controller.js');
const middleware=require('../middleware/users.middleware.js');
const shortid = require('shortid');

router.get('/',controller.empty);
router.get('/search',controller.search);
router.get('/create',controller.gCreate);
router.get('/:id',controller.viewId)
router.post('/create',middleware.validateCreate,controller.pCreate)

module.exports=router;