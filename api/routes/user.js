const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verify, verifyTokenAndAuthorize, verifyTokenAndAdmin } = require("../middlewares/auth");

// POST registration
router.post("/register", (request, response) => {
  
  // When data body is complete: username, password, firstname, lastname, email
  if (request.body.username && request.body.password && request.body.firstname && request.body.lastname && request.body.email ){

    // hash password 10x
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
      
      // promise save newUser to DB and catch if error
      try {
        newUser.save().then((data) => {
          const{ password, ...others} = data._doc // removes password from response
          response.status(201).send({ message: "Registration SUCCESSFUL", user: {...others} });
        });
      } catch (error) {
        response.status(500).send({ errormessage: error });
      }
    });

  } else {
    // When data is incomplete
    response.status(400).send({ errormessage: "ERROR! Please complete data"});
  }
  
});

// POST login
router.post("/login", (request, response) => {
  // find user using findOne 
  User.findOne({ username: request.body.username }).then((dbResponse) => {
    // if there is a username that exist
    if (dbResponse) {
      // check using bcrypt.compare if password and hash is correct
      bcrypt
        .compare(request.body.password, dbResponse.password)
        .then((isValid) => {
          // if password and hash is valid
          if (isValid) {
   
            const accessToken = jwt.sign(
              {
                username: dbResponse.username,
                id: dbResponse._id,
                isAdmin: dbResponse.isAdmin,
              },
              process.env.SEC_KEY, {expiresIn: "3d"}
            );
            
            response.status(200).send({
              username: dbResponse.username,
              id: dbResponse._id,
              isAdmin: dbResponse.isAdmin,
              token: accessToken
            });
          } else {
            // if password and hash is not valid send error message
            response.status(401).send({ error: "PASSWORD INCORRECT" });
          }
        });
      
    } else {
      //if no such username exist return error message
      return response.status(404).send({ error: "USER NOT FOUND" });
    }
  });
});

//GET one user
router.get(`/:username`, verify, (request, response) => {
  // check if params.username is equal (verify)user.username 
  if (request.user.username === request.params.username) {

    // finds one user and removes password from response
    User.findOne({ username: request.params.username }, { password: 0 }).then(
      (dbResponse) => {
        response.status(200).send({ user: dbResponse });
      }
    );

  } else {
    // if token is not valid, user is not authorized
    response.status(404).send({ error: "UNAUTHORIZED" });
  }
});

// DELETE(post) user
router.post(`/removeuser/:username`, verifyTokenAndAuthorize, (request, response) => {
  // finds user and change isActive to false
  User.findOneAndUpdate(
    { username: request.params.username },
    { $set: { isActive: false } }
  ).then((dbResponse) => {
    if (!dbResponse) {
      return response.status(404).send({ error: "User Does Not Exist" });
    } else {
      response.status(200).send({ message: "User has been DELETED" });
    }
  });
});

//PUT(post) user - update TODO: Add more security 1:00:00
router.post(`/removeuser/:username`, verifyTokenAndAuthorize, (request, response) => {
  User.findOneAndUpdate(
    { username: request.params.username },
    { $set: { isActive: false } }
  ).then((dbResponse) => {
    if (!dbResponse) {
      return response.status(404).send({ error: "User Does Not Exist" });
    } else {
      response.status(200).send({ user: dbResponse });
    }
  });
});

module.exports = router;
