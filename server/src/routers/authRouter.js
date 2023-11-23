const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authController");

authRouter.post("/login", authController.login);
authRouter.post("register", authController.register);

module.exports = authRouter;
