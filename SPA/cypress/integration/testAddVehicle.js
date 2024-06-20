import Links from "../../src/components/Links"
describe("Add Vehicle", function () {
  it("tests whether it is possible to add a new driver type ", function () {
    //Arrange
    //visita o url
    //cy.visit("http://uvm001.dei.isep.ipp.pt/");
    cy.visit(Links.UVM_URL()+"/admin");
    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    // cy.contains("Create Driver Type").click();

    cy.contains("Create Vehicle").click();
    //cy.get("li.tab-list-item").contains("Create Vehicle").click();

    //License Plate
    cy.get("input[name=licensePlate]")
      .type("PN-00-RC")
      .should("have.value", "PN-00-RC");

    //VIN
    cy.get("input[name=vehicleVIN]")
      .type("12345678922365489")
      .should("have.value", "12345678922365489");

    //Vehicle Type
    // cy.get("select").eq(0).select("true").should("have.value", "true");
    // cy.get("input[type=vehicleTypeID]").click();

    cy.get('select').select('Autocarro');

    //Starting date
    cy.get("input[name=vehicleEntranceDate]")
      .type("10-10-2020")
      .should("have.value", "10-10-2020");

    cy.get("input[type=submit]").click();
  });
});
