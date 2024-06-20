import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import CS from "../List/ListCrewServiceByDate";
afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<CS />);
    expect(queryByTestId("lineTest")).toBeTruthy();
    expect(queryByTestId("createLineTest")).toBeTruthy();
})

describe("Input of VS date", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<CS />);
        const codeInput = queryByTestId("lineIDTest");
        fireEvent.change(codeInput, { target: { value: "11-11-2021" } });
        expect(codeInput.value).toBe("11-11-2021");
    })
})



