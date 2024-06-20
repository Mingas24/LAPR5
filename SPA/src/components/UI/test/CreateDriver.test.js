import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Driver from '../CreateDriver';
afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<Driver />);
    expect(queryByTestId("driverNameTextTest")).toBeTruthy();
    expect(queryByTestId("driverDateTextTest")).toBeTruthy();
    expect(queryByTestId("driverCCTextTest")).toBeTruthy();
    expect(queryByTestId("driverNIFTextTest")).toBeTruthy();
    expect(queryByTestId("driverNumberTextTest")).toBeTruthy();
    expect(queryByTestId("entryDateTextTest")).toBeTruthy();
    expect(queryByTestId("driverTypeTextTest")).toBeTruthy();
    expect(queryByTestId("licenseNumberTextTest")).toBeTruthy();
    expect(queryByTestId("submitTest")).toBeTruthy();
})

describe("Input of Driver's Name Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Driver />);
        const codeInput = queryByTestId("driverNameTest");
        fireEvent.change(codeInput, { target: { value: "nameTest" } });
        expect(codeInput.value).toBe("nameTest");
    })
})

describe("Input of Driver's Birthday Date Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Driver />);
        const codeInput = queryByTestId("driverDateTest");
        fireEvent.change(codeInput, { target: { value: "10-10-2020" } });
        expect(codeInput.value).toBe("10-10-2020");
    })
})


describe("Input of Driver's Citizen Card Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Driver />);
        const codeInput = queryByTestId("driverCCTest");
        fireEvent.change(codeInput, { target: { value: "12345609" } });
        expect(codeInput.value).toBe("12345609");
    })
})

describe("Input of Driver's NIF Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Driver />);
        const codeInput = queryByTestId("driverNIFTest");
        fireEvent.change(codeInput, { target: { value: "123456709" } });
        expect(codeInput.value).toBe("123456709");
    })
})

describe("Input of Driver's Mecanographic Number Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Driver />);
        const codeInput = queryByTestId("driverNumberTest");
        fireEvent.change(codeInput, { target: { value: "abcde1209" } });
        expect(codeInput.value).toBe("abcde1209");
    })
})

describe("Input of Driver's Entry Date Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Driver />);
        const codeInput = queryByTestId("entryDateTest");
        fireEvent.change(codeInput, { target: { value: "11-10-2020" } });
        expect(codeInput.value).toBe("11-10-2020");
    })
})

describe("Input of Driver's Leaving Date Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Driver />);
        const codeInput = queryByTestId("leavingDateTest");
        fireEvent.change(codeInput, { target: { value: "12-10-2020" } });
        expect(codeInput.value).toBe("12-10-2020");
    })
})


describe("Input of Driver Type Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Driver />);
        const codeInput = queryByTestId("driverAddDriverTypeTest");
        fireEvent.change(codeInput, { target: { value: "14" } });
        expect(codeInput.value).toBe("14");
    })
})

describe("Input of Driver's License Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Driver />);
        const codeInput = queryByTestId("driverLicenceExpiryDateTest");
        fireEvent.change(codeInput, { target: { value: "15-10-2020" } });
        expect(codeInput.value).toBe("15-10-2020");
    })
})





