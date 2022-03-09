import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SatellitePage from "./Satellite";

test("page loads with the correct state", () => {
  render(<SatellitePage />);

  expect(screen.getByTestId("loading")).toHaveTextContent(
    "Loading data from api..."
  );
});
