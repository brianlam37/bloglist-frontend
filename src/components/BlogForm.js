import React,{useState} from 'react';

const BlogForm = ({createBlog}) => {
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

	return(
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
	);
};

export default BlogForm;