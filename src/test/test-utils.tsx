import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import {
  configureStore,
  combineReducers,
  type PreloadedStateShapeFromReducersMapObject,
} from "@reduxjs/toolkit";
import favoritesReducer from "../features/favorites/favoritesSlice";

const reducers = {
  favorites: favoritesReducer,
};

const rootReducer = combineReducers(reducers);

type RootState = PreloadedStateShapeFromReducersMapObject<typeof reducers>;

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
  }: {
    preloadedState?: RootState;
    store?: ReturnType<typeof configureStore>;
  } = {}
) {
  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

export type AppStore = ReturnType<typeof configureStore>;
