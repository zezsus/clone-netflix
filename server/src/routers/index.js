const userRouter = require("./UserRouter");

const routers = (app) => {
  app.use("/api/user", userRouter);
};

module.exports = routers;
