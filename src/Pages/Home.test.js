import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./Home";

test("home page loads with loading api data text", () => {
  const component = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  const LaodingText = component.getByTestId("loading");

  expect(LaodingText.textContent).toBe("Loading data from api...");
});

// https://www.youtube.com/watch?v=yTZ-txdrHdY
