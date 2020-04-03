const express = require('express');
const app = express();
const multer  = require('multer');
const router = express.Router();
const controller=require('../controller/communiti.controller.js');
const middleware=require('../middleware/communiti.middleware.js');
const upload = multer({ dest: './public/uploads/' })
router.get("/",controller.communiti)
router.post("/",upload.single('img'),controller.postComm)
module.exports=router;