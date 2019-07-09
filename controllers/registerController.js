const Users = require("../database/models/Users");
const bcrypt = require('bcrypt');
// const {
//   validationResult
// } = require('express-validator/check');

module.exports = {

  postUserRegistration: (req, res) => {
    // const errors = validationResult(req)

    //check if errors has got errors stored from check (app.js)
    //if errors exits, send infor to the user
    // if (!errors.isEmpty()) {
    //   req.session.error = errors.array();
    //   console.log(req.session.error)
    // } else {
    bcrypt
      .hash(req.body.password, 10)
      .then(hashPassword => {
        Users.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword
          })
          .then(results => {
            req.session.user = results.dataValues;
            console.log("User's session after registration: ", req.session.user);
            res.send(results.dataValues)
          })
          .catch(error => {
            console.error(`Cannot create user: ${error.stack}`);
          });
      })
      .catch(error => console.error(`Something went wrong when hashing password: ${error.stack}`));

    // }


  }
};