describe('template spec', () => {
  it('should protect routes, login and logout', () => {
    const routes = ['/']
    routes.forEach(route => {
      cy.visit(`http://localhost:3000${route}`)
      .url().should('equal', 'http://localhost:3000/login')
    })
    cy.get('h1').contains('Celestial Cycle')
      .get('p').contains('Click to demo').click()
      .url().should('equal', 'http://localhost:3000/')
      .get('button').contains('LOG OUT').click()
      .url().should('equal', 'http://localhost:3000/login')
      .get('button').contains('Login').click()
      .url().should('equal', 'http://localhost:3000/')
  })

})