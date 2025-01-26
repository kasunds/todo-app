describe('To-Do App', () => {
  it('Loads the todo application', () => {
    cy.intercept('GET', '/api/todos', {
      statusCode: 200,
      body: [
        { id: 1, title: 'Buy groceries', description: 'Aenean faucibus elit vitae ex aliquam pulvinar', completed: false },
        { id: 2, title: 'Do homework', description: 'Phasellus posuere erat ullamcorper elit consectetur consequat', completed: false },
        { id: 3, title: 'Go jogging', description: 'Nulla id arcu non ex elementum feugiat vitae non nisl', completed: false }
      ],
    }).as('getTodos');

    cy.visit('http://localhost:8080'); 

    cy.wait('@getTodos').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body).to.have.length(3); // Check that there are 3 items
      expect(interception.response.body[0]).to.have.property('id', 1); // Check the first item
    });
  });

  it('Adds a new todo item', () => {
    cy.intercept('POST', '/api/todos', {
      statusCode: 201,
      body: { id: 4,  title: 'Buy groceries', description: 'Aenean faucibus elit vitae ex aliquam pulvinar', completed: false },
    }).as('createTodo');

    cy.visit('http://localhost:8080');

    cy.get('button').contains('New Task').click();
    cy.get('#title').type('Buy groceries');
    cy.get('#description').type('Aenean faucibus elit vitae ex aliquam pulvinar');
    cy.get('button').contains('Save').click();

    cy.wait('@createTodo').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      expect(interception.response.body).to.have.property('id', 4);
      expect(interception.response.body).to.have.property('title', 'Buy groceries');
      expect(interception.response.body).to.have.property('description', 'Aenean faucibus elit vitae ex aliquam pulvinar');
      expect(interception.response.body).to.have.property('completed', false);
    });
    cy.get('button').contains('Close').click();
  });

  it('Marks a todo as completed', () => {
    cy.intercept('GET', '/api/todos').as('getTodo');
    cy.intercept('POST', '/api/todos').as('createTodo');

    cy.visit('http://localhost:8080');

    cy.get('button').contains('New Task').click();
    cy.get('#title').type('Go jogging');
    cy.get('#description').type('Aenean faucibus elit vitae ex aliquam pulvinar');
    cy.get('button').contains('Save').click();

    cy.wait('@createTodo').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      const responseId = interception.response.body.id;
    
      cy.log('Response ID:', responseId);
      cy.intercept('PATCH', '/api/todos/'+responseId).as('completeTodo');
      cy.get('button').contains('Close').click();
      cy.contains('Go jogging').parent().parent().find('.complete').click();
      cy.wait('@completeTodo').its('response.statusCode').should('eq', 200);
      cy.wait('@getTodo').its('response.statusCode').should('eq', 200);
      cy.contains('Go jogging').should('not.exist');
    
    });

  });

  it('Deletes a todo item', () => {
    cy.intercept('GET', '/api/todos').as('getTodo');
    cy.intercept('POST', '/api/todos').as('createTodo');

    cy.visit('http://localhost:8080');

    cy.get('button').contains('New Task').click();
    cy.get('#title').type('Do homework');
    cy.get('#description').type('Aenean faucibus elit vitae ex aliquam pulvinar');
    cy.get('button').contains('Save').click();

    cy.wait('@createTodo').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      const responseId = interception.response.body.id;
    
      cy.log('Response ID:', responseId);
      cy.intercept('DELETE', '/api/todos/'+responseId).as('deleteTodo');
      cy.get('button').contains('Close').click();
      cy.contains('Do homework').parent().parent().find('.delete').click();
      cy.wait('@deleteTodo').its('response.statusCode').should('eq', 200);
      cy.wait('@getTodo').its('response.statusCode').should('eq', 200);
      cy.contains('Do homework').should('not.exist');
    
    });
  });
});
