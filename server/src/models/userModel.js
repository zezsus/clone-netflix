const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    likedMovies: Array,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
