import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, fireEvent} from '@testing-library/react';
import BlogForm from './BlogForm';

test('form calls eventhandler recieved as props with correct details',() => {
	const mockHandler = jest.fn();

	const component = render(
		<BlogForm createBlog= {mockHandler} />
	);

	const title = component.container.querySelector('#title');
	const form = component.container.querySelector('form');
	fireEvent.change(title, {
		target: {value: 'Component testing is done with react-testing-library'}
	});
	fireEvent.submit(form);

	component.debug();

	expect(mockHandler.mock.calls).toHaveLength(1);
	expect(mockHandler.mock.calls[0][0].title).toBe('Component testing is done with react-testing-library');

});