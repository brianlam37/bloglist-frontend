import React from 'react';
import {useSelector} from 'react-redux';
import User from './User';
import {Table} from 'react-bootstrap';
const UserList = () => {
	const users = useSelector(state => state.users);
	return (
		<>
			<h2>Users</h2>
			<Table striped>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user =>
						<User key={user.id} user={user}/>
					)}
				</tbody>
			</Table>
		</>
	);
};
export default UserList;