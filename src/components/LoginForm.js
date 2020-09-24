import React, {useState} from 'react'

const LoginForm = ({sendLogin}) => {
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	
	const handleLogin = async (e) =>{
		e.preventDefault();
		const loginInfo = {
			username, password,
		}

		sendLogin(loginInfo);
		setUsername('');
		setPassword('');
	}

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const handleUserChange = (e) => {
		setUsername(e.target.value);
	};

	return(
		<form onSubmit={handleLogin}>
			<div>username
				<input type = 'username' value = {username} name = 'Username' onChange = {handleUserChange}></input>
			</div>
			<div>password
				<input type = 'password'value = {password} name = 'Password' onChange = {handlePasswordChange}></input>
			</div>
			<button type = 'submit' onClick = {handleLogin}>login</button>
		</form>
	);
}

export default LoginForm;