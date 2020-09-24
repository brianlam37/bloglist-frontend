import React, {useState} from 'react'
const Blog = ({ blog, increaseLikes, removeBlog}) => {
	const [details, setDetails] = useState(false);
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}
	const toggleDetails = () =>{
		setDetails(!details);
	}
	const handleLikes = () =>{
		const updatedBlog = {
			title: blog.title,
			author: blog.author,
			url: blog.url,
			likes: blog.likes+1, 
			user: blog.user
		}
		increaseLikes(blog.id, updatedBlog);
	}
	const handleRemove = () =>{
		removeBlog(blog);
	}
	const display = () => {
		if(details){
			return(
				<div>
					{blog.title} {blog.author}
					<button onClick = {toggleDetails}>hide</button>
					<p>{blog.url}</p>
					<p>likes {blog.likes}<button onClick = {handleLikes}>likes</button></p>
					<p>{blog.user.name}</p>
					<button onClick = {handleRemove}>remove</button>
				</div>
			)
		}else{
			return(
				<div>
					{blog.title} {blog.author}
					<button onClick = {toggleDetails}>show</button>
		  		</div>
			)
		}
	}
	return (
	  	<div style={blogStyle}>
			  {display()}
		</div>
	)}

export default Blog
