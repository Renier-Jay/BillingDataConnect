describe('Billing Portal Login Test', () => {
  // Suppress the ResizeObserver error
  Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      return false; // Ignore this error
    }
  });

  it('should log in successfully with valid credentials', () => {
    // Visit the billing portal
    cy.visit('https://billing.payconnect.io');

    // Set viewport size for a consistent testing environment
    cy.viewport(1920, 1080);
    
    // Verify the login page elements
    cy.contains('Sign in to DataConnect').should('be.visible');
    cy.contains('Username or email').should('be.visible');
    cy.contains('Password').should('be.visible');

    // Enter username
    cy.get('#username')
      .click()
      .type('billing.admin.tester', { delay: 100 });

    // Enter password
    cy.get('#password')
      .click()
      .type('HelloWorld000!', { delay: 100 });

    // Click the login button
    cy.get('#kc-login').click();

    // Wait for login and for the dialog to potentially disappear
    cy.wait(2000);

    // Verify dashboard and main options
    cy.contains('Dashboard').should('be.visible');
    cy.contains('Accounts').should('be.visible');
    cy.contains('Transactions').should('be.visible');
    cy.contains('Settings').should('be.visible');

    // Ensure any potential dialog is closed
    cy.get('.q-dialog__backdrop').should('not.exist');
    cy.wait(1000); // Additional wait to ensure UI is stable

    // Interact with elements after login
    cy.get('.q-list > :nth-child(2) > .q-item__section--main')
      .should('be.visible')
      .click();
    cy.wait(2000);

    cy.get('.q-btn__content > div')
      .should('be.visible')
      .click();
    cy.wait(2000);

    // Open the first dropdown for Customer Type
    cy.get('input[aria-label="Customer Type"]')
      .scrollIntoView()
      .click(); // Click to open the dropdown

    // Wait for dropdown options to load
    cy.wait(1000); 

    // Click on the "SME" option in the dropdown
    cy.get('.q-menu .q-item').contains('SME').should('be.visible').click({ force: true });

    // Fill out the form fields using chained commands
    cy.get('input[aria-label="First Name *"]').as('firstNameInput');
    cy.get('@firstNameInput').should('be.visible').click().type('TestBilling', { delay: 100 });
    
    cy.get('input[aria-label="Last Name *"]').should('be.visible').click().type('TestLastnameBilling', { delay: 100 });
    cy.get('input[aria-label="Contact Number *"]').should('be.visible').click().type('09455706266', { delay: 100 });
    cy.get('input[aria-label="Email address *"]').should('be.visible').click().type('kurama.tzy1@gmail.com', { delay: 100 });
    cy.get('input[aria-label="Address Line 1 *"]').should('be.visible').click().type('Smmmme', { delay: 100 });
    cy.get('input[aria-label="City *"]').should('be.visible').click().type('San Pablo City', { delay: 100 });

    // Interact with the second dropdown (Region)
    cy.get('input[aria-label="Region *"]').scrollIntoView().click(); // Click to open the dropdown
    cy.wait(1000); // Wait for dropdown options to load
    cy.contains('Region XIII - National Capital Region (NCR)').should('be.visible').click({ force: true });
    cy.wait(1000);

    // Interact with the Zip Code field
    cy.get('input[aria-label="Zip Code *"]').should('be.visible').click().type('4000', { delay: 100 });
    cy.wait(1000);

    // Interact with the Bill Cycle Day input (force click)
    cy.get('input[aria-label="Bill Cycle Day"]').scrollIntoView().click({ force: true });
    cy.wait(1000); // Wait for dropdown options to load

    // Select the bill cycle day
    cy.get('.q-menu .q-item').contains('15').should('exist').click({ force: true });
    cy.wait(1000);

    // Interact with the Note field
    cy.get('input[aria-label="Note"]').should('be.visible').click().type('This is a test note.', { delay: 100 });
    cy.wait(1000);

    // Submit the form
    cy.get('.q-btn--flat > .q-btn__content > .block').click();
    cy.wait(1000);  
  });
});
