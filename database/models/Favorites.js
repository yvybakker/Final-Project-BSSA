const {
    connector,
    Sequelize
} = require("../config/dbConf");
const Snippet = require("./Snippet")
const Users = require("./Users")

/* Define a model for table Users */
const Favorite = connector.define("favorites", {});

Users.belongsToMany(Snippet, {
    through: 'favorites'
})
Snippet.belongsToMany(Users, {
    through: 'favorites'
})

module.exports = Favorite;