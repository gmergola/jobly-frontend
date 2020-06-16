import React from "react";
import { render } from "@testing-library/react";
import ProfileForm from "./ProfileForm";
import { MemoryRouter } from "react-router";


it("renders without crashing", function() {
  render(
    <MemoryRouter>
        <ProfileForm />
    </MemoryRouter>
  );
});

it("matches snapshot", function() {
  const { asFragment } = render(
    <MemoryRouter>
      <ProfileForm />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});