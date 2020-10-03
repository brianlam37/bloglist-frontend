import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'mi compadre',
		url: 'www.mybro.com',
		likes:0
	};

	const component = render(
		<Blog blog= {blog} />
	);

	component.debug();

	expect(component.container).toHaveTextContent(
		'Component testing is done with react-testing-library'
	);
	expect(component.container).toHaveTextContent(
		'mi compadre'
	);
	const likes = component.container.querySelector('.likes');
	expect(likes).toBeNull();
	const url = component.container.querySelector('.url');
	expect(url).toBeNull();
	//console.log(prettyDOM(li));
});

test('url and likes are shown when the show button is clicked', () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'mi compadre',
		url: 'www.mybro.com',
		likes:0,
		user: {
			username: 'bigblob',
			name: 'big boy',
			id: '5f6b02bb96e5ef3a5c24d5ca'
		},
		id: '5f6c6247a308924f70d0bcec'
	};

	const mockHandler = jest.fn();

	const component = render(
		<Blog blog = {blog} increaseLikes = {mockHandler}/>
	);


	const button = component.getByText('show');
	fireEvent.click(button);

	component.debug();
	const likes = component.container.querySelector('.likes');
	expect(likes).toBeDefined();
	const url = component.container.querySelector('.url');
	expect(url).toBeDefined();
});

test('like event handler called twice', () => {
	const blog = {
		title: 'Component testing is done with react-testing-library',
		author: 'mi compadre',
		url: 'www.mybro.com',
		likes:0,
		user: {
			username: 'bigblob',
			name: 'big boy',
			id: '5f6b02bb96e5ef3a5c24d5ca'
		},
		id: '5f6c6247a308924f70d0bcec'
	};

	const mockHandler = jest.fn();

	const component = render(
		<Blog blog = {blog} increaseLikes = {mockHandler}/>
	);


	const show = component.getByText('show');
	fireEvent.click(show);

	component.debug();
	const like = component.container.querySelector('.likesButton');
	fireEvent.click(like);
	fireEvent.click(like);

	expect(mockHandler.mock.calls).toHaveLength(2);


});