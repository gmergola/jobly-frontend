import React from "react";
import { render } from "@testing-library/react";
import JobList from "./JobList";
import { MemoryRouter } from "react-router";


it("renders without crashing", function() {
  render(
    <MemoryRouter>
        <JobList />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <JobList />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});