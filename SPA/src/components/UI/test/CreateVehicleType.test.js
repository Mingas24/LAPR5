import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import VehicleType from './../CreateVehicleType';

afterEach(cleanup);
it("renders without crashing", () => {
    const { queryByTestId } = render(<VehicleType />);
    expect(queryByTestId("createTest")).toBeTruthy();
    expect(queryByTestId("nameTest")).toBeTruthy();
    expect(queryByTestId("autonomyTest")).toBeTruthy();
    expect(queryByTestId("costTest")).toBeTruthy();
    expect(queryByTestId("averageSpeedTest")).toBeTruthy();
    expect(queryByTestId("energySourceTest")).toBeTruthy();
    expect(queryByTestId("consumptionTest")).toBeTruthy();
    expect(queryByTestId("emissionsTest")).toBeTruthy();
    expect(queryByTestId("submitTest")).toBeTruthy();
})

describe("Input of Name Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleType />);
        const nameInput = queryByTestId("nameTest");
        fireEvent.change(nameInput, { target: { value: "nameTest" } });
        expect(nameInput.value).toBe("nameTest");
    })
})

describe("Input of Autonomy Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleType />);
        const autonomyInput = queryByTestId("autonomyTest");
        fireEvent.change(autonomyInput, { target: { value: 10 } });
        expect(autonomyInput.value).toBe("10");
    })
})

describe("Input of Cost Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleType />);
        const costInput = queryByTestId("costTest");
        fireEvent.change(costInput, { target: { value: 10 } });
        expect(costInput.value).toBe("10");
    })
})

describe("Input of Average Speed Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleType />);
        const averageSpeedInput = queryByTestId("averageSpeedTest");
        fireEvent.change(averageSpeedInput, { target: { value: 10 } });
        expect(averageSpeedInput.value).toBe("10");
    })
})

describe("Input of Energy Source Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleType />);
        const energySourceInput = queryByTestId("energySourceTest");
        fireEvent.change(energySourceInput, { target: { value: 10 } });
        expect(energySourceInput.value).toBe("10");
    })
})

describe("Input of Consumption Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleType />);
        const consumptionInput = queryByTestId("consumptionTest");
        fireEvent.change(consumptionInput, { target: { value: 10 } });
        expect(consumptionInput.value).toBe("10");
    })
})

describe("Input of Emission Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<VehicleType />);
        const emissionInput = queryByTestId("emissionsTest");
        fireEvent.change(emissionInput, { target: { value: 10 } });
        expect(emissionInput.value).toBe("10");
    })
})
// const openModal = jest.fn();
// describe("Input of Submit Value", () => {
//     it("Updates based on input", () => {
//         const { queryByTestId } = render(<VehicleType />);
//         const submitInput = queryByTestId("submitTest");
//         fireEvent.click(submitInput);
//         expect(openModal).toHaveBeenCalled();
//     })
// })