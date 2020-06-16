import React from "react";
import { render } from "@testing-library/react";
import LoginSignupForm from "./LoginSignupForm";
import { MemoryRouter } from "react-router";
import { TokenProvider } from "./testHelpers";


it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <TokenProvider>
        <LoginSignupForm />
      </TokenProvider>
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <TokenProvider>
        <LoginSignupForm />
      </TokenProvider>
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});