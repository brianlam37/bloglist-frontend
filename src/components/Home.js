import React from 'react';
import {useSelector} from 'react-redux';
import BlogForm from './BlogForm';

import Blog from './Blog';
const Home = () => {
	const blogs = useSelector(state => state.blogs);

	return (
		<>
			<BlogForm/>
			{blogs.map(blog =>
				<Blog key={blog.id} blog={blog}/>
			)}
		</>
	);
};
export default Home;