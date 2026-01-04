import reducer, { toggleFavorite } from "./favoritesSlice";

describe("favoritesSlice", () => {
  beforeEach(() => {
    jest.resetModules(); // IMPORTANT
    localStorage.clear();
    jest.spyOn(Storage.prototype, "setItem");
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return initial state from localStorage", async () => {
    localStorage.setItem("favorites", JSON.stringify([1, 2]));

    const { default: reducer } = await import("./favoritesSlice");

    const state = reducer(undefined, { type: "@@INIT" });
    expect(state.favoriteIds).toEqual([1, 2]);
  });

  test("should add item to favorites", () => {
    const initialState = { favoriteIds: [] };

    const state = reducer(initialState, toggleFavorite(5));

    expect(state.favoriteIds).toEqual([5]);
    expect(localStorage.setItem).toHaveBeenCalledWith("favorites", JSON.stringify([5]));
  });

  test("should remove item from favorites if already exists", () => {
    const initialState = { favoriteIds: [5] };

    const state = reducer(initialState, toggleFavorite(5));

    expect(state.favoriteIds).toEqual([]);
    expect(localStorage.setItem).toHaveBeenCalledWith("favorites", JSON.stringify([]));
  });
});
