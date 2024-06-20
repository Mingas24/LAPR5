import Links from "../../src/components/Links"
describe("Add Crew Service", function () {
  it("tests whether it is possible to add a new crew service ", function () {
    //Arrange
    //visita o url
    //cy.visit("http://uvm001.dei.isep.ipp.pt/");
    cy.visit(Links.UVM_URL()+"/admin");
    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    cy.contains("Create Crew Service").click();

    cy.get("input[name=Code]").type("C2021").should("have.value", "C2021");

    cy.get("select").eq(0).select("WB1024").should("have.value", "WB1024");
    cy.get("input[type=hidden]").should("be.hidden"); //.click();

    cy.get("button[type=button]").click();

    cy.get("input[type=submit]").click();
  });
});
