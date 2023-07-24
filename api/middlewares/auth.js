const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const verify = ( request, response, next ) => {
    const authHeaders = request.headers.authorization;
    if (authHeaders){
        const token = authHeaders.split(' ')[1];
        jwt.verify(token, process.env.SEC_KEY, (err, user) => {
            if(err){
                response.status( 403 ).send({ error: 'Token is not valid!' });
            } 
            request.user = user;
            next();
        })
    } else {
        response.status( 401 ).send({ error: 'UNAUTHORIZED' });
    }

}

const verifyTokenAndAuthorize = (req, res, next) =>{
    verify(req, res, () =>{
        if(req.user.username === req.params.username || req.user.isAdmin){
            next();
        } else {
            res.status(403).send({errorMessage: "UNATHORIZED"})
        }
    });
};

module.exports = { verify, verifyTokenAndAuthorize };

