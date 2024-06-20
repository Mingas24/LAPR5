import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import Line from "./../CreateLine";

afterEach(cleanup);

it("renders without crashing", () => {
  const { queryByTestId } = render(<Line />);
  expect(queryByTestId("lineTest")).toBeTruthy();
  expect(queryByTestId("createLineTest")).toBeTruthy();
  expect(queryByTestId("lineIDTextTest")).toBeTruthy();
  expect(queryByTestId("lineIDTest")).toBeTruthy();
  expect(queryByTestId("lineNameTextTest")).toBeTruthy();
  expect(queryByTestId("lineNameTest")).toBeTruthy();
  expect(queryByTestId("colorTextTest")).toBeTruthy();
  expect(queryByTestId("colorTest")).toBeTruthy();
  expect(queryByTestId("linePathTextTest")).toBeTruthy();
  expect(queryByTestId("linePathSelectTest")).toBeTruthy();
  expect(queryByTestId("lineOrientationSelectTest")).toBeTruthy();
  expect(queryByTestId("lineOrientationGoTest")).toBeTruthy();
  expect(queryByTestId("lineOrientationReturnTest")).toBeTruthy();
  expect(queryByTestId("lineAddLinePathTest")).toBeTruthy();
  expect(queryByTestId("linePathTest")).toBeTruthy();
  expect(queryByTestId("submitTest")).toBeTruthy();
});

describe("Input of ID Value", () => {
  it("Updates based on input", () => {
    const { queryByTestId } = render(<Line />);
    const codeInput = queryByTestId("lineIDTest");
    fireEvent.change(codeInput, { target: { value: 1 } });
    expect(codeInput.value).toBe("1");
  });
});

describe("Input of Name Value", () => {
  it("Updates based on input", () => {
    const { queryByTestId } = render(<Line />);
    const codeInput = queryByTestId("lineNameTest");
    fireEvent.change(codeInput, { target: { value: "lineTest" } });
    expect(codeInput.value).toBe("lineTest");
  });
});

describe("Input of Color Value", () => {
  it("Updates based on input", () => {
    const { queryByTestId } = render(<Line />);
    const codeInput = queryByTestId("colorTest");
    fireEvent.change(codeInput, { target: { value: "blue" } });
    expect(codeInput.value).toBe("blue");
  });
});

describe("Input of OrientationGo True Value", () => {
  it("Updates based on input", () => {
    const { queryByTestId } = render(<Line />);
    const codeInput = queryByTestId("lineOrientationGoTest");
    fireEvent.change(codeInput, { target: { value: "Go" } });
    expect(codeInput.value).toBe("Go");
  });
});

describe("Input of OrientationReturn False Value", () => {
  it("Updates based on input", () => {
    const { queryByTestId } = render(<Line />);
    const codeInput = queryByTestId("lineOrientationReturnTest");
    fireEvent.change(codeInput, { target: { value: "Return" } });
    expect(codeInput.value).toBe("Return");
  });
});

// const openModal = jest.fn();
// describe("Input of Submit Value", () => {
//     it("Updates based on input", () => {
//         const { queryByTestId } = render(<Line />);
//         const submitInput = queryByTestId("submitTest");
//         fireEvent.click(submitInput);
//         expect(openModal).toHaveBeenCalled();
//     })
// })
