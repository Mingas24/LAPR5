import Links from "../../src/components/Links"
describe("Add Driver Type", function () {
  it("tests whether it is possible to add a new driver type ", function () {
    //Arrange
    //visita o url
    cy.visit(Links.UVM_URL()+"/admin");
    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    // cy.contains("Create Driver Type").click();

    cy.contains("Create Driver Type").click();
    //cy.get("li.tab-list-item").contains("Create Driver Type").click();


    cy.get("input[name=id]")
        .type("testID4444").should("have.value", "testID4444");

    cy.get("input[name=description]")
      .type("testDescription444")
      .should("have.value", "testDescription444");

    cy.get("input[type=submit]").click();
    
    
  });
});
