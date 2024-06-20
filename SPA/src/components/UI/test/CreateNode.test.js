import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import Node from './../CreateNode';

afterEach(cleanup);

it("renders without crashing", () => {
    const { queryByTestId } = render(<Node />);
    expect(queryByTestId("nodeTest")).toBeTruthy();
    expect(queryByTestId("createNodeTest")).toBeTruthy();
    expect(queryByTestId("nodeIDTextTest")).toBeTruthy();
    expect(queryByTestId("nodeIDTest")).toBeTruthy();
    expect(queryByTestId("nodeNameTextTest")).toBeTruthy();
    expect(queryByTestId("nodeNameTest")).toBeTruthy();
    expect(queryByTestId("nodeLatitudeTextTest")).toBeTruthy();
    expect(queryByTestId("nodeLatitudeTest")).toBeTruthy();
    expect(queryByTestId("longitudeTextTest")).toBeTruthy();
    expect(queryByTestId("nodeLongitudeTest")).toBeTruthy();
    expect(queryByTestId("nodeShortNameTextTest")).toBeTruthy();
    expect(queryByTestId("nodeShortNameTest")).toBeTruthy();
    expect(queryByTestId("nodeIsDepotTextTest")).toBeTruthy();
    expect(queryByTestId("nodeIsDepotSelectTest")).toBeTruthy();
    expect(queryByTestId("nodeIsDepotTrueTest")).toBeTruthy();
    expect(queryByTestId("nodeIsDepotFalseTest")).toBeTruthy();
    expect(queryByTestId("nodeIsReliefTextTest")).toBeTruthy();
    expect(queryByTestId("nodeIsReliefSelectTest")).toBeTruthy();
    expect(queryByTestId("nodeIsReliefTrueTest")).toBeTruthy();
    expect(queryByTestId("nodeIsReliefFalseTest")).toBeTruthy();
    expect(queryByTestId("nodeIsCrewTravelTimeTextTest")).toBeTruthy();
    expect(queryByTestId("nodeIsCrewTravelTimeInputTest")).toBeTruthy();
    expect(queryByTestId("nodeIsCrewTravelTimeSelectTest")).toBeTruthy();
    expect(queryByTestId("nodeIsCrewTravelTimeDurationTest")).toBeTruthy();
    expect(queryByTestId("nodeAddCrewTravelTimeTest")).toBeTruthy();
    expect(queryByTestId("nodeIsDepotTest")).toBeTruthy();
    expect(queryByTestId("nodeIsReliefTest")).toBeTruthy();
    expect(queryByTestId("nodeCrewTravelTimeTest")).toBeTruthy();
    expect(queryByTestId("submitTest")).toBeTruthy();
})

describe("Input of ID Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeIDTest");
        fireEvent.change(codeInput, { target: { value: 1 } });
        expect(codeInput.value).toBe("1");
    })
})

describe("Input of Name Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeNameTest");
        fireEvent.change(codeInput, { target: { value: "nodeTest" } });
        expect(codeInput.value).toBe("nodeTest");
    })
})

describe("Input of Latitude Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeLatitudeTest");
        fireEvent.change(codeInput, { target: { value: 41.5 } });
        expect(codeInput.value).toBe("41.5");
    })
})

describe("Input of Longitude Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeLongitudeTest");
        fireEvent.change(codeInput, { target: { value: -8 } });
        expect(codeInput.value).toBe("-8");
    })
})

describe("Input of Short Name Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeShortNameTest");
        fireEvent.change(codeInput, { target: { value: "NT" } });
        expect(codeInput.value).toBe("NT");
    })
})

describe("Input of IsDepot True Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeIsDepotTrueTest");
        fireEvent.change(codeInput, { target: { value: "true" } });
        expect(codeInput.value).toBe("true");
    })
})

describe("Input of IsDepot False Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeIsDepotFalseTest");
        fireEvent.change(codeInput, { target: { value: "false" } });
        expect(codeInput.value).toBe("false");
    })
})

describe("Input of IsRelief True Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeIsReliefTrueTest");
        fireEvent.change(codeInput, { target: { value: "true" } });
        expect(codeInput.value).toBe("true");
    })
})

describe("Input of IsRelief False Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeIsReliefFalseTest");
        fireEvent.change(codeInput, { target: { value: "false" } });
        expect(codeInput.value).toBe("false");
    })
})

describe("Input of Crew Travel Time Duration Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeIsCrewTravelTimeDurationTest");
        fireEvent.change(codeInput, { target: { value: 10 } });
        expect(codeInput.value).toBe("10");
    })
})

describe("Input of IsRelief Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeIsReliefTest");
        fireEvent.change(codeInput, { target: { value: true } });
        expect(codeInput.value).toBe("true");
    })
})

describe("Input of IsDepot Value", () => {
    it("Updates based on input", () => {
        const { queryByTestId } = render(<Node />);
        const codeInput = queryByTestId("nodeIsDepotTest");
        fireEvent.change(codeInput, { target: { value: true } });
        expect(codeInput.value).toBe("true");
    })
})

// const openModal = jest.fn();
// describe("Input of Submit Value", () => {
//     it("Updates based on input", () => {
//         const { queryByTestId } = render(<Node />);
//         const submitInput = queryByTestId("submitTest");
//         fireEvent.click(submitInput);
//         expect(openModal).toHaveBeenCalled();
//     })
// })
