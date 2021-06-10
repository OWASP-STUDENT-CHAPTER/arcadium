module.exports = (req, res, next) => {
  // console.log("res.user", req.user);
  if (!req.user) return res.status(401).send("Unauthenticated");
  next();
};
