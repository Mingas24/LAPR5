import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import PathByLine from "./../List/ListPathByLine";
afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<PathByLine />);
    expect(queryByTestId("listPathTest")).toBeTruthy();
    expect(queryByTestId("createLineTest")).toBeTruthy();
})
describe("Input of Line ID", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<PathByLine />);
        const codeInput = queryByTestId("lineIDTest");
        fireEvent.change(codeInput, { target: { value: "Paredes_Aguiar" } });
        expect(codeInput.value).toBe("Paredes_Aguiar");
    })
})









