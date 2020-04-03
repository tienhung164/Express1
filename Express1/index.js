const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const port = 3000
const pug = require('pug')
const usersRoute=require('./routes/users.routes')
const authRoute=require('./routes/auth.routes')
const authMiddleware=require('./middleware/auth.middleware')
const communitiRoute=require('./routes/communiti.routes')
const shortid = require('shortid');
app.set('views','./views')
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
//============================

app.use(cookieParser());
app.use('/users',authMiddleware.checkAuth,usersRoute);
app.use('/auth',authRoute);
app.use('/communiti',authMiddleware.checkAuth,communitiRoute);
app.get('/',authMiddleware.checkAuth,function(req,res){
	res.render('home.pug');
});

//=============================
app.listen(port, () => console.log(`Example app listening on port ${port}!`))