const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verify } = require("../middlewares/auth");

// Registration
// TEST URL: http://localhost:8010/api/v1/user/register
// TEST URL - render: https://shop-soap-boulangerie-api.onrender.com/api/v1/user/register
/*
    {
        "username": "no3",
        "password": "password",
        "firstname": "bronya",
        "lastname": "rand",
        "email": "hai",
        "isAdmin": true,
        "isActive": true
    }
    */
router.post("/register", (request, response) => {
  bcrypt.hash(request.body.password, 10).then((hash, err) => {
    const newUser = new User({
      username: request.body.username,
      password: hash,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      email: request.body.email,
      isAdmin: request.body.isAdmin,
      isActive: request.body.isActive,
    });

    try {
      newUser.save().then((data) => {
        response.status(201).send({ message: "User Registration Successful" });
      });
    } catch (error) {
      response.status(500).send({ errormessage: error });
    }
  });
});

// login
// TODO: change status to correct one
// TEST URL: http://localhost:8010/api/v1/user/login
// TEST URL - render: https://shop-soap-boulangerie-api.onrender.com/api/v1/user/login
//{"username": "no5", "password": "password"}
router.post("/login", (request, response) => {
  User.findOne({ username: request.body.username }).then((dbResponse) => {
    if (!dbResponse) {
      return response.status(404).send({ error: "user does not exist" });
    } else {
      bcrypt
        .compare(request.body.password, dbResponse.password)
        .then((isValid) => {
          if (!isValid) {
            response.status(404).send({ error: "invalid password" });
          } else {
            // console.log(process.env.SEC_KEY);
            const accessToken = jwt.sign(
              {
                username: dbResponse.username,
                id: dbResponse._id,
                isAdmin: dbResponse.isAdmin,
              },
              process.env.SEC_KEY
            );

            response.status(200).send({
              username: dbResponse.username,
              id: dbResponse._id,
              isAdmin: dbResponse.isAdmin,
              token: accessToken,
            });
          }
        });
    }
  });
});

//get user
// TEST URL: http://localhost:8010/api/v1/user/rockstar
// TEST URL - render: https://shop-soap-boulangerie-api.onrender.com/api/v1/user/rockstar
// Authorization : Bearers eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvY2tzdGFyIiwiaWQiOiI2NDY2NGI1OTMyOWNkOWIwMTc1ZjU0YjQiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNjg0NzQ2Nzc1fQ.hIyPFL8QVmTZxBEXm7hu9r1DYjfUlOYzQ9ygjjQc9g4
router.get(`/:username`, verify, (request, response) => {
  if (request.user.username === request.params.username) {
    User.find({ username: request.params.username }, { password: 0 }).then(
      (dbResponse) => {
        response.status(200).send({ user: dbResponse });
      }
    );
  } else {
    response.status(404).send({ error: "unathoraized" });
  }
});

//soft delete
// TEST URL: http://localhost:8010/api/v1/user/removeuser
// TEST URL - render: https://shop-soap-boulangerie-api.onrender.com/api/v1/user/removeuser
/* TEST BODY:
    { 
        "username": "no3"
    }
    */
router.post(`/removeuser`, (request, response) => {
  User.updateOne(
    { username: request.body.username },
    { $set: { isActive: false } }
  ).then((dbResponse) => {
    if (!dbResponse) {
      return response.status(404).send({ error: "product does not exist" });
    } else {
      response.status(200).send({ message: "User is deleted" });
    }
  });
});

module.exports = router;
