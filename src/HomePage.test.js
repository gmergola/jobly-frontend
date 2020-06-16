import React from "react";
import { render } from "@testing-library/react";
import HomePage from "./HomePage";
import { MemoryRouter } from "react-router";
import { TokenProvider } from "./testHelpers";


it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <TokenProvider>
        <HomePage />
      </TokenProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <TokenProvider>
        <HomePage />
      </TokenProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});