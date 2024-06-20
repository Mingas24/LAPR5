import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import DriverType from './../CreateDriverType';
afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<DriverType />);
    expect(queryByTestId("createDriverTypeTest")).toBeTruthy();
    expect(queryByTestId("codeDriverTypeTest")).toBeTruthy();
    expect(queryByTestId("descriptionDriverTypeTest")).toBeTruthy();
    expect(queryByTestId("submitTest")).toBeTruthy();
})

describe("Input of Code Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<DriverType />);
        const codeInput = queryByTestId("codeDriverTypeTest");
        fireEvent.change(codeInput, { target: { value: "codeTest" } });
        expect(codeInput.value).toBe("codeTest");
    })
})

describe("Input of Description Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<DriverType />);
        const descriptionInput = queryByTestId("descriptionDriverTypeTest");
        fireEvent.change(descriptionInput, { target: { value: "descriptionTest" } });
        expect(descriptionInput.value).toBe("descriptionTest");
    })
})

// describe("Input of Submit Value", () => {
//     it("Updates based on input", () => {
//         const { queryByTestId } = render(<DriverType />);
//         const submitInput = queryByTestId("submitTest");
//         fireEvent.change(submitInput, { target: { value: "submitTest" } });
//         expect(submitInput.value).toBe("submitTest");
//     })
// })
