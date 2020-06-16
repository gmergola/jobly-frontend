import React from "react";
import { render } from "@testing-library/react";
import CompanyDetail from "./CompanyDetail";
import { MemoryRouter } from "react-router";


it("renders without crashing", function() {
  render(
    <MemoryRouter>
        <CompanyDetail />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyDetail />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});