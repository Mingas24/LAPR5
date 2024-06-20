import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Workblock from '../CreateWorkblock';
afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<Workblock />);
    expect(queryByTestId("workblockCodeTextTest")).toBeTruthy();
    expect(queryByTestId("startTimeTextTest")).toBeTruthy();
    expect(queryByTestId("endTimeTextTest")).toBeTruthy();
    expect(queryByTestId("tripsTextTest")).toBeTruthy();
    expect(queryByTestId("submitTest")).toBeTruthy();
})

describe("Input of Workblock code", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Workblock />);
        const codeInput = queryByTestId("workblockCodeTest");
        fireEvent.change(codeInput, { target: { value: "WB2424" } });
        expect(codeInput.value).toBe("WB2424");
    })
})

describe("Input of Workblock Start Time", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Workblock />);
        const codeInput = queryByTestId("startTimeTest");
        fireEvent.change(codeInput, { target: { value: "01-02-2020 10:10" } });
        expect(codeInput.value).toBe("01-02-2020 10:10");
    })
})

describe("Input of Workblock End Time", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Workblock />);
        const codeInput = queryByTestId("endTimeTest");
        fireEvent.change(codeInput, { target: { value: "01-03-2020 10:10" } });
        expect(codeInput.value).toBe("01-03-2020 10:10");
    })
})

describe("Input of Trips", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Workblock />);
        const codeInput = queryByTestId("tripTest");
        fireEvent.change(codeInput, { target: { value: "T1010" } });
        expect(codeInput.value).toBe("T1010");
    })
})






