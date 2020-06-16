import React from "react";
import { render } from "@testing-library/react";
import CompanyList from "./CompanyList";
import { MemoryRouter } from "react-router";


it("renders without crashing", function() {
  render(
    <MemoryRouter>
        <CompanyList />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <CompanyList />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});