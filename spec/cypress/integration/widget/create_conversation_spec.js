describe('Creates a new conversation', function() {
  beforeEach(() => {
    cy.app('clean'); // have a look at cypress/app_commands/clean.rb
  });

  it('using single factory bot', function() {
    cy.appFactories([['create', 'channel_widget']]);
    cy.visit('/v2/widget_tests');
    cy.get('.sc-AxjAm')
      .should('be.visible')
      .click();
    cy.get('.sc-fznyAO > .sc-AxirZ')
      .should('be.visible')
      .click();
    cy.wait(2500);
    cy.get('form > textarea')
      .should('be.visible')
      .type('Hello {enter}');
  });
});
