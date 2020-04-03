const express = require('express');
const app = express();
const db=require('../db');
const shortid = require('shortid');;
const cookieParser = require('cookie-parser');
module.exports.login=function(req,res){
	res.render('auth/login.pug');
}
module.exports.postLogin=function(req,res){
    let email=req.body.email;
    let pass=req.body.pass;
    let user=db.get('users').find({ email: email }).value();
    if(!user)
    {
        res.render('auth/login.pug',{
            errs:[
                'Email dose not exist!'
            ],
            values:req.body
        })
        return;
    }
    if(pass !== user.pass)
    {
        res.render('auth/login.pug',{
            errs:[
                'Passworld is wrong!'
            ],
            values:req.body
        })
        return;
    }
   res.cookie('userId',user.id);
   res.redirect('/');
}
module.exports.signin=function(req,res){
    res.render('auth/signin.pug');
}
module.exports.postSignin=function(req,res){
  res.redirect('/auth/login');
}
module.exports.logout=function(req,res){
    res.clearCookie('userId');
    res.redirect('/auth/login');
   
   }