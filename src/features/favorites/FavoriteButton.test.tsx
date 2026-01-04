import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FavoriteButton from "./FavoriteButton";
import { renderWithProviders } from "../../test/test-utils";

test("adds product to favorites on click", () => {
  const user = userEvent.setup();

  renderWithProviders(<FavoriteButton productId={1} />);

  const button = screen.getByTestId("favorite-button");
  user.click(button);

  expect(screen.getByTestId("favorite-button")).toHaveTextContent("Add Favorite");
});
