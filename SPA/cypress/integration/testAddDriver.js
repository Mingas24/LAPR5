import Links from "../../src/components/Links"

describe("Add Driver", function () {
  it("tests whether it is possible to add a new driver type ", function () {
    //Arrange
    //visita o url
    //cy.visit("http://uvm001.dei.isep.ipp.pt/");
    cy.visit(Links.UVM_URL()+"/admin");
    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    // cy.contains("Create Driver Type").click();

    cy.contains("Create Driver").click();
    //cy.get("li.tab-list-item").contains("Create Vehicle").click();

    //Driver name
    cy.get("input[name=driverName]").type("Luis").should("have.value", "Luis");

    //Birthday date
    cy.get("input[name=birthDate]")
      .type("01-01-1915")
      .should("have.value", "01-01-1915");

    //Citizen card number
    cy.get("input[name=citizenCardNumber]")
      .type("12345078")
      .should("have.value", "12345078");

    //NIF
    cy.get("input[name=driverNIF]")
      .type("123456709")
      .should("have.value", "123456709");

    //Mecanographic number
    cy.get("input[name=mecanographicNumber]")
      .type("abcde1034")
      .should("have.value", "abcde1034");

    //Starting date
    cy.get("input[name=entryDate]")
      .type("10-10-2020")
      .should("have.value", "10-10-2020");

    //Leaving date
      cy.get("input[name=leavingDate]")
      .type("15-10-2020")
      .should("have.value", "15-10-2020");

    //Driver ID
    cy.get("select").eq(0).select("testID4444").should("have.value", "testID4444");
    cy.get('input[type=hidden]').should('be.hidden');//.click();
    
     cy.get("button[type=button]").click({multiple: true , force: true});
    
    

    //Driver's License Number
    cy.get("input[name=dln]")
      .type("P-1234067 8")
      .should("have.value", "P-1234067 8");

    //Driver's License Expiry Date
    cy.get("input[name=dled]")
      .type("20-11-2050")
      .should("have.value", "20-11-2050");

    cy.get("input[type=submit]").click();
  });
});
