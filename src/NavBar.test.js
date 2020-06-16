import React from "react";
import { render } from "@testing-library/react";
import NavBar from "./NavBar";
import { MemoryRouter } from "react-router";
import { TokenProvider } from "./testHelpers";


it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <TokenProvider>
        <NavBar />
      </TokenProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <TokenProvider>
        <NavBar />
      </TokenProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});