const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const routers = require("./routers/index");

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB, {})
  .then(() => {
    console.log("connected successfully!");
  })
  .catch((error) => console.log(error));

routers(app);

app.listen(port, () => {
  console.log("Server started on port", port);
});
