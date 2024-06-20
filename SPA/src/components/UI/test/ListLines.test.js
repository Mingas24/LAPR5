import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import ListLines from "./../List/ListLines";

afterEach(cleanup);

it("renders without crashing", () => {
  const { queryByTestId } = render(<ListLines />);
  expect(queryByTestId("lineTest")).toBeTruthy();
});