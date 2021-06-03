const express = require("express");

const authMiddleware = require("./middlewares/authMiddleware")

const authController = require("./controllers/authController");
const userController = require("./controllers/userController")

const routes = express.Router();

routes.post("/registerUser", userController.createUser);
routes.post("/auth", authController.authenticate);

routes.get("/users", authMiddleware.authMiddleware, userController.index)

module.exports = routes;