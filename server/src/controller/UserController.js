const User = require("../models/userModel");

const addToLikeMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);

      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else {
        return res.json({
          success: false,
          msg: "Movie already added to the liked list.",
        });
      }
    } else {
      const newUser = User({ email, likedMovies: [data] });
      await newUser.save();
      return res.json({ success: true, msg: "Movie added successfullyS" });
    }
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

const getLikeMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        success: true,
        msg: "success",
        movies: user.likedMovies,
      });
    } else {
      return res.json({
        success: false,
        msg: "User with given email not found.",
      });
    }
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

const deleteLikedMovies = async (req, res) => {
  try {
    const { email, movieId } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieId);

      if (!movieIndex)
        return res.status(400).json({
          success: false,
          msg: "Movie not found",
        });

      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies,
        },
        { new: true }
      );

      return res.json({
        success: true,
        msg: "Delete success",
        likedMovies,
      });
    } else {
      return res.json({
        success: false,
        msg: "User with given email not found.",
      });
    }
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

module.exports = { addToLikeMovies, getLikeMovies, deleteLikedMovies };
