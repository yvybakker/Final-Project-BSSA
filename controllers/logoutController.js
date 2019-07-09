module.exports = (req, res) => {
  if (req.session.user && req.cookies.cookie) {
    res.clearCookie("cookie");
    res.send(true);
  } else {
    res.send(false)
  }
};