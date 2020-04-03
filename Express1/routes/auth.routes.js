const express = require('express');
const app = express();
const multer  = require('multer');
const router = express.Router();
const controller=require('../controller/auth.controller.js');
const middleware=require('../middleware/auth.middleware.js');
const shortid = require('shortid');
const upload = multer({ dest: './public/uploads/' })
router.get('/login',controller.login);
router.post('/login',controller.postLogin);
router.get('/signin',controller.signin);
router.post('/signin',upload.single('avatar'),middleware.postSignin,controller.postSignin);
router.get('/logout',controller.logout);
module.exports=router;