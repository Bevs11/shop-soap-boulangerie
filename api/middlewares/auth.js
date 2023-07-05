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
                response.status( 403 ).send({ error: 'Token is not valid' });
            } 
            request.user = user;
            next();
        })
    } else {
        response.status( 401 ).send({ error: 'Unauthorized' });
    }


}

module.exports = { verify };

