import React,{useState} from 'react';
import {login} from '../reducers/loginReducer';
import {useDispatch} from 'react-redux';
import {set} from '../reducers/notificationReducer';
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
			dispatch(login(loginInfo));
		}catch(exception){
			const message = {
				message:'Wrong credentials',
				type: 'error'
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
		<form onSubmit={handleLogin} id = 'loginForm'>
			<div>username
				<input id = 'username' type = 'text' value = {username} name = 'Username' onChange = {handleUserChange}></input>
			</div>
			<div>password
				<input id = 'password' type = 'password'value = {password} name = 'Password' onChange = {handlePasswordChange}></input>
			</div>
			<button id = 'loginButton' type = 'submit'>login</button>
		</form>
	);
};

export default LoginForm;