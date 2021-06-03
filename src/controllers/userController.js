const connection = require("../database/connection");
const bcrypt = require("bcryptjs");


module.exports = {

  async index(req, res){
    return res.json({userid: req.userId});
  },

  async createUser(req, res){
    const {email, password} = req.body;

    const userExists = await connection("users").where("email", email).first();

    if(userExists){
      return res.status(409).json({error: "Email já registrado!"});
    }

    const hashPassword = bcrypt.hashSync(password, 8);
    
    await connection("users").insert({
      email,
      password: hashPassword
    })

    const user = await connection("users").where("email", email).first();

    delete(user.password)

    return res.json(user);

  }

}