const router = require("express").Router();
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { verify, verifyTokenAndAuthorize } = require("../middlewares/auth");

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
          response.status(201).send({ message: "User Registration SUCCESSFUL" });
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

//GET user TODO: add more security
router.get(`/:username`, verify, (request, response) => {
  // check if params.username is equal (verify)user.username 
  if (request.user.username === request.params.username) {

    User.find({ username: request.params.username }, { password: 0 }).then(
      (dbResponse) => {
        response.status(200).send({ user: dbResponse });
      }
    );
  } else {
    response.status(404).send({ error: "UNAUTHORIZED" });
  }
});

// DELETE user - soft TODO: add more security
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

//PUT user - update TODO: Add more security 1:00:00
router.put("/:username", verifyTokenAndAuthorize, async (request, response) => {
  if(request.body.password){

  } else {

  }

  try {
    
  } catch (error) {

  }
})

module.exports = router;
