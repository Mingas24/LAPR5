import Links from "../../src/components/Links"
describe("Create Path", function () {
  it("tests whether it is possible to create a path ", function () {
    //Arrange
    //visita o url
    cy.visit(Links.UVM_URL()+"/admin");    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    cy.contains("Create Path").click();
    //cy.get("li.tab-list-item").contains("Create Path").click();

    cy.get("input[name=key]").type("testKey").should("have.value", "testKey");

    cy.get('select').eq(0).select('false').should ('have.value', 'false');

    cy.get('select').eq(1).select('Cete').should ('have.value', 'Cete');
    
    cy.get('select').eq(2).select('Baltar').should ('have.value', 'Baltar');

    cy.get("input[name=duration]")
      .type("1")
      .should("have.value", "1");

    cy.get("input[name=distance]")
      .type("2")
      .should("have.value", "2");

    cy.get("input[type=submit]").click();
  });
});
