/// <reference types="Cypress" />

describe('Auth redirects', () => {
    it('redirects to session/new from the homepage', () => {
        cy.visit('/');
        cy.url().should('contain', 'session/new');
    });
    it('redirects to login when trying to access /settings', () => {
        cy.visit('/settings');
        cy.url().should('contain', '/session/new');
    });
});

describe('Logging in user', () => {
    beforeEach(() => {
        Cypress.Cookies.preserveOnce('sessionId', 's%3AFO6WA5QqysEZlbgCXHHiBGwFKh3XhQvg.mUWql6NVQSyd9u7nBCQ%2FcmiAG2bEN2KgsBIZ84hkex0')
    });
    it('renders signin page with errors if user info incorrect', () => {
        cy.get('input[name=handle]').type('yeezus');
        cy.get('input[name=password]').type('wrong');
        cy.get('.auth .btn-primary').click();
        cy.get('.alert-danger').should('exist');
    });
    it('should redirect to home page if user info correct', () => {
        cy.get('input[name=password]').clear().type('poopfeast');
        cy.get('.auth .btn-primary').click();
        cy.get('.filter').should('exist');
    });
    it('should load the profile correctly', () => {
        cy.get('.navSection').contains('Profile').click();
        cy.get('.username').should('contain', 'yeezus');
        cy.get('.SeenLive').should('have.descendants', 'a');
        cy.get('.profileNav').contains('yeezus\'s Friends').click();
        cy.get('.FriendsList').should('have.descendants', 'a');
        cy.get('.Comments').should('have.descendants', '.Comment');
    });
    it('should load settings correctly', () => {
        cy.get('.navSection').contains('Settings').click();
        cy.get('input[name=name]').should('have.value', 'Kanye');
        cy.get('a').contains('Update Seen').click();
        cy.get('.updateSeen').should('exist');
        cy.get('a').contains('Venues').click();
        cy.get('.input-group-text').should('contain', 'Rogers Arena');
    });
});
