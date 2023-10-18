describe('template spec', () => {
  it('should take you to authentication', () => {
    cy.visit(`http://localhost:3000`)
    cy.get('h1').contains('Celestial Cycle')
      .get('p').contains('Click to demo').click()
      .url().should('contain', 'demo/dashboard')
      .get('button').contains('Logout').click()
      .url().should('equal', 'http://localhost:3000/')
      .get('button').contains('Login').click()
      .url().should('contain', 'authenticate')
  })

})