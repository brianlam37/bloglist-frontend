import React,{useState, useRef} from 'react';
import {useDispatch} from 'react-redux';
import Togglable from './Togglable';
import {set} from '../reducers/notificationReducer';
import {create} from '../reducers/blogReducer';
import {Form, Button, ButtonToolbar, ButtonGroup} from 'react-bootstrap';
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
	const handleCancel = () => {
		blogFormRef.current.toggleVisibility();
	};
	const blogFormRef = useRef();
	return(
		<Togglable buttonLabel = 'new blog' ref = {blogFormRef}>
			<Form onSubmit = {handleCreate}>
				<h2>create new</h2>
				<Form.Group>
					<Form.Label>Title</Form.Label>
					<Form.Control id = 'title' type = 'text' value = {title} name = 'Title' onChange = {handleTitleChange}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Author</Form.Label>
					<Form.Control id = 'author' type = 'text' value = {author} name = 'Author' onChange = {handleAuthorChange}/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Url</Form.Label>
					<Form.Control  id = 'url' type = 'text' value = {url} name = 'Url' onChange = {handleUrlChange}/>
				</Form.Group>
				<ButtonToolbar>
					<ButtonGroup className="mr-2">
						<Button id = 'createButton' type = 'submit'>create</Button>
					</ButtonGroup>
					<ButtonGroup className="mr-2">
						<Button onClick={handleCancel}>cancel</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</Form>
		</Togglable>
	);
};

export default BlogForm;