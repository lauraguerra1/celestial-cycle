describe('User can visit homepage', () => {
  it('Should be able to see contents on homepage', () => {
    cy.visit('http://localhost:3000/')
    .get('h1').should('have.text', 'Daily Horoscope')
    .get('h2')
  })
})