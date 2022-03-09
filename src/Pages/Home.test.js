import { render, screen } from "@testing-library/react";
import HomePage from "./Home";

test("page loads with the correct state", () => {
  render(<HomePage />);

  expect(screen.getByTestId("loading").textContent).toBe(
    "Loading data from api..."
  );
});
