import React from 'react';
import Notification from './components/Notification';
import{Switch, Route, useRouteMatch} from 'react-router-dom';
import Home from './components/Home';
import LoginOrChild from './components/LoginOrChild';
import './index.css';
import UserList from './components/UserList';
import UserPage from './components/UserPage';
import {useSelector} from 'react-redux';
const App = () => {
	const match = useRouteMatch('/anecdotes/:id');
	const users = useSelector(state => state.users);
	const user = match
		? users.find(user => user.id === match.params.id):null;
	return (
		<div>
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
				</LoginOrChild>
			</Switch>
		</div>
	);
};



export default App;