import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Path from './../CreatePath';

afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<Path />);
    expect(queryByTestId("createPathTest")).toBeTruthy();
    expect(queryByTestId("pathTest")).toBeTruthy();
    expect(queryByTestId("pathKeyTextTest")).toBeTruthy();
    expect(queryByTestId("pathKeyTest")).toBeTruthy();
    expect(queryByTestId("pathIsEmptyTextTest")).toBeTruthy();
    expect(queryByTestId("pathIsEmptySelectTest")).toBeTruthy();
    expect(queryByTestId("pathIsEmptyTrueTest")).toBeTruthy();
    expect(queryByTestId("pathIsEmptyFalseTest")).toBeTruthy();
    expect(queryByTestId("pathPathNode1TextTest")).toBeTruthy();
    expect(queryByTestId("pathPathNode1SelectTest")).toBeTruthy();
    expect(queryByTestId("pathPathNode2TextTest")).toBeTruthy();
    expect(queryByTestId("pathPathNode2SelectTest")).toBeTruthy();
    expect(queryByTestId("pathDurationTextTest")).toBeTruthy();
    expect(queryByTestId("pathDurationTest")).toBeTruthy();
    expect(queryByTestId("pathDistanceTextTest")).toBeTruthy();
    expect(queryByTestId("pathDistanceTest")).toBeTruthy();
    expect(queryByTestId("pathAddNewSegmentButtonTest")).toBeTruthy();
    expect(queryByTestId("pathIsEmptyTest")).toBeTruthy();
    expect(queryByTestId("pathPathNodeTest")).toBeTruthy();
    expect(queryByTestId("submitTest")).toBeTruthy();
})

describe("Input of Key Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Path />);
        const codeInput = queryByTestId("pathKeyTest");
        fireEvent.change(codeInput, { target: { value: "Path:1" } });
        expect(codeInput.value).toBe("Path:1");
    })
})

describe("Input of IsEmpty True Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Path />);
        const codeInput = queryByTestId("pathIsEmptyTrueTest");
        fireEvent.change(codeInput, { target: { value: "true" } });
        expect(codeInput.value).toBe("true");
    })
})

describe("Input of IsEmpty False Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Path />);
        const codeInput = queryByTestId("pathIsEmptyFalseTest");
        fireEvent.change(codeInput, { target: { value: "false" } });
        expect(codeInput.value).toBe("false");
    })
})

describe("Input of Duration Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Path />);
        const codeInput = queryByTestId("pathDurationTest");
        fireEvent.change(codeInput, { target: { value: 10 } });
        expect(codeInput.value).toBe("10");
    })
})

describe("Input of Distance Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Path />);
        const codeInput = queryByTestId("pathDistanceTest");
        fireEvent.change(codeInput, { target: { value: 100 } });
        expect(codeInput.value).toBe("100");
    })
})

describe("Input of IsEmpty Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Path />);
        const codeInput = queryByTestId("pathIsEmptyTest");
        fireEvent.change(codeInput, { target: { value: true } });
        expect(codeInput.value).toBe("true");
    })
})