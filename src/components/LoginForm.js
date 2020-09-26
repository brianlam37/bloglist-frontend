import React from 'react';
import PropTypes from 'prop-types';
const LoginForm = ({handleLogin, username, handleUserChange, password, handlePasswordChange}) => {

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

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
	handleUserChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
};

export default LoginForm;