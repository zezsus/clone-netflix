const userController = require("../controller/UserController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/add", userController.addToLikeMovies);
userRouter.get("/get-liked/:email", userController.getLikeMovies);
userRouter.put("/delete", userController.deleteLikedMovies);

module.exports = userRouter;
