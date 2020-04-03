const express = require('express');
const app = express();
const db=require('../db');
const shortid = require('shortid');
module.exports.search=function(req,res){
	let q=req.query.q;
	let users=db.get('users').value();
	let matchUser=users.filter(function(user){
		  return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	console.log(users);
	res.render('users/member.pug',{
		user:matchUser
		
	})
}

module.exports.empty=function(req,res){
	res.render('users/member.pug',{
		user:db.get('users').value()
	});
}

module.exports.gCreate=function(req,res){
	res.render('users/create.pug');
}

module.exports.viewId=function(req,res){
	let id=req.params.id;
	let user=db.get('users').find({id: id}).value();
	res.render('users/view.pug',{
		user:user
	})
}

module.exports.pCreate=function(req,res){
	req.body.id=shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('/users');
}