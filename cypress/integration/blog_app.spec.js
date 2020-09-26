describe('Blog app', function() {
	beforeEach(function() {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		const user = {
			name: 'Matti Luukkainen',
			username: 'mluukkai',
			password: 'salainen'
		};
		cy.request('POST', 'http://localhost:3001/api/users',user);
		const user2 = {
			name: 'Big Bob',
			username: 'bigbob',
			password: 'secret'
		};
		cy.request('POST', 'http://localhost:3001/api/users',user2);
		cy.visit('http://localhost:3000');
	});

	it('Login form is shown', function() {
		cy.get('#loginForm');
	});

	describe('Login', function() {
		it('succeeds with correct credentials', function() {
			cy.get('#username').type('mluukkai');
			cy.get('#password').type('salainen');
			cy.get('#loginButton').click();
			cy.contains('Matti Luukkainen logged in');
		});

		it('fails with wrong credentials', function() {
			cy.get('#username').type('mluukkai');
			cy.get('#password').type('salaine');
			cy.get('#loginButton').click();
			cy.get('.error')
				.should('contain', 'Wrong credentials')
				.and('have.css', 'color', 'rgb(255, 0, 0)')
				.and('have.css', 'border-style', 'solid');
		});
	});

	describe('When logged in', function() {
		beforeEach(function() {
			cy.login({username:'mluukkai', password:'salainen'});
		});

		it('A blog can be created', function () {
			cy.contains('new blog').click();
			cy.get('#title').type('wassup boys');
			cy.get('#author').type('the boys');
			cy.get('#url').type('www.theboys.com');
			cy.get('#createButton').click();
			cy.get('div').should('contain', 'wassup boys');
		});

		describe('When a blog exists', function() {
			beforeEach(function() {
				cy.addBlog({title: 'a blog', author: 'me', url:'www.blog.com'});
				cy.addBlog({title: 'to delete blog', author: 'me', url:'www.blog.com'});
			});
			it('can be liked', function() {
				cy.contains('a blog').parent().contains('show').click();
				cy.contains('a blog').parent().get('.likeButton').click();
				cy.contains('a blog').parent().get('.likes').contains('likes 1');
			});
			it('can delete a blog', function() {
				cy.contains('to delete blog').parent().contains('show').click();
				cy.contains('to delete blog').parent().contains('remove').click();
				cy.should('not.contain', 'to delete blog');
			});
			it('cannot delete a blog from another user', function() {
				cy.contains('logout').click();
				cy.get('#username').type('bigbob');
				cy.get('#password').type('secret');
				cy.get('#loginButton').click();
				cy.contains('Big Bob logged in');
				cy.contains('to delete blog').parent().contains('show').click();
				cy.contains('to delete blog').parent().contains('remove').click();
				cy.contains('to delete blog').parent().contains('to delete blog');
			});
		});
		describe('When multiple blogs exists', function() {
			beforeEach(function() {
				cy.addBlog({title: 'first blog', author: 'me', url:'www.blog.com', likes:7});
				cy.addBlog({title: 'second blog', author: 'me', url:'www.blog.com', likes: 10});
				cy.addBlog({title: 'third blog', author: 'me', url:'www.blog.com', likes: 8});
				cy.addBlog({title: 'fourth blog', author: 'me', url:'www.blog.com'});
			});

			it.only('is sorted by likes', function() {
				cy.get('.blog').then((blogs) => {
					cy.wrap(blogs[0]).contains('second blog');
					cy.wrap(blogs[1]).contains('third blog');
					cy.wrap(blogs[2]).contains('first blog');
					cy.wrap(blogs[3]).contains('fourth blog');
				});

			});


		});
	});

});