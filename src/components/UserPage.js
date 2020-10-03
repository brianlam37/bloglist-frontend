import React from 'react';
const UserPage = ({user}) => {
	if(!user){
		return null;
	}

	return (
		<>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<td>
			</td>
			<td>
			</td>
		</>
	);
};

export default UserPage;
