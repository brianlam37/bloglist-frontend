import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LoginForm from './LoginForm';
import {getLoggedIn, logout} from '../reducers/loginReducer';
import {Link} from 'react-router-dom';
import {Navbar, Nav, Button} from 'react-bootstrap';

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
		paddingRight: 5,
		color:'#FFF'
	};
	const background = {
		color:'#FFF',
	};
	const display = () => {
		if(user === null)
			return(
				<LoginForm/>
			);
		else{
			return(
				<>
					<Navbar collapseOnSelect expand = 'lg' bg = 'dark' variant = 'dark'>
						<Navbar.Toggle/>
						<Navbar.Collapse id="responsive-navbar-nav">
							<Nav className='mr-auto'>
								<Nav.Link href='#' >
									<Link to = '/' style = {padding}>blogs</Link>
								</Nav.Link>
								<Nav.Link href='#'>
									<Link to = '/users' style = {padding}>users</Link>
								</Nav.Link>
								<Nav.Link disabled>
									<div style = {background}>{user.name} logged in</div>
								</Nav.Link>
								<Button onClick = {handleLogout} variant = 'secondary'>logout</Button>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
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