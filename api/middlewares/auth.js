const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Get token
const verify = ( request, response, next ) => {
    const authHeaders = request.headers.authorization;
    if (authHeaders){
        const token = authHeaders.split(' ')[1];
        jwt.verify(token, process.env.SEC_KEY, (error, user) => {
            if(error){
                response.status( 403 ).send({ error: 'Token is not valid!' });
            } 
            request.user = user; // puts user data to request.user
            next();
        })
    } else {
        response.status( 401 ).send({ error: 'No token input' });
    }

}

// check token if valid token for user or isAdmin true
const verifyTokenAndAuthorize = (request, response, next) =>{
    verify(request, response, () =>{
        if(request.user.username === request.params.username || request.user.isAdmin){
            next();
        } else {
            response.status(403).send({errorMessage: "UNATHORIZED"})
        }
    });
};

// check if admin
const verifyTokenAndAdmin = (request, response, next) => {
    verify(request, response, () => {
        if (request.user.isAdmin) {
            next();
        } else {
            response.status(403).send({errorMessage: "Not Admin"})
        }
    })
}

module.exports = { verify, verifyTokenAndAuthorize, verifyTokenAndAdmin };

