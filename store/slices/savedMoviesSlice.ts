import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
interface Movie {
  id: number;
  title: string;
  poster_path: string;
}
 
interface SavedMoviesState {
  movies: Movie[];
}
 
const initialState: SavedMoviesState = {
  movies: [],
};
 
const savedMoviesSlice = createSlice({
  name: 'savedMovies',
  initialState,
  reducers: {
    addMovie: (state, action: PayloadAction<Movie>) => {
      const exists = state.movies.find(m => m.id === action.payload.id);
      if (!exists) {
        state.movies.push(action.payload);
      }
    },
    removeMovie: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(m => m.id !== action.payload);
    },
  },
});
 
export const { addMovie, removeMovie } = savedMoviesSlice.actions;
export default savedMoviesSlice.reducer;