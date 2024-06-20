import Links from "../../src/components/Links"
describe("Create New Line", function () {
    it("tests whether it is possible to create a new line ", function () {
      //Arrange
      //visita o url
      cy.visit(Links.UVM_URL()+"/admin");      //Act   faz query ao elemento CREATE
      cy.contains("Create").click();
  
       cy.contains("Create Line").click();
  
     //cy.get("li.tab-list-item").contains("Create Line").click();

      cy.get("input[name=lineID]")
      .type("123").should("have.value", "123");

      cy.get("input[name=name]")
      .type("testLine").should("have.value", "testLine");

      cy.get("input[name=color]")
      .type("testLineColor").should("have.value", "testLineColor");

      
     cy.get('select').eq(0).select('Path:1').should ('have.value', 'Path:1');

      cy.get('select').eq(1).select('Go').should ('have.value', 'Go');

      cy.get("button[type=button]").click();
      cy.get("input[type=submit]").click();
  
      
      
      
    });
  });
  