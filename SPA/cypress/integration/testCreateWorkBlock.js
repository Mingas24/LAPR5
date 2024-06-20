import Links from "../../src/components/Links"
describe("Add Workblock", function () {
  it("tests whether it is possible to add a new workblock ", function () {
    //Arrange
    //visita o url
    //cy.visit("http://uvm001.dei.isep.ipp.pt/");
    cy.visit(Links.UVM_URL()+"/admin");    //Act   faz query ao elemento CREATE
    cy.contains("Create").click();

    // cy.contains("Create Driver Type").click();

    cy.contains("Create Workblock").click();
    //cy.get("li.tab-list-item").contains("Create Vehicle").click();

    cy.get("input[name=Code]")
      .type("WB1024")
      .should("have.value", "WB1024");

    cy.get("input[name=startTime]")
      .type("01-06-2021 10:10")
      .should("have.value", "01-06-2021 10:10");

    cy.get("input[name=endTime]")
      .type("01-07-2021 10:10")
      .should("have.value", "01-07-2021 10:10");

    cy.get("select").eq(0).select("T2021").should("have.value", "T2021");
    cy.get("input[type=hidden]").should("be.hidden"); //.click();

    cy.get("button[type=button]").click({ multiple: true, force: true });

    cy.get("input[type=submit]").click();
  });
});
