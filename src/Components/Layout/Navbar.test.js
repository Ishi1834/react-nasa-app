import React from "react";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("navbar home link render with correct text and link", () => {
  const component = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  const homeLink = component.getByTestId("nav1");

  expect(homeLink.textContent).toBe("Home");
  expect(homeLink).toHaveAttribute("href", "/");
});

test("navbar satellite link render with correct text", () => {
  const component = render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
  const satelliteLink = component.getByTestId("nav2");

  expect(satelliteLink.textContent).toBe("Satellite");
  expect(satelliteLink).toHaveAttribute("href", "/satellite");
});
