import React,{useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import Togglable from './Togglable';
import {set} from '../reducers/notificationReducer';
import {create} from '../reducers/blogReducer';
const BlogForm = () => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
	const handleTitleChange = e => {
		setTitle(e.target.value);
	};
	const handleAuthorChange = e => {
		setAuthor(e.target.value);
	};
	const handleUrlChange = e => {
		setUrl(e.target.value);
	};
	const handleCreate = e => {
		e.preventDefault();
		const newBlog = {
			title: title,
			author: author,
			url: url
		};
		createBlog(newBlog);
	};
	const createBlog = (newBlog) => {
		try{
			blogFormRef.current.toggleVisibility();
			dispatch(create(newBlog));
			const message = {
				message:`a new blog ${newBlog.title} by ${newBlog.author}`,
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
	const blogFormRef = useRef();
	return(
		<Togglable buttonLabel = 'new blog' ref = {blogFormRef}>
			<form onSubmit = {handleCreate}>
				<h2>create new</h2>
				<div>title:
					<input id = 'title' type = 'text' value = {title} name = 'Title' onChange = {handleTitleChange}></input>
				</div>
				<div>author:
					<input id = 'author' type = 'text' value = {author} name = 'Author' onChange = {handleAuthorChange}></input>
				</div>
				<div>url:
					<input  id = 'url' type = 'text' value = {url} name = 'Url' onChange = {handleUrlChange}></input>
				</div>
				<button id = 'createButton' type = 'submit'>create</button>
			</form>
		</Togglable>
	);
};

export default BlogForm;