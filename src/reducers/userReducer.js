import blogService from '../services/blogs';
import userService from '../services/users';
export const create = blog => {
	return async dispatch => {
		const newBlog = await blogService.create(blog);
		dispatch({
			type: 'CREATE',
			blog:newBlog
		});
	};
};
export const initUser = () => {
	return async dispatch => {
		const users = await userService.getAll();
		dispatch({
			type: 'INIT_USER',
			users
		});
	};
};
export const remove = blog => {

	return async dispatch => {
		await blogService.remove(blog.id);
		dispatch({
			type: 'REMOVE',
			blog
		});
	};
};


const reducer = (state = [], action) => {
	let copy = [...state];
	switch(action.type){
		case 'INIT_USER':{
			return action.users;
		}
		default:
			return copy;
	}
};

export default reducer;