import React from 'react';
import {useSelector} from 'react-redux';
import BlogForm from './BlogForm';
import Blog from './Blog';
import {Table} from 'react-bootstrap';
const Home = () => {
	const blogs = useSelector(state => state.blogs);

	return (
		<>
			<BlogForm/>
			<Table striped>
				<tbody>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog}/>
					)}
				</tbody>
			</Table>
		</>
	);
};
export default Home;