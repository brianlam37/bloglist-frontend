import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoginForm from './LoginForm';
import {getLoggedIn, logout} from '../reducers/loginReducer';
import {Link} from 'react-router-dom';
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
	const padding = {
		paddingRight: 5
	};
	const background = {
		background:'#CCCCCC',
		padding: 4
	};
	const display = () => {
		if(user === null)
			return(
				<LoginForm/>
			);
		else{
			return(
				<>
					<div style = {background}>
						<Link to = '/' style = {padding}>blogs</Link>
						<Link to = '/users' style = {padding}>users</Link>
						{user.name} logged in <button onClick = {handleLogout}>logout</button>
					</div>
					<h2>blogs</h2>
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