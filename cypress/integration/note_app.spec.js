describe('Note app', function() {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('HTML is easy')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('hakizu')
    cy.get('#password').type('salts')
    cy.get('#login-button').click()

    cy.contains('Halas logged in') //name for user hakizu
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('hakizu')
      cy.get('input:last').type('salts')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function () {
      cy.contains('New Note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('Save').click()
      cy.contains('a note created by cypress')
    })
  })
})