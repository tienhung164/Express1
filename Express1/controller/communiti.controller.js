const express = require('express');
const app = express();
const db=require('../db');
module.exports.communiti=function(req,res){
    let arr=db.get("comm")  
              .sortBy('sec')
              .take(200)
              .value();
    //console.log(arr);          
    res.render('communiti/communiti.pug',{
        users:arr
    }
     )
};

module.exports.postComm=function(req,res){
    let d=new Date();
    let sec=d.getTime();
    let time=d.getHours()+':'+d.getMinutes();
    req.body.name=res.locals.userLocal.name;
    req.body.sec=sec;
    req.body.avatar=res.locals.userLocal.avatar;
    req.body.time=time;
   // console.log(req.body.img);
    let tmp=req.body.mess
    if(req.file)
           req.body.img=req.file.path.split('\\').slice(1).join('\\');
    if(tmp===undefined&& !req.file)
       {
            res.redirect('/communiti');
            return;
       }
       if(tmp===''&& !req.file)
       {
            res.redirect('/communiti');
            return;
       }
    db.get('comm').push(req.body).write();
    res.redirect('/communiti');
}