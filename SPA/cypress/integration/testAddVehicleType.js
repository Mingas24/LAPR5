import Links from "../../src/components/Links"
describe("Add Vehicle Type", function () {
  it("tests whether it is possible to add a new driver type ", function () {
    //Arrange
    //visita o url
    cy.visit(Links.UVM_URL()+"/admin");
    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    cy.contains("Create Vehicle Type").click();
    //cy.get("li.tab-list-item").contains("Create Vehicle Type").click();

    cy.get("input[name=name]")
      .type("testName")
      .should("have.value", "testName");

    cy.get("input[name=autonomy]").type("123").should("have.value", "123");

    cy.get("input[name=cost]").type("456").should("have.value", "456");

    cy.get("input[name=averageSpeed]").type("789").should("have.value", "789");

    cy.get('select').select('23');

    cy.get("input[name=consumption]").type("5").should("have.value", "5");

    cy.get("input[name=emissions]").type("10").should("have.value", "10");

    cy.get("input[type=submit]").click();
  });
});
