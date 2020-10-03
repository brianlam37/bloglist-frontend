import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoginForm from './LoginForm';
import {getLoggedIn, logout} from '../reducers/loginReducer';
const LoginOrChild = (props) => {
	const user = useSelector(state => state.loggedInUser);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getLoggedIn());
	}, [dispatch]);
	const handleLogout = () => {
		window.localStorage.removeItem('loggedBlogappUser');
		dispatch(logout());
	};
	const display = () => {
		if(user === null)
			return(
				<LoginForm/>
			);
		else{
			return(
				<>
					<h2>blogs</h2>
					<p>{user.name} logged in <button onClick = {handleLogout}>logout</button></p>
					{props.children}
				</>
			);
		}
	};

	return(
		<div>
			{display()}
		</div>
	);
};

export default LoginOrChild;