describe('Creates a new conversation', function() {
  beforeEach(() => {
    cy.app('clean'); // have a look at cypress/app_commands/clean.rb
  });

  it('using single factory bot', function() {
    cy.appFactories([['create', 'channel_widget']]);
    cy.visit('/widget_tests');
    cy.get('.woot--bubble-holder > :nth-child(1)').click();
    cy.get('#chatwoot_live_chat_widget')
      .iframe()
      .within(() => {
        cy.get('.user-message-input').type('Hello{enter}');
        cy.get('.agent .form-input').type('alex@wiredave.com{enter}');
      });
  });
});
