const express = require("express");
const path = require("path");
const {
  connector
} = require("./database/config/dbConf");
const Snippet = require("./database/models/Snippet");

// require Favorites (in models)
const Favorites = require('./database/models/Favorites')

const registerController = require("./controllers/registerController")
const loginController = require("./controllers/loginController")
const logoutController = require("./controllers/logoutController")
const app = express();
const port = process.env.PORT || 5000;
const session = require("express-session")
const cookieParser = require("cookie-parser")


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESSION_COOKIE,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Custom function that checks for user's cookies.
function checkUserCookies(req, res) {
  if (!req.cookies.cookie) {
    res.send(false);
  } else {
    res.send(true);
  }
}

app.get("/", (req, res) => {
  res.send({
    express: "hello from express"
  });
});

app.post('/register', registerController.postUserRegistration)
app.post("/login", loginController.postUserLogin)

//app.post to create the Favorites table where the id of the user and the id of the snippetes are stored
// app.post().create().then().catch()

app.get("/api/image", (req, res) => {
  /* Here we join the path of the project and the path to the snippet found in client (React) */
  let snippet1Path = path.join(__dirname, "/client/public/images/snippet1.gif");
  let snippet2Path = path.join(__dirname, "/client/public/images/snippet2.gif");
  let snippet3Path = path.join(__dirname, "/client/public/images/snippet3.gif");
  let snippet4Path = path.join(__dirname, "/client/public/images/snippet4.gif");
  let snippet5Path = path.join(__dirname, "/client/public/images/snippet5.gif");
  let snippet6Path = path.join(__dirname, "/client/public/images/snippet6.gif");
  let snippet7Path = path.join(__dirname, "/client/public/images/snippet7.gif");
  let snippet8Path = path.join(__dirname, "/client/public/images/snippet8.gif");
  let snippet9Path = path.join(__dirname, "/client/public/images/snippet9.gif");
  let snippet10Path = path.join(__dirname, "/client/public/images/snippet10.gif");




  /* 
  Save path of the snippet to database. 
  After it is saved, send the returning data from the database to client(React)
  */
  Snippet.findOrCreate({
      where: {
        filepath: snippet1Path
      },
      defaults: {
        text: "view code"
      }
    }).then(() => {
      Snippet
        .findOrCreate({
          where: {
            filepath: snippet2Path
          },
          defaults: {
            text: "view code"
          }
        }).then(() => {
          Snippet
            .findOrCreate({
              where: {
                filepath: snippet3Path
              },
              defaults: {
                text: "view code"
              }
            }).then(() => {
              Snippet
                .findOrCreate({
                  where: {
                    filepath: snippet4Path
                  },
                  defaults: {
                    text: "view code"
                  }
                }).then(() => {
                  Snippet
                    .findOrCreate({
                      where: {
                        filepath: snippet5Path
                      },
                      defaults: {
                        text: "view code"
                      }
                    }).then(() => {
                      Snippet
                        .findOrCreate({
                          where: {
                            filepath: snippet6Path
                          },
                          defaults: {
                            text: "view code"
                          }
                        }).then(() => {
                          Snippet
                            .findOrCreate({
                              where: {
                                filepath: snippet7Path
                              },
                              defaults: {
                                text: "view code"
                              }
                            }).then(() => {
                              Snippet
                                .findOrCreate({
                                  where: {
                                    filepath: snippet8Path
                                  },
                                  defaults: {
                                    text: "view code"
                                  }
                                }).then(() => {
                                  Snippet
                                    .findOrCreate({
                                      where: {
                                        filepath: snippet9Path
                                      },
                                      defaults: {
                                        text: "view code"
                                      }
                                    }).then(() => {
                                      Snippet
                                        .findOrCreate({
                                          where: {
                                            filepath: snippet10Path
                                          },
                                          defaults: {
                                            text: "view code"
                                          }
                                        })
                                        .then(() => {
                                          Snippet.findAll()
                                            .then(allSnippetsFromDb => {
                                              let filePaths = allSnippetsFromDb.map(snippet => {
                                                return {
                                                  id: snippet.id,
                                                  filepath: snippet.filepath,
                                                  text: snippet.text
                                                }
                                              })
                                              res.send(filePaths)
                                            })
                                            .catch(err => console.error(`Couldn't find all snippets: ${err.stack}`))
                                        })
                                        .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
                                    })
                                    .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
                                })
                                .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
                            })
                            .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
                        })
                        .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
                    })
                    .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
                })
                .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
            })
            .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
        })
        .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
    })
    .catch(err => console.error(`Couldnt create second objecti n the same go ${err.stack}`)) // send to react client
});
app.get("/logout", logoutController)
app.get("/profile", (req, res) => {
  checkUserCookies(req, res);
})

app.post("/favorites", (req, res) => {
  Favorites.create({
      userId: req.session.user.id,
      snippetId: req.body.id
    }).then(resultsFromDb => {
      res.send(resultsFromDb)
    })
    .catch(error =>
      console.error(`something when wrong while creating the favorites table ${error.stack}`))

})

app.post("/userFavorites", (req, res) => {
  let loggedInUserId = req.body[0].userId

  Snippet.findAll()
    .then(resultsFromSnippetsTable => {
      let snippetArray = resultsFromSnippetsTable.map(snippet => {
        return {
          id: snippet.dataValues.id,
          filepath: snippet.dataValues.filepath
        }
      })

      Favorites.findAll({
          where: {
            userId: loggedInUserId
          }
        })
        .then(results => {
          let userFavs = results.map(userFavs => {
            return userFavs.snippetId
          })

          let container = []
          for (let i = 0; i < userFavs.length; i++) {
            for (let j = 0; j < snippetArray.length; j++) {
              if (userFavs[i] === snippetArray[j].id) {
                container.push(snippetArray[j].filepath)
              }
            }
          }

          console.log('The container', container)
          res.send(container)
        })
        .catch(error => console.error(`favorites fail: ${error.stack}`))
    })
    .catch(error => console.error(`snippet fail: ${error.stack}`))


})


connector
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`I've got ears on port: ${port}`));
  })
  .catch(error =>
    console.error(
      `Something went wrong when connecting to database: ${error.stack}`
    )
  )





/* let container = userSnippets.map(snippetIdsObject => {
      return Promise.all([Snippet.findAll({
        where: {
          id: snippetIdsObject.snippetId
        }
      }).then(resultsFromSnippetsTable => {
        return {
          filepath: resultsFromSnippetsTable[0].dataValues.filepath,
          text: resultsFromSnippetsTable[0].dataValues.text
        }
      }).catch(error => console.error(`snippet fail: ${error.stack}`))]).then(value => {
        return value
      })
    })

    console.log(container) */



/* Favorites.findAll({
    where: {
      userId: req.body[0].userId
    }
  }).then(resultsFromFavoritesTable => {
    let userSnippets = resultsFromFavoritesTable.map(userFavs => {
      return {
        snippetId: userFavs.snippetId
      }
    })

    let result = userSnippets.map(number => number.snippetId)

    for (let i = 0; i < result.length; i++) {
      Snippet.findAll({
          where: {
            id: result[i]
          }
        }).then(fromSnippetTable => console.log("the results", fromSnippetTable))
        .catch(err => console.error(`This is wrong maybe... : ${err.stack}`))
    }
  }) */