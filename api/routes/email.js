const express = require('express');
const router = express.Router();
const Email = require('../models/EmailModel');

// get all email
// TEST URL: http://localhost:8010/api/v1/emails/
router.get(`/`, ( request, response ) => {
    Email.find().then( dbResponse => {
        if (!dbResponse){
            response.status( 400 ).send({ error: "Email List Not Found" });
        }else{
            response.status(200).send({ email: dbResponse });
        }     
    });
});


// submit email
// TEST URL: http://localhost:8010/api/v1/emails/addemail
// {email : <email>}
router.post(`/addemail`, ( request, response ) => {
    const newEmail = new Email({ 
        email: request.body.email
    });
    newEmail.save().then(data => {
        response.status( 201 ).send({ message: "Email Added" });
    })
});





module.exports = router;