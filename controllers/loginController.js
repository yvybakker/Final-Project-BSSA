const Users = require("../database/models/Users");
const bcrypt = require('bcrypt');

module.exports = {

  postUserLogin: (req, res) => {
    Users.findOne({
        where: {
          email: req.body.email
        }
      })

      .then(foundUser => {
        bcrypt
          .compare(req.body.password, foundUser.dataValues.password)
          .then(results => {
            if (req.body.email !== null && results) {
              req.session.user = foundUser.dataValues;
              res.send(req.session.user);
            } else {
              console.log("Something went wrong when logging in", error.stack);
            }
          })
          .catch(error => console.error(`Couldn't login: ${error.stack}`));

      })


      .catch(error => console.error(`Somthing went wrong when comparing passwords: ${error.stack}`));

  }
}