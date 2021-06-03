require("dotenv/config")
const connection = require("../database/connection");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = {
  async authenticate(req, res) {
    const { email, password } = req.body;

    const user = await connection("users").where("email", email).first();

    if (!user) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Usuário ou senha inválidos" });
    }

    const token = jwt.sign({ id: user.id, createdAt: user.createdAt }, process.env.SECRET , { expiresIn: '1d' });

    delete user.password;

    return res.json({
      user,
      token
    });
  }

}