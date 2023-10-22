import { getTodaysDate } from "../support/utils";

describe('User can visit homepage', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/')
      .wait(3000)
      .get('button').first().click()
      .intercept("GET", `/api/horoscope?date=${getTodaysDate(new Date()).replace(/ /g, "%20")}&sign=Cancer`, {
        statusCode: 200,
        fixture: 'horoscope'
      }).as("horoscope-data")
  })

  it('Should be able to see contents on homepage', () => {
    cy.get('h1').should('have.text', 'Daily Horoscope')
      .get('h2').should('be.visible')
      .get('.flex > img').should('have.attr', 'src').and('include', 'cancer.png')
      .wait('@horoscope-data').then(intercept => {
        cy.get('.border-white').should('be.visible')
          .get('p').first().should('have.text', "hello to hear from people you haven't heard from in some time. Make a cup of tea and savor every correspondence. You could feel nostalgic for the \"good old days\" when life seemed simpler and more of your friends were nearby. Pick up the phone and give one of them a call. Your old pal will be delighted to hear from you.")
      })
  })

  it.only('Should be able to navigate using nav bar', () => {
    cy.get('p').eq(1).should('have.text', 'Calendar')
      .get('p').eq(2).should('have.text', 'Home')
      .get('p').eq(3).should('have.text', 'Logout')
      .get('p').eq(1).click()
      .intercept("GET", `/api/entry/ABrrCENR3M0I6XZ7NLA7gNCY/2023-10-19`, {
        statusCode: 200,
        body: {}
      })
      .url().should('include', '/demo/calendar')
      .get('p').eq(2).click()
      .intercept("GET", `/api/horoscope?date=${getTodaysDate(new Date()).replace(/ /g, "%20")}&sign=Cancer`, {
        statusCode: 200,
        fixture: 'horoscope'
      })
      .url().should('include', '/demo/dashboard')
      .get('p').eq(3).click()
      .url().should('include', '/')
  })
})