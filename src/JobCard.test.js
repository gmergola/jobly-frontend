import React from "react";
import { render } from "@testing-library/react";
import JobCard from "./JobCard";
import { MemoryRouter } from "react-router";


it("renders without crashing", function() {
  render(
    <MemoryRouter>
        <JobCard />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <JobCard />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});