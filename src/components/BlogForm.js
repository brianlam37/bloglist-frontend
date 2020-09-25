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
		<form>
			<h2>create new</h2>
			<div>title:
				<input type = 'text' value = {title} name = 'Title' onChange = {handleTitleChange}></input>
			</div>
			<div>author:
				<input type = 'text' value = {author} name = 'Author' onChange = {handleAuthorChange}></input>
			</div>
			<div>url:
				<input type = 'text' value = {url} name = 'Url' onChange = {handleUrlChange}></input>
			</div>
			<button type = 'submit' onClick = {handleCreate}>create</button>
		</form>
	);
};

export default BlogForm;