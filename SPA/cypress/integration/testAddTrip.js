
import Links from "../../src/components/Links"
describe("Create Trip", function () {
  it("tests whether it is possible to add a new trip", function () {
    //Arrange
    //visita o url
    //cy.visit("http://uvm001.dei.isep.ipp.pt/");
    cy.visit(Links.UVM_URL()+"/admin")
    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    cy.contains("Create Trip").click();
    //cy.get("li.tab-list-item").contains("Create Vehicle").click();

    cy.get("input[name=tripCode]")
      .type("T2021")
      .should("have.value", "T2021");

    cy.get("select").eq(0).select("1").should("have.value", "1");
    //cy.get("input[type=hidden]").should("be.hidden"); //.click();

    cy.get("select").eq(1).select("Path:1").should("have.value", "1");
    //cy.get("input[type=hidden]").should("be.hidden"); //.click();

    cy.get("select").eq(2).select("Path:3").should("have.value", "3");

    cy.get("input[name=startDate]")
      .type("01-06-2021")
      .should("have.value", "01-06-2021");

    cy.get("input[name=startTime]")
      .type("20:20")
      .should("have.value", "20:20");

    cy.get("input[type=submit]").click();
  });
});
