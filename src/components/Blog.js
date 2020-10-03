import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {remove, vote} from '../reducers/blogReducer';
import {set} from '../reducers/notificationReducer';
const Blog = ({blog}) => {
	const dispatch = useDispatch();
	const [details, setDetails] = useState(false);
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	};
	const toggleDetails = () => {
		setDetails(!details);
	};
	const handleLikes = () => {
		const updatedBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes+1,
			user: blog.user
		};
		increaseLikes(blog.id, updatedBlog);
	};
	const handleRemove = () => {
		removeBlog(blog);
	};
	const increaseLikes = async (id, updatedBlog) => {
		try{
			dispatch(vote(id, updatedBlog));
			const message = {
				message:`you voted for '${blog.title}'`,
				type: 'success'
			};
			dispatch(set(message, 5));
		}catch(error){
			const message = {
				message:`${error}`,
				type: 'error'
			};
			dispatch(set(message, 5));
		}
	};
	const removeBlog = (blog) => {
		try {
			if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
				dispatch(remove(blog));
				const message = {
					message:`Removed ${blog.title} by ${blog.author}`,
					type: 'success'
				};
				dispatch(set(message, 5));
			}
		}catch(error){
			const message = {
				message:`${error}`,
				type: 'error'
			};
			dispatch(set(message, 5));
		}
	};
	const display = () => {
		if(details){
			return(
				<div className = 'blog'>
					{blog.title} {blog.author}
					<button onClick = {toggleDetails}>hide</button>
					<p className = 'url'>{blog.url}</p>
					<div className = 'likes'>likes {blog.likes}<button className = 'likesButton' onClick = {handleLikes}>likes</button></div>
					<p>{blog.user.name}</p>
					<button onClick = {handleRemove}>remove</button>
				</div>
			);
		}else{
			return(
				<div className = 'blog'>
					{blog.title} {blog.author}
					<button onClick = {toggleDetails}>show</button>
				</div>
			);
		}
	};
	return (
		<div style={blogStyle}>
			{display()}
		</div>
	);};

export default Blog;
