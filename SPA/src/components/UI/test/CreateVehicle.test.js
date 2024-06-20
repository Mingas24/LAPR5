import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Vehicle from '../CreateVehicle';
afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<Vehicle />);
    expect(queryByTestId("licensePlateTest")).toBeTruthy();
    expect(queryByTestId("vinTest")).toBeTruthy();
    expect(queryByTestId("vehicleTypeTest")).toBeTruthy();
    expect(queryByTestId("vehicleEntranceDateTest")).toBeTruthy();
    expect(queryByTestId("submitTest")).toBeTruthy();
})

describe("Input of License Plate Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Vehicle />);
        const codeInput = queryByTestId("licensePlateTest");
        fireEvent.change(codeInput, { target: { value: "GH-88-JH" } });
        expect(codeInput.value).toBe("GH-88-JH");
    })
})

describe("Input of VIN Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Vehicle />);
        const codeInput = queryByTestId("vinTest");
        fireEvent.change(codeInput, { target: { value: "12345678958647823" } });
        expect(codeInput.value).toBe("12345678958647823");
    })
})


describe("Input of Vehicle Type Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Vehicle />);
        const codeInput = queryByTestId("vehicleTypeTest");
        fireEvent.change(codeInput, { target: { value: "Autocarro" } });
        expect(codeInput.value).toBe("Autocarro");
    })
})

describe("Input of Vehicle Type Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Vehicle />);
        const codeInput = queryByTestId("vehicleEntranceDateTest");
        fireEvent.change(codeInput, { target: { value: "10-10-2020" } });
        expect(codeInput.value).toBe("10-10-2020");
    })
})




