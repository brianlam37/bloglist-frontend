import blogService from '../services/blogs';

export const create = blog => {
	return async dispatch => {
		const newBlog = await blogService.create(blog);
		dispatch({
			type: 'CREATE',
			blog:newBlog
		});
	};
};
export const initBlog = () => {
	return async dispatch => {
		const blogs = await blogService.getAll();
		dispatch({
			type: 'INIT',
			blogs
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

export const vote = (id,blog) => {
	return async dispatch => {
		const updatedBlog = await blogService.update(id, blog);
		dispatch({
			type: 'VOTE',
			blog:updatedBlog
		});
	};
};
export const comment = (blog,comment) => {
	return async dispatch => {
		const result = await blogService.comment(blog.id, comment);
		dispatch({
			type: 'COMMENT',
			blog,
			comment:result
		});
	};
};
const reducer = (state = [], action) => {
	let copy = [...state];
	switch(action.type){
		case 'VOTE':{
			let target = copy.findIndex(blog => blog.id === action.blog.id);
			if(target > -1){
				copy[target] = action.blog;
			}
			return copy.sort((a, b) => b.votes - a.votes);
		}
		case 'CREATE':{
			return copy.concat(action.blog).sort((a, b) => b.votes - a.votes);
		}
		case 'INIT':{
			return action.blogs;
		}
		case 'REMOVE':{
			return copy.filter(blog => {
				return action.blog.id !== blog.id;
			}).sort((a, b) => b.votes - a.votes);
		}
		case 'COMMENT':{
			const newComments = action.blog.comments.concat(action.comment);
			const newBlog = {...action.blog, comments:newComments};
			let target = copy.findIndex(blog => blog.id === action.blog.id);
			if(target > -1){
				copy[target] = newBlog;
			}
			return copy.sort((a, b) => b.votes - a.votes);
		}
		default:
			return copy.sort((a, b) => b.votes - a.votes);
	}
};

export default reducer;