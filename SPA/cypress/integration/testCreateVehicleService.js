import Links from "../../src/components/Links"
describe("Create Vehicle Service", function () {
  it("tests whether it is possible to add a new vehicle service", function () {
    //Arrange
    //visita o url
    //cy.visit("http://uvm001.dei.isep.ipp.pt/");
    cy.visit(Links.UVM_URL()+"/admin");    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    // cy.contains("Create Driver Type").click();

    cy.contains("Create Vehicle Service").click();
    //cy.get("li.tab-list-item").contains("Create Vehicle").click();

    //License Plate
    cy.get("input[name=vehicleServiceName]")
      .type("testName")
      .should("have.value", "testName");

    //VIN
    cy.get("input[name=vehicleServiceCode]")
      .type("12345678922365489")
      .should("have.value", "12345678922365489");

    //Starting date
    cy.get("input[name=vehicleServiceColor]")
      .type("Blue")
      .should("have.value", "Blue");

    cy.get("select").eq(0).select("WB1024").should("have.value", "WB1024");
    cy.get("input[type=hidden]").should("be.hidden"); //.click();

    cy.get("button[type=button]").click({ multiple: true, force: true });

    cy.get("input[type=submit]").click();
  });
});
