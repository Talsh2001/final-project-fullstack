const jwt = require("jsonwebtoken");
const { findUser } = require("../BLL/userBLL");

const JWT_SECRET = "secret";

const getToken = (req) => {
  const tokenHeader = req.headers.authorization;
  if (tokenHeader) {
    const token = tokenHeader.replace("Bearer ", "");
    return token;
  }

  // token not found
  return false;
};

const requireAuth = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        res.status(403).send("Token invalid!");
      } else {
        const user = await findUser({ username: decodedToken.username });
        res.locals.token = user;
        next();
      }
    });
  } else {
    res.status(401).send("Please Login.");
  }
};

module.exports = { requireAuth, getToken };
