import React,{useEffect} from 'react';
import Notification from './components/Notification';
import{Switch, Route, useRouteMatch} from 'react-router-dom';
import Home from './components/Home';
import LoginOrChild from './components/LoginOrChild';
import './index.css';
import UserList from './components/UserList';
import UserPage from './components/UserPage';
import BlogPage from './components/BlogPage';
import LoginForm from './components/LoginForm';
import {useDispatch, useSelector} from 'react-redux';
import {initUser} from './reducers/userReducer';
import {initBlog} from './reducers/blogReducer';
const App = () => {
	const matchUser = useRouteMatch('/users/:id');
	const users = useSelector(state => state.users);
	const user = matchUser
		? users.find(user => user.id === matchUser.params.id):null;
	const matchBlog = useRouteMatch('/blogs/:id');
	const blogs = useSelector(state => state.blogs);
	const blog = matchBlog
		? blogs.find(blog => blog.id === matchBlog.params.id):null;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initUser());
	}, [dispatch]);
	useEffect(() => {
		dispatch(initBlog());
	}, [dispatch]);

	//console.log('app', blogs, users, blog);
	return (
		<div className = 'container'>
			<Notification/>
			<Switch>
				<LoginOrChild>
					<Route exact path='/'>
						<Home/>
					</Route>
					<Route exact path='/users'>
						<UserList/>
					</Route>
					<Route path='/users/:id'>
						<UserPage user = {user}/>
					</Route>
					<Route path='/blogs/:id'>
						<BlogPage blog = {blog}/>
					</Route>
					<Route path='/login'>
						<LoginForm/>
					</Route>
				</LoginOrChild>
			</Switch>
		</div>
	);
};



export default App;