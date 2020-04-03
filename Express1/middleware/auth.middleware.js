const express = require('express');
const app = express();
const db=require('../db');
const shortid = require('shortid');
const zipcode=123456;
module.exports.checkAuth=function(req,res,next){
    if(!req.cookies.userId)
     {
         res.redirect('auth/login');
         return;
     }
     let user=db.get('users').find({id:req.cookies.userId}).value();
     if(!user){
         
        res.redirect('auth/login');
        return;
     }
  
    res.locals.userLocal=user; 
     next();
}
module.exports.postSignin=function(req,res,next){
    let errs=[];
    let tmpuser=db.get('users').find({email:req.body.email}).value();
    if(tmpuser){
        res.render('auth/signin.pug',{
            errs:['Email exist!!!']
        })
        return;
      }
    if(!req.body.email)
      {
          errs.push('Email is empty!')
      }
    if(!req.body.pass)
      {
          errs.push('Pass is empty!')
      }  
    if(!req.body.zipcode)
      {
          errs.push('Zip-code is empty!')
      }
    if(req.body.zipcode != 123456)
      {
          errs.push('Zip-code is not corect!')
      } 
    if(errs.length) 
      {
            res.render('auth/signin.pug',{
                errs:errs
            })
            return;
      }    
    req.body.id=shortid.generate();
    req.body.avatar=req.file.path.split('\\').slice(1).join('\\');
    console.log(req.body);
	db.get('users').push(req.body).write();
    next();
}
