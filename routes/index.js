var express = require('express');
var router = express.Router();
const sequelize = require('../dataBase');
const controller = require('../luncher/controller');
const Users = require('../moudels/userData');
const {request, response} = require("express");


sequelize.sync().then(()=>console.log("database is ready"));

router.get('/',function (request,response,next){
  if(request.session.login)
    response.redirect("/comments")
  response.redirect("/login")
})

router.get('/register',function (request,response,next){
  if(request.session.login)
    response.redirect("/comment")
  response.render('index',{errorEmail: ""})

})

router.post('/register' ,controller.register)

router.post('/password' , controller.password)

router.get('/password',function (request,response,next){
  if(request.session.login)
    response.redirect("/comments")
  response.redirect("/register")
})

router.get('/login',function (request,response,next){
  if(request.session.login)
    response.redirect("/comments")
  response.render('login',{registerSuccess: 'You are registered!!',registerError:''})
})

router.post('/login' ,controller.loginPage)

router.get('/logout',(request,response,next)=>{
  request.session.login = false
  response.redirect("/login")
})

router.get('/comments',controller.main)

module.exports = router;

