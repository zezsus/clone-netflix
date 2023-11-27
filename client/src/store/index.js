import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { TMDB_BASE_UTL, apiKey } from "../utils/constants";
import axios from "axios";

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  try {
    const { data } = await axios.get(
      `${TMDB_BASE_UTL}/genre/movie/list?api_key=${apiKey}`
    );
    console.log("data: ", data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const netflixSlice = createSlice({
  name: "NetFlix",
  initialState,
  extracReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genresLoaded = true;
      state.genres = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: netflixSlice.reducer,
  },
});
