import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {initUser} from '../reducers/userReducer';
import User from './User';
const UserList = () => {
	const users = useSelector(state => state.users);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initUser());
	}, [dispatch]);


	return (
		<>
			<h2>Users</h2>
			<table>
				<thead>
					<tr>
						<th></th>
						<th>blogs created</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						{users.map(user =>
							<User key={user.id} user={user}/>
						)}
					</tr>
				</tbody>
			</table>
		</>
	);
};
export default UserList;