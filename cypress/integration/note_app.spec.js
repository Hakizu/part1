describe('Note app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'hakizu',
      username: 'hakizu',
      password: 'salts'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  it('user can login', function () {
    cy.contains('login').click()
    cy.get('#username').type('hakizu')
    cy.get('#password').type('salts')
    cy.get('#login-button').click()

    cy.contains('hakizu logged in') //name for user hakizu
  })

  it.only('login fails with wrong password', function () {
    cy.contains('login').click()
    cy.get('#username').type('hakizu')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'hakizu logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'hakizu', password: 'salts' })
    })

    it('a new note can be created', function () {
      cy.contains('New Note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('Save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note cypress',
          important: false
        })
      })

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })
  })
})