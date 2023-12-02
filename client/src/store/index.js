import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { TMDB_BASE_URL, apiKey } from "../utils/constants";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  try {
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/genre/movie/list?api_key=${apiKey}`
    );
    return data.genres;
  } catch (error) {
    console.log(error);
  }
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) {
        movieGenres.push(name.name);
      }
    });

    if (movie.backdrop_path) {
      moviesArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  try {
    const moviesArray = [];
    for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
      const { data } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayFromRawData(data.results, moviesArray, genres);
    }

    return moviesArray;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovies = createAsyncThunk(
  "/netflix/trending",
  async ({ type }, thunkApi) => {
    try {
      const {
        netflix: { genres },
      } = thunkApi.getState();
      const data = getRawData(
        `${TMDB_BASE_URL}/trending/${type}/week?api_key=${apiKey}`,
        genres,
        true
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const netflixSlice = createSlice({
  name: "NetFlix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });

    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer,
  },
});
