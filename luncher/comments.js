const comments = require('../moudels/commentsData');
const express = require('express');
const {request, response} = require("express");
const sequelize = require('../dataBase')

/**
 * this is an api request to save a comment  in the database
 * @param request
 * @param response
 * @param nex
 */
exports.updateComments = async (request,response,nex)=>{
    if(request.login === false)
        response.redirect("/login")
    try {
        //check if need this
        await comments.findOne({where: {email : request.session.email}})
        //
        await comments.create({userName : request.body.userName , comment: request.body.comment,email : request.session.email , commentsBoxId:request.body.commentsBoxId})
    }
    catch (error){
        console.log(error)
        response.redirect("/login")
    }
    console.log("asses")
    response.json("the comment added to database successfully").status(200)
}

/**
 * this is an api request to get all the comment from the database
 * @param request
 * @param response
 * @param next
 */
exports.fetchComments = async (request , response , next)=>{
    if(request.session.login === false)
        response.redirect("/login")
    comments.findAll().then((commentsList)=>{
        response.status(200).json({commentsList})
    }).catch((error)=>{
        console.log(error)
        response.json("there was a problem in getting the comments from api").sendStatus(400)
        response.redirect("/login");
    })
}






