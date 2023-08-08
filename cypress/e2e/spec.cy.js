describe('form testing', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/")
    cy.contains('Click Me').click()
  })

  //Checking to see if the form contains the correct text
  it('the form contains the correct text', () => {
    //form subtitle
    cy.get('.MuiDialogContentText-root').contains('We will send email to them')
    //form email
    cy.get('.MuiGrid-container > :nth-child(1)').contains('Email')
    //form fee
    cy.get('.MuiGrid-container > :nth-child(2)').contains('Fee (Optional)')
    //form course
    cy.get('.MuiGrid-container > :nth-child(3)').contains('Course')
    //form course - fundamentals of javascript
    cy.get('#course').contains('Fundamentals of JavaScript')
    //form batch
    cy.get('.MuiGrid-container > :nth-child(4)').contains('Batch')
    //form batch - august
    cy.get('#batch').contains('August')
  })
})