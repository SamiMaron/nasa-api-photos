const sequelize = require('../dataBase');
const Users = require('../moudels/userData');
const express = require('express');
const {response, request} = require("express");
const {password} = require("./controller");


/**
 * this checking if the mail are already exists if yes the user will receive an
 * error that the mail is exist if not continue to password page
 * @param request
 * @param response
 * @param next
 */
exports.register = (request , response , next)=>{
    if(request.session.login === true)
        response.redirect("/comments")
    try{
        const {first_name,last_name,email}=request.body;
        Users.findOne({where:{email: request.body.email}, attributes:['email']})
            .then((userExists)=>{
                if(userExists)
                    response.render('index' , {errorEmail: 'This email already exists'})
                else{
                    request.session.email = email
                    request.session.firstName = first_name
                    request.session.lastName = last_name
                    response.cookie('visitTime', true, {maxAge: 1000 * 30})
                    response.render('password')
                }})}catch (error){
                        console.log(error)
                        response.render('/register')
    }
}

/**
 * this checking if the mail are already exists if yes the user will receive an
 * error that the mail is exist if not continue to password page
 * @param request
 * @param response
 * @param next
 */
exports.password = async (request , response , next)=>{
    if(request.session.login === true)
        response.render("/comments")
    const {visitTime} = request.cookies
    if (!visitTime)
        response.redirect('/');
    else {
        try {
            const password = request.body.password
            await Users.create({firstName: request.session.firstName , lastName: request.session.lastName ,
            email: request.session.email , password: password} )
            response.redirect('/login')
        }catch (error){
            console.log(error)
            response.redirect('/' , {registerSuccess: 'login',
                registerError: 'something went wrong please try again'})
        }
    }
}

/**
 * this checking if the mail and password are exists if yes the user will go to main page
 * if not it will receive an error
 * @param request
 * @param response
 * @param next
 */

exports.loginPage = (request , response ,next)=> {
    if (request.session.login)
        response.redirect("/comments")
    try {

        const {loginEmail, loginPassword} = request.body;
        Users.findOne({where: {email:loginEmail , password:loginPassword}})
            .then((flag)=>{
                if(flag == null){
                    response.render('login', {registerSuccess: 'login', registerError: 'The username or password is incorrect. Please try again'})
                }
                else {
                    request.session.email = loginEmail
                    request.session.login = true
                    response.redirect("/comments")
                }
            })}catch (error){
                    console.log(error)
                    response.render('login', {
                        registerSuccess: 'login',
                        registerError: 'something went wrong please try again'
                    });
    }
}

/**
 * printing the username in mainPage
 * @param request
 * @param response
 * @param next
 */
exports.main = async (request,response,next)=>{
    if(request.session.login === false)
        response.redirect("/login")
    try{
        const user_name = await Users.findOne({where:{email:request.session.email}})
        if(user_name)
            return response.render('mainPage' ,{first_name:user_name.firstName , last_name: user_name.lastName})
        else
            response.redirect("/register")

    }catch (error){
        console.log(error)
        response.redirect("/login")
    }
}




