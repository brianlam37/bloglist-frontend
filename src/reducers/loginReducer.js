import loginService from '../services/login';
import blogService from '../services/blogs';
export const login = loginInfo => {
	return async dispatch => {
		const user = await loginService.login(loginInfo);
		dispatch({
			type: 'LOGIN',
			user,
		});
	};
};
export const getLoggedIn = () => {
	return {
		type: 'GET_LOGGED_IN',
	};
};
export const logout = () => {
	return {
		type: 'LOGOUT',
	};
};
const reducer = (state = null, action) => {
	switch(action.type){
		case 'LOGIN':{
			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(action.user));
			blogService.setToken(action.user.token);
			return action.user;
		}
		case 'GET_LOGGED_IN':{
			const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
			if (loggedUserJSON) {
				const user = JSON.parse(loggedUserJSON);
				blogService.setToken(user.token);
				return user;
			}
			return state;
		}
		case 'LOGOUT':{
			return null;
		}
		default:
			return state;
	}
};

export default reducer;