import React from "react";
import { render } from "@testing-library/react";
import Alert from "./Alert";


it("renders without crashing", function () {
  render(
    <Alert errors={['ERROR']} />
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <Alert errors={['ERROR']} />
  );
  expect(asFragment()).toMatchSnapshot();
});