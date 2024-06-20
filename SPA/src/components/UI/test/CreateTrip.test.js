import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Trip from '../CreateTrip';
afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<Trip />);
    expect(queryByTestId("tripCodeTextTest")).toBeTruthy();
    expect(queryByTestId("lineIDTextTest")).toBeTruthy();
    expect(queryByTestId("pathIDTextTest")).toBeTruthy();
    expect(queryByTestId("dateTextTest")).toBeTruthy();
    expect(queryByTestId("dateTimeTextTest")).toBeTruthy();

    expect(queryByTestId("submitTest")).toBeTruthy();
})

describe("Input of Trip code", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Trip />);
        const codeInput = queryByTestId("tripCodeTest");
        fireEvent.change(codeInput, { target: { value: "T1010" } });
        expect(codeInput.value).toBe("T1010");
    })
})

describe("Input of Trip Line Name", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Trip />);
        const codeInput = queryByTestId("lineIDTest");
        fireEvent.change(codeInput, { target: { value: "1" } });
        expect(codeInput.value).toBe("1");
    })
})

describe("Input of Trip Path Name", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Trip />);
        const codeInput = queryByTestId("pathIDTest");
        fireEvent.change(codeInput, { target: { value: "Path:1" } });
        expect(codeInput.value).toBe("Path:1");
    })
})

describe("Input of Trip Date", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Trip />);
        const codeInput = queryByTestId("dateTest");
        fireEvent.change(codeInput, { target: { value: "10-10-2021" } });
        expect(codeInput.value).toBe("10-10-2021");
    })
})

describe("Input of Trip Time", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Trip />);
        const codeInput = queryByTestId("dateTimeTest");
        fireEvent.change(codeInput, { target: { value: "10-10-2021 10:10" } });
        expect(codeInput.value).toBe("10-10-2021 10:10");
    })
})







