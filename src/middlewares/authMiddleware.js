require("dotenv/config");
const jwt = require("jsonwebtoken");

module.exports = {
  async authMiddleware(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "Acesso não autorizado!" });
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
      const data = jwt.verify(token, process.env.SECRET);

      const { id } = data

      req.userId = id;

      return next();

    } catch (err) {
      return res.status(401).json({ error: "Acesso não autorizado!" });
    }

  }
}