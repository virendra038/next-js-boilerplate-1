describe('Login page', () => {
    beforeEach(() => {
      cy.visit('/auth/login');
    });
  
    it('displays the login form', () => {
      cy.contains('Login3334').should('be.visible');
      cy.get('[name="email3334"]').should('be.visible');
      cy.get('[name="password3334"]').should('be.visible');
      cy.get('button[type="submit"]').should('be.visible');
    });
  
    // it('requires email and password to be entered', () => {
    //   cy.get('button[type="submit"]').click();
    //   cy.contains('Enter email and password').should('be.visible');
  
    //   cy.get('[name="email"]').type('test@example.com');
    //   cy.get('button[type="submit"]').click();
    //   cy.contains('Enter password').should('be.visible');
  
    //   cy.get('[name="password"]').type('password');
    //   cy.get('button[type="submit"]').click();
    //   //cy.contains('Enter a valid email address').should('be.visible');
    // });
  
    // it('displays an error message for password', () => {
    //   cy.get('[name="email"]').type('test@example.com');
    //   cy.get('button[type="submit"]').click();
    //   cy.contains("Enter password").should('be.visible');
    // });
  
    // it('logs in with valid credentials', () => {
    //   cy.get('[name="email"]').type('test@example.com');
    //   cy.get('[name="password"]').type('password');
    //   cy.get('button[type="submit"]').click();
    //   //cy.url().should('eq', 'http://localhost:3000/home');
    // });
  });
  

  // describe('inputForm', () => {
  //   beforeEach(() => {
  //     cy.visit('/auth/login')
  //   })
  
  //   it('shows error message when submitting an empty form', () => {
  //       cy.get('button[type="submit"]').click();
  //     cy.contains('Enter email and password')
  //   })
  
  //   it('shows error message when submitting a form with empty email', () => {
  //     cy.get('input[name=email]').type('{enter}')
  //     cy.contains('Enter email')
  //   })
  
  //   it('shows error message when submitting a form with empty password', () => {
  //    cy.get('[name="email"]').type('test@example.com');
  //    cy.get('button[type="submit"]').click();
  //    cy.contains('Enter password')
  //   })
  
  //   // it('shows error message when submitting a form with invalid email', () => {
  //   //   cy.get('input[name=email]').type('invalidemail')
  //   //   cy.get('form').submit()
  //   //   cy.contains('Enter a valid email address')
  //   // })
  
  //   // it('logs in successfully when submitting a valid form', () => {
  //   //   cy.get('input[name=email]').type('example@example.com')
  //   //   cy.get('input[name=password]').type('password')
  //   //   cy.get('form').submit()
  //   //   cy.url().should('include', '/dashboard')
  //   // })
  // })
  