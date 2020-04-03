const express = require('express');
const app = express();
const db=require('../db');
module.exports.validateMess=function(req,res,next){
    let mess=' '+req.body.mess;
    let arr=db.get("comm")  
             .sortBy('sec')
             .take(200)
             .value();
      if(mess.length >= 35)
       {
                
                res.render('communiti/communiti.pug',{
                err:'Mess too long!!!',
                users:arr
            })
            return;
       }
       next();
}