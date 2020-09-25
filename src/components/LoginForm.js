import React from 'react';
import PropTypes from 'prop-types';
const LoginForm = ({handleLogin, username, handleUserChange, password, handlePasswordChange}) => {

	return(
		<form onSubmit={handleLogin}>
			<div>username
				<input type = 'text' value = {username} name = 'Username' onChange = {handleUserChange}></input>
			</div>
			<div>password
				<input type = 'password'value = {password} name = 'Password' onChange = {handlePasswordChange}></input>
			</div>
			<button type = 'submit' onClick = {handleLogin}>login</button>
		</form>
	);
};

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	username: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired
};

export default LoginForm;