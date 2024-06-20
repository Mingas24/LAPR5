import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import VehicleService from '../CreateVehicleService';
afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<VehicleService />);
    expect(queryByTestId("vehicleServiceNameTextTest")).toBeTruthy();
    expect(queryByTestId("vehicleServiceCodeTextTest")).toBeTruthy();
    expect(queryByTestId("vehicleServiceColorTextTest")).toBeTruthy();
    expect(queryByTestId("driverTypeTextTest")).toBeTruthy();
    expect(queryByTestId("submitTest")).toBeTruthy();
})

describe("Input of Vehicle Service Name", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleService />);
        const codeInput = queryByTestId("vehicleServiceNameTest");
        fireEvent.change(codeInput, { target: { value: "testName" } });
        expect(codeInput.value).toBe("testName");
    })
})

describe("Input of Vehicle Service Code", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleService />);
        const codeInput = queryByTestId("vehicleServiceCodeTest");
        fireEvent.change(codeInput, { target: { value: "VSCODE1234" } });
        expect(codeInput.value).toBe("VSCODE1234");
    })
})


describe("Input of Vehicle Service Color", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleService />);
        const codeInput = queryByTestId("vehicleServiceColorTest");
        fireEvent.change(codeInput, { target: { value: "Blue" } });
        expect(codeInput.value).toBe("Blue");
    })
})

describe("Input of Workblock Codes", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleService />);
        const codeInput = queryByTestId("driverAddDriverTypeTest");
        fireEvent.change(codeInput, { target: { value: "WB1024" } });
        expect(codeInput.value).toBe("WB1024");
    })
})




