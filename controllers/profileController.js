// module.exports = (req, res) => {
//   if (req.session.user && req.cookies.cookie) {
//     res.render("profile", {
//       locals: {
//         user: JSON.stringify(req.session.user)

//       }
//     });
//     console.log(req.session.user);
//   } else {
//     res.redirect("/login");
//   }
// };

// // user: req.session.user