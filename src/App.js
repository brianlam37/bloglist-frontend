import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm'; 
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import './index.css'
const App = () => {
	const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const [type, setType] = useState(null);

	useEffect(() => {
		blogService.getAll().then(blogs =>
			setBlogs( blogs.sort((a, b) => b.likes - a.likes ))
		)  
	}, [])
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	const sendLogin = async (loginInfo) =>{
		try {
			const user = await loginService.login(loginInfo)
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
			setUser(user);
			blogService.setToken(user.token)
		}catch(exception){
			setMessage('Wrong credentials')
			setType('error')
			setTimeout(() => {
				setMessage(null)
			},5000)
		}
	}
	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser')
		setUser(null);
	}

	const removeBlog = async blog => {
		try {
			if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) { 
				await blogService.remove(blog.id);
				setMessage(`Removed ${blog.title} by ${blog.author}`)
				setType('success')
				setTimeout(() => {
					setMessage(null)
				},5000)
				setBlogs(blogs.filter(b => b.id !==blog.id));
			}
		}catch(exception){
			setMessage('Wrong credentials')
			setType('error')
			setTimeout(() => {
				setMessage(null)
			},5000)
		}
	}

	const blogFormRef = useRef();

	const createBlog = async (newBlog) => {
		try{
			blogFormRef.current.toggleVisibility();
			const response = await blogService.create(newBlog)
			setMessage(`a new blog ${newBlog.title} by ${newBlog.author}`)
			setType('success')
			setTimeout(() => {
				setMessage(null)
			},5000)
			setBlogs(blogs.concat(response));
		}catch(error){
			setMessage(`${error}`)
			setType('error')
			setTimeout(() => {
				setMessage(null)
			},5000)
		}
	}

	const increaseLikes = async (id, updatedBlog) => {
		try{
			const response = await blogService.update(id, updatedBlog)
			const index = blogs.findIndex(blog => blog.id === id);
			let copy = [...blogs];
			copy[index] = response;
			setBlogs(copy);
		}catch(error){
			setMessage(`${error}`)
			setType('error')
			setTimeout(() => {
				setMessage(null)
			},5000)
		}
	}

	const display = () =>{
		if(user === null)
			return(
				<LoginForm sendLogin = {sendLogin}/>
			);
		else{
			return(
				<>
					<h2>blogs</h2>
					{user.name} logged in
					<button onClick = {handleLogout}>logout</button>
					<Togglable buttonLabel = 'new blog' ref = {blogFormRef}>
						<BlogForm createBlog = {createBlog}/>
					</Togglable>
					{blogs.map(blog =>
						<Blog key={blog.id} blog={blog} increaseLikes = {increaseLikes} removeBlog = {removeBlog}/>
					)}
				</>
			)
		}
	}

	return (
		<div>
			<Notification message={message} type = {type}/>
			{display()}
		</div>
	)
}



export default App