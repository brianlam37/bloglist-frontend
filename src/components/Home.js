import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BlogForm from './BlogForm';
import {initBlog} from '../reducers/blogReducer';
import Blog from './Blog';
const Home = () => {
	const blogs = useSelector(state => state.blogs);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initBlog());
	}, [dispatch]);

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