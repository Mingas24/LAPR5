import Links from "../../src/components/Links"
describe('List Vehicle Service', () => {
    it('List Vehicle Service Test', () => {
      cy.visit(Links.UVM_URL()+'/admin')
  
      cy.contains("List").click();
      cy.contains("List Vehicle Service").click();

      cy.get("input[name=date]").type("11-11-2021").should("have.value", "11-11-2021");
      cy.contains("Search").click();
    })
  })