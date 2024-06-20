import Links from "../../src/components/Links"
describe('List Crew Service', () => {
  it('List Crew Service Test', () => {
    cy.visit(Links.UVM_URL() + "/admin");
    cy.contains("List").click();
    cy.contains("List Crew Service").click();

    cy.get("input[name=date]").type("11-11-2021").should("have.value", "11-11-2021");
    cy.contains("Search").click();
  })
})