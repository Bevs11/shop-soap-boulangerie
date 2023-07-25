const express = require('express');
const router = express.Router();
const Email = require('../models/EmailModel');
const { verifyTokenAndAdmin } = require("../middlewares/auth");

// GET all emails
router.get(`/`, verifyTokenAndAdmin, ( request, response ) => {
    Email.find().then( dbResponse => {
        if (!dbResponse){
            response.status( 400 ).send({ error: "Email List Not Found" });
        }else{
            const newList = dbResponse.map((item)=> item.email)
            response.status(200).send({ emailList: newList });
        }     
    });
});

// POST email
router.post(`/addemail`, ( request, response ) => {
    const newEmail = new Email({ 
        email: request.body.email
    });
    newEmail.save().then(data => {
        response.status( 201 ).send({ message: "Email Added" });
    })
});

module.exports = router;