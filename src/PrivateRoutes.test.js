import React from "react";
import { render } from "@testing-library/react";
import PrivateRoutes from "./PrivateRoutes";
import { MemoryRouter } from "react-router";


it("renders without crashing", function() {
  render(
    <MemoryRouter>
        <PrivateRoutes />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <PrivateRoutes />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});