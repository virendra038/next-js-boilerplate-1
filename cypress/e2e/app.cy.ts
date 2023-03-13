describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should check for the text Hello World", () => {
    cy.get("h2").should("contain", "Todo App");
  });
});

export {};
