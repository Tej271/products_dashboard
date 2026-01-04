import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favoriteIds: number[];
}

const loadFavorites = (): number[] => {
  try {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage', error);
    return [];
  }
};

const initialState: FavoritesState = {
  favoriteIds: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const index = state.favoriteIds.indexOf(action.payload);
      if (index === -1) {
        state.favoriteIds.push(action.payload);
      } else {
        state.favoriteIds.splice(index, 1);
      }
      try {
        localStorage.setItem('favorites', JSON.stringify(state.favoriteIds));
      } catch (error) {
        console.error('Error saving favorites to localStorage', error);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
