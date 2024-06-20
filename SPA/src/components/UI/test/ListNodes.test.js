import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Nodes from "./../List/ListNodes";

afterEach(cleanup);

it("renders without crashing", () => {
  const { queryByTestId } = render(<Nodes />);
  expect(queryByTestId("lineTest")).toBeTruthy();
});