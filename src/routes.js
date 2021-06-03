const express = require("express");
const authController = require("./controllers/authController");

const userController = require("./controllers/userController")

const routes = express.Router();

routes.post("/registerUser", userController.createUser);
routes.post("/auth", authController.authenticate)

module.exports = routes;