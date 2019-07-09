const {
  connector,
  Sequelize
} = require("../config/dbConf");

module.exports = connector.define("snippet", {
  filepath: Sequelize.STRING,
  text: Sequelize.STRING
});