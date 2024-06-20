import Links from "../../src/components/Links"
describe("Create Node", function () {
  it("tests whether it is possible to create a node ", function () {
    //Arrange
    //visita o url
    cy.visit(Links.UVM_URL()+"/admin");    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    cy.contains("Create Node").click();
    //cy.get("li.tab-list-item").contains("Create Node").click();

    cy.get("input[name=nodeID]").type("0").should("have.value", "0");

    cy.get("input[name=name]")
      .type("testName")
      .should("have.value", "testName");

    cy.get("input[name=latitude]").type("1.1").should("have.value", "1.1");

    cy.get("input[name=longitude]").type("1.2").should("have.value", "1.2");

    cy.get("input[name=shortName]")
      .type("testShortName")
      .should("have.value", "testShortName");

    cy.get("select").eq(0).select("true").should("have.value", "true");

    cy.get("select").eq(1).select("true").should("have.value", "true");

    cy.get("input[name=id]").type("2").should("have.value", "2");

    //id of the node
    cy.get("select").eq(2).select("2").should("have.value", "2");
    cy.get("input[name=duration]").type("2").should("have.value", "2");

    cy.get("button[type=button]").click();
    cy.get("input[type=submit]").click();
  });
});
