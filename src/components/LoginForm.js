import React,{useState} from 'react';
import {login} from '../reducers/loginReducer';
import {useDispatch} from 'react-redux';
import {set} from '../reducers/notificationReducer';
import {Form, Button} from 'react-bootstrap';
const LoginForm = () => {
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const dispatch = useDispatch();
	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const loginInfo = {
				username, password,
			};
			setUsername('');
			setPassword('');
			await dispatch(login(loginInfo));
			const message = {
				message:`welcome ${loginInfo.username}`,
				type: 'success'
			};
			dispatch(set(message, 5));
		}catch(exception){
			const message = {
				message:`${exception}`,
				type: 'danger'
			};
			dispatch(set(message, 5));
		}
	};


	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleUserChange = (e) => {
		setUsername(e.target.value);
	};
	return(
		<Form onSubmit={handleLogin} id = 'loginForm'>
			<Form.Group>
				<Form.Label>Username</Form.Label>
				<Form.Control id = 'username' type = 'text' value = {username} name = 'Username' onChange = {handleUserChange}/>
			</Form.Group>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control id = 'password' type = 'password'value = {password} name = 'Password' onChange = {handlePasswordChange}/>
			</Form.Group>
			<Button id = 'loginButton' type = 'submit'>Login</Button>
		</Form>
	);
};

export default LoginForm;