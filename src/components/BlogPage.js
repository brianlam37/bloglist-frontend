import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {remove, vote, comment as com} from '../reducers/blogReducer';
import {set} from '../reducers/notificationReducer';
const BlogPage = ({blog}) => {
	const [comment, setComment] =useState('');
	const dispatch = useDispatch();
	const user = useSelector(state => state.loggedInUser);
	const history = useHistory();
	if(!blog){
		return null;
	}
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
				type: 'danger'
			};
			dispatch(set(message, 5));
		}
	};
	const handleRemove = () => {
		removeBlog(blog);
	};
	const removeBlog = async (blog) => {
		try {
			if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
				dispatch(remove(blog));
				const message = {
					message:`Removed ${blog.title} by ${blog.author}`,
					type: 'success'
				};
				dispatch(set(message, 5));
				history.push('/');
			}
		}catch(error){
			const message = {
				message:`${error}`,
				type: 'danger'
			};
			dispatch(set(message, 5));
		}
	};
	const displayRemove = () => {
		if(user.id === blog.user.id){
			return(
				<button onClick = {handleRemove}>remove</button>
			);
		}
		return null;
	};
	const handleChange = (e) => {
		setComment(e.target.value);
	};
	const handleComment = async () => {
		const newComment = {
			content:comment
		};
		setComment('');
		try {
			await dispatch(com(blog, newComment));
			const message = {
				message:`commented on ${blog.title}`,
				type: 'success'
			};
			dispatch(set(message, 5));
		}catch(error){
			const message = {
				message:`${error}`,
				type: 'danger'
			};
			dispatch(set(message, 5));
		}
	};

	return (
		<>
			<h2>{blog.title}</h2>
			<a href={blog.url}>{blog.url}</a>
			<p>{blog.likes} <button className = 'likesButton' onClick={handleLikes}>like</button></p>
			<p>added by {blog.author}</p>
			{displayRemove()}
			<h2>comments</h2>
			<div>
				<input value = {comment} onChange = {handleChange}/>
				<button onClick={handleComment}>comment</button>
			</div>
			{blog.comments.map(comment => {
				return(
					<li key = {comment.id}>
						{comment.content}
					</li>
				);
			})}
		</>
	);


};

export default BlogPage;
