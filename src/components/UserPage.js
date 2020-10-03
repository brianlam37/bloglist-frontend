import React from 'react';
import {Link} from 'react-router-dom';
const UserPage = ({user}) => {
	if(!user){
		return null;
	}
	return (
		<>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>
				{user.blogs.map(blog => {
					return(
						<li key = {blog.id}>
							<Link to = {`/blogs/${blog.id}`}>{blog.title}</Link>
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default UserPage;
