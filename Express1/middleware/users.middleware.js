const express = require('express');
const app = express();
module.exports.validateCreate=function(req,res,next){
    let errs=[];
    if(!req.body.name){
		errs.push('The name is require!');
	}
	if(!req.body.age){
		errs.push('The age is require!');
	}
	if(!req.body.sdt){
		errs.push('The sdt is require!');
	}
	console.log(errs);
	if(errs.length) {
		res.render('users/create.pug',{
			errs:errs ,
			values:req.body
		});
    }
    next();
}