const jwt = require("jsonwebtoken");
const { Session, User } = require("../models");
const SECRET = process.env.SECRET;

const sessionValidator = async (req, res, next) => {
  const authorization = req.get("authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "token missing" });
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const decodedToken = jwt.verify(token, SECRET);

    if (!decodedToken.id) {
      return res.status(401).json({ error: "token invalid" });
    }

    const session = await Session.findOne({ where: { token } });

    if (!session) {
      return res.status(401).json({ error: "session expired or invalid" });
    }

    const user = await User.findByPk(decodedToken.id);
    if (!user || user.disabled) {
      return res.status(401).json({ error: "user disabled" });
    }

    req.user = user;
    req.decodedToken = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: "token invalid" });
  }
};

module.exports = sessionValidator;
